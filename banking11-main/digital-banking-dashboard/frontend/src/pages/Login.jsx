import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect based on user role
      if (result.data.role === 'admin') {
        navigate('/admin');
      } else {
        try {
          // Ensure at least one account exists; create if none
          const accountsRes = await userAPI.getUserAccounts(result.data._id);
          const accounts = accountsRes.data || [];
          if (!accounts.length) {
            const accountNumber = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
            await userAPI.createAccount(result.data._id, {
              accountType: 'savings',
              accountNumber,
              initialDeposit: 0,
            });
          }
        } catch (e) {
          // Non-fatal; continue to dashboard
          console.error('Account ensure error', e);
        }
        navigate('/dashboard?showAccount=1');
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-layout auth-bg">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Sign in to your account</h1>
          <p className="auth-subtitle">Welcome back. Please enter your details.</p>
        </div>

        <div className="auth-card">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="auth-label">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="auth-label">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed relative group"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner mr-3"></div>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Sign In
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              )}
            </button>
          </form>

          <div className="auth-alt">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">Sign up</Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-700 mb-2 font-medium">Demo credentials</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center p-2 bg-white rounded border border-gray-200">
                <span className="font-medium text-gray-700 mr-2">User:</span>
                <span className="text-gray-600">user@example.com / password123</span>
              </div>
              <div className="flex items-center p-2 bg-white rounded border border-gray-200">
                <span className="font-medium text-gray-700 mr-2">Admin:</span>
                <span className="text-gray-600">admin@example.com / admin123</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Secured with 256-bit SSL encryption</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
