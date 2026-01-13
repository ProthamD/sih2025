# Quick Start Guide

## Prerequisites
- ✅ Node.js installed
- ✅ MongoDB installed and running

## Installation & Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies (if needed)
```bash
cd ..
npm install
```

### 3. Start MongoDB
MongoDB should be running on `localhost:27017`

### 4. Start the Application

**Option A - Quick Start (Windows):**
- Double-click `start-app.bat`

**Option B - Manual:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
npm run dev
```

## Access URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Test Accounts

### Create User Account:
1. Go to http://localhost:5173
2. Click "Continue as User"
3. Click "Sign Up"
4. Fill: name, email, phone, password
5. Start using!

### Create Admin Account:
1. Go to http://localhost:5173 (new incognito window)
2. Click "Continue as Admin"
3. Click "Sign Up"
4. Fill: name, email, phone, password
5. View and manage reports!

## Features Implemented

### User Side:
- ✅ Sign up / Sign in
- ✅ Submit waste reports
- ✅ Upload multiple images (max 5)
- ✅ Share location (GPS coordinates)
- ✅ Select waste type and urgency
- ✅ Track button works on all pages

### Admin Side:
- ✅ Sign up / Sign in (separate from users)
- ✅ View all submitted reports
- ✅ Filter by status (pending, in progress, completed)
- ✅ Assign truck and driver to reports
- ✅ Update report status
- ✅ Reject reports
- ✅ View report details

### Backend:
- ✅ RESTful API
- ✅ JWT authentication
- ✅ MongoDB database
- ✅ User, Admin, Report models
- ✅ Image upload support
- ✅ Secure password hashing

## Fixed Issues:
1. ✅ Removed "Switch to Admin" button from Navbar
2. ✅ Added auth flow to RoleSelection page
3. ✅ Fixed Track button to work on all pages (not just homepage)
4. ✅ Connected RequestSection to backend API
5. ✅ Admin dashboard fetches from database
6. ✅ Separate User and Admin models

## Tech Stack

**Frontend:**
- React + Vite
- React Router
- TailwindCSS
- React Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth
- Multer for uploads
- Bcryptjs for passwords

## Common Issues & Solutions

**MongoDB not running:**
```bash
# Start MongoDB service
mongod
```

**Port already in use:**
- Frontend (5173): Change in vite.config.js
- Backend (5000): Change PORT in backend/.env

**CORS errors:**
- Backend has CORS enabled
- Make sure backend is running

**Authentication errors:**
- Clear localStorage
- Sign up again
- Check browser console

## File Locations

- Backend: `./backend/`
- Frontend: `./src/`
- Models: `./backend/models/`
- Routes: `./backend/routes/`
- Uploads: `./backend/uploads/`

## Documentation

- Full implementation: `IMPLEMENTATION.md`
- Setup guide: `SETUP.md`
- Testing guide: `TESTING.md`
- Backend docs: `backend/README.md`

## Support

For issues or questions, check:
1. Browser console for frontend errors
2. Backend terminal for API errors
3. MongoDB logs for database errors

## What's Next?

The basic system is complete! You can now:
1. Test the full user flow
2. Test the admin flow
3. Deploy to production
4. Add more features (notifications, analytics, etc.)

---

**Happy Testing! 🎉**
