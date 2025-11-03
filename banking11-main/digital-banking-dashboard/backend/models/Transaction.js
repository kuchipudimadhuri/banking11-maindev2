import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    senderAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    receiverAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please specify transaction amount'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ['debit', 'credit'],
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'success',
    },
    description: {
      type: String,
      default: 'Fund Transfer',
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
