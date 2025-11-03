import { useState } from 'react';
import { transactionAPI } from '../services/api';

const TransferForm = ({ accounts, onTransferSuccess }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
  const [formData, setFormData] = useState({
    senderAccountId: '',
    receiverAccountNumber: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await transactionAPI.transfer({
        senderAccountId: formData.senderAccountId,
        receiverAccountNumber: formData.receiverAccountNumber,
        amount: parseFloat(formData.amount),
      });

      setSuccess(`Transfer successful! New balance: ${formatCurrency(data.newBalance)}`);
      setFormData({
        senderAccountId: '',
        receiverAccountNumber: '',
        amount: '',
      });

      if (onTransferSuccess) {
        onTransferSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Transfer Money</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Account
          </label>
          <select
            name="senderAccountId"
            value={formData.senderAccountId}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select account</option>
            {accounts &&
              accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.accountType.toUpperCase()} - {account.accountNumber} ($
                  {account.balance})
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Account Number
          </label>
          <input
            type="text"
            name="receiverAccountNumber"
            value={formData.receiverAccountNumber}
            onChange={handleChange}
            placeholder="Enter receiver account number"
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            required
            className="input-field"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
