# Maps Lead Generator

AI-powered B2B lead generation tool that extracts business information from Google Maps with real-time email enrichment.

## 🚀 Features

- Real-time lead extraction from Google Maps
- Email address enrichment & verification
- Multi-location search support
- WebSocket live data streaming
- MongoDB persistent storage
- Built with React + Node.js + Playwright

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

## 🛠️ Local Development Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd maps-lead-generator

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

**Backend** - Create `backend/.env`:
```env
MONGODB_PASSWORD=your_mongodb_password
MONGODB_DB=maps_leads
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Run Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`

---

## 🚢 Production Deployment

### **Frontend Deployment (Vercel)**

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import repository
4. Select the project root (maps-lead-generator)
5. Framework: **Vite**
6. Root Directory: `./frontend`
7. Build Command: `npm run build`
8. Output Directory: `dist`
9. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-api.com`
10. Click Deploy

### **Backend Deployment (Railway/Render)**

**Using Railway (Recommended):**

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "GitHub Repo"
4. Connect your repository
5. Select `backend` directory
6. Add Environment Variables:
   ```
   MONGODB_PASSWORD=<your password>
   MONGODB_DB=maps_leads
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   PORT=5000
   ```
7. Deploy

**Using Render (Alternative):**

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repo
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add same environment variables
6. Deploy

---

## 📝 Environment Variables Reference

### Backend (.env)
- `MONGODB_PASSWORD` - MongoDB Atlas password
- `MONGODB_DB` - Database name (maps_leads)
- `PORT` - Server port (5000)
- `FRONTEND_URL` - Your Vercel frontend URL
- `NODE_ENV` - production/development

### Frontend (.env)
- `VITE_API_URL` - Your backend API URL (e.g., https://your-backend.railway.app)

---

## 🐛 Troubleshooting

### CORS Error
- Ensure `FRONTEND_URL` in backend matches your Vercel domain exactly
- Restart backend after changing env vars

### Socket.io Connection Failed
- Check that backend API URL is correct in frontend
- Verify backend is running and accessible

### MongoDB Connection Error
- Verify `MONGODB_PASSWORD` is correct
- Add your IP to MongoDB Atlas IP whitelist
- Check `MONGODB_DB` name matches your database

---

## 📞 Support

For issues or questions, check the deployment guides in `DEPLOYMENT.md`

---

## 📄 License

ISC
