# Hybrid Architecture Deployment Guide

This file conversion application uses a hybrid architecture combining Supabase Edge Functions and a Hetzner VPS for optimal performance and cost.

## Architecture Overview

### Components

1. **Frontend (React + Vite)**
   - User interface
   - File upload handling
   - Real-time job status monitoring

2. **Supabase Edge Functions**
   - Request routing and validation
   - Simple text-based conversions (txt, md, html, json, xml, csv)
   - Job tracking and status management
   - Database operations

3. **Hetzner VPS (CX11 - $4.50/month)**
   - Heavy-duty conversions requiring system tools
   - Image conversions (Sharp)
   - Video conversions (FFmpeg)
   - Document conversions (LibreOffice, Pandoc)

### How It Works

```
User uploads file
    ↓
Frontend sends to Supabase Edge Function
    ↓
Edge Function determines conversion type
    ↓
    ├─→ Simple (text): Convert immediately, return file
    └─→ Complex (image/video/document):
        1. Create job in database
        2. Forward to Hetzner VPS
        3. Return job ID to frontend
        4. Frontend polls for status
        5. Hetzner updates job status when complete
```

## Deployment Steps

### 1. Supabase Setup (Already Complete)

The following are already configured:
- Database tables (`conversion_history`, `conversion_jobs`)
- Edge function deployed
- Environment variables set

### 2. Hetzner VPS Setup

#### Create Server

1. Go to [Hetzner Cloud](https://www.hetzner.com/cloud)
2. Create new project
3. Add server: CX11 (1 vCPU, 2GB RAM, 20GB SSD) - €4.51/month
4. Choose Ubuntu 22.04 as OS
5. Add SSH key for access

#### Install Dependencies

SSH into your server:

```bash
ssh root@your-server-ip
```

Install Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

Install conversion tools:

```bash
apt-get update
apt-get install -y ffmpeg libreoffice pandoc libvips-dev
```

#### Deploy Server Code

On your local machine:

```bash
cd hetzner-server
scp -r * root@your-server-ip:/opt/conversion-server/
```

Or clone from git:

```bash
cd /opt
git clone <your-repo> conversion-server
cd conversion-server/hetzner-server
```

Install Node dependencies:

```bash
cd /opt/conversion-server
npm install
```

#### Configure Environment

Create `.env` file:

```bash
nano /opt/conversion-server/.env
```

Add:

```env
PORT=3001
SUPABASE_URL=https://fqooopikzuyifhvscpme.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

To get your service role key:
1. Go to Supabase Dashboard → Settings → API
2. Copy the `service_role` secret key

#### Create Systemd Service

```bash
nano /etc/systemd/system/conversion-server.service
```

Add:

```ini
[Unit]
Description=File Conversion Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/conversion-server
ExecStart=/usr/bin/node src/server.js
Restart=on-failure
Environment=NODE_ENV=production
EnvironmentFile=/opt/conversion-server/.env

[Install]
WantedBy=multi-user.target
```

Start service:

```bash
systemctl daemon-reload
systemctl enable conversion-server
systemctl start conversion-server
systemctl status conversion-server
```

#### Configure Firewall

```bash
ufw allow 22/tcp
ufw allow 3001/tcp
ufw enable
```

#### Test Server

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-01-15T..."}
```

### 3. Connect Supabase to Hetzner

Add the Hetzner server URL to Supabase Edge Functions:

1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Click on Settings
4. Add secret:
   - Name: `HETZNER_API_URL`
   - Value: `http://your-server-ip:3001`

### 4. Security Improvements (Recommended)

#### Set up Nginx Reverse Proxy with SSL

Install Nginx and Certbot:

```bash
apt-get install -y nginx certbot python3-certbot-nginx
```

Configure Nginx:

```bash
nano /etc/nginx/sites-available/conversion-server
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable site:

```bash
ln -s /etc/nginx/sites-available/conversion-server /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

Get SSL certificate:

```bash
certbot --nginx -d your-domain.com
```

Update Supabase `HETZNER_API_URL` to `https://your-domain.com`

#### Add Authentication

Update the Hetzner server to verify requests come from Supabase:

In `hetzner-server/src/server.js`, add middleware:

```javascript
const SUPABASE_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY;

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== SUPABASE_SECRET) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
});
```

Update Edge Function to send authorization:

```typescript
fetch(`${HETZNER_API_URL}/convert`, {
  method: "POST",
  headers: {
    'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`
  },
  body: hetznerFormData,
})
```

## Monitoring

### View Server Logs

```bash
journalctl -u conversion-server -f
```

### Check Resource Usage

```bash
htop
```

### Monitor Disk Space

```bash
df -h
```

Clean up old temp files:

```bash
find /tmp -name "converted_*" -mtime +1 -delete
find /tmp/uploads -mtime +1 -delete
```

Set up a cron job:

```bash
crontab -e
```

Add:

```
0 2 * * * find /tmp -name "converted_*" -mtime +1 -delete
0 2 * * * find /tmp/uploads -mtime +1 -delete
```

## Cost Breakdown

- **Supabase Free Tier**: $0/month
  - Edge Functions: 500K requests/month
  - Database: 500MB storage
  - Bandwidth: 5GB egress

- **Hetzner CX11**: $4.50/month
  - 1 vCPU (Intel/AMD)
  - 2GB RAM
  - 20GB SSD
  - 20TB traffic

**Total**: ~$4.50/month for a production-ready conversion service

## Scaling

As traffic grows:

1. **Vertical scaling**: Upgrade to CX21 ($6.40/month) - 2 vCPU, 4GB RAM
2. **Horizontal scaling**: Add load balancer + multiple CX11 instances
3. **Queue system**: Add Redis/BullMQ for job queue management
4. **File storage**: Use Supabase Storage for converted files

## Testing the Complete System

1. Upload a text file → Should convert immediately (Edge Function)
2. Upload an image file → Should create job, poll status (Hetzner)
3. Upload a video file → Should create job, poll status (Hetzner)

Check job status in Supabase:

```sql
SELECT * FROM conversion_jobs ORDER BY created_at DESC LIMIT 10;
```

## Troubleshooting

### Edge Function not connecting to Hetzner

Check edge function logs in Supabase Dashboard

Verify HETZNER_API_URL is set correctly

Test connectivity:
```bash
curl http://your-server-ip:3001/health
```

### Conversions failing

Check Hetzner server logs:
```bash
journalctl -u conversion-server -n 50
```

Verify conversion tools are installed:
```bash
ffmpeg -version
libreoffice --version
pandoc --version
```

### High memory usage

Monitor with `htop`

Consider upgrading to CX21 for 4GB RAM

Implement rate limiting on the server

## Next Steps

1. Implement file storage for converted files (Supabase Storage)
2. Add rate limiting and abuse prevention
3. Set up monitoring (e.g., Uptime Kuma, Prometheus)
4. Add support for batch conversions
5. Implement webhook notifications for job completion
6. Add API key authentication for programmatic access
