import express from 'express';
import {
  getUserById,
  getUserAccounts,
  createAccount,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getUserById);
router.get('/:id/accounts', protect, getUserAccounts);
router.post('/:id/accounts', protect, createAccount);

export default router;
