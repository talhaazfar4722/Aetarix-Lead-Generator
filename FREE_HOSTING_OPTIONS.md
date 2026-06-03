# FREE BACKEND HOSTING OPTIONS

Since you want completely free hosting, here are your best options:

---

## 🆓 FREE TIER COMPARISON

| Service | Free Tier | Sleep? | Best For |
|---------|-----------|--------|----------|
| **Render** | Yes | After 15 min idle | Simple backends |
| **Fly.io** | Yes | No | Always-on apps |
| **Replit** | Yes | After inactivity | Small projects |
| **Heroku** | ❌ No (ended 2022) | - | Not recommended |
| **Railway** | $5/month | No | Paid option |

---

## 🥇 BEST FREE OPTION: **Fly.io**

### Why Fly.io?
✅ Truly free tier (3 shared-cpu-1x 256MB VMs)
✅ No auto-sleep
✅ Perfect for Node.js backends
✅ Global deployment
✅ WebSocket support (needed for Socket.io)

### Setup (5 min)

```bash
# 1. Install Fly CLI
npm install -g flyctl

# 2. Login
flyctl auth login

# 3. Create new app (run from /backend folder)
cd backend
flyctl launch

# When prompted:
# - App name: maps-lead-generator-api
# - Region: Choose nearest to you
# - Postgres? No
# - Deploy? No (we'll add env vars first)

# 4. Add environment variables
flyctl secrets set MONGODB_URI=mongodb+srv://talhaazfar:PASSWORD@...
flyctl secrets set MONGODB_DB=maps_leads
flyctl secrets set FRONTEND_URL=https://your-vercel-url
flyctl secrets set NODE_ENV=production
flyctl secrets set PORT=3000

# 5. Deploy
flyctl deploy
```

Your backend URL will be: `https://maps-lead-generator-api.fly.dev`

---

## 🟢 ALTERNATIVE: **Render**

### Why Render?
✅ Free tier available
✅ Easy GitHub integration
⚠️ App spins down after 15 min of inactivity
⚠️ Takes ~30 sec to wake up (not ideal for scraper)

### Setup (3 min)

1. Go to [render.com](https://render.com)
2. Sign up (GitHub)
3. New Web Service
4. Select your GitHub repo
5. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add Environment Variables (same as Fly.io)
7. Deploy

**Con**: Free tier sleeps after 15 min. Your scraper won't work when app is asleep.

---

## 📊 RECOMMENDATION FOR YOU

**Use: Fly.io** ✅

- Truly free
- No sleeping
- Perfect for Node.js + Playwright scraper
- WebSocket support for Socket.io

**Total Cost: $0** (even in production!)

---

## 🔄 DEPLOYMENT WITH FLY.IO + VERCEL

### Architecture
```
Vercel Frontend: https://xxx.vercel.app
    ↓
Fly.io Backend: https://xxx.fly.dev
    ↓
MongoDB Atlas: Cloud Database (free)

Total Cost: $0
```

### Updated Deployment Steps

**Step 1**: Push to GitHub (same as before)

**Step 2**: MongoDB Atlas (same as before)

**Step 3**: Deploy Backend to Fly.io

```bash
# Install Fly CLI
npm install -g flyctl

# From backend folder
cd backend
flyctl launch
# Choose app name: maps-lead-generator-api
# Don't deploy yet

# Add environment variables
flyctl secrets set MONGODB_URI=your-mongodb-uri
flyctl secrets set MONGODB_DB=maps_leads
flyctl secrets set FRONTEND_URL=https://your-vercel-url
flyctl secrets set NODE_ENV=production
flyctl secrets set PORT=3000

# Deploy
flyctl deploy

# Get URL from output (e.g., https://maps-lead-generator-api.fly.dev)
```

**Step 4**: Deploy Frontend to Vercel (same as before)
- Add `VITE_API_URL=https://maps-lead-generator-api.fly.dev`

**Step 5**: Update Fly.io with Frontend URL
```bash
flyctl secrets set FRONTEND_URL=https://your-vercel-url
flyctl deploy
```

---

## ⚙️ FLY.IO FEATURES

### File Created: `fly.toml`
When you run `flyctl launch`, it creates `fly.toml` with your config.
This should be committed to GitHub.

### Update Deployment (After Pushing Code)

```bash
cd backend
git add .
git commit -m "Your message"
git push origin main

# Manual deploy (can set up auto-deploy too)
flyctl deploy
```

### View Logs

```bash
flyctl logs
```

### View Status

```bash
flyctl status
```

---

## 🆚 WHY NOT RENDER'S FREE TIER?

Your app has a long-running Playwright scraper that takes 15-30 seconds.

**Problem**: 
- Render's free tier sleeps after 15 minutes
- When user starts scraping, app wakes up (30 sec delay)
- Scraper might time out on first run after sleep

**Solution**: 
- Use Fly.io (no sleeping)
- Or upgrade Render to paid tier

---

## IF YOU STILL WANT RAILWAY

If you prefer Railway despite cost:
- $5/month after free credit
- Better UI
- Still recommended for production

But **Fly.io is free and works better** for your use case.

---

## 🚀 SUMMARY

| What | Where | Cost |
|------|-------|------|
| Frontend | Vercel | Free |
| Backend | Fly.io | Free |
| Database | MongoDB Atlas | Free |
| **TOTAL** | - | **$0** |

---

## NEXT STEPS

1. Follow deployment guide with Fly.io instead of Railway
2. All other steps remain the same
3. Push to GitHub
4. Deploy!

**Ready?** Use the `DEPLOYMENT_QUICK_START.md` guide but replace Railway steps with Fly.io instructions above.
