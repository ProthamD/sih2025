# Waste Management Backend

This is the backend API for the Waste Management application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally on port 27017, or update the `.env` file with your MongoDB connection string.

3. Start the server:
```bash
npm start
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication

- **POST** `/api/auth/user/signup` - Register a new user
- **POST** `/api/auth/user/login` - User login
- **POST** `/api/auth/admin/signup` - Register a new admin
- **POST** `/api/auth/admin/login` - Admin login

### Reports

- **POST** `/api/reports` - Create a new waste report (User, requires auth)
- **GET** `/api/reports/admin/all` - Get all reports (Admin only)
- **GET** `/api/reports/user/my-reports` - Get user's own reports (User)
- **GET** `/api/reports/:id` - Get single report details
- **PUT** `/api/reports/:id/status` - Update report status & assign truck (Admin only)
- **DELETE** `/api/reports/:id` - Delete report (Admin only)

## Models

### User Model
- name
- email
- phone
- password (hashed)
- role: 'user'

### Admin Model
- name
- email
- phone
- password (hashed)
- role: 'admin'

### Report Model
- userId (ref to User)
- name
- email
- phone
- wasteType
- description
- urgency
- location (latitude, longitude, accuracy, timestamp)
- images (array of file paths)
- status ('pending', 'approved', 'assigned', 'completed', 'rejected')
- assignedTruck
- assignedDriver
- adminNotes

## Environment Variables

Create a `.env` file with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/waste-management
JWT_SECRET=your-secret-key-change-this-in-production
```
