import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  User,
  Terminal,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../utils/api'; // Your API instance

const CyberVaultLogin = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error on typing
  };

  // Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic Validation
    if (!formData.email || !formData.password) {
      setError('All fields are required!');
      setLoading(false);
      toast.error('Please fill all fields');
      return;
    }

    try {
      // API Call
      const response = await API.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const { token, user } = response.data;

        // Store token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        setSuccess(true);
        toast.success(`Welcome back, ${user.name}!`);

        // Redirect based on role
        setTimeout(() => {
          if (user.role === 'superadmin') {
            navigate('/admin/dashboard');
          } else if (user.role === 'staff') {
            navigate('/staff/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1500);
      } else {
        setError(response.data.message || 'Login failed');
        toast.error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);

      if (err.response) {
        // Server responded with error
        const errorMsg = err.response.data?.message || 'Invalid credentials';
        setError(errorMsg);
        toast.error(errorMsg);
      } else if (err.request) {
        // Network error
        setError('Network error. Please check your connection.');
        toast.error('Network error!');
      } else {
        setError('Something went wrong. Please try again.');
        toast.error('Login failed!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Terminal Header */}
      <div className="absolute top-8 left-8 text-green-500 font-mono text-[10px] opacity-50 flex items-center gap-2">
        <Terminal size={16} />
        <span>SYSTEM_ACTIVE :: 192.168.0.1</span>
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Glowing Border Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />

        <div className="relative bg-[#0f0f0f] border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
          {/* Logo/Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Shield className="text-white" size={36} />
          </motion.div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-white text-3xl font-black italic uppercase tracking-tighter mb-2">
              Cyber <span className="text-red-600">Vault</span>
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Secure Access Portal
            </p>
          </div>

          {/* Error/Success Message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="text-red-500" size={20} />
                <p className="text-red-500 text-xs font-bold">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
              >
                <CheckCircle2 className="text-green-500" size={20} />
                <p className="text-green-500 text-xs font-bold">
                  Login successful! Redirecting...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <User
                className="absolute left-5 top-5 text-gray-600 group-focus-within:text-red-600 transition-all"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-gray-700 focus:border-red-600 focus:bg-white/10 outline-none transition-all font-bold text-sm disabled:opacity-50"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock
                className="absolute left-5 top-5 text-gray-600 group-focus-within:text-red-600 transition-all"
                size={20}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-gray-700 focus:border-red-600 focus:bg-white/10 outline-none transition-all font-bold text-sm disabled:opacity-50"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-red-600 cursor-pointer"
                />
                <span className="text-gray-500 group-hover:text-white transition-all">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-gray-500 hover:text-red-600 transition-all font-bold"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-5 rounded-2xl font-black uppercase italic text-sm flex items-center justify-center gap-3 shadow-lg hover:shadow-red-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Authenticating...
                </>
              ) : (
                <>
                  Access System
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-600 text-xs">
              Don't have access?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-red-600 font-bold hover:underline"
              >
                Request Access
              </button>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Terminal Lines */}
      <div className="absolute bottom-8 left-8 right-8 text-green-500/30 font-mono text-[8px] space-y-1 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="block">
            [SYSTEM] Process ID: {1000 + i} | Status: ACTIVE | Uptime: 12.04.298
          </span>
        ))}
      </div>
    </div>
  );
};

export default CyberVaultLogin;
