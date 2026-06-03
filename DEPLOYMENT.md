# Deployment Guide

## Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## Environment Setup

### Backend (.env)
Create a `.env` file in the backend directory with:
```
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/maps-lead-generator
NODE_ENV=development
MONGODB_PASSWORD=your_password
MONGODB_DB=maps_leads
```

### Frontend (.env)
Create a `.env` file in the frontend directory with:
```
VITE_API_URL=http://localhost:5000
```

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

### 1. Update Environment Variables

Backend `.env`:
```
PORT=5000
FRONTEND_URL=https://yourdomain.com
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/maps_leads
NODE_ENV=production
```

Frontend `.env.production`:
```
VITE_API_URL=https://api.yourdomain.com
```

### 2. Backend Deployment (Heroku/Railway/Render)
```bash
cd backend
npm install
npm start
```

### 3. Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm install
npm run build
# Deploy the dist/ folder
```

### 4. Set CORS
Update FRONTEND_URL in backend .env to match your production domain.

## Important Notes
- ✅ Keep `.env` files in `.gitignore` (already configured)
- ✅ Use `.env.example` as a template for required variables
- ✅ MongoDB Atlas requires IP whitelist configuration
- ✅ Socket.io CORS must match frontend URL exactly
- ✅ Frontend env vars must start with `VITE_` for Vite to expose them

## Verifying Deployment
1. Check backend health: `https://api.yourdomain.com/api/leads`
2. Verify Socket.io connection in browser console
3. Test lead extraction workflow
