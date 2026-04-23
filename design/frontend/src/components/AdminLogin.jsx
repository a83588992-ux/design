import React, { useState } from 'react';
import { Lock, Mail, Loader2, Eye, EyeOff, Shield } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      if (res.data.status === 'success') {
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_email', res.data.email);
        onLogin(res.data.token, res.data.email);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#3FAE2A] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">DLIMS - License Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3FAE2A] text-white font-bold py-3 rounded-full text-sm hover:bg-[#2E7D32] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={16} />}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
