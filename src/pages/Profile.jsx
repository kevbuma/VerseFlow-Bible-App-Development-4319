import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiUser, FiSettings, FiBook, FiTarget, FiHeart, FiTrendingUp, FiCalendar, FiEdit3, FiSave, FiMail, FiMapPin, FiPhone } = FiIcons;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: user?.user_metadata?.first_name || '',
    last_name: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    church: user?.user_metadata?.church || '',
    denomination: user?.user_metadata?.denomination || '',
    favoriteVerse: user?.user_metadata?.favoriteVerse || '',
    bio: user?.user_metadata?.bio || '',
    phone: user?.user_metadata?.phone || '',
    location: user?.user_metadata?.location || ''
  });

  const stats = [
    { label: 'Days Reading', value: '0', icon: FiBook, color: 'spiritual' },
    { label: 'Verses Memorized', value: '0', icon: FiTarget, color: 'divine' },
    { label: 'Notes Created', value: '0', icon: FiEdit3, color: 'spiritual' },
    { label: 'Prayers Added', value: '0', icon: FiHeart, color: 'divine' }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { success } = await updateProfile(profileData);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const getUserInitials = () => {
    const firstName = profileData.first_name || '';
    const lastName = profileData.last_name || '';
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  };

  const getJoinDate = () => {
    return user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-spiritual-800 mb-2">My Profile</h1>
        <p className="text-spiritual-600">
          Manage your account information and track your spiritual journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-spiritual-500 to-divine-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {getUserInitials() || <SafeIcon icon={FiUser} className="w-8 h-8" />}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-spiritual-800">
                    {profileData.first_name} {profileData.last_name}
                  </h2>
                  <p className="text-spiritual-600">{profileData.email}</p>
                  <p className="text-sm text-spiritual-500">Member since {getJoinDate()}</p>
                </div>
              </div>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-4 py-2 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <SafeIcon icon={isEditing ? FiSave : FiEdit3} className="w-4 h-4" />
                )}
                <span>{isLoading ? 'Saving...' : isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-spiritual-800">{profileData.first_name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-spiritual-800">{profileData.last_name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMail} className="w-4 h-4 text-spiritual-500" />
                  <p className="text-spiritual-800">{profileData.email}</p>
                </div>
                <p className="text-xs text-spiritual-500 mt-1">Email cannot be changed here</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 text-spiritual-500" />
                    <p className="text-spiritual-800">{profileData.phone || 'Not set'}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 text-spiritual-500" />
                    <p className="text-spiritual-800">{profileData.location || 'Not set'}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Church
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.church}
                    onChange={(e) => handleInputChange('church', e.target.value)}
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                    placeholder="Your church name"
                  />
                ) : (
                  <p className="text-spiritual-800">{profileData.church || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Denomination
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.denomination}
                    onChange={(e) => handleInputChange('denomination', e.target.value)}
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                    placeholder="e.g., Baptist, Methodist, etc."
                  />
                ) : (
                  <p className="text-spiritual-800">{profileData.denomination || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Favorite Verse
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.favoriteVerse}
                    onChange={(e) => handleInputChange('favoriteVerse', e.target.value)}
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                    placeholder="e.g., John 3:16"
                  />
                ) : (
                  <p className="text-spiritual-800">{profileData.favoriteVerse || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-spiritual-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  placeholder="Tell us about your faith journey..."
                />
              ) : (
                <p className="text-spiritual-800">{profileData.bio || 'No bio added yet'}</p>
              )}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100"
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
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100"
          >
            <h2 className="text-lg font-semibold text-spiritual-800 mb-4">Account Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-spiritual-50 hover:bg-spiritual-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiSettings} className="w-5 h-5 text-spiritual-600" />
                  <span className="text-spiritual-800">Account Settings</span>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-spiritual-50 hover:bg-spiritual-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiBook} className="w-5 h-5 text-spiritual-600" />
                  <span className="text-spiritual-800">Export Data</span>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-spiritual-50 hover:bg-spiritual-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiHeart} className="w-5 h-5 text-spiritual-600" />
                  <span className="text-spiritual-800">Prayer History</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Getting Started */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-spiritual-50 to-divine-50 rounded-xl shadow-lg p-6 border border-spiritual-200"
          >
            <h2 className="text-lg font-semibold text-spiritual-800 mb-4">Getting Started</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-spiritual-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-spiritual-700">1</span>
                </div>
                <span className="text-sm text-spiritual-700">Complete your profile</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-spiritual-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-spiritual-700">2</span>
                </div>
                <span className="text-sm text-spiritual-700">Start a reading plan</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-spiritual-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-spiritual-700">3</span>
                </div>
                <span className="text-sm text-spiritual-700">Join a study group</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-spiritual-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-spiritual-700">4</span>
                </div>
                <span className="text-sm text-spiritual-700">Add your first note</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;