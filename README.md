# 🌱 EcoFinds - Sustainable Marketplace

EcoFinds is a mobile-first sustainable second-hand marketplace that promotes environmental consciousness by enabling users to buy and sell pre-owned items. Built with React Native and Express.js, it features user authentication, product management, and a modern, eco-friendly design.

## ✨ Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Product Management**: Add, edit, delete, and browse products
- **Search & Filter**: Find products by category, price, and keywords
- **User Profiles**: Manage your listings and profile information
- **Responsive Design**: Beautiful, modern UI with eco-friendly theme
- **Real-time Updates**: Pull-to-refresh and dynamic content loading

## 🏗️ Project Structure

```
EcoFinds/
├── mobile/
│   ├── backend/                 # Express.js API server
│   │   ├── routes/             # API routes (auth, products)
│   │   ├── index.js            # Server entry point
│   │   └── package.json        # Backend dependencies
│   └── frontend/               # React Native mobile app
│       ├── screens/            # App screens
│       ├── components/         # Reusable components
│       ├── config/             # Firebase configuration
│       └── package.json        # Frontend dependencies
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- React Native development environment
- Firebase account (for production)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd EcoFinds
```

### 2. Backend Setup

```bash
cd mobile/backend

# Install dependencies
npm install

# Create environment file
cp env.sample .env
# Edit .env with your configuration

# Start the server
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd mobile/frontend

# Install dependencies
npm install

# For iOS (if on macOS)
cd ios && pod install && cd ..

# Start the development server
npm start
```

### 4. Firebase Setup (Optional)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Download your Firebase config
4. Update `mobile/frontend/config/firebase.js` with your config
5. For React Native Firebase, follow the [setup guide](https://rnfirebase.io/)

## 📱 Running the App

### Development Mode

```bash
# Backend (Terminal 1)
cd mobile/backend
npm run dev

# Frontend (Terminal 2)
cd mobile/frontend
npm start

# Then choose your platform:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator
# - Scan QR code with Expo Go app
```

### Production Build

```bash
# Frontend
cd mobile/frontend
expo build:android  # or expo build:ios

# Backend
cd mobile/backend
npm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in `mobile/backend/`:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/products` - Get all products
- `POST /api/products/add` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🎨 Design System

- **Primary Color**: #4CAF50 (Green)
- **Secondary Colors**: #2196F3 (Blue), #FF9800 (Orange)
- **Typography**: System fonts with bold headings
- **Spacing**: 8px grid system
- **Components**: Material Design inspired

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-ecofinds-api

# Set environment variables
heroku config:set JWT_SECRET=your-production-secret
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix mobile/backend heroku main
```

### Frontend Deployment (Expo)

```bash
cd mobile/frontend

# Build for production
expo build:android
expo build:ios

# Or use EAS Build (recommended)
npm install -g @expo/cli
eas build --platform all
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for the amazing development platform
- Firebase for backend services
- All contributors and testers

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-username/EcoFinds/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Made with 🌱 for a sustainable future**
