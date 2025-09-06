# 🚀 EcoFinds Deployment Guide

This guide will walk you through setting up Git, pushing to GitHub, and connecting Firebase to your EcoFinds project.

## 📋 Prerequisites

- Git installed on your system
- GitHub account
- Firebase account
- Node.js and npm installed

## 🔧 Step 1: Initialize Git Repository

### 1.1 Initialize Git in your project

```bash
# Navigate to your project root
cd C:\Users\kiran\Documents\EcoFinds

# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: EcoFinds sustainable marketplace"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `EcoFinds` (or your preferred name)
5. Add description: "Sustainable second-hand marketplace mobile app"
6. Keep it **Public** (or Private if you prefer)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### 1.3 Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/EcoFinds.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🔥 Step 2: Firebase Setup

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `EcoFinds` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2.2 Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### 2.3 Enable Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### 2.4 Enable Storage (Optional)

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode"
4. Select same location as Firestore
5. Click "Done"

### 2.5 Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>`
5. Enter app nickname: `EcoFinds Web`
6. **DO NOT** check "Also set up Firebase Hosting"
7. Click "Register app"
8. Copy the Firebase configuration object

### 2.6 Update Firebase Config

1. Open `mobile/frontend/config/firebase.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 🌐 Step 3: Backend Deployment (Heroku)

### 3.1 Install Heroku CLI

Download and install from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### 3.2 Deploy Backend

```bash
# Navigate to backend directory
cd mobile/backend

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-ecofinds-api

# Set environment variables
heroku config:set JWT_SECRET=your-super-secret-jwt-key-for-production
heroku config:set NODE_ENV=production

# Deploy (from project root)
cd ../..
git subtree push --prefix mobile/backend heroku main
```

### 3.3 Update Frontend API URL

After deploying, update the API URL in your frontend:

1. Open `mobile/frontend/screens/LoginScreen.js`
2. Replace `http://localhost:3000` with your Heroku URL
3. Do the same for all other screen files that make API calls

## 📱 Step 4: Frontend Deployment (Expo)

### 4.1 Install Expo CLI

```bash
npm install -g @expo/cli
```

### 4.2 Build for Production

```bash
# Navigate to frontend directory
cd mobile/frontend

# Login to Expo
expo login

# Build for Android
expo build:android

# Build for iOS (requires Apple Developer account)
expo build:ios
```

### 4.3 Alternative: EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for both platforms
eas build --platform all
```

## 🔄 Step 5: Update API URLs

After deploying your backend, update all API calls in your frontend:

### 5.1 Create API Configuration

Create `mobile/frontend/config/api.js`:

```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000'  // Development
  : 'https://your-ecofinds-api.herokuapp.com';  // Production

export default API_BASE_URL;
```

### 5.2 Update All API Calls

Replace hardcoded URLs in all screen files:

```javascript
import API_BASE_URL from '../config/api';

// Instead of: 'http://localhost:3000/api/auth/login'
// Use: `${API_BASE_URL}/api/auth/login`
```

## 🚀 Step 6: Final Deployment Steps

### 6.1 Commit and Push Changes

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add Firebase integration and deployment configuration"

# Push to GitHub
git push origin main
```

### 6.2 Test Your Deployment

1. **Backend**: Visit your Heroku URL + `/api/health`
2. **Frontend**: Test the app on your device using Expo Go
3. **Firebase**: Check that authentication and database work

## 🔧 Step 7: Environment Variables

### 7.1 Backend Environment Variables

Create `mobile/backend/.env`:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 7.2 Frontend Environment Variables

For Expo, you can use `app.config.js`:

```javascript
export default {
  expo: {
    name: "EcoFinds",
    slug: "ecofinds",
    version: "1.0.0",
    extra: {
      apiUrl: process.env.API_URL || "http://localhost:3000",
      firebaseConfig: {
        // Your Firebase config here
      }
    }
  }
};
```

## 📋 Step 8: Production Checklist

- [ ] Backend deployed to Heroku
- [ ] Frontend built with Expo/EAS
- [ ] Firebase project configured
- [ ] Environment variables set
- [ ] API URLs updated for production
- [ ] All features tested
- [ ] README.md updated with deployment URLs
- [ ] Code pushed to GitHub

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend CORS settings include your frontend domain
2. **API Connection Issues**: Verify your API URLs are correct
3. **Firebase Auth Issues**: Check your Firebase configuration
4. **Build Failures**: Ensure all dependencies are properly installed

### Getting Help:

1. Check the [Issues](https://github.com/your-username/EcoFinds/issues) page
2. Create a new issue with detailed error information
3. Include logs and error messages

## 🎉 Congratulations!

Your EcoFinds app is now deployed and ready to use! Users can:

- Download your app from the app stores (after review)
- Access your API from anywhere
- Use Firebase for authentication and data storage

Remember to:
- Monitor your Heroku app for performance
- Keep your dependencies updated
- Regularly backup your Firebase data
- Monitor usage and costs

---

**Happy coding! 🌱**
