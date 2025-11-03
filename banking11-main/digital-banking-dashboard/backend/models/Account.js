import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountType: {
      type: String,
      enum: ['savings', 'current'],
      required: [true, 'Please specify account type'],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, 'Balance cannot be negative'],
    },
    accountNumber: {
      type: String,
      unique: true,
      required: true,
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure accountNumber is present before validation; auto-generate if missing
accountSchema.pre('validate', async function (next) {
  if (this.accountNumber) return next();

  const generateAccountNumber = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString(); // 12 digits
  };

  let accountNumber = generateAccountNumber();
  let accountExists = await mongoose.models.Account.findOne({ accountNumber });
  while (accountExists) {
    accountNumber = generateAccountNumber();
    accountExists = await mongoose.models.Account.findOne({ accountNumber });
  }

  this.accountNumber = accountNumber;
  next();
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
