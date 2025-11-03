import express from 'express';
import {
  transferMoney,
  getUserTransactions,
  getAccountTransactions,
} from '../controllers/transactionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/transfer', protect, transferMoney);
router.get('/:userId', protect, getUserTransactions);
router.get('/account/:accountId', protect, getAccountTransactions);

export default router;
