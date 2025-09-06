# EcoFinds – Empowering Sustainable Consumption

EcoFinds is a second-hand marketplace that connects buyers and sellers of pre-owned goods.  
The project was developed during a hackathon to promote sustainability and responsible consumption.

---

## 🚀 Features
- User authentication (Sign up / Login with email & password)
- Create and manage product listings (title, description, price, category, image)
- Browse listings with basic search and filtering
- Works on both **Web** and **Mobile** apps
- Firebase backend for authentication and data storage

---

## 🛠️ Tech Stack
- **Frontend (Web):** React.js  
- **Frontend (Mobile):** React Native / Expo  
- **Backend & Database:** Firebase (Firestore, Auth, Storage)  
- **Version Control:** Git & GitHub  

---

## 📂 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/Rakesha0207/EcoFinds.git
cd EcoFinds
```

### 2. Backend Setup
```bash
cd mobile/backend
npm install

# Set up environment variables
cp env.sample .env
# Edit .env file with your configuration
```

### 3. Frontend Setup  
```bash
cd mobile/frontend
npm install
```

### 4. Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore Database, and Storage
3. Get your Firebase config from Project Settings
4. Update `mobile/frontend/config/firebase.js` with your Firebase configuration
5. For production, use environment variables instead of hardcoded values

### 5. Running the Application

#### Backend (API Server)
```bash
cd mobile/backend
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

#### Frontend (React Native/Expo)
```bash
cd mobile/frontend  
npm start    # Start Expo development server
npm run android  # Run on Android device/emulator
npm run ios      # Run on iOS device/simulator
npm run web      # Run on web browser
```

---

## 🔧 Environment Variables

### Backend (.env)
```bash
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Frontend Firebase Config
Update `mobile/frontend/config/firebase.js` with your Firebase project credentials.

---

## 🌟 Getting Started

1. **Prerequisites**: Node.js (v16+), npm, Expo CLI (for mobile development)
2. **Installation**: Follow the setup steps above
3. **Development**: Run backend and frontend servers simultaneously
4. **Testing**: Access the API at `http://localhost:3000` and mobile app via Expo

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Products
- `GET /products` - Get all products
- `POST /products` - Create new product listing
- `GET /products/:id` - Get specific product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

---

## 🔍 Testing

### Backend API Testing
```bash
cd mobile/backend
node test-api.js
```

### Frontend Testing
```bash
cd mobile/frontend
npm run lint
```

---

## ⚠️ Security Notes

- Never commit Firebase configuration with real credentials to version control
- Use environment variables for sensitive data in production
- Change default JWT_SECRET before deployment
- Enable Firebase security rules for production

---

## 📞 Support

For issues and questions:
1. Check existing [GitHub Issues](https://github.com/Rakesha0207/EcoFinds/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce any problems

---

## 📄 License

This project was created during a hackathon for educational and sustainability purposes.
