# Backend Server Deployment Guide

## Overview
The Christian Reporter uses a backend server (like the crypto site) to handle RSS feed fetching and caching. This backend needs to be deployed separately from the frontend.

## Backend Deployment Options

### Option 1: Railway (Recommended)
1. Go to [Railway.app](https://railway.app/)
2. Connect your GitHub repository
3. Railway will auto-detect the Node.js backend
4. Set environment variables:
   ```
   PORT=3001
   NODE_ENV=production
   CORS_ORIGIN=https://thechristianreporter.vercel.app
   ```
5. Deploy and get your backend URL (e.g., `https://christian-reporter-backend.railway.app`)

### Option 2: Render
1. Go to [Render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `node server.cjs`
6. Set environment variables:
   ```
   PORT=3002
   NODE_ENV=production
   CORS_ORIGIN=https://thechristianreporter.vercel.app
   ```

## Frontend Configuration
After deploying the backend, update your frontend environment variables:

### For Vercel:
1. Go to your Vercel dashboard
2. Select the Christian Reporter project
3. Go to Settings → Environment Variables
4. Add: `VITE_API_BASE_URL=https://your-backend-url.com`
5. Redeploy

### For Local Development:
Create a `.env` file:
```
VITE_API_BASE_URL=http://localhost:3001
```

## Backend Features
- **RSS Feed Aggregation**: Fetches from 40+ Christian news sources
- **Smart Caching**: 5-minute cache with background refresh
- **Daily Bible Verse**: Consistent verse for the day
- **Prayer Requests**: Community prayer tracking
- **Ministry Updates**: Church and ministry news
- **Church Events**: Event calendar and management

## API Endpoints
- `GET /api/news` - Get cached news articles
- `GET /api/cache-status` - Check cache status
- `GET /api/daily-verse` - Get daily Bible verse
- `GET /api/prayer-requests` - Get prayer requests
- `GET /api/ministry-updates` - Get ministry updates
- `GET /api/church-events` - Get church events

## Health Check
- `GET /health` - Backend health status

## Troubleshooting
- If the backend fails, the frontend will fall back to sample data
- Check Railway/Render logs for any RSS feed errors
- Ensure CORS_ORIGIN is set correctly for your frontend domain 