# Convertio360

A modern file conversion web application that converts images, videos, and documents between various formats.

## Features

- Image conversion (JPG, PNG, WEBP, GIF, SVG, etc.)
- Video conversion (MP4, WEBM, AVI, MOV, etc.)
- Document conversion (PDF, DOCX, TXT, MD, etc.)
- Conversion history tracking
- Modern, responsive UI
- Built with React, TypeScript, and Tailwind CSS

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Deployment

### Backend (Conversion Server)

The conversion server handles all file processing and needs to be deployed separately.

**Recommended: Railway (Easiest)**

See the complete guide: [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md)

Quick steps:
1. Sign up at [railway.app](https://railway.app/)
2. Connect your GitHub repo
3. Deploy the `conversion-server` folder
4. Add environment variables (Supabase credentials)
5. Copy your Railway URL

### Frontend

Deploy the main app to any static hosting:
- Vercel (recommended)
- Netlify
- GitHub Pages

Before deploying, update `.env` with your Railway URL:
```
VITE_API_URL=https://your-app.railway.app
```

## Project Structure

```
.
├── src/                    # Frontend React application
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   └── lib/              # Libraries (Supabase)
├── conversion-server/     # Backend conversion server
│   ├── src/
│   │   ├── converters/   # Format converters
│   │   └── server.js     # Express server
│   └── nixpacks.toml     # Railway config
└── supabase/             # Database migrations
```

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=your_railway_url
```

### Backend (Set in Railway dashboard)
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Supabase Client

### Backend
- Node.js
- Express
- FFmpeg (video conversion)
- Sharp (image conversion)
- Supabase

## Development

```bash
# Install frontend dependencies
npm install

# Run frontend
npm run dev

# Run backend locally
cd conversion-server
npm install
npm run dev
```

## Supported Formats

### Images
JPG, JPEG, PNG, WEBP, GIF, BMP, SVG, TIFF, ICO

### Videos
MP4, WEBM, AVI, MOV, MKV, FLV, WMV, MPEG

### Documents
PDF, DOCX, DOC, ODT, RTF, EPUB, TXT, MD

## License

MIT
