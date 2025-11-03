import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';
import mongoose from 'mongoose';

// @desc    Transfer money between accounts
// @route   POST /api/transactions/transfer
// @access  Private
export const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { senderAccountId, receiverAccountNumber, amount } = req.body;

    // Validate amount
    if (amount <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Get sender account
    const senderAccount = await Account.findById(senderAccountId).session(session);

    if (!senderAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Sender account not found' });
    }

    // Check if user owns the sender account
    if (senderAccount.user.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if account is frozen
    if (senderAccount.isFrozen) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: 'Account is frozen' });
    }

    // Get receiver account
    const receiverAccount = await Account.findOne({
      accountNumber: receiverAccountNumber,
    }).session(session);

    if (!receiverAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Receiver account not found' });
    }

    // Check if receiver account is frozen
    if (receiverAccount.isFrozen) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: 'Receiver account is frozen' });
    }

    // Check sufficient balance
    if (senderAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update balances
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    // Create debit transaction for sender
    const debitTransaction = await Transaction.create(
      [
        {
          senderAccount: senderAccount._id,
          receiverAccount: receiverAccount._id,
          amount,
          type: 'debit',
          status: 'success',
          description: `Transfer to ${receiverAccountNumber}`,
        },
      ],
      { session }
    );

    // Create credit transaction for receiver
    const creditTransaction = await Transaction.create(
      [
        {
          senderAccount: senderAccount._id,
          receiverAccount: receiverAccount._id,
          amount,
          type: 'credit',
          status: 'success',
          description: `Transfer from ${senderAccount.accountNumber}`,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Transfer successful',
      debitTransaction: debitTransaction[0],
      creditTransaction: creditTransaction[0],
      newBalance: senderAccount.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get transactions for a user
// @route   GET /api/transactions/:userId
// @access  Private
export const getUserTransactions = async (req, res) => {
  try {
    // Check if user is requesting their own transactions or is admin
    if (
      req.user._id.toString() !== req.params.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Get all accounts for the user
    const accounts = await Account.find({ user: req.params.userId });
    const accountIds = accounts.map((account) => account._id);

    // Get all transactions for these accounts
    const transactions = await Transaction.find({
      $or: [
        { senderAccount: { $in: accountIds } },
        { receiverAccount: { $in: accountIds } },
      ],
    })
      .populate('senderAccount', 'accountNumber accountType')
      .populate('receiverAccount', 'accountNumber accountType')
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get transactions for a specific account
// @route   GET /api/transactions/account/:accountId
// @access  Private
export const getAccountTransactions = async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if user owns the account or is admin
    if (
      account.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const transactions = await Transaction.find({
      $or: [
        { senderAccount: req.params.accountId },
        { receiverAccount: req.params.accountId },
      ],
    })
      .populate('senderAccount', 'accountNumber accountType')
      .populate('receiverAccount', 'accountNumber accountType')
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
