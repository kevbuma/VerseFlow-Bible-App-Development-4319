import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSun, FiHeart, FiShare2, FiBookmark, FiVolume2, FiCalendar, FiArrowLeft, FiArrowRight } = FiIcons;

const Devotional = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const todaysDevotional = {
    date: 'January 15, 2024',
    title: 'Walking in His Light',
    verse: '1 John 1:7',
    verseText: 'But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus his Son cleanses us from all sin.',
    content: `Light has always been a powerful symbol in Scripture. From the very beginning, when God said "Let there be light," to Jesus declaring "I am the light of the world," light represents truth, purity, and divine presence.

John reminds us that walking in God's light isn't just about moral behavior—it's about authentic relationship. When we live transparently before God, acknowledging our need for His grace, we experience true fellowship both with Him and with other believers.

This light exposes our sin, but it also provides the remedy. The blood of Jesus cleanses us from all unrighteousness. We don't have to hide in the shadows of shame or pretend to be perfect. Instead, we can walk confidently in His light, knowing that His love covers our failures.

Today, ask yourself: Are there areas of your life where you're hiding from God's light? Remember, He doesn't shine His light to condemn, but to heal and restore. Step into His light today and experience the freedom that comes from walking in truth.`,
    reflectionQuestion: 'What does it mean to "walk in the light" in your daily life? How can you be more transparent with God and others today?',
    prayer: 'Heavenly Father, thank You for being the light that guides my path. Help me to walk in Your light today, not hiding from You but drawing near in honesty and faith. Cleanse me from all sin and help me to live in authentic fellowship with You and others. In Jesus\' name, Amen.',
    audioUrl: '/audio/devotional-jan-15.mp3'
  };

  const recentDevotionals = [
    {
      date: 'January 14, 2024',
      title: 'Trusting in His Timing',
      verse: 'Ecclesiastes 3:1',
      excerpt: 'God\'s timing is perfect, even when we can\'t see the bigger picture...'
    },
    {
      date: 'January 13, 2024',
      title: 'The Power of Gratitude',
      verse: '1 Thessalonians 5:18',
      excerpt: 'In every circumstance, we can find reasons to give thanks...'
    },
    {
      date: 'January 12, 2024',
      title: 'Strength in Weakness',
      verse: '2 Corinthians 12:9',
      excerpt: 'Paul discovered that God\'s strength is made perfect in our weakness...'
    }
  ];

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing devotional...');
  };

  const handlePlayAudio = () => {
    // Implement audio playback
    console.log('Playing audio...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-50 to-divine-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-3 rounded-full">
              <SafeIcon icon={FiSun} className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-spiritual-800">Daily Devotional</h1>
          </div>
          <p className="text-spiritual-600">
            Start your day with God's Word and reflection
          </p>
        </motion.div>

        {/* Date Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-lg p-4"
        >
          <button className="flex items-center space-x-2 px-4 py-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiCalendar} className="w-5 h-5 text-spiritual-500" />
            <span className="text-lg font-semibold text-spiritual-800">
              {todaysDevotional.date}
            </span>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
            <span>Next</span>
            <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Main Devotional Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Header Image */}
          <div 
            className="h-48 bg-gradient-to-r from-spiritual-500 to-divine-500 flex items-center justify-center relative"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative text-center text-white">
              <h2 className="text-2xl font-bold mb-2">{todaysDevotional.title}</h2>
              <p className="text-lg opacity-90">{todaysDevotional.verse}</p>
            </div>
          </div>

          <div className="p-8">
            {/* Verse */}
            <div className="bg-spiritual-50 rounded-lg p-6 mb-6 border-l-4 border-spiritual-500">
              <div className="flex items-center space-x-2 mb-3">
                <SafeIcon icon={FiBookmark} className="w-5 h-5 text-spiritual-500" />
                <span className="font-semibold text-spiritual-800">{todaysDevotional.verse}</span>
              </div>
              <p className="text-spiritual-800 font-serif text-lg leading-relaxed italic">
                {todaysDevotional.verseText}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-spiritual max-w-none mb-8">
              {todaysDevotional.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-spiritual-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Reflection Question */}
            <div className="bg-divine-50 rounded-lg p-6 mb-6 border-l-4 border-divine-500">
              <h3 className="font-semibold text-divine-800 mb-3">Reflection Question</h3>
              <p className="text-divine-700 italic">{todaysDevotional.reflectionQuestion}</p>
            </div>

            {/* Prayer */}
            <div className="bg-spiritual-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-spiritual-800 mb-3">Prayer</h3>
              <p className="text-spiritual-700 italic leading-relaxed">{todaysDevotional.prayer}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isFavorited 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'
                  }`}
                >
                  <SafeIcon icon={FiHeart} className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
                </button>
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'
                  }`}
                >
                  <SafeIcon icon={FiBookmark} className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayAudio}
                  className="flex items-center space-x-2 px-4 py-2 bg-spiritual-100 text-spiritual-600 rounded-lg hover:bg-spiritual-200 transition-colors"
                >
                  <SafeIcon icon={FiVolume2} className="w-4 h-4" />
                  <span>Listen</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white rounded-lg hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200"
                >
                  <SafeIcon icon={FiShare2} className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Devotionals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-spiritual-800 mb-4">Recent Devotionals</h3>
          <div className="space-y-4">
            {recentDevotionals.map((devotional, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-spiritual-50 rounded-lg hover:bg-spiritual-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-spiritual-500 to-divine-500 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiSun} className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-spiritual-800">{devotional.title}</h4>
                  <p className="text-sm text-spiritual-600 mb-1">{devotional.verse}</p>
                  <p className="text-sm text-spiritual-500">{devotional.excerpt}</p>
                </div>
                <div className="text-sm text-spiritual-500">
                  {devotional.date}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Devotional;