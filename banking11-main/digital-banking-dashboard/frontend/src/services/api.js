import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// User APIs
export const userAPI = {
  getUserById: (id) => api.get(`/users/${id}`),
  getUserAccounts: (id) => api.get(`/users/${id}/accounts`),
  createAccount: (id, data) => api.post(`/users/${id}/accounts`, data),
};

// Transaction APIs
export const transactionAPI = {
  transfer: (data) => api.post('/transactions/transfer', data),
  getUserTransactions: (userId) => api.get(`/transactions/${userId}`),
  getAccountTransactions: (accountId) => api.get(`/transactions/account/${accountId}`),
};

// Admin APIs
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getAllTransactions: () => api.get('/admin/transactions'),
  getDashboardStats: () => api.get('/admin/stats'),
  toggleFreezeAccount: (id) => api.put(`/admin/freeze/${id}`),
  toggleApproveUser: (id) => api.put(`/admin/approve/${id}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

export default api;
