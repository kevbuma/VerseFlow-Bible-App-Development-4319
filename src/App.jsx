import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Contexts
import { AuthProvider } from './contexts/AuthContext'
import { BibleProvider } from './contexts/BibleContext'

// Components
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import DatabaseInitializer from './components/DatabaseInitializer'

// Pages
import Dashboard from './pages/Dashboard'
import ReadingPlans from './pages/ReadingPlans'
import BibleReader from './pages/BibleReader'
import Groups from './pages/Groups'
import Notes from './pages/Notes'
import AIAssistant from './pages/AIAssistant'
import Devotional from './pages/Devotional'
import Memorization from './pages/Memorization'
import Prayer from './pages/Prayer'
import Profile from './pages/Profile'

// Auth Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BibleProvider>
          <DatabaseInitializer>
            <div className="min-h-screen bg-gradient-to-br from-spiritual-50 to-divine-50">
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="reading-plans" element={<ReadingPlans />} />
                  <Route path="bible" element={<BibleReader />} />
                  <Route path="groups" element={<Groups />} />
                  <Route path="notes" element={<Notes />} />
                  <Route path="ai-assistant" element={<AIAssistant />} />
                  <Route path="devotional" element={<Devotional />} />
                  <Route path="memorization" element={<Memorization />} />
                  <Route path="prayer" element={<Prayer />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Routes>

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </DatabaseInitializer>
        </BibleProvider>
      </AuthProvider>
    </Router>
  )
}

export default App