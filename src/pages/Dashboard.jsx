import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import DailyVerse from '../components/DailyVerse';

const { FiBook, FiTarget, FiHeart, FiUsers, FiTrendingUp, FiSun, FiPlus } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getUserName = () => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    return user?.email?.split('@')[0] || 'Friend';
  };

  const stats = [
    { label: 'Days Reading', value: '0', icon: FiBook, color: 'spiritual', action: () => navigate('/reading-plans') },
    { label: 'Verses Memorized', value: '0', icon: FiTarget, color: 'divine', action: () => navigate('/memorization') },
    { label: 'Prayer Requests', value: '0', icon: FiHeart, color: 'spiritual', action: () => navigate('/prayer') },
    { label: 'Group Studies', value: '0', icon: FiUsers, color: 'divine', action: () => navigate('/groups') }
  ];

  const quickActions = [
    { title: 'Start Reading', subtitle: 'Begin your Bible journey', link: '/bible', icon: FiBook },
    { title: 'Daily Devotional', subtitle: 'Today\'s reflection', link: '/devotional', icon: FiSun },
    { title: 'Memory Verse', subtitle: 'Learn a new verse', link: '/memorization', icon: FiTarget },
    { title: 'Prayer Journal', subtitle: 'Add new prayer', link: '/prayer', icon: FiHeart }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-spiritual-800 mb-2">
          {getGreeting()}, {getUserName()}! 🌅
        </h1>
        <p className="text-spiritual-600">
          "Your word is a lamp for my feet, a light on my path." - Psalm 119:105
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={stat.action}
            className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100 cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-spiritual-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-spiritual-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Daily Verse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <DailyVerse />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-spiritual-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={action.title} to={action.link} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100 hover:shadow-xl transition-all duration-300"
              >
                <SafeIcon
                  icon={action.icon}
                  className="w-8 h-8 text-spiritual-500 mb-3 group-hover:text-spiritual-600 transition-colors"
                />
                <h3 className="font-semibold text-spiritual-800 mb-1">{action.title}</h3>
                <p className="text-sm text-spiritual-600">{action.subtitle}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-spiritual-500 to-divine-500 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Welcome to VerseFlow!</h3>
            <SafeIcon icon={FiTrendingUp} className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-white/90 mb-4">
            Start your spiritual journey with AI-powered Bible study tools designed to help you grow in faith.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiBook} className="w-4 h-4" />
              <span>Read the Bible with multiple translations</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiUsers} className="w-4 h-4" />
              <span>Join study groups and connect with others</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiTarget} className="w-4 h-4" />
              <span>Memorize verses and track your progress</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100"
        >
          <h3 className="text-lg font-semibold text-spiritual-800 mb-4">Get Started</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-spiritual-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-spiritual-800">Complete Your Profile</p>
                <p className="text-sm text-spiritual-600">Add your personal information and preferences</p>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-xs text-spiritual-500 hover:text-spiritual-700 transition-colors"
                >
                  Go to Profile →
                </button>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-spiritual-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-spiritual-800">Start a Reading Plan</p>
                <p className="text-sm text-spiritual-600">Choose from various Bible reading plans</p>
                <button
                  onClick={() => navigate('/reading-plans')}
                  className="text-xs text-spiritual-500 hover:text-spiritual-700 transition-colors"
                >
                  Browse Plans →
                </button>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-spiritual-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-spiritual-800">Add Your First Note</p>
                <p className="text-sm text-spiritual-600">Capture insights from your Bible study</p>
                <button
                  onClick={() => navigate('/notes')}
                  className="text-xs text-spiritual-500 hover:text-spiritual-700 transition-colors"
                >
                  Create Note →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;