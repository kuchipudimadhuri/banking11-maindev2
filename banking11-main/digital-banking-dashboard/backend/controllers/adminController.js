import User from '../models/User.js';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('accounts').select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions (admin view)
// @route   GET /api/admin/transactions
// @access  Private/Admin
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('senderAccount', 'accountNumber accountType user')
      .populate('receiverAccount', 'accountNumber accountType user')
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Freeze/Unfreeze account
// @route   PUT /api/admin/freeze/:id
// @access  Private/Admin
export const toggleFreezeAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.isFrozen = !account.isFrozen;
    await account.save();

    res.json({
      message: `Account ${account.isFrozen ? 'frozen' : 'unfrozen'} successfully`,
      account,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve/Disapprove user
// @route   PUT /api/admin/approve/:id
// @access  Private/Admin
export const toggleApproveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isApproved = !user.isApproved;
    await user.save();

    res.json({
      message: `User ${user.isApproved ? 'approved' : 'disapproved'} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete all accounts associated with user
    await Account.deleteMany({ user: user._id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAccounts = await Account.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    
    const accounts = await Account.find({});
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    const recentTransactions = await Transaction.find({})
      .sort({ date: -1 })
      .limit(10)
      .populate('senderAccount', 'accountNumber')
      .populate('receiverAccount', 'accountNumber');

    res.json({
      totalUsers,
      totalAccounts,
      totalTransactions,
      totalBalance,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
