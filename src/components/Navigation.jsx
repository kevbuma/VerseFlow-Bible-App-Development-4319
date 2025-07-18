import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiHome, FiBook, FiBookOpen, FiUsers, FiEdit3, 
  FiMessageCircle, FiSun, FiTarget, FiHeart, FiUser,
  FiX
} = FiIcons;

const Navigation = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/reading-plans', icon: FiBook, label: 'Reading Plans' },
    { path: '/bible', icon: FiBookOpen, label: 'Bible Reader' },
    { path: '/groups', icon: FiUsers, label: 'Groups' },
    { path: '/notes', icon: FiEdit3, label: 'Notes' },
    { path: '/ai-assistant', icon: FiMessageCircle, label: 'AI Assistant' },
    { path: '/devotional', icon: FiSun, label: 'Devotional' },
    { path: '/memorization', icon: FiTarget, label: 'Memorization' },
    { path: '/prayer', icon: FiHeart, label: 'Prayer' },
    { path: '/profile', icon: FiUser, label: 'Profile' }
  ];

  return (
    <motion.nav 
      className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white shadow-lg border-r border-spiritual-200
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Close button - Mobile only */}
      <button
        onClick={onClose}
        className="lg:hidden absolute right-4 top-4 p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
      >
        <SafeIcon icon={FiX} className="w-5 h-5" />
      </button>

      <div className="p-4 overflow-y-auto max-h-screen pb-20 lg:pb-4">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-spiritual-500 to-divine-500 text-white shadow-lg' 
                    : 'text-spiritual-600 hover:bg-spiritual-100 hover:text-spiritual-800'
                  }
                `}
                end={item.path === '/'}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;