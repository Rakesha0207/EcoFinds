# EcoFinds Troubleshooting Guide

This guide helps resolve common issues when accessing and setting up the EcoFinds repository.

## 🔧 Common Setup Issues

### Repository Access Issues

**Problem**: "Permission denied" when cloning repository
```bash
git clone https://github.com/Rakesha0207/EcoFinds.git
```

**Solutions**:
1. **Check if repository is public**: This repository should be publicly accessible
2. **Use HTTPS instead of SSH**: The URL above uses HTTPS
3. **Check your internet connection**
4. **Try cloning to a different directory**

**Problem**: "Repository not found"

**Solutions**:
1. **Verify the URL**: Make sure you're using `https://github.com/Rakesha0207/EcoFinds.git`
2. **Check repository visibility**: Contact repository owner if it's private
3. **Clear DNS cache**: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (macOS)

### Node.js and npm Issues

**Problem**: "node: command not found"

**Solutions**:
1. **Install Node.js**: Download from [nodejs.org](https://nodejs.org/)
2. **Check PATH**: Restart terminal after installation
3. **Version check**: Ensure Node.js v16 or higher

**Problem**: npm install fails with permission errors

**Solutions**:
1. **Use node version manager**: Install nvm (Linux/macOS) or nvm-windows
2. **Fix npm permissions**: 
   ```bash
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   ```
3. **Don't use sudo**: Avoid `sudo npm install`

### Firebase Configuration Issues

**Problem**: Firebase authentication errors

**Solutions**:
1. **Check Firebase config**: Verify all keys in `mobile/frontend/config/firebase.js`
2. **Enable services**: Ensure Authentication, Firestore, Storage are enabled
3. **Check API keys**: Regenerate API keys if needed
4. **Domain restrictions**: Add your domain to authorized domains

**Problem**: "Firebase project not found"

**Solutions**:
1. **Create Firebase project**: Go to [Firebase Console](https://console.firebase.google.com/)
2. **Copy correct project ID**: Check project settings
3. **Wait for propagation**: New projects may take a few minutes

### Backend API Issues

**Problem**: "Port 3000 already in use"

**Solutions**:
1. **Kill existing process**: 
   ```bash
   # Find process
   lsof -i :3000
   # Kill process
   kill -9 PID
   ```
2. **Use different port**: Change PORT in `.env` file
3. **Check for other servers**: Close other development servers

**Problem**: Environment variables not loading

**Solutions**:
1. **Check .env file exists**: Should be in `mobile/backend/.env`
2. **Copy from sample**: `cp env.sample .env`
3. **Restart server**: After changing .env file
4. **No spaces around =**: Use `PORT=3000`, not `PORT = 3000`

### Frontend Expo Issues

**Problem**: "Expo CLI not found"

**Solutions**:
1. **Install Expo CLI**: `npm install -g @expo/cli`
2. **Update npm**: `npm update -g npm`
3. **Check global packages**: `npm list -g --depth=0`

**Problem**: Metro bundler fails to start

**Solutions**:
1. **Clear cache**: `npx expo start --clear`
2. **Reset project**: `npm run reset-project`
3. **Reinstall dependencies**: 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Mobile Device Connection

**Problem**: Can't connect to development server

**Solutions**:
1. **Same network**: Ensure phone and computer on same WiFi
2. **Firewall settings**: Allow Metro bundler through firewall
3. **Use tunnel**: `npx expo start --tunnel`
4. **Check IP address**: Use computer's IP manually

## 🔍 Debugging Steps

### 1. Verify Repository Structure
```bash
cd EcoFinds
ls -la
# Should show: mobile/, README.md, setup.sh, etc.
```

### 2. Check Node.js Installation
```bash
node --version  # Should be v16+
npm --version   # Should work
```

### 3. Verify Backend Setup
```bash
cd mobile/backend
ls -la          # Check for .env file
npm run dev     # Should start without errors
```

### 4. Test Frontend Setup
```bash
cd mobile/frontend
ls -la                    # Check for config/firebase.js
npm start                 # Should start Expo dev server
```

### 5. Test API Connection
```bash
cd mobile/backend
node test-api.js          # Should show API test results
```

## 📞 Getting Additional Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Read error messages carefully**
3. **Try the automated setup script**: `./setup.sh`
4. **Search existing GitHub issues**

### When Reporting Issues

Include this information:
- **Operating System**: Windows/macOS/Linux + version
- **Node.js version**: `node --version`
- **npm version**: `npm --version`
- **Error messages**: Full error text
- **Steps to reproduce**: What you did before the error
- **Screenshots**: If applicable

### Contact Options

1. **GitHub Issues**: [Create new issue](https://github.com/Rakesha0207/EcoFinds/issues/new)
2. **GitHub Discussions**: For questions and help
3. **Documentation**: Check README.md and CONTRIBUTING.md

## 🔄 Reset Instructions

If everything is broken, try a complete reset:

```bash
# 1. Fresh clone
cd ..
rm -rf EcoFinds
git clone https://github.com/Rakesha0207/EcoFinds.git
cd EcoFinds

# 2. Run setup script
./setup.sh

# 3. Configure manually
# - Update mobile/backend/.env
# - Update mobile/frontend/config/firebase.js

# 4. Test each component
cd mobile/backend && npm run dev
cd ../frontend && npm start
```

This should resolve most access and setup issues. If problems persist, please create a GitHub issue with detailed information.