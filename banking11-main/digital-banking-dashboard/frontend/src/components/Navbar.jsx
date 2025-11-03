import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg px-6 py-4 sticky top-0 z-50 border-b-2 border-blue-100 animate-slideDown">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="group flex items-center space-x-3">
            <div className="text-4xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              🏦
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Digital Banking
            </h1>
          </Link>
          
          {user && (
            <div className="hidden md:flex space-x-2 ml-8">
              <Link
                to={isAdmin ? '/admin' : '/dashboard'}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                📊 Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* User Section */}
        {user && (
          <div className="flex items-center space-x-4">
            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-blue-300"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg animate-glow">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                {/* User Info */}
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                {/* Admin Badge */}
                {isAdmin && (
                  <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg animate-pulse">
                    👑 Admin
                  </span>
                )}

                {/* Dropdown Arrow */}
                <svg
                  className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 ${
                    showDropdown ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden animate-scaleIn">
                  {/* Profile Section */}
                  <div className="px-4 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-xs opacity-90">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to={isAdmin ? '/admin' : '/dashboard'}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="text-xl">📊</span>
                      <span className="text-sm font-medium text-gray-700">Dashboard</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                    >
                      <span className="text-xl">🚪</span>
                      <span className="text-sm font-medium text-red-600">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Logout Button (Desktop) */}
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
