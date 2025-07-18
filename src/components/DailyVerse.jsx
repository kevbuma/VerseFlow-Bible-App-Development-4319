import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { toast } from 'react-toastify';
import SafeIcon from '../common/SafeIcon';
import BibleVerseDisplay from './BibleVerseDisplay';
import { bibleService } from '../services/bibleService';

const { FiRefreshCw } = FiIcons;

/**
 * Daily Verse component that can be used on Dashboard and other pages
 * @param {Object} props
 * @param {boolean} props.compact - Whether to show a compact version
 */
const DailyVerse = ({ compact = false }) => {
  const [verse, setVerse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDailyVerse = async () => {
    try {
      setIsRefreshing(true);
      const dailyVerse = await bibleService.getDailyVerse();
      setVerse(dailyVerse);
    } catch (error) {
      console.error('Error fetching daily verse:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDailyVerse();
  }, []);

  const handleRefresh = () => {
    fetchDailyVerse();
  };

  const handleShare = () => {
    if (verse) {
      const shareText = `${verse.reference}\n${verse.text}\n\n#DailyVerse`;
      navigator.clipboard.writeText(shareText);
      toast.success('Verse copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-spiritual-100 ${compact ? 'p-4' : 'p-6'}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-spiritual-100 rounded w-1/3 mb-3"></div>
          <div className="h-3 bg-spiritual-100 rounded w-full mb-2"></div>
          <div className="h-3 bg-spiritual-100 rounded w-5/6 mb-2"></div>
          <div className="h-3 bg-spiritual-100 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!verse) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-spiritual-100 ${compact ? 'p-4' : 'p-6'}`}>
        <p className="text-spiritual-600 italic">Could not load daily verse</p>
        <button 
          onClick={handleRefresh}
          className="mt-2 px-3 py-1 bg-spiritual-100 text-spiritual-600 rounded-lg hover:bg-spiritual-200 transition-colors text-sm flex items-center space-x-1"
        >
          <SafeIcon icon={FiRefreshCw} className="w-3 h-3" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg border border-spiritual-100 p-4"
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-semibold text-spiritual-800">Verse of the Day</h3>
          <button 
            onClick={handleRefresh}
            className="p-1 text-spiritual-400 hover:text-spiritual-600 rounded-full hover:bg-spiritual-100 transition-colors"
            disabled={isRefreshing}
          >
            <SafeIcon icon={FiRefreshCw} className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <BibleVerseDisplay 
          verses={{ 
            reference: verse.reference, 
            text: verse.text 
          }}
          showActions={false}
          className="border-l-2 p-3 mb-2"
        />
        
        <div className="flex justify-end">
          <button 
            onClick={handleShare}
            className="text-xs text-spiritual-500 hover:text-spiritual-700"
          >
            Share
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-spiritual-100 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-2 rounded-lg">
            <SafeIcon icon={FiRefreshCw} className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-spiritual-800">Verse of the Day</h3>
        </div>
        <button 
          onClick={handleRefresh}
          className="p-2 text-spiritual-400 hover:text-spiritual-600 rounded-full hover:bg-spiritual-100 transition-colors"
          disabled={isRefreshing}
        >
          <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <BibleVerseDisplay 
        verses={{ 
          reference: verse.reference, 
          text: verse.text 
        }}
        onShare={handleShare}
        className="mb-3"
      />
      
      <p className="text-sm text-spiritual-500 italic mt-4">
        "Your word is a lamp for my feet, a light on my path." - Psalm 119:105
      </p>
    </motion.div>
  );
};

export default DailyVerse;