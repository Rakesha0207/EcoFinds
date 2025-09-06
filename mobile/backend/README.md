# EcoFinds Backend API

A Node.js/Express REST API for the EcoFinds marketplace application.

## Quick Start

```bash
# Install dependencies
npm install

# Start in development mode
npm run dev

# Start in production mode
npm start

# Run API tests
node test-api.js
```

## API Endpoints

- **Health Check**: `GET /api/health`
- **Authentication**: 
  - `POST /api/auth/signup` - User registration
  - `POST /api/auth/login` - User login
  - `GET /api/auth/profile` - Get user profile (requires auth)
  - `PUT /api/auth/profile` - Update profile (requires auth)
- **Products**:
  - `GET /api/products` - Get all products (with filtering)
  - `GET /api/products/:id` - Get single product
  - `POST /api/products/add` - Add new product (requires auth)
  - `PUT /api/products/:id` - Update product (requires auth)
  - `DELETE /api/products/:id` - Delete product (requires auth)
  - `GET /api/products/user/:userId` - Get user's products
  - `GET /api/products/categories/list` - Get all categories

## Common Issues & Solutions

### Port Already in Use Error
If you see the error: `EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Option 1: Kill existing node processes
pkill -f "node.*index.js"

# Option 2: Use a different port
PORT=3001 npm start

# Option 3: Find and kill the specific process
lsof -ti:3000 | xargs kill
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Testing

The API includes comprehensive tests in `test-api.js`. All tests should pass:

```bash
node test-api.js
```

Expected output: `6/6 tests passed`

## Environment Variables

Create a `.env` file for configuration:

```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```