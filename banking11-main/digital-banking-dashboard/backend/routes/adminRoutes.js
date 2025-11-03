import express from 'express';
import {
  getAllUsers,
  getAllTransactions,
  toggleFreezeAccount,
  toggleApproveUser,
  deleteUser,
  getDashboardStats,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect);
router.use(admin);

router.get('/users', getAllUsers);
router.get('/transactions', getAllTransactions);
router.get('/stats', getDashboardStats);
router.put('/freeze/:id', toggleFreezeAccount);
router.put('/approve/:id', toggleApproveUser);
router.delete('/users/:id', deleteUser);

export default router;
