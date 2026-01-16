# File Conversion Server

A Node.js server that handles file conversions for images, videos, and documents. Designed for easy deployment on Railway.

## CRITICAL UPDATE - January 2026

The server has been updated to store converted file data in the database. **You must redeploy to Railway** for conversions to work properly.

## Features

- Image conversion (JPG, PNG, WEBP, GIF, etc.)
- Video conversion (MP4, WEBM, AVI, etc.)
- Document conversion (PDF, DOCX, TXT, etc.)
- Integrates with Supabase for job tracking
- Auto-scales on Railway

## Quick Deploy to Railway

### Step 1: Prerequisites
- A [Railway account](https://railway.app/) (free to sign up)
- Your Supabase credentials

### Step 2: Deploy in 3 Clicks

1. **Push to GitHub** (if not already)
   ```bash
   cd conversion-server
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Railway**
   - Visit [railway.app](https://railway.app/)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `conversion-server` folder as the root directory

3. **Add Environment Variables**
   In Railway dashboard, add these variables:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   PORT=3001
   ```

4. **Done!** Railway will:
   - Auto-detect it's a Node.js app
   - Install dependencies (including FFmpeg)
   - Deploy your server
   - Give you a public URL like `https://your-app.railway.app`

### Step 3: Update Your Frontend

Copy your Railway URL and update your `.env` file:
```
VITE_API_URL=https://your-app.railway.app
```

## Cost

Railway offers:
- **$5/month** Hobby plan (500 hours)
- Free trial with $5 credit

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

Required:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `PORT` - Server port (default: 3001)

## API Endpoints

### POST /convert
Converts uploaded files

**Request:**
- `file`: File to convert (multipart/form-data)
- `outputFormat`: Target format (e.g., "webp", "mp4", "pdf")
- `jobId`: Unique job identifier from Supabase

**Response:**
```json
{
  "message": "Conversion started",
  "jobId": "uuid"
}
```

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Supported Formats

### Images
JPG, PNG, WEBP, GIF, BMP, SVG, TIFF, ICO

### Videos
MP4, WEBM, AVI, MOV, MKV, FLV, WMV, MPEG

### Documents
PDF, DOCX, DOC, ODT, RTF, EPUB, TXT, MD

## Troubleshooting

### Deployment fails
- Check Railway logs in the dashboard
- Ensure all environment variables are set
- Verify your GitHub repo is connected

### Conversions fail
- Check Railway logs for error messages
- Verify FFmpeg is installed (should be automatic)
- Check Supabase connection

### Need help?
- [Railway Docs](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)
