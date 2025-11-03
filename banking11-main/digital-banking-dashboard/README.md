# 🏦 Digital Banking Dashboard

A complete MERN Stack banking application with user authentication, account management, money transfers, and admin panel.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Digital Banking Dashboard is a full-stack web application that simulates a modern banking system. It provides comprehensive banking features including user authentication, multiple account management, secure money transfers, transaction history, and an admin panel for system management.

## ✨ Features

### User Features
- 🔐 **Secure Authentication**: JWT-based login and registration
- 💳 **Multiple Accounts**: Manage savings and current accounts
- 💸 **Money Transfers**: Secure fund transfers between accounts
- 📊 **Transaction History**: Detailed transaction records with filters
- 📈 **Financial Charts**: Visual representation of account data
- 🎨 **Responsive Design**: Mobile-friendly interface

### Admin Features
- 👥 **User Management**: View and manage all users
- 🔒 **Account Control**: Freeze/unfreeze accounts
- 📉 **System Analytics**: Dashboard with key metrics
- 💼 **Transaction Monitoring**: View all system transactions
- ⚙️ **User Approval**: Approve/disapprove new users

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt.js** - Password hashing

## 📁 Project Structure

```
digital-banking-dashboard/
│
├── backend/                    # Backend application
│   ├── config/                 # Configuration files
│   │   └── db.js              # Database connection
│   ├── controllers/            # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── transactionController.js
│   │   └── adminController.js
│   ├── models/                 # Database models
│   │   ├── User.js
│   │   ├── Account.js
│   │   └── Transaction.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── adminRoutes.js
│   ├── middlewares/            # Custom middlewares
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── utils/                  # Utility functions
│   │   ├── errorHandler.js
│   │   └── generateToken.js
│   ├── .env                    # Environment variables
│   ├── .env.example            # Example env file
│   ├── package.json
│   ├── README.md
│   └── server.js               # Entry point
│
└── frontend/                   # Frontend application
    ├── public/                 # Static files
    ├── src/
    │   ├── components/         # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── AccountCard.jsx
    │   │   ├── TransactionTable.jsx
    │   │   ├── TransferForm.jsx
    │   │   └── ChartCard.jsx
    │   ├── pages/              # Page components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── UserDashboard.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── context/            # React Context
    │   │   └── AuthContext.jsx
    │   ├── services/           # API services
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── index.html
    ├── package.json
    ├── README.md
    ├── tailwind.config.js
    └── vite.config.js
```

## 📦 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Clone Repository

```bash
git clone https://github.com/yourusername/digital-banking-dashboard.git
cd digital-banking-dashboard
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Update .env with your configuration
# Edit .env file with your MongoDB URI and JWT secret
```

### Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
echo VITE_API_URL=http://localhost:5000/api > .env
```

## ⚙️ Configuration

### Backend Configuration (.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/digital-banking
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-banking?retryWrites=true&w=majority
```

### Frontend Configuration (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend

# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server runs on: `http://localhost:5000`

### Start Frontend Application

```bash
cd frontend

# Development mode
npm run dev
```

Application runs on: `http://localhost:3000`

### Access the Application

1. Open browser and navigate to `http://localhost:3000`
2. Register a new account or use demo credentials
3. Explore the dashboard features

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login user
GET  /api/auth/me          - Get current user (Protected)
```

### User Endpoints

```
GET  /api/users/:id              - Get user by ID (Protected)
GET  /api/users/:id/accounts     - Get user accounts (Protected)
POST /api/users/:id/accounts     - Create new account (Protected)
```

### Transaction Endpoints

```
POST /api/transactions/transfer            - Transfer money (Protected)
GET  /api/transactions/:userId             - Get user transactions (Protected)
GET  /api/transactions/account/:accountId  - Get account transactions (Protected)
```

### Admin Endpoints (Admin Only)

```
GET    /api/admin/users              - Get all users
GET    /api/admin/transactions       - Get all transactions
GET    /api/admin/stats              - Get dashboard statistics
PUT    /api/admin/freeze/:id         - Freeze/unfreeze account
PUT    /api/admin/approve/:id        - Approve/disapprove user
DELETE /api/admin/users/:id          - Delete user
```

For detailed API documentation, see [Backend README](./backend/README.md)

## 🌐 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Create a new web service on your platform
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy the backend

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder

3. Set environment variable:
   - `VITE_API_URL=https://your-backend-url.com/api`

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP or allow access from anywhere (0.0.0.0/0)
4. Get your connection string
5. Update `MONGO_URI` in backend `.env`

## 📸 Screenshots

### User Dashboard
- View account balances and recent transactions
- Transfer money between accounts
- Visualize financial data with charts

### Admin Dashboard
- Manage all users and their accounts
- Monitor system-wide transactions
- View analytics and statistics

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT-based authentication with 30-day expiration
- ✅ Protected routes with middleware
- ✅ Role-based access control (User/Admin)
- ✅ Input validation on both frontend and backend
- ✅ MongoDB transaction atomicity for transfers
- ✅ CORS configuration for secure API access

## 📝 Creating Admin Account

To create an admin account, you can either:

**Method 1: Via API**
```bash
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

**Method 2: Directly in MongoDB**
```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

## 🧪 Testing

### Test User Accounts

Create test accounts via registration or use these sample credentials (after creating them):

**Regular User:**
- Email: user@example.com
- Password: password123

**Admin User:**
- Email: admin@example.com
- Password: admin123

## 🛣️ Development Roadmap

- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Account statements (PDF generation)
- [ ] Scheduled recurring transfers
- [ ] Notifications system
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/digital-banking-dashboard](https://github.com/yourusername/digital-banking-dashboard)

## 🙏 Acknowledgments

- React.js team for the amazing library
- MongoDB team for the database
- Tailwind CSS for the styling framework
- Recharts for the charting library
- All open-source contributors

---

⭐ **Star this repo if you find it helpful!** ⭐
