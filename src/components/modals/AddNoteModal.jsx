import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiEdit3, FiBookmark } = FiIcons;

const AddNoteModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    verse_ref: '',
    verse_text: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        verse_ref: initialData.verse_ref || '',
        verse_text: initialData.verse_text || '',
        tags: initialData.tags || []
      });
    } else {
      setFormData({
        title: '',
        content: '',
        verse_ref: '',
        verse_text: '',
        tags: []
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;

    // Add tag if it doesn't already exist
    if (!formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please enter a title for your note');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      // Reset form data and close modal on success
      setFormData({
        title: '',
        content: '',
        verse_ref: '',
        verse_text: '',
        tags: []
      });
      onClose();
    } catch (err) {
      setError('Failed to save note. Please try again.');
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
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-spiritual-200 sticky top-0 bg-white">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-2 rounded-lg">
                  <SafeIcon icon={FiEdit3} className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-spiritual-800">
                  {initialData ? 'Edit Note' : 'New Note'}
                </h2>
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
                  Note Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  placeholder="e.g., Thoughts on the Beatitudes"
                  required
                />
              </div>

              {/* Verse Reference */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Bible Reference (optional)
                </label>
                <input
                  type="text"
                  name="verse_ref"
                  value={formData.verse_ref}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  placeholder="e.g., John 3:16"
                />
              </div>

              {/* Verse Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Verse Text (optional)
                </label>
                <textarea
                  name="verse_text"
                  value={formData.verse_text}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  placeholder="For God so loved the world..."
                  rows="2"
                ></textarea>
              </div>

              {/* Content */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Note Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                  placeholder="Write your thoughts, reflections, or insights here..."
                  rows="6"
                ></textarea>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-spiritual-700 mb-2">
                  Tags (optional)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <div
                      key={tag}
                      className="bg-spiritual-100 text-spiritual-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-spiritual-500 hover:text-spiritual-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                    className="flex-1 px-4 py-2 border border-spiritual-200 rounded-l-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
                    placeholder="Add a tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-spiritual-500 text-white rounded-r-lg hover:bg-spiritual-600 transition-colors"
                  >
                    Add
                  </button>
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
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{initialData ? 'Update Note' : 'Save Note'}</span>
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

export default AddNoteModal;