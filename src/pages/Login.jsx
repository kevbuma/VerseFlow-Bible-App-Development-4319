import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import { useAuth } from '../contexts/AuthContext'

const { FiMail, FiLock, FiEye, FiEyeOff, FiBookOpen } = FiIcons

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signIn, isAuthenticated, loading } = useAuth()

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to="/" replace />
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { success, error } = await signIn({
        email: formData.email,
        password: formData.password
      })

      if (!success) {
        setError(error?.message || 'Failed to sign in')
        setIsLoading(false)
      }
      // Don't set isLoading to false on success as the AuthContext will handle redirection
      
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      const { success, error } = await signIn({
        email: 'demo@verseflow.com',
        password: 'demo123'
      })

      if (!success) {
        setError(error?.message || 'Failed to sign in')
        setIsLoading(false)
      }
      // Don't set isLoading to false on success as the AuthContext will handle redirection
      
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
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
          <h2 className="text-3xl font-bold text-spiritual-800 mb-2">Welcome Back</h2>
          <p className="text-spiritual-600">
            Continue your spiritual journey with God's Word
          </p>
        </motion.div>

        {/* Login Form */}
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
                  placeholder="Enter your password"
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-spiritual-600 border-spiritual-300 rounded focus:ring-spiritual-500"
                />
                <span className="ml-2 text-sm text-spiritual-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-spiritual-600 hover:text-spiritual-800 font-medium"
              >
                Forgot password?
              </Link>
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
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Demo Login Button */}
          <div className="mt-4">
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full border border-spiritual-200 text-spiritual-700 py-3 rounded-lg font-medium hover:bg-spiritual-50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Try Demo Account</span>
            </button>
            <p className="text-xs text-spiritual-500 text-center mt-2">
              Use demo@verseflow.com / demo123 to explore the app
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-spiritual-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-spiritual-600 hover:text-spiritual-800 font-medium underline"
              >
                Sign up here
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
            "Your word is a lamp for my feet, a light on my path."
          </p>
          <p className="text-spiritual-500 text-sm mt-1">- Psalm 119:105</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login