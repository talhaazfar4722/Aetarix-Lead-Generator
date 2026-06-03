# QUICK DEPLOYMENT CHECKLIST - 15 Minutes

## ⏱️ Quick Start (Same Repository)

### ✅ Step 1: Push to GitHub (2 min)
```bash
cd maps-lead-generator
git add .
git commit -m "Production ready"
git push origin main
```

### ✅ Step 2: Setup MongoDB Atlas (3 min)
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free M0 cluster
3. Add database user: `talhaazfar` with strong password
4. Add IP whitelist: `0.0.0.0/0`
5. Copy connection string

### ✅ Step 3: Deploy Backend to Railway (5 min)
1. Go to [railway.app](https://railway.app) → Sign up
2. New Project → Deploy from GitHub → Select your repo
3. Configure Root Directory: `backend`
4. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://talhaazfar:PASSWORD@...
   MONGODB_DB=maps_leads
   PORT=5000
   FRONTEND_URL=https://your-frontend.vercel.app (after step 4)
   NODE_ENV=production
   ```
5. Click Deploy
6. **Copy your Railway URL** (looks like `https://xxx.railway.app`)

### ✅ Step 4: Deploy Frontend to Vercel (3 min)
1. Go to [vercel.com](https://vercel.com) → Sign up
2. New Project → Import your GitHub repo
3. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output: `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-railway-url
   ```
5. Click Deploy
6. **Copy your Vercel URL** (looks like `https://xxx.vercel.app`)

### ✅ Step 5: Update Backend with Frontend URL (1 min)
1. Go to Railway Dashboard
2. Update `FRONTEND_URL` variable with your Vercel URL
3. Railway auto-redeploys

### ✅ Step 6: Test (1 min)
Visit your Vercel URL:
- Click "Generate Leads"
- Submit form
- Check browser console (F12) - should see live data

---

## 📋 Repository Structure Question

**Q: Same repo or separate?**

**A: SAME REPO (monorepo)** ✅

Why:
- Easier to manage
- Single git history
- Less confusing for beginners
- Can separate later if needed

Structure:
```
maps-lead-generator/ (ONE repo on GitHub)
├── backend/ (deploys to Railway)
├── frontend/ (deploys to Vercel)
└── README.md
```

---

## 🔑 Key Points for Vercel Deployment

### What is Vercel?
- Frontend hosting platform (perfect for React/Vite)
- Free tier: sufficient
- Automatic deploys on `git push`
- CDN included

### Why NOT Backend on Vercel?
- Vercel functions have 10-second timeout limit
- Your scraper runs long (15-30 seconds)
- Vercel doesn't support WebSocket
- Use Railway/Heroku/Render for backend instead

### Environment Variables
- Frontend: `VITE_` prefix (exposed to browser)
- Backend: Any name (server-side only)

---

## 🚀 What Happens After Push

| Action | Trigger | What Happens |
|--------|---------|--------------|
| `git push` to `main` | GitHub | Auto-deploys frontend to Vercel |
| | GitHub | Auto-deploys backend to Railway |
| Change .env | You manage | Must manually update in Vercel/Railway dashboard |
| New feature code | `git push` | Auto-deployed to both |

---

## 💰 Free Tier Limits

| Service | Free Limit | Cost | Notes |
|---------|-----------|------|-------|
| Vercel | Unlimited | $0 | Pay for overages |
| Railway | $5/month | $0 setup | 500 free credit hours |
| MongoDB | 512MB | $0 | Enough for starting |

**Total First Year**: ~$50-100 (if you exceed Railway free tier)

---

## ⚠️ Important Notes

1. **Keep .env files SECRET**
   - They're in .gitignore
   - Store passwords in Vercel/Railway dashboards only
   - Never commit .env to GitHub

2. **Update FRONTEND_URL after deploying**
   - Deploy backend first to get URL
   - Update FRONTEND_URL in backend env vars
   - Then deploy frontend with backend URL

3. **Test locally first**
   ```bash
   cd backend && npm start
   cd frontend && npm run dev
   # Visit http://localhost:5173
   ```

4. **MongoDB IP Whitelist**
   - Must add `0.0.0.0/0` to allow Railway/Vercel IPs
   - Or add specific IP ranges

---

## 🎯 One Repository Approach (Recommended)

```
GitHub Repository: maps-lead-generator
│
├── Deploy to Vercel
│   └── Uses: /frontend folder
│       URL: https://xxx.vercel.app
│
├── Deploy to Railway
│   └── Uses: /backend folder
│       URL: https://xxx.railway.app
│
└── Both read from: .gitignore (no .env committed)
    Both have dashboard env vars
```

**Advantages**:
- Keep related code together
- Single issue tracker
- Easier to refactor
- Can split repos later if needed

**Disadvantages**:
- Different deploy processes for each service
- Slightly more complex setup

---

## 📞 Troubleshooting Checklist

- [ ] Frontend loads but no data → Check VITE_API_URL in Vercel
- [ ] CORS error → Check FRONTEND_URL in Railway
- [ ] Socket.io fails → Check backend is running at correct URL
- [ ] MongoDB error → Check connection string and IP whitelist
- [ ] Form won't submit → Check rate limit (5 per minute) or backend offline
- [ ] Build fails → Check logs in Vercel/Railway dashboard

---

## 📚 Reference Files

- `README.md` - How to use the app
- `DEPLOYMENT.md` - Detailed deployment guide
- `VERCEL_DEPLOYMENT.md` - Step-by-step Vercel + Railway
- `.env.example` - Template for environment variables
- `.gitignore` - Ensures secrets aren't committed

---

**Ready to deploy?** Start with Step 1 above!
