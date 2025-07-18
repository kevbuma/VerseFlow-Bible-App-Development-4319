import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiPlay, FiPause, FiRefreshCw, FiCheck, FiStar, FiTrendingUp, FiCalendar } = FiIcons;

const Memorization = () => {
  const [currentMode, setCurrentMode] = useState('flashcard');
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [streak, setStreak] = useState(12);

  const modes = [
    { id: 'flashcard', name: 'Flashcard', description: 'Review verses with reference and text' },
    { id: 'fill-blank', name: 'Fill the Blank', description: 'Complete missing words in verses' },
    { id: 'typing', name: 'Type It Out', description: 'Type the complete verse from memory' },
    { id: 'audio', name: 'Audio Review', description: 'Listen and repeat verses' }
  ];

  const memoryVerses = [
    {
      id: 1,
      reference: 'John 3:16',
      text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      difficulty: 'beginner',
      category: 'salvation',
      progress: 100,
      lastReviewed: '2024-01-15',
      streak: 5,
      mastered: true
    },
    {
      id: 2,
      reference: 'Philippians 4:13',
      text: 'I can do all things through Christ which strengtheneth me.',
      difficulty: 'beginner',
      category: 'strength',
      progress: 85,
      lastReviewed: '2024-01-14',
      streak: 3,
      mastered: false
    },
    {
      id: 3,
      reference: 'Romans 8:28',
      text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
      difficulty: 'intermediate',
      category: 'faith',
      progress: 60,
      lastReviewed: '2024-01-13',
      streak: 2,
      mastered: false
    },
    {
      id: 4,
      reference: 'Jeremiah 29:11',
      text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.',
      difficulty: 'intermediate',
      category: 'hope',
      progress: 40,
      lastReviewed: '2024-01-12',
      streak: 1,
      mastered: false
    }
  ];

  const currentVerse = memoryVerses[currentVerseIndex];

  const stats = [
    { label: 'Verses Memorized', value: '18', icon: FiTarget, color: 'spiritual' },
    { label: 'Current Streak', value: `${streak}`, icon: FiTrendingUp, color: 'divine' },
    { label: 'Total Reviews', value: '156', icon: FiRefreshCw, color: 'spiritual' },
    { label: 'Mastered', value: '12', icon: FiStar, color: 'divine' }
  ];

  const handleNextVerse = () => {
    setCurrentVerseIndex((prev) => (prev + 1) % memoryVerses.length);
    setShowAnswer(false);
  };

  const handlePrevVerse = () => {
    setCurrentVerseIndex((prev) => (prev - 1 + memoryVerses.length) % memoryVerses.length);
    setShowAnswer(false);
  };

  const fillBlankText = (text) => {
    const words = text.split(' ');
    const blankedWords = words.map((word, index) => {
      if (index % 4 === 0) {
        return '______';
      }
      return word;
    });
    return blankedWords.join(' ');
  };

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
            <h1 className="text-3xl font-bold text-spiritual-800 mb-2">Scripture Memorization</h1>
            <p className="text-spiritual-600">
              Hide God's Word in your heart through systematic memorization
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-spiritual-800">🔥</div>
              <div className="text-sm text-spiritual-600">{streak} day streak</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Practice Area */}
        <div className="lg:col-span-2">
          {/* Mode Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-spiritual-100">
            <h3 className="text-lg font-semibold text-spiritual-800 mb-4">Practice Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    currentMode === mode.id
                      ? 'border-spiritual-500 bg-spiritual-50'
                      : 'border-spiritual-200 hover:border-spiritual-300'
                  }`}
                >
                  <div className="font-medium text-spiritual-800">{mode.name}</div>
                  <div className="text-sm text-spiritual-600">{mode.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Practice Card */}
          <motion.div
            key={currentVerseIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-spiritual-100"
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-lg font-bold text-spiritual-800">{currentVerse.reference}</span>
                {currentVerse.mastered && (
                  <SafeIcon icon={FiStar} className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div className="w-full bg-spiritual-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-spiritual-500 to-divine-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentVerse.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-spiritual-600">{currentVerse.progress}% mastered</p>
            </div>

            {/* Flashcard Mode */}
            {currentMode === 'flashcard' && (
              <div className="text-center">
                <div className="bg-spiritual-50 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
                  {showAnswer ? (
                    <p className="text-spiritual-800 font-serif text-lg leading-relaxed">
                      {currentVerse.text}
                    </p>
                  ) : (
                    <div>
                      <p className="text-spiritual-600 mb-4">What does this verse say?</p>
                      <button
                        onClick={() => setShowAnswer(true)}
                        className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200"
                      >
                        Show Verse
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fill in the Blank Mode */}
            {currentMode === 'fill-blank' && (
              <div className="text-center">
                <div className="bg-spiritual-50 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
                  <p className="text-spiritual-800 font-serif text-lg leading-relaxed">
                    {fillBlankText(currentVerse.text)}
                  </p>
                </div>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200"
                >
                  {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </button>
                {showAnswer && (
                  <div className="mt-4 p-4 bg-divine-50 rounded-lg">
                    <p className="text-divine-800 font-serif">{currentVerse.text}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrevVerse}
                className="flex items-center space-x-2 px-4 py-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
              >
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
                  <SafeIcon icon={FiPlay} className="w-5 h-5" />
                </button>
                <button className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
                  <SafeIcon icon={FiRefreshCw} className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={handleNextVerse}
                className="flex items-center space-x-2 px-4 py-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
              >
                <span>Next</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Verse List */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100">
          <h3 className="text-lg font-semibold text-spiritual-800 mb-4">My Verses</h3>
          <div className="space-y-3">
            {memoryVerses.map((verse, index) => (
              <motion.div
                key={verse.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  currentVerseIndex === index
                    ? 'border-spiritual-500 bg-spiritual-50'
                    : 'border-spiritual-200 hover:border-spiritual-300'
                }`}
                onClick={() => setCurrentVerseIndex(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-spiritual-800">{verse.reference}</span>
                  <div className="flex items-center space-x-1">
                    {verse.mastered && (
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-xs px-2 py-1 bg-spiritual-200 text-spiritual-700 rounded-full">
                      {verse.difficulty}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-spiritual-200 rounded-full h-1 mb-2">
                  <div 
                    className="bg-gradient-to-r from-spiritual-500 to-divine-500 h-1 rounded-full"
                    style={{ width: `${verse.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-spiritual-500">
                  <span>{verse.category}</span>
                  <span>{verse.streak} day streak</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200">
            Add New Verse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Memorization;