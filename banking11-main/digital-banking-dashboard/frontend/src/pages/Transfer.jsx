import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TransferForm from '../components/TransferForm';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const Transfer = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await userAPI.getUserAccounts(user._id);
      setAccounts(res.data);
    } catch (e) {
      console.error('Failed to load accounts', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAccounts();
  }, [user]);

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
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Transfer</h1>
              <p className="text-gray-600">Send money between accounts securely</p>
            </div>

            <TransferForm accounts={accounts} onTransferSuccess={fetchAccounts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
