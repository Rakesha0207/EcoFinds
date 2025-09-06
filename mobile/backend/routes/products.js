const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { authenticateToken } = require('./auth');

let products = [];

// Get all products with filtering and search
router.get('/', (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    let result = [...products];

    // Filter by category
    if (category) {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by price range
    if (minPrice) {
      result = result.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Search by title and description
    if (q) {
      const searchTerm = q.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort products
    result.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    res.json({
      products: result,
      total: result.length
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single product by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add new product (requires authentication)
router.post('/add', authenticateToken, (req, res) => {
  try {
    const { title, description, category, price, image, condition } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const product = {
      id: uuidv4(),
      ownerId: req.user.userId,
      title,
      description: description || '',
      category: category || 'Other',
      price: parseFloat(price) || 0,
      image: image || null,
      condition: condition || 'Good',
      status: 'available', // available, sold, reserved
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(product);
    
    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update product (requires authentication and ownership)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user owns the product
    if (products[productIndex].ownerId !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own products' });
    }

    const updatedProduct = {
      ...products[productIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    products[productIndex] = updatedProduct;
    
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete product (requires authentication and ownership)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user owns the product
    if (products[productIndex].ownerId !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own products' });
    }

    products.splice(productIndex, 1);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's products
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userProducts = products.filter(p => p.ownerId === userId);
    
    res.json({
      products: userProducts,
      total: userProducts.length
    });
  } catch (error) {
    console.error('Get user products error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get categories
router.get('/categories/list', (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.category))];
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
