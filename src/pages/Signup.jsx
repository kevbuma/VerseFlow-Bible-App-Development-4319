import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiMail, FiLock, FiEye, FiEyeOff, FiBookOpen, FiUser, FiCheck } = FiIcons;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const { signUp, isAuthenticated, loading } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const { success, error } = await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      if (!success) {
        setError(error?.message || 'Failed to create account');
        setIsLoading(false);
      }
      // Don't set isLoading to false on success as the AuthContext will handle redirection
      
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

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
          <h2 className="text-3xl font-bold text-spiritual-800 mb-2">Join Our Community</h2>
          <p className="text-spiritual-600">
            Begin your journey of faith and discovery
          </p>
        </motion.div>

        {/* Signup Form */}
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
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <SafeIcon
                    icon={FiUser}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 w-5 h-5"
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent transition-all duration-200"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent transition-all duration-200"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-spiritual-700 mb-2">
                Password
              </label>
              <div className="relative">
                <SafeIcon
                  icon={FiLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 w-5 h-5"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 hover:text-spiritual-600"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                          passwordStrength(formData.password)
                        )}`}
                        style={{
                          width: `${(passwordStrength(formData.password) / 4) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-spiritual-600">
                      {getPasswordStrengthText(passwordStrength(formData.password))}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-spiritual-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <SafeIcon
                  icon={FiLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 w-5 h-5"
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 hover:text-spiritual-600"
                >
                  <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                </button>
              </div>
              {formData.confirmPassword && formData.password && (
                <div className="mt-2 flex items-center space-x-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <span className="text-xs text-red-600">Passwords do not match</span>
                  )}
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-spiritual-600 border-spiritual-300 rounded focus:ring-spiritual-500 mt-1"
              />
              <label htmlFor="terms" className="text-sm text-spiritual-600">
                I agree to the{' '}
                <Link to="/terms" className="text-spiritual-600 hover:text-spiritual-800 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-spiritual-600 hover:text-spiritual-800 underline">
                  Privacy Policy
                </Link>
              </label>
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
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-spiritual-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-spiritual-500">Or sign up with</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            disabled={isLoading}
            className="w-full border border-spiritual-200 text-spiritual-700 py-3 rounded-lg font-medium hover:bg-spiritual-50 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign up with Google</span>
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-spiritual-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-spiritual-600 hover:text-spiritual-800 font-medium underline"
              >
                Sign in here
              </Link>
            </p>
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
            "Come to me, all you who are weary and burdened, and I will give you rest."
          </p>
          <p className="text-spiritual-500 text-sm mt-1">- Matthew 11:28</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;