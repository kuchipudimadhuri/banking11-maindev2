# 📋 INSTALLATION GUIDE

Complete step-by-step installation guide for Digital Banking Dashboard

---

## 📌 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Creating Test Accounts](#creating-test-accounts)
6. [Troubleshooting](#troubleshooting)
7. [Common Issues](#common-issues)

---

## Prerequisites

### Required Software

#### 1. Node.js (v14 or higher)

**Check if installed:**
```cmd
node --version
npm --version
```

**Install if needed:**
- Download from: https://nodejs.org/
- Choose LTS version
- Run installer and follow prompts
- Restart terminal after installation

#### 2. MongoDB

**Option A: Local MongoDB**

Check if installed:
```cmd
mongod --version
```

Install if needed:
- Download from: https://www.mongodb.com/try/download/community
- Run installer
- Choose "Complete" setup
- Install as a service
- Start MongoDB:
  ```cmd
  mongod
  ```

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Create free account: https://www.mongodb.com/cloud/atlas
- Create a cluster (M0 Free tier)
- Create database user
- Get connection string

#### 3. Git (Optional)

Check if installed:
```cmd
git --version
```

Install if needed:
- Download from: https://git-scm.com/
- Use default settings during installation

---

## Installation Steps

### Step 1: Navigate to Project

```cmd
cd c:\Users\boddu\OneDrive\Desktop\banking\digital-banking-dashboard
```

### Step 2: Install Backend Dependencies

```cmd
cd backend
npm install
```

**Expected output:**
```
added 150+ packages in 30s
```

**If errors occur:**
```cmd
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Step 3: Install Frontend Dependencies

```cmd
cd ..\frontend
npm install
```

**Expected output:**
```
added 200+ packages in 45s
```

### Step 4: Verify Installation

Check if node_modules folders exist:
```cmd
dir backend\node_modules
dir frontend\node_modules
```

---

## Configuration

### Backend Configuration

#### 1. Create .env file

```cmd
cd backend
copy .env.example .env
```

#### 2. Edit backend/.env

Open `backend/.env` in a text editor and update:

**For Local MongoDB:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/digital-banking
JWT_SECRET=your_strong_secret_key_change_this_123456
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-banking?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_key_change_this_123456
NODE_ENV=development
```

**Important:**
- Change `JWT_SECRET` to a random string (20+ characters)
- For Atlas, replace `username`, `password`, and `cluster` with your values
- Don't share your .env file or commit it to Git

#### 3. MongoDB Atlas Setup (if using)

1. Log in to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Paste into `MONGO_URI` in .env

### Frontend Configuration

#### 1. Create .env file

```cmd
cd frontend
echo VITE_API_URL=http://localhost:5000/api > .env
```

#### 2. Verify .env contents

Open `frontend/.env` and ensure it contains:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Method 1: Using Batch Scripts (Easiest)

From project root directory:

```cmd
# One-time setup
setup.bat

# Start both servers
start.bat
```

### Method 2: Manual Start

#### Terminal 1 - Backend

```cmd
cd backend
npm run dev
```

**Expected output:**
```
[nodemon] starting `node server.js`
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

#### Terminal 2 - Frontend

```cmd
cd frontend
npm run dev
```

**Expected output:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## Creating Test Accounts

### Method 1: Via UI (Recommended)

1. Go to http://localhost:3000
2. Click "Sign up"
3. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Sign Up"
5. You're logged in automatically!

### Method 2: Via API (For Admin)

Use Postman, Insomnia, or curl:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

### Method 3: Via MongoDB

```cmd
# Connect to MongoDB
mongosh

# Use the database
use digital-banking

# Create admin user
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)
```

---

## Troubleshooting

### Issue 1: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution 1 - Find and kill process:**
```cmd
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Solution 2 - Change port:**

Edit `backend/.env`:
```env
PORT=5001
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### Issue 2: MongoDB Connection Error

**Error:**
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

1. **Check if MongoDB is running:**
   ```cmd
   # For MongoDB service
   net start MongoDB
   
   # Or start manually
   mongod
   ```

2. **For MongoDB Atlas:**
   - Verify connection string
   - Check IP whitelist (add 0.0.0.0/0 for testing)
   - Verify database user credentials

3. **Check MONGO_URI in .env:**
   ```env
   # Local
   MONGO_URI=mongodb://localhost:27017/digital-banking
   
   # Atlas
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/digital-banking
   ```

### Issue 3: Module Not Found

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```cmd
# Navigate to appropriate directory
cd backend
# or
cd frontend

# Delete and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue 4: CORS Error

**Error (in browser console):**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**

1. Ensure backend is running on port 5000
2. Check `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart both servers

### Issue 5: Vite Not Found

**Error:**
```
'vite' is not recognized as an internal or external command
```

**Solution:**
```cmd
cd frontend
npm install vite --save-dev
```

### Issue 6: Tailwind Styles Not Loading

**Solution:**
```cmd
cd frontend

# Rebuild
npm run build

# Restart dev server
npm run dev
```

### Issue 7: JWT Token Invalid

**Error:**
```
Not authorized, token failed
```

**Solution:**

1. Clear browser localStorage:
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Local Storage
   - Refresh page

2. Verify JWT_SECRET is same in .env:
   ```env
   JWT_SECRET=same_secret_everywhere
   ```

3. Log out and log in again

### Issue 8: Cannot Register Users

**Error:**
```
User already exists
```

**Solution:**

1. Use different email address
2. Or delete existing user from MongoDB:
   ```cmd
   mongosh
   use digital-banking
   db.users.deleteOne({ email: "test@example.com" })
   ```

### Issue 9: Accounts Not Showing

**Solution:**

1. Check if backend is running
2. Open browser DevTools (F12)
3. Check Console for errors
4. Check Network tab for failed requests
5. Verify token is being sent:
   - Network tab → Request Headers
   - Should see: `Authorization: Bearer <token>`

### Issue 10: Transfer Fails

**Error:**
```
Insufficient balance
```

**Solution:**

1. Check sender account balance
2. Ensure amount is less than balance
3. For testing, update balance in MongoDB:
   ```cmd
   mongosh
   use digital-banking
   db.accounts.updateOne(
     { _id: ObjectId("account_id") },
     { $set: { balance: 10000 } }
   )
   ```

---

## Common Issues

### Windows Firewall

If MongoDB or servers can't start:
1. Allow Node.js through firewall
2. Allow MongoDB through firewall
3. Or temporarily disable firewall for testing

### Antivirus Software

Some antivirus may block:
1. Add project folder to exclusions
2. Allow Node.js and MongoDB executables

### Environment Variables Not Loading

```cmd
# Ensure .env file exists
dir backend\.env
dir frontend\.env

# Check contents
type backend\.env
type frontend\.env
```

### Browser Cache

If updates not showing:
1. Hard refresh: Ctrl + Shift + R
2. Clear browser cache
3. Open in incognito mode

---

## Verification Checklist

Before asking for help, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] MongoDB is running (`mongod` or Atlas)
- [ ] Backend dependencies installed (`backend\node_modules` exists)
- [ ] Frontend dependencies installed (`frontend\node_modules` exists)
- [ ] Backend .env file exists and configured
- [ ] Frontend .env file exists and configured
- [ ] Backend server is running (http://localhost:5000)
- [ ] Frontend server is running (http://localhost:3000)
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] No errors in browser console (F12)

---

## Getting Help

### 1. Check Logs

**Backend logs:**
- Look at the terminal running `npm run dev`
- Check for error messages

**Frontend logs:**
- Open browser DevTools (F12)
- Check Console tab
- Check Network tab for failed requests

**MongoDB logs:**
- If using local MongoDB, check MongoDB logs
- Location: `C:\Program Files\MongoDB\Server\6.0\log\mongod.log`

### 2. Debug Mode

Enable debug mode for more information:

**Backend:**
```cmd
set DEBUG=* && npm run dev
```

**Frontend:**
Open browser DevTools (F12) before loading

### 3. Test API Directly

Use curl or Postman to test backend:

```bash
# Test health
curl http://localhost:5000

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

### 4. Check System Requirements

- Windows 10/11
- 4GB RAM minimum
- 500MB free disk space
- Internet connection (for MongoDB Atlas)

---

## Success Indicators

You know everything is working when:

✅ Backend shows:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

✅ Frontend shows:
```
➜  Local:   http://localhost:3000/
```

✅ Browser shows login page without errors

✅ You can register and login successfully

✅ Dashboard displays after login

✅ You can transfer money

✅ Transactions appear in history

---

## Quick Commands Reference

```cmd
# Setup (one time)
setup.bat

# Start servers
start.bat

# Or manually:
cd backend && npm run dev      # Terminal 1
cd frontend && npm run dev     # Terminal 2

# Stop servers
Ctrl + C (in each terminal)

# Reinstall dependencies
cd backend && npm install
cd frontend && npm install

# Clear and reinstall
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install

# Check MongoDB
mongosh
show dbs
use digital-banking
show collections
```

---

## Need More Help?

1. Read the documentation:
   - README.md
   - QUICKSTART.md
   - PROJECT_COMPLETE.md

2. Check the code:
   - backend/README.md
   - frontend/README.md

3. Review error messages carefully

4. Google the specific error

5. Check Node.js and MongoDB documentation

---

**Installation complete! Enjoy your Digital Banking Dashboard! 🎉**
