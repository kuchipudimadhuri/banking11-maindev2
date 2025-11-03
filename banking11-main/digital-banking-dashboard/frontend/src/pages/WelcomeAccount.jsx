import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const WelcomeAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const accountNumber = location.state?.accountNumber;

  useEffect(() => {
    if (!accountNumber) {
      navigate('/dashboard', { replace: true });
    }
  }, [accountNumber, navigate]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  if (!accountNumber) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-xl mx-auto">
            <div className="auth-card">
              <div className="auth-header">
                <h1 className="auth-title">Welcome to Digital Banking</h1>
                <p className="auth-subtitle">Your new account has been created.</p>
              </div>
              <div className="card mb-6">
                <p className="text-sm text-gray-600">Your Account Number</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="font-mono text-lg text-gray-900 select-all">
                    {accountNumber.replace(/(.{4})/g, '$1 ').trim()}
                  </div>
                  <button onClick={copy} className="btn-secondary">Copy</button>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/accounts" className="btn-primary flex-1 text-center">Go to Accounts</Link>
                <Link to="/dashboard" className="btn-secondary flex-1 text-center">Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAccount;
