# Quick Start Guide

Get your file converter running in **10 minutes**!

## Step 1: Run the Frontend Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Your app is now running at `http://localhost:5173`

## Step 2: Deploy Backend to Railway

Your conversion server needs to run separately. Railway is the easiest option.

### 2.1: Create Railway Account
- Go to [railway.app](https://railway.app/)
- Sign up with GitHub (free)

### 2.2: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2.3: Deploy on Railway

1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Set **Root Directory** to `conversion-server`
5. Click **"Deploy"**

### 2.4: Add Environment Variables

In Railway dashboard → Your project → Variables tab:

```
SUPABASE_URL=https://fqooopikzuyifhvscpme.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
PORT=3001
```

Find your service role key at:
`https://supabase.com/dashboard/project/fqooopikzuyifhvscpme/settings/api`

### 2.5: Get Your URL

Railway will give you a public URL like:
```
https://conversion-server-production-xxxx.up.railway.app
```

Copy this URL!

## Step 3: Connect Frontend to Backend

Update your `.env` file:

```bash
VITE_API_URL=https://your-railway-url.railway.app
```

Restart your frontend:
```bash
npm run dev
```

## Step 4: Test It!

1. Visit `http://localhost:5173`
2. Upload an image (e.g., PNG)
3. Select output format (e.g., WEBP)
4. Click Convert
5. Download your converted file!

## Troubleshooting

### Frontend works but conversions fail

**Check Railway:**
1. Go to Railway dashboard
2. Click your project
3. View **Logs** tab
4. Look for errors

**Common issues:**
- Environment variables not set
- Wrong Supabase credentials
- Incorrect Railway URL in `.env`

### "Failed to fetch" error

**Solution:**
- Make sure Railway URL is correct in `.env`
- Restart frontend after changing `.env`
- Check Railway deployment status

### Conversion gets stuck

**Solution:**
1. Check Railway logs for errors
2. Verify Supabase connection
3. Test health endpoint: `https://your-url.railway.app/health`

## Next Steps

### Deploy Frontend (Optional)

Deploy your frontend to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard.

### Add Custom Domain (Optional)

In Railway dashboard:
1. Go to Settings
2. Click "Generate Domain"
3. Or add your own custom domain

## Cost

**Development:** FREE
- Frontend: Free locally
- Railway: $5 credit on signup

**Production:**
- Railway: ~$5-7/month
- Vercel: FREE for hobby projects

## Support

Need help?
- Check [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md) for detailed guide
- Visit [Railway Docs](https://docs.railway.app/)
- Join [Railway Discord](https://discord.gg/railway)

## Success Checklist

- [ ] Frontend running locally
- [ ] Railway account created
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Environment variables added to Railway
- [ ] Railway URL copied
- [ ] `.env` updated with Railway URL
- [ ] Test conversion working
- [ ] (Optional) Frontend deployed to Vercel

You're done! Your file converter is live.
