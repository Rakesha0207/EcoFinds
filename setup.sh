#!/bin/bash

echo "🌱 EcoFinds Setup Script"
echo "========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16+) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Setup backend
echo ""
echo "📦 Setting up backend..."
cd mobile/backend
if [ ! -f ".env" ]; then
    cp env.sample .env
    echo "✅ Created .env file from env.sample"
    echo "⚠️  Please update .env with your configuration"
else
    echo "✅ .env file already exists"
fi

npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Setup frontend  
echo ""
echo "📱 Setting up frontend..."
cd ../frontend

npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Check Firebase config
if [ ! -f "config/firebase.js" ]; then
    cp config/firebase.js.example config/firebase.js
    echo "✅ Created firebase.js from example"
    echo "⚠️  Please update config/firebase.js with your Firebase credentials"
else
    echo "✅ Firebase config file exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update mobile/backend/.env with your configuration"
echo "2. Update mobile/frontend/config/firebase.js with your Firebase credentials"
echo "3. Run 'npm run dev' in mobile/backend directory"
echo "4. Run 'npm start' in mobile/frontend directory"
echo ""
echo "For more details, see README.md"