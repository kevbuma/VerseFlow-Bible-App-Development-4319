import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiMail, FiBookOpen, FiArrowLeft, FiCheck } = FiIcons;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { success, error } = await resetPassword(email);
      
      if (success) {
        setIsEmailSent(true);
      } else {
        setError(error?.message || 'Failed to send reset email');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-spiritual-50 via-white to-divine-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-spiritual-100 text-center"
          >
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-spiritual-800 mb-4">Check Your Email</h2>
            
            <p className="text-spiritual-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-spiritual-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="flex-1 border border-spiritual-300 text-spiritual-700 py-2 rounded-lg font-medium hover:bg-spiritual-50 transition-colors"
                >
                  Try Again
                </button>
                <Link
                  to="/login"
                  className="flex-1 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-2 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 text-center"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-50 via-white to-divine-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-3 rounded-xl shadow-lg">
              <SafeIcon icon={FiBookOpen} className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-spiritual-800">VerseFlow</h1>
              <p className="text-sm text-spiritual-600">AI-Powered Bible Study</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-spiritual-800 mb-2">Reset Password</h2>
          <p className="text-spiritual-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </motion.div>

        {/* Reset Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-spiritual-100"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-spiritual-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiMail} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 w-5 h-5" 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending reset link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-spiritual-600 hover:text-spiritual-800 font-medium"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </motion.div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-spiritual-600 italic">
            "The Lord your God is with you, the Mighty Warrior who saves."
          </p>
          <p className="text-spiritual-500 text-sm mt-1">- Zephaniah 3:17</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;