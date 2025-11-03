import User from '../models/User.js';
import Account from '../models/Account.js';

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('accounts');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user accounts
// @route   GET /api/users/:id/accounts
// @access  Private
export const getUserAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.params.id });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new account
// @route   POST /api/users/:id/accounts
// @access  Private
export const createAccount = async (req, res) => {
  try {
    const { accountType } = req.body;

    // Check if user is creating account for themselves
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Enforce single account per user (constant account number per email)
    const existing = await Account.findOne({ user: req.params.id });
    if (existing) {
      return res.status(200).json(existing);
    }

    const account = await Account.create({
      user: req.params.id,
      accountType,
      balance: 0,
    });

    // Add account to user
    await User.findByIdAndUpdate(req.params.id, {
      $push: { accounts: account._id },
    });

    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
