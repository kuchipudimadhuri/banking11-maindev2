const AccountCard = ({ account }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getAccountIcon = (type) => {
    return type === 'savings' ? '🏦' : '💼';
  };

  const getGradientClass = (type) => {
    return type === 'savings'
      ? 'from-blue-500 to-blue-700'
      : 'from-purple-500 to-purple-700';
  };

  return (
    <div className={`relative group ${account.isFrozen ? 'opacity-75' : ''}`}>
      <div className={`card-gradient bg-gradient-to-br ${getGradientClass(account.accountType)} 
                     ${account.isFrozen ? 'border-4 border-red-400' : ''} 
                     hover:shadow-glow-lg cursor-pointer`}>
        {/* Frozen Badge */}
        {account.isFrozen && (
          <div className="absolute -top-3 -right-3 z-10">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white bg-red-600 shadow-lg animate-pulse">
              ❄️ Frozen
            </span>
          </div>
        )}

        {/* Card Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
              {getAccountIcon(account.accountType)}
            </div>
            <div>
              <h3 className="text-xl font-bold capitalize tracking-wide">
                {account.accountType} Account
              </h3>
              <p className="text-sm opacity-90 font-mono tracking-wider mt-1">
                •••• {account.accountNumber.slice(-4)}
              </p>
            </div>
          </div>
          
          {/* Card Type Badge */}
          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
            {account.accountType === 'savings' ? '💰 Savings' : '💳 Current'}
          </div>
        </div>

        {/* Balance Section */}
        <div className="relative">
          <p className="text-sm opacity-90 font-medium mb-2">Available Balance</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-bold tracking-tight group-hover:scale-105 transition-transform duration-300">
              {formatCurrency(account.balance)}
            </p>
          </div>
        </div>

        {/* Card Number */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-xs opacity-75 mb-1">Account Number</p>
          <p className="text-sm font-mono tracking-widest">
            {account.accountNumber.match(/.{1,4}/g).join(' ')}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
        <span className={`status-dot ${account.isFrozen ? 'status-dot-danger' : 'status-dot-success'}`}></span>
        <span className="text-xs font-semibold text-gray-700">
          {account.isFrozen ? 'Inactive' : 'Active'}
        </span>
      </div>
    </div>
  );
};

export default AccountCard;
