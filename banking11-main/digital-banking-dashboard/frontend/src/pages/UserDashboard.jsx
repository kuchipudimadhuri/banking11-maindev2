import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionAPI, userAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AccountCard from '../components/AccountCard';
import TransactionTable from '../components/TransactionTable';
import TransferForm from '../components/TransferForm';
import ChartCard from '../components/ChartCard';
import { useSearchParams } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAcctBanner, setShowAcctBanner] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (searchParams.get('showAccount') === '1') {
      setShowAcctBanner(true);
      const next = new URLSearchParams(searchParams);
      next.delete('showAccount');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch accounts
      const accountsResponse = await userAPI.getUserAccounts(user._id);
      setAccounts(accountsResponse.data);

      // Fetch transactions
      const transactionsResponse = await transactionAPI.getUserTransactions(user._id);
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateChartData = () => {
    // Calculate income vs expenses for last 6 months
    const monthlyData = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthName = date.toLocaleString('default', { month: 'short' });

      if (!monthlyData[monthName]) {
        monthlyData[monthName] = { income: 0, expenses: 0 };
      }

      if (transaction.type === 'credit') {
        monthlyData[monthName].income += transaction.amount;
      } else {
        monthlyData[monthName].expenses += transaction.amount;
      }
    });

    return months.map((month) => ({
      name: month,
      Income: monthlyData[month]?.income || 0,
      Expenses: monthlyData[month]?.expenses || 0,
    }));
  };

  const getAccountTypeDistribution = () => {
    const distribution = {};
    accounts.forEach((account) => {
      if (!distribution[account.accountType]) {
        distribution[account.accountType] = 0;
      }
      distribution[account.accountType] += account.balance;
    });

    return Object.keys(distribution).map((type) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: distribution[type],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {showAcctBanner && accounts.length > 0 && (
              <div className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-700">Your account number</p>
                  <p className="font-mono font-semibold text-gray-900 mt-1">
                    {String(accounts[0].accountNumber).replace(/(.{4})/g, '$1 ').trim()}
                  </p>
                </div>
                <button className="btn-secondary" onClick={() => setShowAcctBanner(false)}>Dismiss</button>
              </div>
            )}
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">Here's your financial overview</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <p className="text-sm opacity-90">Total Balance</p>
                <p className="text-3xl font-bold">{formatCurrency(totalBalance)}</p>
              </div>
              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                <p className="text-sm opacity-90">Total Income</p>
                <p className="text-3xl font-bold">{formatCurrency(totalIncome)}</p>
              </div>
              <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
                <p className="text-sm opacity-90">Total Expenses</p>
                <p className="text-3xl font-bold">{formatCurrency(totalExpenses)}</p>
              </div>
            </div>

            {/* Accounts */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                My Accounts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                  <AccountCard key={account._id} account={account} />
                ))}
              </div>
            </div>

            {/* Transfer Form and Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <TransferForm accounts={accounts} onTransferSuccess={fetchData} />
              <ChartCard
                title="Account Distribution"
                data={getAccountTypeDistribution()}
                type="pie"
              />
            </div>

            {/* Transactions */}
            <div>
              <TransactionTable transactions={transactions.slice(0, 10)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
