# REPOSITORY STRUCTURE GUIDE

## Your Question: Same Repository or Separate?

### 🎯 RECOMMENDATION: **SAME REPOSITORY (What you have now)**

---

## Why SAME Repository?

| Aspect | Same Repo | Separate Repos |
|--------|-----------|----------------|
| **Complexity** | Simple ✅ | Complex ❌ |
| **Initial Setup** | 2 deployments | 2 GitHub repos + 2 deployments |
| **Code Changes** | 1 `git push` | 2 `git push` commands |
| **Issue Tracking** | Unified | Split across repos |
| **Version Control** | Easier to correlate | Hard to match versions |
| **Refactoring** | Atomic commits | Requires coordination |
| **Good for** | Startups, teams | Large organizations |

---

## Current Structure (KEEP THIS)

```
GitHub: maps-lead-generator/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── scraper.js
│   ├── db.js
│   └── models/
│
├── frontend/
│   ├── package.json
│   ├── src/
│   ├── vite.config.js
│   └── index.html
│
├── .env.example
├── .gitignore (has both)
├── README.md
└── DEPLOYMENT_QUICK_START.md
```

### Deployment Map
```
GitHub (ONE repo)
  │
  ├─→ Vercel (builds /frontend)
  │   URL: https://xxx.vercel.app
  │
  └─→ Railway (builds /backend)
      URL: https://xxx.railway.app
```

---

## Step-by-Step to Deploy Same Repository

### Step 1: Push to GitHub

```bash
cd maps-lead-generator
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Deploy Backend (Railway)

1. Go to [railway.app](https://railway.app)
2. New Project → GitHub → Select `maps-lead-generator`
3. Click "Deploy"
4. It automatically detects `/backend/package.json`
5. Configure Root Directory: `backend`
6. Add environment variables
7. Get Railway URL: `https://xxx.railway.app`

### Step 3: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. New Project → GitHub → Select `maps-lead-generator`
3. Configure Root Directory: `frontend`
4. Add `VITE_API_URL` → Your Railway URL
5. Get Vercel URL: `https://xxx.vercel.app`

### Step 4: Update Backend with Frontend URL

1. Railway Dashboard → Variables
2. Update `FRONTEND_URL` → Your Vercel URL
3. Auto-redeploys

---

## If You Want Separate Repos Later

You can split anytime:

```bash
# Create backend repo
mkdir maps-lead-generator-backend
cd maps-lead-generator-backend
git init
cp -r ../maps-lead-generator/backend/* .
git add .
git commit -m "Initial"
git remote add origin https://github.com/YOU/maps-lead-generator-backend.git
git push -u origin main

# Create frontend repo
mkdir maps-lead-generator-frontend
cd maps-lead-generator-frontend
git init
cp -r ../maps-lead-generator/frontend/* .
git add .
git commit -m "Initial"
git remote add origin https://github.com/YOU/maps-lead-generator-frontend.git
git push -u origin main
```

But **NOT NOW** - start with same repo!

---

## What Happens With Same Repository

### When You Push Code Changes

```bash
git push origin main
```

**Vercel**:
- Detects push to main
- Builds `/frontend` folder
- Deploys updated frontend

**Railway**:
- Detects push to main
- Builds `/backend` folder
- Deploys updated backend

**Both deploy in parallel** ✅

### What You DON'T Commit to Git

```
/backend/.env (in .gitignore ✓)
/frontend/.env (in .gitignore ✓)
node_modules/ (in .gitignore ✓)
dist/ (in .gitignore ✓)
```

### What Vercel Sees

Vercel Dashboard:
- Project: `maps-lead-generator`
- Root Directory: `frontend`
- It ONLY looks at `/frontend` folder
- Ignores `/backend` completely

### What Railway Sees

Railway Dashboard:
- Project: `maps-lead-generator`
- Root Directory: `backend`
- It ONLY looks at `/backend` folder
- Ignores `/frontend` completely

---

## Common Concerns Answered

### Q: Will Vercel try to build the backend?

**A: No.** You tell Vercel `Root Directory: frontend`. It only looks there.

### Q: Will Railway deploy frontend?

**A: No.** You tell Railway `Root Directory: backend`. It only looks there.

### Q: What if I change only frontend code?

**A: Both will redeploy** (because entire repo changed). But that's fine - takes 30 seconds per service.

### Q: Can I have different `.env` files?

**A: Yes.** Each service has its own dashboard:
- Vercel dashboard → Environment Variables (for frontend)
- Railway dashboard → Variables (for backend)
- Never commit `.env` files to Git

### Q: What if one fails to deploy?

**A: They're independent.** If frontend fails, backend keeps running. Fix and push again.

---

## Perfect Setup Checklist

### Before Pushing to GitHub

- [ ] `backend/.env` exists locally (NOT in git)
- [ ] `frontend/.env` exists locally (NOT in git)
- [ ] `backend/package.json` has all dependencies
- [ ] `frontend/package.json` has all dependencies
- [ ] Local test works: `npm start` (backend) and `npm run dev` (frontend)
- [ ] `.gitignore` has `.env` files
- [ ] `README.md` explains how to run locally
- [ ] Commit everything except `.env` files

### Deploy Backend First

1. Railway Dashboard → Variables (set all backend env vars)
2. Deploy backend
3. Get Railway URL

### Then Deploy Frontend

1. Vercel Dashboard → Environment Variables
2. Set `VITE_API_URL=https://your-railway-url`
3. Deploy frontend
4. Get Vercel URL

### Then Update Backend

1. Railway Dashboard → Variables
2. Set `FRONTEND_URL=https://your-vercel-url`
3. Auto-redeploys

---

## File Reference

Create these files if missing:

**`.env.example`** (in root, commit to git):
```
# Backend
MONGODB_PASSWORD=your_password
MONGODB_DB=maps_leads
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Frontend  
VITE_API_URL=http://localhost:5000
```

**`backend/.env`** (NOT in git, only locally/production dashboard):
```
MONGODB_PASSWORD=your_password
MONGODB_DB=maps_leads
PORT=5000
FRONTEND_URL=https://your-vercel-url
NODE_ENV=production
```

**`frontend/.env`** (NOT in git, only locally/production dashboard):
```
VITE_API_URL=https://your-railway-url
```

---

## Summary

**For you right now:**

1. ✅ Keep ONE GitHub repository (you have this)
2. ✅ Deploy `/backend` to Railway
3. ✅ Deploy `/frontend` to Vercel
4. ✅ Connect them via environment variables
5. ✅ Never commit `.env` files
6. ✅ Push code once, both deploy automatically

**That's it!** Much simpler than separate repos.

---

## When to Split Repos (Later, if needed)

- Multiple teams working independently
- Different deployment cycles
- Want separate issue trackers
- Separate CI/CD pipelines
- Public frontend / Private backend

**But for now:** Same repo = simpler = recommended ✅
