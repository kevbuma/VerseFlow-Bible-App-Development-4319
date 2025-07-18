import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { bibleService } from '../services/bibleService';
import bibleMockData from '../data/bibleMockData';

const { FiSearch, FiBook, FiX, FiArrowRight } = FiIcons;

/**
 * Reusable Bible verse search component
 * @param {Object} props
 * @param {Function} props.onSelect - Function called when a verse is selected
 * @param {boolean} props.fullWidth - Whether to take full width
 * @param {string} props.placeholder - Placeholder text
 */
const VerseSearch = ({ 
  onSelect, 
  fullWidth = false,
  placeholder = "Search verses or references..."
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Popular book abbreviations for quick reference lookup
  const bookAbbreviations = bibleMockData.books.reduce((acc, book) => {
    acc[book.abbreviation.toLowerCase()] = book.name;
    return acc;
  }, {});

  // Handle search input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.trim().length > 2) {
      performSearch(value);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Perform search with debounce
  const performSearch = async (searchQuery) => {
    setIsSearching(true);
    setShowResults(true);
    
    try {
      // Check if the query looks like a Bible reference
      const refRegex = /^(\d?\s?[a-z]+)\.?\s*(\d+)(?::(\d+)(?:-(\d+))?)?$/i;
      const match = searchQuery.match(refRegex);
      
      if (match) {
        // This looks like a reference, try to parse it
        let [, book, chapter, verse] = match;
        
        // Check for abbreviations
        const bookLower = book.toLowerCase().trim();
        if (bookAbbreviations[bookLower]) {
          book = bookAbbreviations[bookLower];
        }
        
        // Find the book in our data
        const bookObj = bibleMockData.books.find(b => 
          b.name.toLowerCase().startsWith(book.toLowerCase()) || 
          b.abbreviation.toLowerCase() === book.toLowerCase()
        );
        
        if (bookObj) {
          // Format results as a reference
          setResults([{
            type: 'reference',
            book: bookObj.name,
            chapter: parseInt(chapter),
            verse: verse ? parseInt(verse) : null,
            text: `Go to ${bookObj.name} ${chapter}${verse ? `:${verse}` : ''}`
          }]);
          setIsSearching(false);
          return;
        }
      }
      
      // Regular text search
      const searchResults = await bibleService.searchVerses(searchQuery);
      
      // Format results
      setResults(searchResults.map(result => ({
        type: 'verse',
        id: result.id,
        reference: result.reference,
        text: result.text,
        book: result.book,
        chapter: result.chapter,
        verse: result.verse
      })));
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle selection of a result
  const handleSelectResult = (result) => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    
    if (result.type === 'reference') {
      // Navigate to the Bible reader with the reference
      navigate(`/bible`, { 
        state: { 
          bookName: result.book,
          chapter: result.chapter,
          verse: result.verse 
        } 
      });
    } else if (onSelect) {
      onSelect(result);
    } else {
      // Default behavior is to navigate to the verse
      navigate(`/bible`, {
        state: {
          reference: result.reference,
          verse: result.verse
        }
      });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectResult(results[selectedIndex]);
        } else if (results.length > 0) {
          handleSelectResult(results[0]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        break;
      default:
        break;
    }
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={searchRef}
      className={`relative ${fullWidth ? 'w-full' : 'max-w-md'}`}
    >
      <div className="relative">
        <SafeIcon 
          icon={FiSearch} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 w-5 h-5" 
        />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length > 2 && setShowResults(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-spiritual-200 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spiritual-400 hover:text-spiritual-600"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-spiritual-200 z-50 max-h-80 overflow-y-auto"
          >
            {isSearching ? (
              <div className="p-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-spiritual-500"></div>
                <span className="ml-3 text-spiritual-600">Searching...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-spiritual-600">
                No results found. Try a different search term or Bible reference (e.g., "John 3:16").
              </div>
            ) : (
              <div>
                {results.map((result, index) => (
                  <div
                    key={result.id || `result-${index}`}
                    onClick={() => handleSelectResult(result)}
                    className={`p-3 cursor-pointer border-b border-spiritual-100 last:border-0 hover:bg-spiritual-50 transition-colors ${selectedIndex === index ? 'bg-spiritual-50' : ''}`}
                  >
                    {result.type === 'reference' ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <SafeIcon icon={FiBook} className="w-4 h-4 text-spiritual-500 mr-2" />
                          <span className="font-medium text-spiritual-700">{result.text}</span>
                        </div>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4 text-spiritual-400" />
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-spiritual-700 mb-1">
                          {result.reference}
                        </div>
                        <p className="text-sm text-spiritual-600 line-clamp-2">
                          {result.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerseSearch;