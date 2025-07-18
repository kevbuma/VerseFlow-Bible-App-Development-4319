import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AddNoteModal from '../components/modals/AddNoteModal';
import { useNotes } from '../hooks/useNotes';

const { FiEdit3, FiSearch, FiFilter, FiPlus, FiBookmark, FiTag, FiCalendar, FiMoreVertical, FiHeart, FiTrash2 } = FiIcons;

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showAddNote, setShowAddNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  const { notes, isLoading, addNote, updateNote, deleteNote, toggleFavorite } = useNotes();

  const tags = [
    { id: 'all', name: 'All Notes', count: notes.length },
    { id: 'prayer', name: 'Prayer', count: notes.filter(n => n.tags?.includes('prayer')).length },
    { id: 'study', name: 'Bible Study', count: notes.filter(n => n.tags?.includes('study')).length },
    { id: 'sermon', name: 'Sermon Notes', count: notes.filter(n => n.tags?.includes('sermon')).length },
    { id: 'devotional', name: 'Devotional', count: notes.filter(n => n.tags?.includes('devotional')).length }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.verse_ref?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || note.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'verse':
        return (a.verse_ref || '').localeCompare(b.verse_ref || '');
      default: // recent
        return new Date(b.created_at || b.updated_at) - new Date(a.created_at || a.updated_at);
    }
  });

  const handleAddNote = async (noteData) => {
    await addNote(noteData);
    setShowAddNote(false);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setShowAddNote(true);
    setShowDropdown(null);
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(noteId);
      setShowDropdown(null);
    }
  };

  const handleToggleFavorite = async (noteId) => {
    await toggleFavorite(noteId);
    setShowDropdown(null);
  };

  const highlightColors = {
    yellow: 'bg-yellow-200',
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    pink: 'bg-pink-200',
    purple: 'bg-purple-200'
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spiritual-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-spiritual-800 mb-2">My Notes</h1>
            <p className="text-spiritual-600">
              Your personal collection of Bible study notes and reflections
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedNote(null);
              setShowAddNote(true);
            }}
            className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>New Note</span>
          </button>
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 space-y-6">
          {/* Search */}
          <div className="relative">
            <SafeIcon
              icon={FiSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
            />
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-spiritual-800 mb-3">Tags</h3>
            <div className="space-y-1">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedTag === tag.id
                      ? 'bg-spiritual-500 text-white'
                      : 'text-spiritual-600 hover:bg-spiritual-100'
                  }`}
                >
                  <span>{tag.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedTag === tag.id
                        ? 'bg-white bg-opacity-20'
                        : 'bg-spiritual-200 text-spiritual-600'
                    }`}
                  >
                    {tag.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="font-semibold text-spiritual-800 mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-spiritual-200 rounded-lg text-sm focus:ring-2 focus:ring-spiritual-500"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="verse">Bible Reference</option>
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="flex-1">
          {sortedNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-spiritual-100 inline-block p-4 rounded-full mb-4">
                <SafeIcon icon={FiEdit3} className="w-8 h-8 text-spiritual-500" />
              </div>
              <h3 className="text-xl font-medium text-spiritual-800 mb-2">No Notes Found</h3>
              <p className="text-spiritual-600 mb-4">
                {searchTerm || selectedTag !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start capturing your Bible study insights and reflections.'
                }
              </p>
              <button
                onClick={() => {
                  setSelectedNote(null);
                  setShowAddNote(true);
                }}
                className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Create Your First Note</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100 hover:shadow-xl transition-all duration-300"
                >
                  {/* Note Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-spiritual-800 mb-1">{note.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-spiritual-500">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>{new Date(note.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {note.is_favorite && (
                        <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-500 fill-current" />
                      )}
                      <div className="relative">
                        <button
                          onClick={() => setShowDropdown(showDropdown === note.id ? null : note.id)}
                          className="p-1 text-spiritual-400 hover:text-spiritual-600 rounded-full hover:bg-spiritual-100 transition-colors"
                        >
                          <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
                        </button>
                        {showDropdown === note.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-spiritual-200 py-2 z-10">
                            <button
                              onClick={() => handleEditNote(note)}
                              className="w-full text-left px-4 py-2 text-sm text-spiritual-700 hover:bg-spiritual-50 flex items-center space-x-2"
                            >
                              <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                              <span>Edit Note</span>
                            </button>
                            <button
                              onClick={() => handleToggleFavorite(note.id)}
                              className="w-full text-left px-4 py-2 text-sm text-spiritual-700 hover:bg-spiritual-50 flex items-center space-x-2"
                            >
                              <SafeIcon icon={FiHeart} className={`w-4 h-4 ${note.is_favorite ? 'text-red-500 fill-current' : ''}`} />
                              <span>{note.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                              <span>Delete Note</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bible Verse */}
                  {note.verse_ref && (
                    <div className="bg-spiritual-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <SafeIcon icon={FiBookmark} className="w-4 h-4 text-spiritual-500" />
                        <span className="text-sm font-medium text-spiritual-700">{note.verse_ref}</span>
                      </div>
                      {note.verse_text && (
                        <p className="text-spiritual-800 font-serif italic">{note.verse_text}</p>
                      )}
                    </div>
                  )}

                  {/* Note Content */}
                  <p className="text-spiritual-600 text-sm mb-4 line-clamp-3">{note.content}</p>

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-spiritual-100 text-spiritual-700 text-xs rounded-full cursor-pointer hover:bg-spiritual-200 transition-colors"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="text-spiritual-600 hover:text-spiritual-800 text-sm font-medium transition-colors"
                    >
                      Edit Note
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleFavorite(note.id)}
                        className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiHeart} className={`w-4 h-4 ${note.is_favorite ? 'text-red-500 fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setSelectedTag(note.tags?.[0] || 'all')}
                        className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiTag} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Note Modal */}
      <AddNoteModal
        isOpen={showAddNote}
        onClose={() => {
          setShowAddNote(false);
          setSelectedNote(null);
        }}
        onSubmit={handleAddNote}
        initialData={selectedNote}
      />
    </div>
  );
};

export default Notes;