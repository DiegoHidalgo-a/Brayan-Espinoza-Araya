import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const { state: authState, login, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/members');
    }
  }, [authState.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp) {
      // For demo purposes, we'll just simulate account creation
      // In a real app, this would create a new account
      setError('Account creation is not available in demo mode. Please use the demo credentials below.');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-secondary flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary text-white p-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-4"
          >
            <User className="w-8 h-8 mr-3" />
            <h1 className="font-serif text-2xl font-bold">Brayan Espinoza</h1>
          </motion.div>
          <p className="text-white/80 text-sm">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </p>
        </div>

        {/* Login Form */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <div className="flex bg-cream rounded-lg p-1">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    !isSignUp 
                      ? 'bg-primary text-white' 
                      : 'text-primary hover:text-stone'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isSignUp 
                      ? 'bg-primary text-white' 
                      : 'text-primary hover:text-stone'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Sign Up only) */}
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                  </>
                ) : (
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                )}
              </motion.button>
            </form>

            {/* Demo Credentials */}
            {!isSignUp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Email:</strong> fortysixpluss@gmail.com</p>
                  <p><strong>Password:</strong> user123</p>
                </div>
              </motion.div>
            )}

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-primary hover:text-stone transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;