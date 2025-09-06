import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzUiEhMlIP-nSY8ZOeJqVsI8wjE8rUw5U",
  authDomain: "ecofind-hackathon-50437.firebaseapp.com",
  projectId: "ecofind-hackathon-50437",
  storageBucket: "ecofind-hackathon-50437.firebasestorage.app",
  messagingSenderId: "483575070630",
  appId: "1:483575070630:web:c1d2d3828b23d315b69967",
  measurementId: "G-759NJ1H2R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
