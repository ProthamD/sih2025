@echo off
echo Starting Waste Management Application...
echo.
echo Starting MongoDB (make sure it's installed)...
echo.

REM Start Backend
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3

REM Start Frontend
start "Frontend Dev Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
