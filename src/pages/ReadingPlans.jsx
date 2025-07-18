import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useReadingPlans } from '../hooks/useReadingPlans';

const { FiBook, FiCalendar, FiClock, FiPlay, FiPause, FiCheck, FiRefreshCw } = FiIcons;

const ReadingPlans = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { plans, userPlans, isLoading, startPlan, updateProgress, pausePlan, resumePlan } = useReadingPlans();

  const categories = [
    { id: 'all', label: 'All Plans' },
    { id: 'chronological', label: 'Chronological' },
    { id: 'topical', label: 'Topical' },
    { id: 'thematic', label: 'Thematic' }
  ];

  const availablePlans = [
    {
      id: 1,
      title: 'One Year Bible',
      description: 'Complete the Bible in 365 days with daily readings from Old and New Testament',
      duration: '365 days',
      difficulty: 'Beginner',
      participants: '12.5K',
      progress: 0,
      category: 'chronological'
    },
    {
      id: 2,
      title: 'Psalms & Proverbs',
      description: 'Dive deep into wisdom literature with daily reflections',
      duration: '60 days',
      difficulty: 'Intermediate',
      participants: '8.2K',
      progress: 0,
      category: 'topical'
    },
    {
      id: 3,
      title: 'Life of Jesus',
      description: 'Follow Jesus through the four Gospels chronologically',
      duration: '90 days',
      difficulty: 'Beginner',
      participants: '15.8K',
      progress: 0,
      category: 'thematic'
    },
    {
      id: 4,
      title: 'Paul\'s Letters',
      description: 'Study the apostle Paul\'s epistles with historical context',
      duration: '45 days',
      difficulty: 'Advanced',
      participants: '5.3K',
      progress: 0,
      category: 'topical'
    }
  ];

  const myPlans = [
    {
      id: 1,
      title: 'One Year Bible',
      description: 'Complete the Bible in 365 days with daily readings from Old and New Testament',
      duration: '365 days',
      progress: 42,
      status: 'active',
      currentReading: 'Matthew 5:1-12',
      streak: 12
    },
    {
      id: 2,
      title: 'Psalms & Proverbs',
      description: 'Dive deep into wisdom literature with daily reflections',
      duration: '60 days',
      progress: 78,
      status: 'paused',
      currentReading: 'Psalm 23',
      streak: 8
    }
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? availablePlans 
    : availablePlans.filter(plan => plan.category === selectedCategory);

  const handleStartPlan = async (planId) => {
    try {
      const plan = availablePlans.find(p => p.id === planId);
      if (plan) {
        toast.success(`Started "${plan.title}" reading plan!`);
        // In a real app, this would call the API
        // await startPlan(planId);
      }
    } catch (error) {
      toast.error('Failed to start reading plan. Please try again.');
    }
  };

  const handlePausePlan = async (planId) => {
    try {
      const plan = myPlans.find(p => p.id === planId);
      if (plan) {
        toast.success(`Paused "${plan.title}" reading plan.`);
        // await pausePlan(planId);
      }
    } catch (error) {
      toast.error('Failed to pause reading plan. Please try again.');
    }
  };

  const handleResumePlan = async (planId) => {
    try {
      const plan = myPlans.find(p => p.id === planId);
      if (plan) {
        toast.success(`Resumed "${plan.title}" reading plan!`);
        // await resumePlan(planId);
      }
    } catch (error) {
      toast.error('Failed to resume reading plan. Please try again.');
    }
  };

  const handleContinueReading = (plan) => {
    toast.info(`Opening ${plan.currentReading}...`);
    // Navigate to Bible reader with specific passage
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
        <h1 className="text-3xl font-bold text-spiritual-800 mb-2">Reading Plans</h1>
        <p className="text-spiritual-600">
          Choose from various Bible reading plans to guide your spiritual journey
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-spiritual-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'available', label: 'Available Plans' },
              { id: 'my-plans', label: 'My Plans' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-spiritual-500 text-spiritual-600'
                    : 'border-transparent text-spiritual-500 hover:text-spiritual-700 hover:border-spiritual-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'available' && (
        <div>
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-spiritual-500 text-white'
                      : 'bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Available Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-2 rounded-lg">
                    <SafeIcon icon={FiBook} className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-spiritual-100 text-spiritual-700 rounded-full">
                    {plan.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-spiritual-800 mb-2">{plan.title}</h3>
                <p className="text-spiritual-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-center justify-between text-sm text-spiritual-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>{plan.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{plan.participants} joined</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartPlan(plan.id)}
                  className="w-full bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPlay} className="w-4 h-4" />
                  <span>Start Plan</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'my-plans' && (
        <div>
          {myPlans.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-spiritual-100 inline-block p-4 rounded-full mb-4">
                <SafeIcon icon={FiBook} className="w-8 h-8 text-spiritual-500" />
              </div>
              <h3 className="text-xl font-medium text-spiritual-800 mb-2">No Active Reading Plans</h3>
              <p className="text-spiritual-600 mb-4">
                Start a reading plan to begin your systematic Bible study journey.
              </p>
              <button
                onClick={() => setActiveTab('available')}
                className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiBook} className="w-5 h-5" />
                <span>Browse Reading Plans</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-spiritual-800">{plan.title}</h3>
                    <div className="flex items-center space-x-2">
                      {plan.status === 'active' ? (
                        <button
                          onClick={() => handlePausePlan(plan.id)}
                          className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
                          title="Pause Plan"
                        >
                          <SafeIcon icon={FiPause} className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleResumePlan(plan.id)}
                          className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors"
                          title="Resume Plan"
                        >
                          <SafeIcon icon={FiPlay} className="w-4 h-4" />
                        </button>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        plan.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {plan.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                    </div>
                  </div>
                  <p className="text-spiritual-600 text-sm mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-spiritual-600">Progress</span>
                      <span className="text-spiritual-800 font-medium">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-spiritual-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-spiritual-500 to-divine-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-spiritual-500 mb-4">
                    <div>
                      <span className="font-medium">Current: </span>
                      <span>{plan.currentReading}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🔥</span>
                      <span>{plan.streak} day streak</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleContinueReading(plan)}
                      className="flex-1 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-2 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200"
                    >
                      Continue Reading
                    </button>
                    <button
                      onClick={() => toast.info('Plan details coming soon!')}
                      className="px-4 py-2 border border-spiritual-300 text-spiritual-600 rounded-lg hover:bg-spiritual-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingPlans;