# VERCEL + RAILWAY DEPLOYMENT GUIDE

This guide covers deploying your Maps Lead Generator application with:
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Node.js + MongoDB)

---

## **PART 1: Prepare Repository for Deployment**

### Step 1a: Create GitHub Repository

```bash
cd maps-lead-generator
git init
git add .
git commit -m "Initial commit: Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/maps-lead-generator.git
git branch -M main
git push -u origin main
```

### Step 1b: Verify Project Structure

```
maps-lead-generator/
├── backend/
│   ├── .env (DO NOT commit - in .gitignore)
│   ├── package.json
│   ├── server.js
│   ├── scraper.js
│   ├── db.js
│   └── models/
│       └── Lead.js
├── frontend/
│   ├── .env (DO NOT commit - in .gitignore)
│   ├── package.json
│   ├── vite.config.js
│   └── src/
├── .gitignore
├── .env.example
├── README.md
└── DEPLOYMENT.md
```

---

## **PART 2: Create MongoDB Atlas Database**

### Step 2a: Setup MongoDB Atlas (Free)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster (free M0 tier)
4. Click "Database Access" → Add Database User
   - Username: `talhaazfar`
   - Password: Generate strong password (copy this!)
5. Click "Network Access" → Add IP Address
   - Add `0.0.0.0/0` (allows all IPs for Vercel/Railway)
6. Click "Clusters" → Connect
   - Copy connection string: `mongodb+srv://talhaazfar:PASSWORD@cluster0.xxxxx.mongodb.net/maps_leads?retryWrites=true&w=majority`

---

## **PART 3: Deploy Backend to Railway**

### Step 3a: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Sign up (connect GitHub)
3. Create "New Project" → "Deploy from GitHub repo"
4. Select your `maps-lead-generator` repository
5. Click "Configure" → Under "Settings":
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3b: Add Environment Variables

In Railway project settings, add these variables:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://talhaazfar:password@cluster0.xxxxx.mongodb.net/maps_leads?retryWrites=true&w=majority` |
| `MONGODB_PASSWORD` | MongoDB password | `Talha4722azfar` |
| `MONGODB_DB` | Database name | `maps_leads` |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Your Vercel frontend URL | `https://your-frontend.vercel.app` |
| `NODE_ENV` | Environment | `production` |

**WHERE TO FIND YOUR FRONTEND URL:** You'll get it after deploying to Vercel (Step 4)

### Step 3c: Deploy

- Railway automatically deploys on push to `main`
- Your backend URL will be something like: `https://maps-lead-generator-production.up.railway.app`

---

## **PART 4: Deploy Frontend to Vercel**

### Step 4a: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up (connect GitHub)
3. Click "Add New..." → "Project"
4. Select your `maps-lead-generator` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 4b: Add Environment Variables

In Vercel project settings, go to "Environment Variables":

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Railway backend URL |

Example: `https://maps-lead-generator-production.up.railway.app`

### Step 4c: Deploy

Click "Deploy" and wait for completion. You'll get a URL like:
```
https://maps-lead-generator.vercel.app
```

---

## **PART 5: Link Frontend & Backend**

### Step 5a: Update Backend Environment Variable

Now that you have your Vercel URL, update Railway:

1. Go to Railway project
2. Go to "Variables"
3. Update `FRONTEND_URL`:
   ```
   https://maps-lead-generator.vercel.app
   ```
4. Railway redeploys automatically

### Step 5b: Test Connection

1. Visit your Vercel app: `https://maps-lead-generator.vercel.app`
2. Open Browser Console (F12)
3. Try extracting a lead
4. Check console for any connection errors

---

## **PART 6: Post-Deployment Checklist**

- [ ] Frontend loads at Vercel URL without errors
- [ ] Browser console shows no CORS errors
- [ ] Can submit the lead extraction form
- [ ] Leads appear in real-time (check Socket.io connection)
- [ ] Email enrichment works
- [ ] Details column shows keyword, location, city
- [ ] MongoDB has leads in database

### Test Commands:

```bash
# Check backend is running
curl https://your-backend-url.railway.app/api/leads

# Check frontend loads
curl https://your-frontend.vercel.app
```

---

## **PART 7: Common Issues & Fixes**

### ❌ CORS Error in Console

**Problem**: `Access to XMLHttpRequest from origin blocked by CORS policy`

**Solution**:
1. Verify `FRONTEND_URL` in Railway exactly matches your Vercel URL
2. Restart Railway deployment
3. Clear browser cache (Ctrl+Shift+Del)
4. Try in new incognito window

### ❌ Socket.io Connection Failed

**Problem**: `WebSocket connection to ... failed`

**Solution**:
1. Check that `VITE_API_URL` in Vercel matches your Railway backend URL
2. Redeploy Vercel
3. Check backend is running: `curl your-backend-url/api/leads`

### ❌ MongoDB Connection Error

**Problem**: `MongoDB connection failed`

**Solution**:
1. Verify `MONGODB_PASSWORD` is correct
2. Check IP whitelist in MongoDB Atlas (should be `0.0.0.0/0`)
3. Verify connection string format is correct
4. Check MongoDB Atlas cluster is running

### ❌ Deployment Fails

**Problem**: Build fails on Vercel or Railway

**Solution**:
1. Check build logs in Vercel/Railway dashboard
2. Ensure `package.json` exists in correct directory
3. Verify `npm install` succeeds locally first
4. Check for syntax errors in code

---

## **PART 8: Monitoring & Logs**

### Vercel Logs
- Vercel Dashboard → Project → Deployments → Logs

### Railway Logs
- Railway Dashboard → Project → Deployments → Logs
- Real-time logs show console.log output

### Monitor Issues
- Check logs when users report errors
- Look for rate limit messages (max 5 scrapes/minute)
- Monitor MongoDB connection errors

---

## **PART 9: Custom Domain (Optional)**

### Vercel Custom Domain
1. Vercel Dashboard → Project Settings → Domains
2. Add your domain
3. Follow DNS configuration steps

### Backend Custom Domain
1. Railway Dashboard → Project Settings → Domains
2. Add your domain with Railway's CNAME record

---

## **FINAL DEPLOYMENT SUMMARY**

| Component | Hosting | URL |
|-----------|---------|-----|
| Frontend (React) | Vercel | `https://your-frontend.vercel.app` |
| Backend (Node.js) | Railway | `https://your-backend.railway.app` |
| Database (MongoDB) | MongoDB Atlas | Cloud hosted |

**Total Cost**: FREE
- Vercel: Free tier (enough for most users)
- Railway: Free tier ($5/month after credits)
- MongoDB: Free tier (512MB storage)

---

## **Next Steps After Deployment**

1. Monitor application for errors
2. Add custom domain if needed
3. Set up automated backups for MongoDB
4. Consider adding error tracking (Sentry)
5. Plan scaling when you need more resources

**Questions?** Check browser console for specific error messages!
