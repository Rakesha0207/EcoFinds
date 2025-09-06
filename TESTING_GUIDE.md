# 🧪 EcoFinds Testing Guide

This guide will help you test both your Express.js backend and Firebase integration.

## 🚀 Step 1: Test Express.js Backend

### 1.1 Start the Backend Server

```bash
# Navigate to backend directory
cd mobile/backend

# Install dependencies (if not already done)
npm install

# Create environment file
cp env.sample .env

# Start the server
npm run dev
```

You should see:
```
🚀 EcoFinds API server running on port 3000
📱 Health check: http://localhost:3000/api/health
```

### 1.2 Test Backend API

Open your browser and test these endpoints:

1. **Health Check**: http://localhost:3000/api/health
2. **Get Products**: http://localhost:3000/api/products
3. **Get Categories**: http://localhost:3000/api/products/categories/list

## 🔥 Step 2: Set Up Firebase

### 2.1 Enable Firebase Services

1. Go to [Firebase Console](https://console.firebase.google.com/project/ecofind-hackathon-50437)
2. **Enable Authentication**:
   - Click "Authentication" → "Get started"
   - Go to "Sign-in method" tab
   - Enable "Email/Password"
   - Click "Save"

3. **Enable Firestore**:
   - Click "Firestore Database" → "Create database"
   - Choose "Start in test mode"
   - Select a location (e.g., us-central1)
   - Click "Done"

4. **Enable Storage** (Optional):
   - Click "Storage" → "Get started"
   - Choose "Start in test mode"
   - Click "Done"

### 2.2 Set Firestore Security Rules

Go to **Firestore Database → Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products are readable by all authenticated users
    // Only the owner can write/update/delete their products
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write, update, delete: if request.auth != null && 
        request.auth.uid == resource.data.ownerId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.ownerId;
    }
  }
}
```

## 📱 Step 3: Test Frontend with Express.js

### 3.1 Start the Frontend

```bash
# Navigate to frontend directory
cd mobile/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### 3.2 Test Express.js Screens

1. **Login Screen**: Test user login/signup
2. **Product Feed**: Browse products
3. **Add Product**: Create new products
4. **Product Detail**: View product details
5. **Profile**: Manage user profile

## 🔥 Step 4: Test Firebase Integration

### 4.1 Switch to Firebase Screens

Update your `App.js` to use Firebase screens:

```javascript
// Replace these imports in App.js:
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProductFeedScreen from './screens/ProductFeedScreen';
import AddProductScreen from './screens/AddProductScreen';

// With these Firebase versions:
import LoginScreen from './screens/LoginScreenFirebase';
import SignupScreen from './screens/SignupScreenFirebase';
import ProductFeedScreen from './screens/ProductFeedScreenFirebase';
import AddProductScreen from './screens/AddProductScreenFirebase';
```

### 4.2 Test Firebase Features

1. **Firebase Authentication**:
   - Create a new account
   - Login with existing account
   - Check Firebase Console → Authentication

2. **Firestore Database**:
   - Add products
   - Browse products
   - Check Firebase Console → Firestore Database

3. **User Management**:
   - View profile
   - Update profile
   - Check Firebase Console → Firestore → users collection

## 🧪 Step 5: Comprehensive Testing

### 5.1 Test User Registration

```bash
# Test with these credentials:
Email: test@example.com
Password: password123
Username: testuser
```

**Expected Results:**
- ✅ User created in Firebase Authentication
- ✅ User document created in Firestore
- ✅ Success message displayed
- ✅ Navigation to Product Feed

### 5.2 Test Product Management

```bash
# Test adding a product:
Title: Test Product
Description: This is a test product
Category: Electronics
Price: 99.99
Condition: Good
```

**Expected Results:**
- ✅ Product added to Firestore
- ✅ Product appears in Product Feed
- ✅ Product details viewable

### 5.3 Test Search and Filter

```bash
# Test search functionality:
- Search for "test"
- Filter by category "Electronics"
- Test price range filters
```

**Expected Results:**
- ✅ Search returns relevant products
- ✅ Category filter works
- ✅ Price filters work

## 🔧 Step 6: Troubleshooting

### Common Issues and Solutions:

1. **"Firebase App named '[DEFAULT]' already exists"**
   ```javascript
   // Solution: Check if Firebase is already initialized
   // Make sure you're only calling initializeApp once
   ```

2. **"Permission denied" errors**
   ```javascript
   // Solution: Check Firestore security rules
   // Make sure user is authenticated
   ```

3. **Authentication not working**
   ```javascript
   // Solution: 
   // 1. Check if Email/Password is enabled in Firebase Console
   // 2. Verify Firebase config is correct
   // 3. Check network connectivity
   ```

4. **Products not loading**
   ```javascript
   // Solution:
   // 1. Check Firestore rules
   // 2. Verify user is authenticated
   // 3. Check console for errors
   ```

### Debug Commands:

```bash
# Check if backend is running
curl http://localhost:3000/api/health

# Check Firebase connection
# Look for Firebase logs in browser console

# Check network requests
# Open browser dev tools → Network tab
```

## 📊 Step 7: Performance Testing

### 7.1 Test with Multiple Users

1. Create multiple test accounts
2. Add products from different users
3. Test search and filtering
4. Test user profile management

### 7.2 Test Offline Functionality

1. Disconnect internet
2. Test app functionality
3. Reconnect and test sync

## 🎯 Step 8: Production Readiness

### 8.1 Security Checklist

- [ ] Firestore rules are production-ready
- [ ] Authentication is properly configured
- [ ] User data is protected
- [ ] API endpoints are secure

### 8.2 Performance Checklist

- [ ] App loads quickly
- [ ] Images load properly
- [ ] Search is responsive
- [ ] No memory leaks

## 🚀 Step 9: Deployment Testing

### 9.1 Test Backend Deployment

```bash
# Test Heroku deployment
heroku logs --tail

# Test API endpoints
curl https://your-app.herokuapp.com/api/health
```

### 9.2 Test Frontend Deployment

```bash
# Test Expo build
expo build:android
expo build:ios

# Test on physical devices
```

## 📝 Step 10: Documentation

### 10.1 Update README

- [ ] Add Firebase setup instructions
- [ ] Update API documentation
- [ ] Add troubleshooting section

### 10.2 Create User Guide

- [ ] How to create account
- [ ] How to add products
- [ ] How to search and filter
- [ ] How to manage profile

## 🎉 Success Criteria

Your EcoFinds app is ready when:

- ✅ Backend API responds correctly
- ✅ Firebase authentication works
- ✅ Products can be added and viewed
- ✅ Search and filtering work
- ✅ User profiles are manageable
- ✅ App works on both iOS and Android
- ✅ No critical errors in console
- ✅ Performance is acceptable

---

**Happy Testing! 🧪**

If you encounter any issues, check the troubleshooting section or create an issue in your GitHub repository.
