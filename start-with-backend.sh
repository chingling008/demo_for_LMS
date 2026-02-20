#!/bin/bash

# MongoDB + Backend Quick Start Script
# Run this to start the complete LMS with MongoDB backend

echo "🚀 Starting LMS with MongoDB Backend..."
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Start backend server in background
echo "🔧 Starting backend server (port 5001)..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Test backend connection
echo "🧪 Testing backend connection..."
curl -s http://localhost:5001/api/health
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Backend running successfully!"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID
    exit 1
fi

echo ""
echo "📝 Test credentials:"
echo "   Student: student@lms.com / password123"
echo "   Teacher: sarah@lms.com / password123"
echo ""

# Start frontend
echo "🎨 Starting frontend server..."
echo "   Frontend will use BACKEND at http://localhost:5001/api"
echo ""
npm run dev

# Cleanup on exit
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID" EXIT
