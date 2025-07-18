import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import { databaseService } from '../services/databaseService'
import { hasRealCredentials } from '../lib/supabase'

const { FiDatabase, FiCheck, FiAlertCircle, FiRefreshCw } = FiIcons

const DatabaseInitializer = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [error, setError] = useState(null)
  const [showInitializer, setShowInitializer] = useState(false)

  useEffect(() => {
    // Only show initializer if we have real credentials
    if (hasRealCredentials) {
      setShowInitializer(true)
    } else {
      // Skip initialization if using mock data
      setIsInitialized(true)
    }
  }, [])

  const handleInitialize = async () => {
    setIsInitializing(true)
    setError(null)

    try {
      await databaseService.initializeDatabase()
      setIsInitialized(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsInitializing(false)
    }
  }

  const handleSkip = () => {
    setIsInitialized(true)
  }

  if (!showInitializer || isInitialized) {
    return children
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-50 to-divine-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <SafeIcon icon={FiDatabase} className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-spiritual-800 mb-4">
          Initialize Database
        </h2>

        <p className="text-spiritual-600 mb-6">
          This will set up the necessary database tables and initial data for your Bible study app.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiAlertCircle} className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleInitialize}
            disabled={isInitializing}
            className="w-full bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isInitializing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Initializing...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiDatabase} className="w-5 h-5" />
                <span>Initialize Database</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            disabled={isInitializing}
            className="w-full border border-spiritual-300 text-spiritual-700 py-3 rounded-lg font-medium hover:bg-spiritual-50 transition-colors disabled:opacity-50"
          >
            Skip & Use Mock Data
          </button>
        </div>

        <div className="mt-6 text-sm text-spiritual-500">
          <p>
            <strong>Note:</strong> Skipping will use mock data for demonstration purposes.
            You can initialize the database later from the settings.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default DatabaseInitializer