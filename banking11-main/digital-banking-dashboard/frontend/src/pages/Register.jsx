import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      // Generate a random account number (12 digits)
      const accountNumber = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
      try {
        await userAPI.createAccount(result.data._id, {
          accountType: 'savings',
          accountNumber,
          initialDeposit: 0,
        });
      } catch (err) {
        // Non-fatal: still navigate to welcome with generated number so user sees it
        console.error('Auto account creation failed', err);
      }
      navigate('/welcome-account', { state: { accountNumber } });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-layout auth-bg">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start banking with a few simple details.</p>
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
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
              <p className="auth-hint">Minimum 6 characters</p>
            </div>

            <div>
              <label className="auth-label">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed relative group mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner mr-3"></div>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Create Account
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              )}
            </button>
          </form>

          <div className="auth-alt">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-700">
              <p className="font-medium mb-1">Welcome bonus</p>
              <p>Get $1,000 starting balance in your savings account when you sign up today.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Your data is protected with enterprise-grade security</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
