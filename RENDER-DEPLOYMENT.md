# Render Deployment Guide - Separate Services

## Architecture
This deployment uses TWO separate Render services:
1. **Backend** - Web Service (Node.js API)
2. **Frontend** - Static Site (React app)

---

## Part 1: Deploy Backend API

### Step 1: Create Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `ProthamD/sih2025`
4. Configure:
   - **Name**: `waste-management-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 2: Backend Environment Variables

Add these in the Environment section:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://2023itb081pratham_db_user:protham123@cluster0.z5r2ib5.mongodb.net/waste-management?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | (Generate a random 64-character string) |
| `PORT` | `10000` |
| `FRONTEND_URL` | (Leave empty for now, will add after frontend is deployed) |

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. **Copy the backend URL** (e.g., `https://waste-management-backend.onrender.com`)

---

## Part 2: Deploy Frontend Static Site

### Step 1: Create Frontend Static Site

1. Go back to Render Dashboard
2. Click **"New +"** → **"Static Site"**
3. Connect the SAME GitHub repository: `ProthamD/sih2025`
4. Configure:
   - **Name**: `waste-management-app`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: Leave empty (root of repo)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Step 2: Frontend Environment Variable

Add this in the Environment section:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://waste-management-backend.onrender.com` (your backend URL from Step 3) |

### Step 3: Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment (2-3 minutes)
3. **Copy the frontend URL** (e.g., `https://waste-management-app.onrender.com`)

---

## Part 3: Update Backend CORS

### Step 1: Update Backend Environment

1. Go to your **Backend Web Service** on Render
2. Go to **Environment** tab
3. Add/Update:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | `https://waste-management-app.onrender.com` (your frontend URL) |

### Step 2: Trigger Redeploy

1. Go to **Manual Deploy** → **Deploy latest commit**
2. Wait for redeploy to complete

---

## Testing Your Deployment

### 1. Test Backend API
Open: `https://waste-management-backend.onrender.com`

Should see: `{"message":"Waste Management API is running"}`

### 2. Test Frontend
Open: `https://waste-management-app.onrender.com`

Should see: WasteWise landing page

### 3. Test Full Flow

1. **Sign up as User**
   - Click User Portal
   - Create account
   - Should redirect to home page

2. **Submit Report**
   - Fill out report form
   - Upload images
   - Submit
   - Check "My Reports" page

3. **Sign up as Admin**
   - Logout
   - Click Admin Portal
   - Create admin account
   - Should see admin dashboard

4. **Admin Actions**
   - View all reports
   - Assign truck/driver
   - Update status to completed

5. **User Verification**
   - Login back as user
   - Go to My Reports
   - Verify completed report

---

## Important Notes

### Free Tier Limitations

**Backend (Web Service):**
- Spins down after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- 750 hours/month free

**Frontend (Static Site):**
- Always online (no spin down)
- Fast global CDN
- Completely free

### Upgrade Recommendations

For production use:
- **Backend Starter Plan ($7/month)**: No spin-down, better performance
- Keep frontend on free tier (works great)

### MongoDB Atlas

- Already configured with your connection string
- Free tier: 512MB storage
- Upgrade if needed: $9/month for 2GB

---

## Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure JWT_SECRET is set

**"CORS error"**
- Verify FRONTEND_URL matches your frontend domain
- Check backend logs for CORS errors
- Ensure backend has been redeployed after adding FRONTEND_URL

### Frontend Issues

**Blank page**
- Check browser console for errors
- Verify VITE_API_URL is set correctly
- Ensure it points to backend URL (not frontend URL)

**"Failed to fetch"**
- Backend might be spinning down (wait 30-60 seconds)
- Check backend URL is correct
- Verify backend is deployed successfully

**Images not loading**
- Images are stored as base64 in MongoDB
- Check backend logs for Sharp errors
- Verify image upload was successful

---

## Monitoring & Logs

### Backend Logs
1. Go to Backend Web Service
2. Click **"Logs"** tab
3. Watch for errors or requests

### Frontend Logs
1. Go to Static Site
2. Click **"Logs"** tab (build logs only)
3. For runtime errors, check browser console

---

## Updating Your App

### Push updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

**Render will automatically:**
- Detect the push
- Rebuild and redeploy both services
- Zero-downtime for frontend
- Brief downtime for backend (30-60 seconds)

---

## URLs Summary

After deployment, save these:

- **Frontend**: `https://waste-management-app.onrender.com`
- **Backend API**: `https://waste-management-backend.onrender.com`
- **MongoDB**: Already on Atlas cloud

---

## Custom Domain (Optional)

### For Frontend:
1. Go to Static Site → Settings
2. Add custom domain
3. Update DNS records
4. Free SSL included

### For Backend:
1. Go to Web Service → Settings
2. Add custom domain
3. Update DNS records
4. Update FRONTEND_URL in both services

---

## Cost Summary

**Current Setup (Free Tier):**
- Frontend: $0/month (always)
- Backend: $0/month (with spin-down)
- MongoDB Atlas: $0/month (512MB)
- **Total: FREE**

**Recommended Production:**
- Frontend: $0/month (free)
- Backend: $7/month (Starter - no spin-down)
- MongoDB Atlas: $0 or $9/month if needed
- **Total: $7-16/month**

---

Your app is now production-ready and accessible worldwide! 🚀
