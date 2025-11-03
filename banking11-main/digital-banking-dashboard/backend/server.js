import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './utils/errorHandler.js';
import rateLimiter from './middlewares/rateLimiter.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigin = process.env.CLIENT_ORIGIN;
app.use(
  cors(
    allowedOrigin
      ? { origin: allowedOrigin, credentials: true }
      : { origin: '*', credentials: true }
  )
);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Digital Banking API is running...' });
});

// Light rate limits on sensitive routes
app.use('/api/auth', rateLimiter({ key: 'auth', windowMs: 60_000, max: 20 }), authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', rateLimiter({ key: 'transfer', windowMs: 60_000, max: 30 }), transactionRoutes);
app.use('/api/admin', adminRoutes);

// Error handler middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
