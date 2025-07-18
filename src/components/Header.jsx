import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { 
  FiSearch, FiBell, FiUser, FiBookOpen, FiLogOut, 
  FiSettings, FiMenu
} = FiIcons;

const Header = ({ onMenuClick }) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast.info(`Searching for: "${searchTerm}"`);
      // Implement search functionality here
      setSearchTerm('');
    }
  };

  const handleNotifications = () => {
    toast.info('Notifications feature coming soon!');
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    toast.info('Settings page coming soon!');
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim();
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <motion.header 
      className="bg-white shadow-lg border-b border-spiritual-200"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-6 h-6" />
          </button>

          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-2 rounded-lg">
              <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-spiritual-800">VerseFlow</h1>
              <p className="text-xs text-spiritual-600">AI-Powered Bible Study</p>
            </div>
          </motion.div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 w-4 h-4" 
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search verses, topics, or passages..."
                className="w-full pl-10 pr-4 py-2 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Button */}
            <button 
              className="md:hidden p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
              onClick={() => toast.info('Search coming soon!')}
            >
              <SafeIcon icon={FiSearch} className="w-5 h-5" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNotifications}
              className="p-2 text-spiritual-600 hover:text-spiritual-800 relative"
            >
              <SafeIcon icon={FiBell} className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-divine-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-spiritual-100 hover:bg-spiritual-200 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-spiritual-500 to-divine-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {getUserInitials()}
                </div>
                <span className="hidden sm:block text-sm font-medium text-spiritual-800 max-w-24 truncate">
                  {getUserDisplayName()}
                </span>
              </motion.button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-spiritual-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-spiritual-200">
                    <p className="text-sm font-medium text-spiritual-800">{getUserDisplayName()}</p>
                    <p className="text-xs text-spiritual-600">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleProfile}
                    className="w-full text-left px-4 py-2 text-sm text-spiritual-700 hover:bg-spiritual-50 flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleSettings}
                    className="w-full text-left px-4 py-2 text-sm text-spiritual-700 hover:bg-spiritual-50 flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiSettings} className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-spiritual-200 mt-2 pt-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;