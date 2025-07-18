import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useBible } from '../contexts/BibleContext';

const { 
  FiSearch, FiBookmark, FiSettings, FiShare2, 
  FiArrowLeft, FiArrowRight, FiCopy, FiHeart,
  FiPlus, FiMinus, FiType, FiSun, FiMoon
} = FiIcons;

const BibleReader = () => {
  const { 
    books, 
    versions, 
    currentVersion, 
    changeVersion, 
    getChapter, 
    isLoading: isLoadingBibleData 
  } = useBible();

  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [verseData, setVerseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [theme, setTheme] = useState('light');
  const [showMobileTools, setShowMobileTools] = useState(false);

  // Set initial book when books are loaded
  useEffect(() => {
    if (books && books.length > 0) {
      const initialBook = books.find(b => b.name === 'John') || books[0];
      setCurrentBook(initialBook);
    }
  }, [books]);

  // Load chapter data when book, chapter or version changes
  useEffect(() => {
    const loadChapterData = async () => {
      if (!currentBook || !currentVersion) return;
      
      setIsLoading(true);
      try {
        const data = await getChapter(currentBook.id, currentChapter, currentVersion.id);
        setVerseData(data || []);
      } catch (error) {
        console.error('Error loading chapter:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChapterData();
  }, [currentBook, currentChapter, currentVersion, getChapter]);

  const handleNextChapter = () => {
    if (!currentBook) return;
    
    if (currentChapter < currentBook.chapters) {
      setCurrentChapter(currentChapter + 1);
    } else {
      // Move to next book
      const currentIndex = books.findIndex(b => b.id === currentBook.id);
      if (currentIndex < books.length - 1) {
        const nextBook = books[currentIndex + 1];
        setCurrentBook(nextBook);
        setCurrentChapter(1);
      }
    }
  };

  const handlePrevChapter = () => {
    if (!currentBook) return;
    
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else {
      // Move to previous book
      const currentIndex = books.findIndex(b => b.id === currentBook.id);
      if (currentIndex > 0) {
        const prevBook = books[currentIndex - 1];
        setCurrentBook(prevBook);
        setCurrentChapter(prevBook.chapters); // Go to last chapter of previous book
      }
    }
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-xl';
      case 'xlarge': return 'text-2xl';
      default: return 'text-base';
    }
  };

  if (isLoadingBibleData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spiritual-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-spiritual-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full lg:h-screen overflow-hidden">
        {/* Reader Header */}
        <div className="bg-white shadow-sm border-b border-spiritual-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={currentBook?.id || ''}
                onChange={(e) => {
                  const book = books.find(b => b.id === e.target.value);
                  setCurrentBook(book);
                  setCurrentChapter(1);
                }}
                className="w-full sm:w-auto px-3 py-2 border border-spiritual-300 rounded-lg text-sm focus:ring-2 focus:ring-spiritual-500"
              >
                <option value="" disabled>Select book</option>
                <optgroup label="Old Testament">
                  {books.filter(b => b.testament === 'OT').map(book => (
                    <option key={book.id} value={book.id}>{book.name}</option>
                  ))}
                </optgroup>
                <optgroup label="New Testament">
                  {books.filter(b => b.testament === 'NT').map(book => (
                    <option key={book.id} value={book.id}>{book.name}</option>
                  ))}
                </optgroup>
              </select>
              
              <div className="flex items-center space-x-2">
                <select
                  value={currentVersion?.id || ''}
                  onChange={(e) => changeVersion(e.target.value)}
                  className="px-3 py-2 border border-spiritual-300 rounded-lg text-sm focus:ring-2 focus:ring-spiritual-500"
                >
                  {versions.map(version => (
                    <option key={version.id} value={version.id}>{version.name}</option>
                  ))}
                </select>
                
                <input
                  type="number"
                  min="1"
                  max={currentBook?.chapters || 1}
                  value={currentChapter}
                  onChange={(e) => {
                    const chapter = parseInt(e.target.value);
                    if (chapter >= 1 && chapter <= (currentBook?.chapters || 1)) {
                      setCurrentChapter(chapter);
                    }
                  }}
                  className="w-20 px-2 py-2 border border-spiritual-300 rounded-lg text-sm focus:ring-2 focus:ring-spiritual-500"
                  placeholder="Ch"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
                <SafeIcon icon={FiSearch} className="w-5 h-5" />
              </button>
              <button className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
                <SafeIcon icon={FiBookmark} className="w-5 h-5" />
              </button>
              <button className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors lg:hidden">
                <SafeIcon icon={FiSettings} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bible Text Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className={`mb-6 ${theme === 'dark' ? 'text-white' : 'text-spiritual-800'}`}>
              <h1 className="text-2xl font-bold">{currentBook?.name} {currentChapter}</h1>
              <p className="text-spiritual-500">
                {currentVersion?.full_name || currentVersion?.name}
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-spiritual-500"></div>
              </div>
            ) : (
              <div className={`space-y-4 ${getFontSizeClass()} ${theme === 'dark' ? 'text-white' : 'text-spiritual-800'}`}>
                {verseData.length === 0 ? (
                  <p className="text-spiritual-600 italic">
                    No verses available for this chapter. Try selecting a different book or chapter.
                  </p>
                ) : (
                  verseData.map(verse => (
                    <div key={verse.id} className="group">
                      <p className="leading-relaxed">
                        <span className="font-semibold text-spiritual-500 mr-2">{verse.verse}</span>
                        {verse.text}
                      </p>
                      <div className="hidden group-hover:flex mt-1 space-x-2">
                        <button className="p-1 text-spiritual-400 hover:text-spiritual-600">
                          <SafeIcon icon={FiCopy} className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-spiritual-400 hover:text-spiritual-600">
                          <SafeIcon icon={FiHeart} className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-spiritual-400 hover:text-spiritual-600">
                          <SafeIcon icon={FiShare2} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t border-spiritual-200 p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <button 
              onClick={handlePrevChapter}
              className="flex items-center space-x-2 px-4 py-2 bg-spiritual-100 text-spiritual-700 rounded-lg hover:bg-spiritual-200 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <span className="text-spiritual-600">
              {currentBook?.name} {currentChapter} of {currentBook?.chapters}
            </span>
            
            <button 
              onClick={handleNextChapter}
              className="flex items-center space-x-2 px-4 py-2 bg-spiritual-100 text-spiritual-700 rounded-lg hover:bg-spiritual-200 transition-colors"
            >
              <span>Next</span>
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Tools - Hidden on mobile by default */}
      <div className="hidden lg:block w-80 bg-white border-l border-spiritual-200 p-4 overflow-y-auto">
        <h3 className="font-semibold text-spiritual-800 mb-4">Reader Settings</h3>
        
        {/* Font Size Controls */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-spiritual-700 mb-2">Font Size</h4>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleFontSizeChange('small')}
              className={`p-2 rounded-lg ${fontSize === 'small' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'}`}
            >
              <SafeIcon icon={FiMinus} className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleFontSizeChange('medium')}
              className={`p-2 rounded-lg ${fontSize === 'medium' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'}`}
            >
              <SafeIcon icon={FiType} className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleFontSizeChange('large')}
              className={`p-2 rounded-lg ${fontSize === 'large' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'}`}
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleFontSizeChange('xlarge')}
              className={`p-2 rounded-lg ${fontSize === 'xlarge' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'}`}
            >
              <div className="flex items-center">
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <SafeIcon icon={FiPlus} className="w-4 h-4 -ml-1" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Theme Toggle */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-spiritual-700 mb-2">Theme</h4>
          <button 
            onClick={handleThemeChange}
            className="flex items-center space-x-2 px-4 py-2 bg-spiritual-100 text-spiritual-600 rounded-lg hover:bg-spiritual-200 transition-colors w-full"
          >
            <SafeIcon icon={theme === 'light' ? FiMoon : FiSun} className="w-4 h-4" />
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tools Button */}
      <button
        onClick={() => setShowMobileTools(!showMobileTools)}
        className="lg:hidden fixed bottom-4 right-4 bg-spiritual-500 text-white p-4 rounded-full shadow-lg"
      >
        <SafeIcon icon={FiSettings} className="w-6 h-6" />
      </button>

      {/* Mobile Tools Modal */}
      {showMobileTools && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" 
          onClick={() => setShowMobileTools(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-4" 
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-semibold text-spiritual-800 mb-4">Reader Settings</h3>
            
            {/* Font Size Controls */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-spiritual-700 mb-2">Font Size</h4>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleFontSizeChange('small')}
                  className={`p-2 rounded-lg ${fontSize === 'small' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600'}`}
                >
                  <SafeIcon icon={FiMinus} className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleFontSizeChange('medium')}
                  className={`p-2 rounded-lg ${fontSize === 'medium' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600'}`}
                >
                  <SafeIcon icon={FiType} className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleFontSizeChange('large')}
                  className={`p-2 rounded-lg ${fontSize === 'large' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600'}`}
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleFontSizeChange('xlarge')}
                  className={`p-2 rounded-lg ${fontSize === 'xlarge' ? 'bg-spiritual-500 text-white' : 'bg-spiritual-100 text-spiritual-600'}`}
                >
                  <div className="flex items-center">
                    <SafeIcon icon={FiPlus} className="w-4 h-4" />
                    <SafeIcon icon={FiPlus} className="w-4 h-4 -ml-1" />
                  </div>
                </button>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-spiritual-700 mb-2">Theme</h4>
              <button 
                onClick={handleThemeChange}
                className="flex items-center space-x-2 px-4 py-2 bg-spiritual-100 text-spiritual-600 rounded-lg w-full"
              >
                <SafeIcon icon={theme === 'light' ? FiMoon : FiSun} className="w-4 h-4" />
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;