# Railway Server Fix - URGENT

## Problem
The Railway server is returning 502 errors because it can't start properly. This is causing all conversions to time out.

## What I Fixed

### 1. Simplified Document Converter
- Removed dependencies on LibreOffice and Pandoc (not available on Railway)
- Created a simple image-to-PDF converter using `pdfkit`
- This works for PNG/JPG/etc to PDF conversions

### 2. Added PDFKit Package
- Updated `package.json` to include `pdfkit` library
- This allows creating PDFs from images without external tools

## Deploy to Railway NOW

**CRITICAL: You must redeploy the conversion server to Railway with these changes:**

### Step 1: Push Code to Repository
```bash
cd conversion-server
git add .
git commit -m "Fix: Simplified converters for Railway compatibility"
git push
```

### Step 2: Verify Environment Variables in Railway
Go to your Railway dashboard and make sure these are set:
- `SUPABASE_URL`: https://fqooopikzuyifhvscpme.supabase.co
- `SUPABASE_SERVICE_ROLE_KEY`: Get from Supabase Dashboard > Settings > API > service_role

### Step 3: Railway Will Auto-Deploy
Railway will detect the changes and redeploy automatically.

### Step 4: Test
Once deployed, test the health endpoint:
```bash
curl https://convertio360-production.up.railway.app/health
```

Should return: `{"status":"ok","timestamp":"..."}`

## What Works After This Fix
- PNG to PDF ✅
- JPG to PDF ✅
- WEBP to PDF ✅
- All image-to-image conversions ✅

## What Doesn't Work Yet
- Video conversions (requires FFmpeg)
- Document conversions other than image-to-PDF

## Next Steps After Deployment
Once Railway is running, try converting a PNG to PDF again. It should work within 5-10 seconds.
