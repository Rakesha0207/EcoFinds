# Contributing to EcoFinds

Welcome to the EcoFinds project! We're excited to have you contribute to our sustainable marketplace platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Expo CLI (for mobile development): `npm install -g @expo/cli`

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/EcoFinds.git
   cd EcoFinds
   ```

3. **Run the setup script**:
   ```bash
   ./setup.sh
   ```

4. **Configure your environment**:
   - Update `mobile/backend/.env` with your settings
   - Update `mobile/frontend/config/firebase.js` with your Firebase credentials

5. **Start development servers**:
   ```bash
   # Terminal 1 - Backend
   cd mobile/backend
   npm run dev
   
   # Terminal 2 - Frontend  
   cd mobile/frontend
   npm start
   ```

## 🏗️ Project Structure

```
EcoFinds/
├── mobile/
│   ├── backend/          # Express.js API server
│   │   ├── routes/       # API routes
│   │   ├── index.js      # Server entry point
│   │   └── package.json
│   └── frontend/         # React Native/Expo app
│       ├── app/          # App screens (Expo Router)
│       ├── components/   # Reusable components
│       ├── config/       # Configuration files
│       ├── services/     # Firebase services
│       └── package.json
├── README.md
├── setup.sh             # Automated setup script
└── CONTRIBUTING.md       # This file
```

## 🔧 Development Workflow

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Commit Message Format

We use conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 🧪 Testing

### Backend Testing
```bash
cd mobile/backend
node test-api.js
```

### Frontend Testing
```bash
cd mobile/frontend
npm run lint
```

## 📋 Code Standards

### JavaScript/TypeScript
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic

### React Native
- Use functional components with hooks
- Follow Expo/React Native best practices
- Ensure cross-platform compatibility

### API Development
- Follow RESTful conventions
- Use proper HTTP status codes
- Validate input data
- Handle errors gracefully

## 🐛 Reporting Issues

When reporting issues:

1. **Search existing issues** first
2. **Use a clear title** describing the problem
3. **Provide steps to reproduce** the issue
4. **Include system information**:
   - OS version
   - Node.js version
   - Mobile device/emulator details (if applicable)
5. **Attach screenshots** if relevant

## 🔐 Security

- Never commit real Firebase credentials
- Use environment variables for sensitive data
- Report security vulnerabilities privately
- Follow secure coding practices

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check if the feature already exists
2. Open an issue with the "enhancement" label
3. Describe the feature and its benefits
4. Provide examples or mockups if helpful

## 🤝 Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Focus on the code, not the person

## 📞 Getting Help

- **Documentation**: Check README.md first
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions for questions
- **Setup Problems**: Try the automated setup script

## 🏆 Recognition

Contributors will be recognized in our README.md and release notes.

Thank you for contributing to EcoFinds! Together, we're building a more sustainable future. 🌱