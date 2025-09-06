// Firebase Test Script
// Run this in your React Native app to test Firebase integration

import { auth, db } from './config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc 
} from 'firebase/firestore';

// Test Firebase Authentication
export const testFirebaseAuth = async () => {
  console.log('🔥 Testing Firebase Authentication...');
  
  try {
    // Test 1: Create user
    console.log('1. Testing user creation...');
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'test@example.com', 
      'password123'
    );
    console.log('✅ User created:', userCredential.user.email);
    
    // Test 2: Sign out
    console.log('2. Testing sign out...');
    await signOut(auth);
    console.log('✅ User signed out');
    
    // Test 3: Sign in
    console.log('3. Testing sign in...');
    const signInCredential = await signInWithEmailAndPassword(
      auth, 
      'test@example.com', 
      'password123'
    );
    console.log('✅ User signed in:', signInCredential.user.email);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase Auth test failed:', error.message);
    return false;
  }
};

// Test Firestore Database
export const testFirestore = async () => {
  console.log('🔥 Testing Firestore Database...');
  
  try {
    // Test 1: Create user document
    console.log('1. Testing user document creation...');
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }
    
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      username: 'testuser',
      createdAt: new Date().toISOString()
    });
    console.log('✅ User document created');
    
    // Test 2: Add product
    console.log('2. Testing product creation...');
    const productRef = await addDoc(collection(db, 'products'), {
      ownerId: user.uid,
      title: 'Test Product',
      description: 'This is a test product',
      category: 'Electronics',
      price: 99.99,
      condition: 'Good',
      status: 'available',
      createdAt: new Date().toISOString()
    });
    console.log('✅ Product created with ID:', productRef.id);
    
    // Test 3: Get products
    console.log('3. Testing product retrieval...');
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    productsSnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    console.log('✅ Products retrieved:', products.length, 'products');
    
    return true;
  } catch (error) {
    console.error('❌ Firestore test failed:', error.message);
    return false;
  }
};

// Run all Firebase tests
export const runFirebaseTests = async () => {
  console.log('🚀 Starting Firebase Tests...\n');
  
  const authResult = await testFirebaseAuth();
  console.log('');
  
  const firestoreResult = await testFirestore();
  console.log('');
  
  console.log('📊 Firebase Test Results:');
  console.log('========================');
  console.log(`Authentication: ${authResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Firestore: ${firestoreResult ? '✅ PASS' : '❌ FAIL'}`);
  
  if (authResult && firestoreResult) {
    console.log('\n🎉 All Firebase tests passed!');
  } else {
    console.log('\n⚠️  Some Firebase tests failed.');
  }
  
  return authResult && firestoreResult;
};

// Usage in your React Native app:
// import { runFirebaseTests } from './test-firebase';
// runFirebaseTests();
