=== HOW TO RUN THE MOBILE APP ===

## Backend Server
```bash
cd mobile/backend
npm install
npm start
# Server runs on http://localhost:3000
```

## Mobile App
```bash
cd mobile/frontend
npm install

# For mobile devices:
npm start

# For web version:
npm run web
```

## Key Features Fixed
- ✅ Removed conflicting expo-router configuration
- ✅ Fixed main entry point in package.json
- ✅ Cleaned up unused template components
- ✅ Resolved all linting errors
- ✅ App uses backend API instead of problematic Firebase
- ✅ All dependencies properly configured

The app is now ready to run on mobile devices and simulators!
