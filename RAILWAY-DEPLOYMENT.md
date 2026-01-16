# Railway Deployment Guide

## Why Railway?

Railway is **10x easier** than Hetzner:
- No SSH or terminal commands
- No server management
- Auto-deploys from GitHub
- Built-in monitoring and logs
- Scales automatically

## Complete Setup Guide

### Part 1: Prepare Your Code

Your conversion server is already configured for Railway!

### Part 2: Deploy to Railway

#### Option A: Deploy via GitHub (Recommended)

1. **Create GitHub Repository**
   ```bash
   # If you haven't already
   git init
   git add .
   git commit -m "Initial commit"
   ```

   Then create a repo on GitHub and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Connect to Railway**
   - Go to [railway.app](https://railway.app/)
   - Click "Login with GitHub"
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Root Directory**
   - Railway will scan your repo
   - Set root directory to `/conversion-server`
   - Railway will auto-detect it's a Node.js app

4. **Add Environment Variables**
   In Railway dashboard → Variables tab:
   ```
   SUPABASE_URL=https://fqooopikzuyifhvscpme.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   PORT=3001
   ```

   You can find your Supabase service role key at:
   `https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api`

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your public URL (looks like: `https://conversion-server-production-xxxx.up.railway.app`)

#### Option B: Deploy via CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy from conversion-server directory
cd conversion-server
railway init
railway up
```

### Part 3: Update Your Frontend

1. **Copy your Railway URL** from the dashboard

2. **Update `.env` file:**
   ```bash
   # Replace the old Hetzner URL
   VITE_API_URL=https://your-app.railway.app
   ```

3. **Update any code that references the API:**
   ```typescript
   // Use the Railway URL
   const API_URL = import.meta.env.VITE_API_URL || 'https://your-app.railway.app';
   ```

4. **Test it:**
   ```bash
   npm run dev
   ```

### Part 4: Verify Deployment

1. **Check Health Endpoint:**
   ```bash
   curl https://your-app.railway.app/health
   ```

   Should return:
   ```json
   {"status":"ok","timestamp":"2024-01-01T00:00:00.000Z"}
   ```

2. **Monitor Logs:**
   - Go to Railway dashboard
   - Click on your project
   - View real-time logs

3. **Test File Conversion:**
   - Use your web app
   - Upload a file
   - Check Railway logs for conversion activity

## Railway Dashboard Features

### Monitoring
- Real-time logs
- CPU and memory usage
- Request metrics

### Auto-Deploy
- Push to GitHub → automatic deploy
- No manual steps needed

### Environment Variables
- Easy to add/update
- No server restart needed

### Custom Domain (Optional)
- Add your own domain
- Free SSL certificate included

## Pricing

Railway uses a usage-based model:

- **Hobby Plan:** $5/month
  - 500 execution hours
  - $0.000231/GB egress
  - Perfect for most apps

- **Pro Plan:** $20/month
  - More resources
  - Priority support

**Estimated cost for this app:** ~$5-7/month

## Troubleshooting

### Problem: Deploy fails

**Solution:**
1. Check Railway logs (Dashboard → Logs)
2. Verify environment variables are set
3. Ensure `nixpacks.toml` is in the conversion-server folder

### Problem: Conversions fail

**Solution:**
1. Check Railway logs for errors
2. Verify Supabase credentials
3. Test health endpoint first

### Problem: Can't access the server

**Solution:**
1. Check if deployment succeeded (Railway dashboard)
2. Verify the URL is correct
3. Check CORS settings (already configured)

### Problem: Need more resources

**Solution:**
1. Upgrade to Pro plan in Railway dashboard
2. Increase memory/CPU in settings

## Comparison: Railway vs Hetzner

| Feature | Railway | Hetzner |
|---------|---------|---------|
| Setup Time | 5 minutes | 30+ minutes |
| Technical Skills | None needed | SSH, Linux, Docker |
| Deployment | Auto from GitHub | Manual uploads |
| Monitoring | Built-in dashboard | Setup required |
| SSL/HTTPS | Automatic | Manual setup |
| Scaling | Automatic | Manual |
| Cost | $5-7/month | $4/month |

**Verdict:** Railway is worth the extra $1-3/month for the massive simplification!

## Next Steps

1. Deploy to Railway (takes 5 minutes)
2. Update your frontend `.env` with the Railway URL
3. Test your app
4. Enjoy never having to SSH into a server again!

## Support

- [Railway Docs](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)
- [Railway Status](https://railway.app/legal/fair-use)

## Migration from Hetzner

If you were using Hetzner:

1. Deploy to Railway (following steps above)
2. Update frontend to use Railway URL
3. Test everything works
4. Cancel Hetzner server
5. Save your SSH headaches!
