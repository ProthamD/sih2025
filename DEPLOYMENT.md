# Render Deployment Guide

## Overview
This guide will help you deploy the Waste Management App to Render with merged frontend and backend.

## Prerequisites
- GitHub account with your repository pushed
- Render account (free tier works)
- MongoDB Atlas database (already configured)

## Step-by-Step Deployment

### 1. Push to GitHub
Make sure all changes are committed and pushed:
```bash
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `ProthamD/sih2025`
4. Select the repository

### 3. Configure Build Settings

**Basic Settings:**
- **Name**: `waste-management-app` (or your preferred name)
- **Region**: Choose closest to your users (e.g., Oregon, Singapore, Frankfurt)
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: 
  ```
  npm run install-all && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

### 4. Environment Variables

Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://2023itb081pratham_db_user:protham123@cluster0.z5r2ib5.mongodb.net/waste-management?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | Generate a strong random string (use: https://www.random.org/strings/) |
| `PORT` | `10000` (Render default) |

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install all dependencies (frontend + backend)
   - Build the React frontend
   - Start the Node.js backend
   - Serve frontend from backend

### 6. Access Your App

- Once deployed, your app will be available at: `https://waste-management-app.onrender.com`
- The URL will be shown in your Render dashboard

## How It Works

### Production Architecture:
```
User Request → Render Web Service
              ↓
              Express Server (backend)
              ↓
              ├─ /api/* → API Routes (MongoDB)
              └─ /* → React Frontend (static files)
```

### Build Process:
1. `npm run install-all` - Installs root + backend dependencies
2. `npm run build` - Builds React to `dist/` folder
3. Backend serves React from `dist/` folder
4. API routes available at `/api/*`

## Important Notes

### Free Tier Limitations:
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for one service 24/7)

### Upgrade for Production:
- **Starter Plan ($7/month)**: No spin-down, better performance
- Persistent storage for uploads (if needed)

### Database:
- MongoDB Atlas is already configured
- Keep your Atlas cluster running
- Consider upgrading Atlas for production use

## Troubleshooting

### Build Fails:
- Check build logs in Render dashboard
- Verify `package.json` scripts are correct
- Ensure all dependencies are in `package.json`

### App Shows Blank Page:
- Check browser console for errors
- Verify environment variables are set
- Check API endpoint paths (should use relative URLs)

### API Errors:
- Verify MongoDB connection string
- Check JWT_SECRET is set
- Review server logs in Render dashboard

### Images Not Loading:
- Images are stored as base64 in MongoDB
- No additional storage configuration needed
- Check Sharp library is installed

## Testing After Deployment

1. **Test User Flow:**
   - Sign up as user
   - Submit a waste report with images
   - Check My Reports page

2. **Test Admin Flow:**
   - Sign up as admin
   - View all reports
   - Assign truck and update status

3. **Test Authentication:**
   - Refresh page (should stay logged in)
   - Logout and login again
   - Try accessing protected routes

## Monitoring

- **Logs**: Available in Render dashboard under "Logs" tab
- **Metrics**: View CPU, memory usage in dashboard
- **Health Check**: Render automatically monitors service health

## Custom Domain (Optional)

1. Go to Settings → Custom Domain
2. Add your domain (e.g., wastewise.com)
3. Configure DNS records as shown
4. Free SSL certificate auto-generated

## Updates

To deploy updates:
```bash
git add .
git commit -m "Update description"
git push origin main
```

Render will automatically:
- Detect the push
- Rebuild and redeploy
- Zero-downtime deployment

## Support

- Render Documentation: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Issues: Check GitHub repository issues

---

Your app is now live and accessible worldwide! 🚀
