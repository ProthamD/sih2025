# Waste Management App - Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally

## Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running:
```bash
# On Windows (if MongoDB is installed as a service, it should already be running)
# Otherwise start it manually:
mongod

# On Mac/Linux:
sudo systemctl start mongod
# or
brew services start mongodb-community
```

4. Start the backend server:
```bash
npm start
```

The backend will run on http://localhost:5000

## Frontend Setup

1. Open a new terminal and navigate to the project root:
```bash
cd ..
```

2. Install frontend dependencies (if not already installed):
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173 (or another port if 5173 is busy)

## Usage

1. Open your browser and go to the frontend URL (http://localhost:5173)
2. You'll see the role selection page - choose User or Admin
3. Sign up with your credentials (first time) or sign in (if you already have an account)
4. For Users: You can submit waste reports with images and location
5. For Admins: You can view all reports and assign trucks/drivers

## Features Implemented

### Backend:
- ✅ Express server with MongoDB connection
- ✅ User and Admin authentication (separate models)
- ✅ JWT-based authentication
- ✅ Report model with user reference
- ✅ Image upload support with multer
- ✅ API endpoints for:
  - User/Admin signup and login
  - Creating waste reports
  - Fetching reports (all for admin, user's own reports)
  - Updating report status and assignments
  - Deleting reports (admin only)

### Frontend:
- ✅ Authentication flow in RoleSelection component
- ✅ Removed "Switch to Admin" button from navbar
- ✅ Fixed Track button to work on all pages
- ✅ Connected RequestSection to backend API
- ✅ Form data submission with images and location
- ✅ Logout functionality

## Notes

- Make sure MongoDB is running before starting the backend
- The backend expects images to be uploaded to the `backend/uploads` folder
- All passwords are hashed using bcrypt
- JWT tokens are stored in localStorage
- Default MongoDB connection: `mongodb://localhost:27017/waste-management`
