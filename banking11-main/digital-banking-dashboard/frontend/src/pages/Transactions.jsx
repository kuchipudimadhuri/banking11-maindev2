import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TransactionTable from '../components/TransactionTable';
import { useAuth } from '../context/AuthContext';
import { transactionAPI, userAPI } from '../services/api';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    accountId: '',
    type: 'all',
    status: 'all',
    q: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await transactionAPI.getUserTransactions(user._id);
        setTransactions(res.data);
      } catch (e) {
        console.error('Failed to load transactions', e);
      } finally {
        setLoading(false);
      }
    };
    const fetchAccounts = async () => {
      try {
        const res = await userAPI.getUserAccounts(user._id);
        setAccounts(res.data);
      } catch (e) {
        console.error('Failed to load accounts', e);
      }
    };

    if (user?._id) {
      fetchTransactions();
      fetchAccounts();
    }
  }, [user]);

  // Initialize account filter from URL
  useEffect(() => {
    const accountId = searchParams.get('accountId');
    if (accountId) {
      setFilters((f) => ({ ...f, accountId }));
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.accountId && t.accountId !== filters.accountId) return false;
      if (filters.type !== 'all' && t.type !== filters.type) return false;
      if (filters.status !== 'all' && t.status !== filters.status) return false;
      if (filters.q) {
        const q = filters.q.toLowerCase();
        const hay = `${t.description || ''} ${t.accountNumber || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.from) {
        if (new Date(t.date) < new Date(filters.from)) return false;
      }
      if (filters.to) {
        if (new Date(t.date) > new Date(filters.to)) return false;
      }
      return true;
    });
  }, [transactions, filters]);

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
              <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
              <p className="text-gray-600">Review your recent activity</p>
            </div>

            {/* Filters */}
            <div className="card mb-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <label className="auth-label">Account</label>
                  <select
                    className="input-field"
                    value={filters.accountId}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFilters((f) => ({ ...f, accountId: v }));
                      const next = new URLSearchParams(searchParams);
                      if (v) next.set('accountId', v); else next.delete('accountId');
                      setSearchParams(next);
                    }}
                  >
                    <option value="">All Accounts</option>
                    {accounts.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.accountType.toUpperCase()} • {a.accountNumber.slice(-4)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="auth-label">Type</label>
                  <select
                    className="input-field"
                    value={filters.type}
                    onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                  >
                    <option value="all">All</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">Status</label>
                  <select
                    className="input-field"
                    value={filters.status}
                    onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                  >
                    <option value="all">All</option>
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">Search</label>
                  <input
                    className="input-field"
                    placeholder="Description or account"
                    value={filters.q}
                    onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="auth-label">From</label>
                  <input
                    type="date"
                    className="input-field"
                    value={filters.from}
                    onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="auth-label">To</label>
                  <input
                    type="date"
                    className="input-field"
                    value={filters.to}
                    onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <TransactionTable transactions={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
