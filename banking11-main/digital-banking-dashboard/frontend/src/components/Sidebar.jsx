import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Accounts', path: '/accounts', icon: '💳' },
    { name: 'Transactions', path: '/transactions', icon: '💸' },
    { name: 'Transfer', path: '/transfer', icon: '🔄' },
    { name: 'Balance', path: '/balance', icon: '🧮' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Transactions', path: '/admin/transactions', icon: '💸' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">
          {isAdmin ? 'Admin Panel' : 'My Banking'}
        </h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
