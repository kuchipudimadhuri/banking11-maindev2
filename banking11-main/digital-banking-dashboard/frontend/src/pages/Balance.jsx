import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const Balance = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAccounts = async (showSpinner = true) => {
    try {
      if (showSpinner) setLoading(true);
      const res = await userAPI.getUserAccounts(user._id);
      setAccounts(res.data);
    } catch (e) {
      console.error('Failed to load accounts', e);
    } finally {
      if (showSpinner) setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAccounts(true);
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAccounts(false);
    setRefreshing(false);
  };

  const totalBalance = useMemo(
    () => accounts.reduce((sum, acc) => sum + acc.balance, 0),
    [accounts]
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);

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
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Check Balance</h1>
                <p className="text-gray-600">View balances across all of your accounts</p>
              </div>
              <button onClick={onRefresh} disabled={refreshing} className="btn-secondary">
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
              </div>
              <div className="card">
                <p className="text-sm text-gray-600">Number of Accounts</p>
                <p className="text-3xl font-bold text-gray-900">{accounts.length}</p>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold mb-4">Balances by Account</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Account Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {accounts.map((acc) => (
                      <tr key={acc._id}>
                        <td className="px-6 py-3 capitalize">{acc.accountType}</td>
                        <td className="px-6 py-3 font-mono">{acc.accountNumber}</td>
                        <td className="px-6 py-3 font-semibold text-gray-900">{formatCurrency(acc.balance)}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full border ${acc.isFrozen ? 'border-red-300 text-red-700 bg-red-50' : 'border-green-300 text-green-700 bg-green-50'}`}>
                            {acc.isFrozen ? 'Inactive' : 'Active'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
