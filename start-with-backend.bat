@echo off
REM MongoDB + Backend Quick Start Script for Windows
REM Run this to start the complete LMS with MongoDB backend

echo 🚀 Starting LMS with MongoDB Backend...
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Start backend server in background
echo 🔧 Starting backend server (port 5001)...
start /B cmd /c "cd backend && node server.js"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Test backend connection
echo 🧪 Testing backend connection...
curl -s http://localhost:5001/api/health
if %errorlevel% equ 0 (
    echo.
    echo ✅ Backend running successfully!
) else (
    echo ❌ Backend failed to start
    exit /b 1
)

echo.
echo 📝 Test credentials:
echo    Student: student@lms.com / password123
echo    Teacher: sarah@lms.com / password123
echo.

REM Start frontend
echo 🎨 Starting frontend server...
echo    Frontend will use BACKEND at http://localhost:5001/api
echo.
npm run dev
