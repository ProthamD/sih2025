# Quick Test Guide

## Testing the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system. If it's not running as a service:
```bash
mongod
```

### 2. Start the Backend
```bash
cd backend
npm start
```
Backend will run on: http://localhost:5000

### 3. Start the Frontend (in a new terminal)
```bash
npm run dev
```
Frontend will run on: http://localhost:5173

### 4. Test the Flow

#### As a User:
1. Go to http://localhost:5173
2. Click "Continue as User"
3. Sign up with:
   - Name: Test User
   - Email: user@test.com
   - Phone: 1234567890
   - Password: password123
4. You'll be logged in automatically
5. Click "Request" in the navbar
6. Fill out the waste report form:
   - Your information (pre-filled from signup)
   - Select waste type
   - Upload at least one image
   - Click "Share My Location"
   - Submit the form
7. You should see a success message

#### As an Admin:
1. Open a new incognito/private window
2. Go to http://localhost:5173
3. Click "Continue as Admin"
4. Sign up with:
   - Name: Admin User
   - Email: admin@test.com
   - Phone: 0987654321
   - Password: admin123
5. You'll be logged in to the admin dashboard
6. You should see the report submitted by the user
7. Click "Approve & Assign"
8. Enter:
   - Truck Number: TRK-001
   - Driver Name: John Driver
   - Notes: Handle with care
9. Click "Assign"
10. The report status should update to "assigned"

### 5. Verify in MongoDB

You can verify the data in MongoDB:
```bash
mongosh
use waste-management
db.users.find()
db.admins.find()
db.reports.find()
```

## API Testing with cURL

### User Signup
```bash
curl -X POST http://localhost:5000/api/auth/user/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"user@test.com\",\"phone\":\"1234567890\",\"password\":\"password123\"}"
```

### User Login
```bash
curl -X POST http://localhost:5000/api/auth/user/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@test.com\",\"password\":\"password123\"}"
```

### Get All Reports (Admin)
```bash
curl -X GET http://localhost:5000/api/reports/admin/all \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check if the connection string in `.env` is correct: `mongodb://localhost:27017/waste-management`

### CORS Error
- The backend has CORS enabled for all origins
- Make sure the backend is running on port 5000

### Authentication Error
- Make sure you're logged in (token is stored in localStorage)
- Check browser console for error messages
- Try logging out and logging in again

### Image Upload Error
- Make sure the `backend/uploads` folder exists
- Check file size (max 5MB per image)
- Check file type (only jpeg, jpg, png, gif)

## Key Features to Test

- ✅ User signup and login
- ✅ Admin signup and login
- ✅ Submit waste report with images and location
- ✅ Admin view all reports
- ✅ Admin assign truck and driver
- ✅ Update report status
- ✅ Track button works on all pages
- ✅ Logout functionality
