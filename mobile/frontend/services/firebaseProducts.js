import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Add a new product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true,
      productId: docRef.id
    };
  } catch (error) {
    console.error('Error adding product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all products with optional filtering
export const getProducts = async (filters = {}) => {
  try {
    let q = collection(db, 'products');
    
    // Apply filters
    if (filters.category && filters.category !== 'All') {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.minPrice) {
      q = query(q, where('price', '>=', parseFloat(filters.minPrice)));
    }
    
    if (filters.maxPrice) {
      q = query(q, where('price', '<=', parseFloat(filters.maxPrice)));
    }
    
    // Order by creation date (newest first)
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Apply text search filter (client-side for simplicity)
    let filteredProducts = products;
    if (filters.searchQuery) {
      const searchTerm = filters.searchQuery.toLowerCase();
      filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return {
      success: true,
      products: filteredProducts
    };
  } catch (error) {
    console.error('Error getting products:', error);
    return {
      success: false,
      error: error.message,
      products: []
    };
  }
};

// Get a single product by ID
export const getProduct = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        product: {
          id: docSnap.id,
          ...docSnap.data()
        }
      };
    } else {
      return {
        success: false,
        error: 'Product not found'
      };
    }
  } catch (error) {
    console.error('Error getting product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Update a product
export const updateProduct = async (productId, updateData) => {
  try {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get products by user ID
export const getUserProducts = async (userId) => {
  try {
    const q = query(
      collection(db, 'products'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      products: products
    };
  } catch (error) {
    console.error('Error getting user products:', error);
    return {
      success: false,
      error: error.message,
      products: []
    };
  }
};

// Get categories
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const categories = new Set();
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });
    
    return {
      success: true,
      categories: Array.from(categories)
    };
  } catch (error) {
    console.error('Error getting categories:', error);
    return {
      success: false,
      error: error.message,
      categories: []
    };
  }
};
