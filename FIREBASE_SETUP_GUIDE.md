# 🔥 Firebase Setup Guide for EcoFinds

This guide will help you set up Firebase for your EcoFinds project using your existing Firebase configuration.

## 📋 Your Firebase Configuration

Your Firebase project is already configured with:
- **Project ID**: `ecofind-hackathon-50437`
- **Auth Domain**: `ecofind-hackathon-50437.firebaseapp.com`
- **Storage Bucket**: `ecofind-hackathon-50437.firebasestorage.app`

## 🚀 Step 1: Enable Firebase Services

### 1.1 Enable Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/project/ecofind-hackathon-50437)
2. Click **"Authentication"** in the left sidebar
3. Click **"Get started"**
4. Go to **"Sign-in method"** tab
5. Enable **"Email/Password"** provider
6. Click **"Save"**

### 1.2 Enable Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location (choose one close to your users)
5. Click **"Done"**

### 1.3 Enable Storage (Optional)

1. Click **"Storage"** in the left sidebar
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Select the same location as Firestore
5. Click **"Done"**

## 🔧 Step 2: Install Dependencies

Your Firebase dependencies are already added to `package.json`. Install them:

```bash
cd mobile/frontend
npm install
```

## 📱 Step 3: Test Firebase Integration

### 3.1 Test Authentication

You can now use the Firebase-enabled screens:

1. **LoginScreenFirebase.js** - Uses Firebase Authentication
2. **SignupScreenFirebase.js** - Creates users in Firebase Auth + Firestore
3. **ProductFeedScreenFirebase.js** - Loads products from Firestore
4. **AddProductScreenFirebase.js** - Adds products to Firestore

### 3.2 Switch to Firebase Screens

To use Firebase instead of your Express.js backend, update your `App.js`:

```javascript
// Replace these imports:
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

## 🗄️ Step 4: Firestore Database Structure

Your Firebase services will create these collections:

### Users Collection (`users`)
```javascript
{
  uid: "user-id",
  email: "user@example.com",
  username: "username",
  createdAt: "2024-01-01T00:00:00.000Z",
  purchases: [],
  cart: []
}
```

### Products Collection (`products`)
```javascript
{
  id: "product-id",
  ownerId: "user-id",
  title: "Product Title",
  description: "Product description",
  category: "Electronics",
  price: 99.99,
  condition: "Good",
  image: "https://example.com/image.jpg",
  status: "available",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## 🔐 Step 5: Security Rules

### 5.1 Firestore Security Rules

Go to **Firestore Database > Rules** and update:

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

### 5.2 Storage Security Rules (if using Storage)

Go to **Storage > Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 🧪 Step 6: Test Your Firebase Integration

### 6.1 Test User Registration

1. Run your app: `npm start`
2. Navigate to Signup screen
3. Create a new account
4. Check Firebase Console > Authentication to see the new user
5. Check Firestore > users collection to see user data

### 6.2 Test Product Management

1. Login with your new account
2. Add a product using the Add Product screen
3. Check Firestore > products collection to see the new product
4. Browse products in the Product Feed

## 🔄 Step 7: Hybrid Approach (Recommended)

You can use both Firebase and your Express.js backend:

### Option A: Firebase for Auth, Express for Products
- Use Firebase Authentication for user management
- Keep your Express.js API for product management
- Best of both worlds: Firebase's robust auth + your custom API

### Option B: Full Firebase
- Use Firebase for everything
- Replace all Express.js API calls with Firebase services
- Simpler deployment, but less control over business logic

### Option C: Express.js Only
- Keep your current Express.js setup
- Use Firebase only for file storage (images)
- Most control, but need to manage your own auth

## 🚀 Step 8: Production Deployment

### 8.1 Update Security Rules for Production

```javascript
// Production Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /products/{productId} {
      allow read: if true; // Public read for products
      allow write, update, delete: if request.auth != null && 
        request.auth.uid == resource.data.ownerId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.ownerId;
    }
  }
}
```

### 8.2 Environment Configuration

For production, you might want to use different Firebase projects:

```javascript
// config/firebase.js
const firebaseConfig = {
  // Use environment variables for production
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - Solution: Make sure you're only initializing Firebase once

2. **"Permission denied" errors**
   - Solution: Check your Firestore security rules

3. **Authentication not working**
   - Solution: Verify Email/Password is enabled in Firebase Console

4. **Products not loading**
   - Solution: Check Firestore rules and ensure user is authenticated

### Getting Help:

1. Check Firebase Console for error logs
2. Use browser dev tools to see network requests
3. Check React Native debugger for JavaScript errors

## 🎉 Congratulations!

Your EcoFinds app is now integrated with Firebase! You can:

- ✅ Authenticate users with Firebase Auth
- ✅ Store user data in Firestore
- ✅ Manage products in Firestore
- ✅ Use Firebase Storage for images (optional)
- ✅ Deploy with confidence using Firebase's infrastructure

---

**Next Steps:**
1. Test all Firebase features
2. Choose your preferred approach (Firebase-only, hybrid, or Express-only)
3. Update your app to use the chosen approach
4. Deploy to production

**Happy coding with Firebase! 🔥**
