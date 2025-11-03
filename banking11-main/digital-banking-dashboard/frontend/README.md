# Digital Banking Dashboard - Frontend

A modern, responsive banking dashboard built with React, Vite, and Tailwind CSS.

## Features

- **User Authentication**: Login and registration with JWT
- **Dashboard**: Overview of accounts, transactions, and statistics
- **Account Management**: View multiple accounts and balances
- **Money Transfer**: Secure transfers between accounts
- **Transaction History**: Detailed transaction records
- **Admin Panel**: User management and system monitoring
- **Responsive Design**: Mobile-friendly interface
- **Charts & Visualizations**: Financial data visualization with Recharts

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create `.env` file:
   ```bash
   copy NUL .env
   ```

   Add the following:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

   For production, update with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Sidebar.jsx      # Sidebar navigation
│   │   ├── AccountCard.jsx  # Account display card
│   │   ├── TransactionTable.jsx  # Transaction list
│   │   ├── TransferForm.jsx # Money transfer form
│   │   └── ChartCard.jsx    # Chart component
│   ├── pages/                # Page components
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── UserDashboard.jsx    # User dashboard
│   │   └── AdminDashboard.jsx   # Admin dashboard
│   ├── context/              # React Context
│   │   └── AuthContext.jsx  # Authentication context
│   ├── services/             # API services
│   │   └── api.js           # Axios configuration
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Guide

### User Dashboard

- **Account Overview**: View all your accounts and balances
- **Transaction History**: See recent transactions
- **Money Transfer**: Transfer funds between accounts
- **Charts**: Visual representation of account distribution

### Admin Dashboard

- **User Management**: View and manage all users
- **Account Control**: Freeze/unfreeze accounts
- **Transaction Monitoring**: View all system transactions
- **Statistics**: System-wide analytics

### Authentication

- **Login**: Email and password authentication
- **Register**: Create new user account
- **Protected Routes**: Automatic redirection based on auth status
- **Role-Based Access**: Admin and user role separation

## Customization

### Tailwind Configuration

Edit `tailwind.config.js` to customize colors, fonts, and other design tokens:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
},
```

### API Configuration

Update `src/services/api.js` to modify API endpoints or add interceptors.

## Demo Credentials

After starting both backend and frontend, you can use these credentials:

**User Account:**
- Email: user@example.com
- Password: password123

**Admin Account:**
- Email: admin@example.com  
- Password: admin123

(Note: You need to create these accounts first via registration or directly in MongoDB)

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Configure environment variables in Netlify dashboard

### Important: Update API URL

When deploying, make sure to update `VITE_API_URL` to point to your deployed backend URL.

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your backend has CORS properly configured:

```javascript
app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
}));
```

### API Connection Issues

Verify that:
1. Backend server is running
2. `.env` file has correct API URL
3. No firewall blocking the connection

### Build Issues

Clear cache and reinstall:
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Charting library
- **Context API**: State management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
