# Hetzner Conversion Server

This is the backend conversion server designed to run on a Hetzner VPS (CX11 or higher).

## Requirements

- Node.js 18+
- FFmpeg (for video conversion)
- LibreOffice (for document conversion)
- Pandoc (for document conversion)
- Sharp dependencies (for image conversion)

## Installation on Hetzner CX11

### 1. Connect to your server
```bash
ssh root@your-server-ip
```

### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

### 3. Install conversion tools
```bash
apt-get update
apt-get install -y ffmpeg libreoffice pandoc
```

### 4. Install Sharp dependencies
```bash
apt-get install -y libvips-dev
```

### 5. Upload server files
```bash
scp -r hetzner-server root@your-server-ip:/opt/
```

### 6. Install dependencies
```bash
cd /opt/hetzner-server
npm install
```

### 7. Set up environment variables
```bash
nano /opt/hetzner-server/.env
```

Add:
```
PORT=3001
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 8. Create systemd service
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
WorkingDirectory=/opt/hetzner-server
ExecStart=/usr/bin/node src/server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### 9. Start the service
```bash
systemctl enable conversion-server
systemctl start conversion-server
systemctl status conversion-server
```

### 10. Set up firewall
```bash
ufw allow 3001/tcp
ufw enable
```

## Testing

Test the server:
```bash
curl http://localhost:3001/health
```

## Monitoring

View logs:
```bash
journalctl -u conversion-server -f
```

## Environment Variables

Add the Hetzner server URL to your Supabase Edge Function:
- Go to Supabase Dashboard > Edge Functions > Settings
- Add secret: `HETZNER_API_URL` = `http://your-server-ip:3001`

## Security Notes

- Use a reverse proxy (nginx) with HTTPS in production
- Implement rate limiting
- Add authentication between Edge Functions and Hetzner server
- Set up monitoring and alerts
