const TransactionTable = ({ transactions }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type) => {
    return type === 'credit' ? '💰' : '💸';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '📋';
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="card-gradient">
        <div className="text-center py-16">
          <div className="text-7xl mb-4 animate-float">💳</div>
          <p className="text-xl text-gray-600 font-medium">No transactions yet</p>
          <p className="text-sm text-gray-400 mt-2">Your transaction history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-gradient overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="text-3xl animate-pulse">📊</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recent Transactions
          </h2>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
          <span className="text-sm font-semibold text-gray-700">
            {transactions.length} {transactions.length === 1 ? 'Transaction' : 'Transactions'}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction, index) => (
              <tr 
                key={transaction._id} 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer group"
                style={{ 
                  animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both` 
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                      📅
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(transaction.date).split(',')[0]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(transaction.date).split(',')[1]}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl transform group-hover:scale-125 transition-transform duration-300">
                      {getTransactionIcon(transaction.type)}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                        transaction.type === 'credit'
                          ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                          : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
                      }`}
                    >
                      {transaction.type.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                    {transaction.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <span
                      className={`text-lg font-bold transform group-hover:scale-110 transition-transform duration-300 ${
                        transaction.type === 'credit'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl transform group-hover:scale-125 transition-transform duration-300">
                      {getStatusIcon(transaction.status)}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                        transaction.status === 'success'
                          ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                          : transaction.status === 'failed'
                          ? 'bg-gradient-to-r from-red-400 to-red-600 text-white'
                          : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                      }`}
                    >
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="mt-6 pt-4 border-t-2 border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{transactions.length}</span> recent transactions
          </span>
          <button className="btn-primary text-sm py-2 px-4 hover:scale-105 transition-transform">
            View All →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
