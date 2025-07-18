import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiHeart } = FiIcons;

const categories = [
  { id: 'health', name: 'Health & Healing', color: 'bg-red-100 text-red-800' },
  { id: 'family', name: 'Family', color: 'bg-blue-100 text-blue-800' },
  { id: 'spiritual', name: 'Spiritual Growth', color: 'bg-purple-100 text-purple-800' },
  { id: 'career', name: 'Career & Work', color: 'bg-green-100 text-green-800' },
  { id: 'relationships', name: 'Relationships', color: 'bg-pink-100 text-pink-800' },
  { id: 'finances', name: 'Finances', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'other', name: 'Other', color: 'bg-gray-100 text-gray-800' }
];

const AddPrayerModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    privacy: 'private' // 'private' or 'public'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Please enter a title for your prayer request');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await onSubmit(formData);
      // Reset form data and close modal on success
      setFormData({
        title: '',
        description: '',
        category: 'other',
        privacy: 'private'
      });
      onClose();
    } catch (err) {
      setError('Failed to add prayer request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-spiritual-200">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-2 rounded-lg">
                  <SafeIcon icon={FiHeart} className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-spiritual-800">New Prayer Request</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-spiritual-400 hover:text-spiritual-600 rounded-full hover:bg-spiritual-100 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}
              
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Prayer Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  placeholder="e.g., Healing for Mom"
                  required
                />
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  placeholder="Share more details about your prayer request..."
                  rows="4"
                ></textarea>
              </div>
              
              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Privacy */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Privacy
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      checked={formData.privacy === 'private'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-spiritual-600 border-spiritual-300 focus:ring-spiritual-500"
                    />
                    <span className="ml-2 text-sm text-spiritual-700">Private (only visible to you)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      checked={formData.privacy === 'public'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-spiritual-600 border-spiritual-300 focus:ring-spiritual-500"
                    />
                    <span className="ml-2 text-sm text-spiritual-700">Public (share with community)</span>
                  </label>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-spiritual-300 text-spiritual-700 rounded-lg hover:bg-spiritual-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white rounded-lg hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add Prayer Request</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddPrayerModal;