import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AccountCard from '../components/AccountCard';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const Accounts = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await userAPI.getUserAccounts(user._id);
      setAccounts(res.data);
    } catch (e) {
      console.error('Failed to load accounts', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAccounts();
  }, [user]);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [form, setForm] = useState({ accountType: 'savings', accountNumber: '', initialDeposit: '' });

  const onCreate = async (e) => {
    e.preventDefault();
    setCreateError('');
    setCreating(true);
    try {
      const generatedIfBlank = (val) => val && String(val).trim().length > 0
        ? String(val).trim()
        : Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
      await userAPI.createAccount(user._id, {
        accountType: form.accountType,
        accountNumber: generatedIfBlank(form.accountNumber),
        initialDeposit: parseFloat(form.initialDeposit || '0') || 0,
      });
      setForm({ accountType: 'savings', accountNumber: '', initialDeposit: '' });
      await fetchAccounts();
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Accounts</h1>
              <p className="text-gray-600">View and manage your bank accounts</p>
            </div>

            {/* Create Account */}
            <div className="card mb-8 max-w-xl">
              <h2 className="text-xl font-bold mb-4">Open a new account</h2>
              {createError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{createError}</div>
              )}
              <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="auth-label">Account Type</label>
                  <select
                    value={form.accountType}
                    onChange={(e) => setForm((f) => ({ ...f, accountType: e.target.value }))}
                    className="input-field"
                  >
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">Account Number</label>
                  <input
                    type="text"
                    value={form.accountNumber}
                    onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))}
                    className="input-field"
                    placeholder="e.g. 123456789012"
                  />
                </div>
                <div>
                  <label className="auth-label">Initial Deposit</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.initialDeposit}
                    onChange={(e) => setForm((f) => ({ ...f, initialDeposit: e.target.value }))}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <button type="submit" disabled={creating} className="btn-primary w-full">
                    {creating ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>

            {/* List Accounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <div key={account._id} className="space-y-3">
                  <AccountCard account={account} />
                  <div className="flex gap-2">
                    <Link to={`/transactions?accountId=${account._id}`} className="btn-secondary w-full text-center">
                      View Transactions
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
