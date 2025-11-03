# 🚀 Quick Start Guide - Digital Banking Dashboard

Follow these steps to get the application running on your local machine in minutes!

## 📋 Prerequisites Checklist

- [ ] Node.js installed (v14 or higher) - [Download](https://nodejs.org/)
- [ ] MongoDB installed locally OR MongoDB Atlas account - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Git installed (optional) - [Download](https://git-scm.com/)
- [ ] Code editor (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🏃‍♂️ Quick Start Steps

### Step 1: Install Dependencies

Open two terminal windows (one for backend, one for frontend)

**Terminal 1 - Backend:**
```cmd
cd backend
npm install
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env):**
```cmd
cd backend
copy .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/digital-banking
JWT_SECRET=my_secret_key_12345
NODE_ENV=development
```

**Frontend (.env):**
```cmd
cd frontend
echo VITE_API_URL=http://localhost:5000/api > .env
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```cmd
# In a new terminal
mongod
```

**Option B - MongoDB Atlas:**
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `MONGO_URI` in backend/.env

### Step 4: Start the Application

**Terminal 1 - Start Backend:**
```cmd
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

**Terminal 2 - Start Frontend:**
```cmd
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 👤 Create Your First Account

1. Click "Sign up" on the login page
2. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123 (minimum 6 characters)
3. Click "Sign Up"
4. You'll be automatically logged in with a default savings account!

## 🎯 Test Money Transfer

1. From your dashboard, note your account number
2. Create a second test account (register with different email)
3. Transfer money between accounts:
   - From Account: Select your account
   - To Account Number: Enter second account number
   - Amount: Enter amount (e.g., 100)
   - Click "Transfer"

## 🔧 Troubleshooting

### Problem: MongoDB connection error

**Solution:**
- Ensure MongoDB is running (`mongod` command)
- Check MONGO_URI in .env is correct
- For Atlas, check IP whitelist settings

### Problem: Port already in use

**Solution:**
```cmd
# Change port in backend/.env
PORT=5001

# Update frontend/.env
VITE_API_URL=http://localhost:5001/api
```

### Problem: Module not found errors

**Solution:**
```cmd
# Delete node_modules and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Problem: CORS errors

**Solution:**
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Restart both servers

### Problem: Tailwind styles not loading

**Solution:**
```cmd
cd frontend
npm run build
npm run dev
```

## 🎨 Create Admin Account

### Method 1: Via Registration (Modify backend code temporarily)

In `backend/controllers/authController.js`, temporarily add:
```javascript
role: 'admin',  // Add this line in register function
```

Then register normally and change it back.

### Method 2: Via MongoDB

```cmd
# Connect to MongoDB
mongosh

# Use your database
use digital-banking

# Update a user to admin
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### Method 3: Via API Tool (Postman/Insomnia)

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

## 📱 Testing the Application

### User Features to Test:
- ✅ Register new account
- ✅ Login with credentials
- ✅ View account balance
- ✅ Transfer money
- ✅ View transaction history
- ✅ View charts/statistics

### Admin Features to Test:
- ✅ View all users
- ✅ View all transactions
- ✅ Freeze/unfreeze accounts
- ✅ Delete users
- ✅ View system statistics

## 🔄 Development Workflow

### Making Changes

1. **Backend changes:**
   - Edit files in `backend/`
   - Server auto-restarts with nodemon
   - Test API with Postman or frontend

2. **Frontend changes:**
   - Edit files in `frontend/src/`
   - Vite hot-reloads automatically
   - See changes immediately in browser

### Recommended VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- MongoDB for VS Code
- Thunder Client (API testing)

## 📊 Sample Data for Testing

### Create Multiple Accounts

Register these test users:

```
User 1:
- Name: John Doe
- Email: john@test.com
- Password: password123

User 2:
- Name: Jane Smith
- Email: jane@test.com
- Password: password123

Admin:
- Name: Admin User
- Email: admin@test.com
- Password: admin123
- Role: admin (set via MongoDB or backend)
```

### Test Transfers

1. Login as John
2. Note his account number
3. Login as Jane
4. Transfer $100 to John's account
5. Check both transaction histories

## 🌐 Ready for Production?

Once testing is complete, see:
- [Backend README](./backend/README.md) - For backend deployment
- [Frontend README](./frontend/README.md) - For frontend deployment
- [Main README](./README.md) - For full documentation

## ✅ Checklist Before Deployment

- [ ] Change JWT_SECRET to strong random string
- [ ] Use MongoDB Atlas for production database
- [ ] Enable environment-specific CORS
- [ ] Remove console.log statements
- [ ] Test all features thoroughly
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure proper logging
- [ ] Set up SSL certificates
- [ ] Test with production API URLs
- [ ] Create backup strategy

## 💡 Tips

- Keep both terminals visible while developing
- Use MongoDB Compass for database visualization
- Install React DevTools browser extension
- Use Thunder Client or Postman for API testing
- Check browser console for frontend errors
- Check terminal for backend errors

## 🆘 Need Help?

- Check the [main README](./README.md) for detailed documentation
- Review [backend README](./backend/README.md) for API details
- Review [frontend README](./frontend/README.md) for UI details
- Open an issue on GitHub
- Check MongoDB logs: `mongod --logpath log.txt`

---

**Happy Coding! 🎉**

If everything is working, you should have:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ MongoDB connected and storing data
- ✅ Ability to register, login, and transfer money
