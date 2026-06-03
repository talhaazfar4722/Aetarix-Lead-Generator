# 🚀 DEPLOYMENT GUIDE - START HERE

Welcome! This guide covers everything you need to deploy to Vercel (FREE).

---

## 📖 READ IN THIS ORDER

### 0️⃣ **FREE_HOSTING_OPTIONS.md** ← NEW!
Railway costs $5/month. Here are FREE alternatives.

**Your Best Option**: Fly.io (completely free, perfect for Node.js)

This file explains:
- Railway is NOT free ($5/month)
- Fly.io IS free (recommended ✅)
- Render IS free but apps sleep (not ideal)
- Comparison table & setup instructions

### 1️⃣ **REPOSITORY_STRUCTURE.md**
Answers your question: "Same or separate repositories?"

**Your Answer**: Same repository (monorepo) ✅

This file explains:
- Why keep them together
- How deployment works with same repo
- File structure
- When to split (later)

### 2️⃣ **DEPLOYMENT_QUICK_START.md**
15-minute quick checklist to get live

This file has:
- Step-by-step deployment (copy-paste)
- MongoDB Atlas setup
- ~~Railway deployment~~ → USE FLY.IO INSTEAD
- Vercel deployment
- Common issues & fixes

### 3️⃣ **VERCEL_DEPLOYMENT.md**
Detailed step-by-step guide with explanations

This file covers:
- Part-by-part deployment
- Environment variables reference
- Troubleshooting guide
- Post-deployment checklist
- Custom domain setup

### 4️⃣ **README.md**
How to use the application

### 5️⃣ **DEPLOYMENT.md**
General deployment information (older, reference only)

---

## ⏱️ QUICK ANSWER TO YOUR QUESTION

**Q: Same or separate repository for deployment?**

**A: SAME REPOSITORY** ✅

```
One GitHub Repo: maps-lead-generator/
├── /backend → Deploy to Fly.io (FREE)
├── /frontend → Deploy to Vercel (FREE)
└── Both in same git repository
```

**Why?** Simpler, cleaner, easier to manage, and completely FREE.

---

## 🎯 30-Minute Deployment Plan

1. **5 min**: Read FREE_HOSTING_OPTIONS.md (Railway costs money!)
2. **5 min**: Setup MongoDB Atlas
3. **10 min**: Deploy backend to Fly.io (FREE)
4. **5 min**: Deploy frontend to Vercel (FREE)
5. **5 min**: Connect them & test

---

## 📋 What You'll Get After Deployment

```
Frontend: https://xxx.vercel.app (FREE)
Backend: https://xxx.fly.dev (FREE)
Database: MongoDB Atlas (FREE)

Total Cost: $0 FOREVER
```

---

## ✅ Pre-Deployment Checklist

- [ ] Code committed to GitHub
- [ ] `.env` files in `.gitignore` (not committed)
- [ ] `backend/package.json` exists
- [ ] `frontend/package.json` exists
- [ ] Local test works (`npm start` + `npm run dev`)
- [ ] MongoDB Atlas account created

---

## 🚨 Important Notes

1. **KEEP ENV FILES SECRET**
   - Never push `.env` to GitHub
   - Use dashboard environment variables instead

2. **DEPLOY IN THIS ORDER**
   1. Backend first (Fly.io) → Get URL
   2. Frontend second (Vercel) → Update backend with frontend URL
   3. Update backend with frontend URL

3. **ONE `git push` DEPLOYS BOTH**
   - Push to main branch
   - Vercel automatically builds frontend
   - Fly.io automatically builds backend (if set up)

4. **Completely FREE**
   - Vercel: Free tier
   - Fly.io: Free tier (no limits!)
   - MongoDB: Free tier (512MB)

---

## 📞 If You Get Stuck

### Railway costs money?
→ Read `FREE_HOSTING_OPTIONS.md` - Use Fly.io instead!

### Not sure about repository structure?
→ Read `REPOSITORY_STRUCTURE.md`

### Want quick deployment steps?
→ Follow `DEPLOYMENT_QUICK_START.md` (but use Fly.io)

### Need detailed explanation?
→ See `VERCEL_DEPLOYMENT.md` (but use Fly.io)

### Connection/CORS errors?
→ Check "Troubleshooting" in Quick Start

---

## 🎓 What You'll Learn

After following these guides, you'll understand:
- ✅ How to deploy React to Vercel (FREE)
- ✅ How to deploy Node.js to Fly.io (FREE)
- ✅ How to use environment variables
- ✅ How to connect frontend & backend
- ✅ How to monitor logs & debug

---

## 🔄 After First Deployment

Any code changes:
```bash
git add .
git commit -m "Your message"
git push origin main
```

**Both frontend and backend automatically redeploy** ✅

---

## 🎯 Next Steps

1. **FIRST**: Open `FREE_HOSTING_OPTIONS.md`
2. **THEN**: Open `REPOSITORY_STRUCTURE.md`
3. **FOLLOW**: `DEPLOYMENT_QUICK_START.md` (using Fly.io)
4. **Deploy!**

**Good luck! You've got this.** 🚀

