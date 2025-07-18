import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCopy, FiShare2, FiHeart, FiBookmark } = FiIcons;

/**
 * A reusable component to display Bible verses consistently across the app
 * @param {Object} props
 * @param {Object|Array} props.verses - Single verse object or array of verse objects
 * @param {string} props.reference - Optional reference text (if not included in verse object)
 * @param {boolean} props.showActions - Whether to show action buttons
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onCopy - Copy verse handler
 * @param {Function} props.onShare - Share verse handler
 * @param {Function} props.onFavorite - Favorite verse handler
 * @param {Function} props.onBookmark - Bookmark verse handler
 */
const BibleVerseDisplay = ({ 
  verses, 
  reference, 
  showActions = true,
  className = '',
  onCopy,
  onShare,
  onFavorite,
  onBookmark
}) => {
  // Handle both single verse and array of verses
  const verseArray = Array.isArray(verses) ? verses : [verses];
  
  // Only show valid verses (not null or undefined)
  const validVerses = verseArray.filter(verse => verse);
  
  if (validVerses.length === 0) {
    return (
      <div className={`bg-spiritual-50 rounded-lg p-4 border-l-4 border-spiritual-300 ${className}`}>
        <p className="text-spiritual-600 italic">Verse not found</p>
      </div>
    );
  }

  // Determine if we have a single verse or multiple verses
  const isSingleVerse = validVerses.length === 1;
  
  // Get reference from first verse if not provided
  const displayReference = reference || 
    (validVerses[0].reference || 
      (validVerses[0].chapter && validVerses[0].verse ? 
        `${validVerses[0].book || ''} ${validVerses[0].chapter}:${validVerses[0].verse}` : ''));
  
  const handleCopy = () => {
    if (onCopy) {
      onCopy(validVerses);
    } else {
      // Default copy behavior
      const textToCopy = `${displayReference}\n${validVerses.map(v => v.text).join('\n')}`;
      navigator.clipboard.writeText(textToCopy);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-spiritual-50 rounded-lg p-4 border-l-4 border-spiritual-300 ${className}`}
    >
      {/* Reference */}
      {displayReference && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiBookmark} className="w-4 h-4 text-spiritual-500" />
            <span className="font-medium text-spiritual-700">{displayReference}</span>
          </div>
        </div>
      )}
      
      {/* Verse content */}
      {isSingleVerse ? (
        <p className="text-spiritual-800 font-serif text-lg leading-relaxed">
          {validVerses[0].text}
        </p>
      ) : (
        <div className="space-y-2">
          {validVerses.map((verse, index) => (
            <div key={verse.id || index} className="flex">
              <span className="font-semibold text-spiritual-500 mr-2 min-w-[1.5rem] text-right">
                {verse.verse}.
              </span>
              <p className="text-spiritual-800 font-serif leading-relaxed flex-1">
                {verse.text}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* Action buttons */}
      {showActions && (
        <div className="flex items-center justify-end mt-3 pt-2 border-t border-spiritual-200">
          <button 
            onClick={handleCopy}
            className="p-2 text-spiritual-500 hover:text-spiritual-700 hover:bg-spiritual-200 rounded transition-colors"
            title="Copy verse"
          >
            <SafeIcon icon={FiCopy} className="w-4 h-4" />
          </button>
          
          {onShare && (
            <button 
              onClick={() => onShare(validVerses)}
              className="p-2 text-spiritual-500 hover:text-spiritual-700 hover:bg-spiritual-200 rounded transition-colors"
              title="Share verse"
            >
              <SafeIcon icon={FiShare2} className="w-4 h-4" />
            </button>
          )}
          
          {onFavorite && (
            <button 
              onClick={() => onFavorite(validVerses)}
              className="p-2 text-spiritual-500 hover:text-spiritual-700 hover:bg-spiritual-200 rounded transition-colors"
              title="Add to favorites"
            >
              <SafeIcon icon={FiHeart} className="w-4 h-4" />
            </button>
          )}
          
          {onBookmark && (
            <button 
              onClick={() => onBookmark(validVerses)}
              className="p-2 text-spiritual-500 hover:text-spiritual-700 hover:bg-spiritual-200 rounded transition-colors"
              title="Bookmark verse"
            >
              <SafeIcon icon={FiBookmark} className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default BibleVerseDisplay;