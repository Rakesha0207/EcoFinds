# 📱 How to Run EcoFinds Mobile App

This guide will help you run your EcoFinds mobile app on your device or emulator.

## 🚀 Quick Start

### Option 1: Run with Expo Go (Recommended for Testing)

1. **Install Expo Go on your phone:**
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. **Start the app:**
   ```bash
   cd mobile/frontend
   npm install
   npm start
   ```

3. **Scan QR code** with Expo Go app

### Option 2: Run on Emulator/Simulator

1. **Android Emulator:**
   ```bash
   cd mobile/frontend
   npm install
   npm run android
   ```

2. **iOS Simulator (macOS only):**
   ```bash
   cd mobile/frontend
   npm install
   npm run ios
   ```

## 🔧 Detailed Setup Instructions

### Step 1: Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android)
- [Xcode](https://developer.apple.com/xcode/) (for iOS, macOS only)

### Step 2: Install Expo CLI

```bash
npm install -g @expo/cli
```

### Step 3: Install Dependencies

```bash
cd mobile/frontend
npm install
```

### Step 4: Start the Development Server

```bash
npm start
```

You'll see:
```
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

## 🔥 Firebase Setup (Required)

Before running the app, you need to set up Firebase:

### 1. Enable Firebase Services

Go to [Firebase Console](https://console.firebase.google.com/project/ecofind-hackathon-50437):

1. **Authentication:**
   - Click "Authentication" → "Get started"
   - Enable "Email/Password" sign-in method

2. **Firestore Database:**
   - Click "Firestore Database" → "Create database"
   - Choose "Start in test mode"

3. **Set Security Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
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

## 🧪 Testing the App

### Test User Flow:

1. **Sign Up:**
   - Open the app
   - Tap "Don't have an account? Sign Up"
   - Create account with email/password

2. **Add Product:**
   - Tap "+ Add" button
   - Fill in product details
   - Tap "Add to Firebase"

3. **Browse Products:**
   - View products in the feed
   - Use search and category filters
   - Tap on products to view details

4. **Profile:**
   - Tap profile icon
   - View your products and stats

## 🔧 Troubleshooting

### Common Issues:

1. **"Metro bundler failed to start"**
   ```bash
   # Clear cache and restart
   npx expo start --clear
   ```

2. **"Unable to resolve module"**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```

3. **"Firebase not initialized"**
   - Check Firebase Console settings
   - Verify Firebase config in `config/firebase.js`

4. **"Permission denied" errors**
   - Check Firestore security rules
   - Make sure user is authenticated

### Debug Commands:

```bash
# Clear Expo cache
npx expo start --clear

# Reset Metro bundler
npx expo start --reset-cache

# Check Expo version
npx expo --version

# Check Node version
node --version
```

## 📱 Running on Different Platforms

### Android

1. **Using Android Studio Emulator:**
   ```bash
   npm run android
   ```

2. **Using Physical Device:**
   - Enable Developer Options
   - Enable USB Debugging
   - Connect via USB
   - Run `npm run android`

### iOS

1. **Using iOS Simulator (macOS only):**
   ```bash
   npm run ios
   ```

2. **Using Physical Device:**
   - Install Expo Go from App Store
   - Scan QR code from `npm start`

### Web

```bash
npm run web
```

## 🚀 Production Build

### Build for App Stores:

1. **Android APK:**
   ```bash
   npx expo build:android
   ```

2. **iOS IPA:**
   ```bash
   npx expo build:ios
   ```

3. **Using EAS Build (Recommended):**
   ```bash
   npm install -g eas-cli
   eas build --platform all
   ```

## 📊 App Features

Your EcoFinds app includes:

- ✅ **User Authentication** (Firebase Auth)
- ✅ **Product Management** (Firestore)
- ✅ **Search & Filter** (Category, price, keywords)
- ✅ **User Profiles** (View stats and products)
- ✅ **Real-time Updates** (Firebase sync)
- ✅ **Modern UI** (Eco-friendly design)
- ✅ **Cross-platform** (iOS, Android, Web)

## 🎯 Success Checklist

Your app is working correctly when:

- [ ] App starts without errors
- [ ] User can sign up/login
- [ ] Products can be added and viewed
- [ ] Search and filters work
- [ ] Profile shows user data
- [ ] Firebase Console shows data
- [ ] No console errors

## 📞 Getting Help

If you encounter issues:

1. Check the [Expo Documentation](https://docs.expo.dev/)
2. Check [Firebase Documentation](https://firebase.google.com/docs)
3. Look at console logs for error messages
4. Check Firebase Console for data

---

**Happy coding! 🌱**

Your EcoFinds app is now ready to promote sustainable living!



y