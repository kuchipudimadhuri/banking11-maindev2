import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChartCard from '../components/ChartCard';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [usersRes, transactionsRes, statsRes] = await Promise.all([
        adminAPI.getAllUsers(),
        adminAPI.getAllTransactions(),
        adminAPI.getDashboardStats(),
      ]);

      setUsers(usersRes.data);
      setTransactions(transactionsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFreezeAccount = async (accountId) => {
    try {
      await adminAPI.toggleFreezeAccount(accountId);
      fetchData();
    } catch (error) {
      console.error('Error freezing account:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        fetchData();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
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
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage users and monitor system activity</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <p className="text-sm opacity-90">Total Users</p>
                <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
              </div>
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <p className="text-sm opacity-90">Total Accounts</p>
                <p className="text-3xl font-bold">{stats?.totalAccounts || 0}</p>
              </div>
              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                <p className="text-sm opacity-90">Total Transactions</p>
                <p className="text-3xl font-bold">{stats?.totalTransactions || 0}</p>
              </div>
              <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                <p className="text-sm opacity-90">Total Balance</p>
                <p className="text-3xl font-bold">
                  ${stats?.totalBalance?.toFixed(2) || 0}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'users'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Users
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'transactions'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Transactions
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {stats?.recentTransactions?.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction._id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {transaction.senderAccount?.accountNumber} →{' '}
                            {transaction.receiverAccount?.accountNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleString()}
                          </p>
                        </div>
                        <p className="font-semibold text-green-600">
                          ${transaction.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-semibold">{users.filter(u => u.isApproved).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Frozen Accounts</span>
                      <span className="font-semibold">
                        {users.reduce((sum, u) => sum + u.accounts.filter(a => a.isFrozen).length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending Approvals</span>
                      <span className="font-semibold">{users.filter(u => !u.isApproved).length}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="card overflow-x-auto">
                <h3 className="text-xl font-bold mb-4">All Users</h3>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Role</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Accounts</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3 text-sm">{user.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">{user.accounts?.length || 0}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              user.isApproved
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {user.isApproved ? 'Active' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            {user.accounts?.map((account) => (
                              <button
                                key={account._id}
                                onClick={() => handleFreezeAccount(account._id)}
                                className="text-xs px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                              >
                                {account.isFrozen ? 'Unfreeze' : 'Freeze'}
                              </button>
                            ))}
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="card overflow-x-auto">
                <h3 className="text-xl font-bold mb-4">All Transactions</h3>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">From</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">To</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Amount</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.slice(0, 20).map((transaction) => (
                      <tr key={transaction._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          {new Date(transaction.date).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {transaction.senderAccount?.accountNumber}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {transaction.receiverAccount?.accountNumber}
                        </td>
                        <td className="px-4 py-3 font-medium text-green-600">
                          ${transaction.amount}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              transaction.status === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
