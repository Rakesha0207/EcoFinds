const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

// Test functions
async function testHealthCheck() {
  try {
    console.log('🔍 Testing health check...');
    const response = await axios.get(`${API_BASE_URL}/api/health`);
    console.log('✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testGetProducts() {
  try {
    console.log('🔍 Testing get products...');
    const response = await axios.get(`${API_BASE_URL}/api/products`);
    console.log('✅ Get products passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Get products failed:', error.message);
    return false;
  }
}

async function testUserSignup() {
  try {
    console.log('🔍 Testing user signup...');
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    };
    
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, userData);
    console.log('✅ User signup passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ User signup failed:', error.response?.data || error.message);
    return false;
  }
}

async function testUserLogin() {
  try {
    console.log('🔍 Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData);
    console.log('✅ User login passed:', response.data);
    return response.data.token; // Return token for further tests
  } catch (error) {
    console.error('❌ User login failed:', error.response?.data || error.message);
    return null;
  }
}

async function testAddProduct(token) {
  try {
    console.log('🔍 Testing add product...');
    const productData = {
      title: 'Test Product',
      description: 'This is a test product',
      category: 'Electronics',
      price: 99.99,
      condition: 'Good'
    };
    
    const response = await axios.post(`${API_BASE_URL}/api/products/add`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Add product passed:', response.data);
    return response.data.product.id;
  } catch (error) {
    console.error('❌ Add product failed:', error.response?.data || error.message);
    return null;
  }
}

async function testGetCategories() {
  try {
    console.log('🔍 Testing get categories...');
    const response = await axios.get(`${API_BASE_URL}/api/products/categories/list`);
    console.log('✅ Get categories passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Get categories failed:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting EcoFinds API Tests...\n');
  
  const results = {
    healthCheck: false,
    getProducts: false,
    userSignup: false,
    userLogin: false,
    addProduct: false,
    getCategories: false
  };
  
  // Test 1: Health Check
  results.healthCheck = await testHealthCheck();
  console.log('');
  
  // Test 2: Get Products
  results.getProducts = await testGetProducts();
  console.log('');
  
  // Test 3: User Signup
  results.userSignup = await testUserSignup();
  console.log('');
  
  // Test 4: User Login
  const token = await testUserLogin();
  results.userLogin = token !== null;
  console.log('');
  
  // Test 5: Add Product (only if login succeeded)
  if (token) {
    const productId = await testAddProduct(token);
    results.addProduct = productId !== null;
  }
  console.log('');
  
  // Test 6: Get Categories
  results.getCategories = await testGetCategories();
  console.log('');
  
  // Summary
  console.log('📊 Test Results Summary:');
  console.log('========================');
  console.log(`Health Check: ${results.healthCheck ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Get Products: ${results.getProducts ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`User Signup: ${results.userSignup ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`User Login: ${results.userLogin ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Add Product: ${results.addProduct ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Get Categories: ${results.getCategories ? '✅ PASS' : '❌ FAIL'}`);
  
  const passedTests = Object.values(results).filter(result => result).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Your API is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
