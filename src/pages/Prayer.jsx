import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePrayerRequests } from '../hooks/usePrayerRequests';
import AddPrayerModal from '../components/modals/AddPrayerModal';

const { FiHeart, FiPlus, FiCheck, FiClock, FiUsers, FiLock, FiGlobe, FiEdit3, FiMoreVertical } = FiIcons;

const Prayer = () => {
  const [activeTab, setActiveTab] = useState('my-prayers');
  const [showAddPrayer, setShowAddPrayer] = useState(false);
  const { 
    prayers, 
    isLoading, 
    error, 
    addPrayer, 
    markAnswered, 
    prayFor 
  } = usePrayerRequests();

  const myPrayers = prayers.filter(prayer => prayer.privacy === 'private');
  const groupPrayers = prayers.filter(prayer => prayer.privacy === 'public');
  const answeredPrayers = prayers.filter(prayer => prayer.is_answered);

  const categories = [
    {id: 'health', name: 'Health & Healing', color: 'bg-red-100 text-red-800'},
    {id: 'career', name: 'Career & Work', color: 'bg-blue-100 text-blue-800'},
    {id: 'relationships', name: 'Relationships', color: 'bg-pink-100 text-pink-800'},
    {id: 'church', name: 'Church & Ministry', color: 'bg-purple-100 text-purple-800'},
    {id: 'missions', name: 'Missions', color: 'bg-green-100 text-green-800'},
    {id: 'ministry', name: 'Ministry', color: 'bg-yellow-100 text-yellow-800'},
    {id: 'family', name: 'Family', color: 'bg-indigo-100 text-indigo-800'},
    {id: 'other', name: 'Other', color: 'bg-gray-100 text-gray-800'}
  ];

  const getCategoryStyle = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const handleAddPrayer = async (prayerData) => {
    await addPrayer(prayerData);
  };

  const handleMarkAnswered = async (id) => {
    await markAnswered(id);
  };

  const handlePrayForRequest = async (id) => {
    await prayFor(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spiritual-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Failed to load prayer requests. Please try again later.</p>
        </div>
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
            <h1 className="text-3xl font-bold text-spiritual-800 mb-2">Prayer Journal</h1>
            <p className="text-spiritual-600">
              Bring your requests to God and join others in prayer
            </p>
          </div>
          <button
            onClick={() => setShowAddPrayer(true)}
            className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Add Prayer</span>
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-spiritual-200">
          <nav className="-mb-px flex space-x-8">
            {[
              {id: 'my-prayers', label: 'My Prayers'},
              {id: 'group-prayers', label: 'Group Prayers'},
              {id: 'answered', label: 'Answered Prayers'}
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

      {/* My Prayers Tab */}
      {activeTab === 'my-prayers' && (
        <div className="space-y-6">
          {myPrayers.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-spiritual-100 inline-block p-4 rounded-full mb-4">
                <SafeIcon icon={FiHeart} className="w-8 h-8 text-spiritual-500" />
              </div>
              <h3 className="text-xl font-medium text-spiritual-800 mb-2">No Prayer Requests Yet</h3>
              <p className="text-spiritual-600 mb-4">
                Add your first prayer request to keep track of your prayers and see how God answers them.
              </p>
              <button
                onClick={() => setShowAddPrayer(true)}
                className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Add Prayer</span>
              </button>
            </div>
          ) : (
            myPrayers.map((prayer, index) => (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-spiritual-800">{prayer.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryStyle(prayer.category)}`}>
                        {categories.find(c => c.id === prayer.category)?.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={prayer.privacy === 'private' ? FiLock : FiGlobe} className="w-4 h-4 text-spiritual-500" />
                        <span className="text-xs text-spiritual-500">{prayer.privacy}</span>
                      </div>
                    </div>
                    <p className="text-spiritual-600 mb-3">{prayer.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-spiritual-500">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-4 h-4" />
                        <span>Added {new Date(prayer.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${prayer.status === 'answered' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="capitalize">{prayer.is_answered ? 'Answered' : 'Ongoing'}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-spiritual-400 hover:text-spiritual-600">
                    <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
                  </button>
                </div>

                {/* Prayer Updates */}
                {prayer.updates && prayer.updates.length > 0 && (
                  <div className="border-t border-spiritual-200 pt-4">
                    <h4 className="text-sm font-medium text-spiritual-800 mb-3">Recent Updates</h4>
                    <div className="space-y-2">
                      {prayer.updates.slice(0, 2).map((update, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-spiritual-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-spiritual-700">{update.text}</p>
                            <span className="text-xs text-spiritual-500">{update.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-spiritual-200">
                  <button className="text-spiritual-600 hover:text-spiritual-800 text-sm font-medium">
                    Add Update
                  </button>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-3 py-1 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
                      <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    {!prayer.is_answered && (
                      <button 
                        onClick={() => handleMarkAnswered(prayer.id)}
                        className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        <span className="text-sm">Mark Answered</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Group Prayers Tab */}
      {activeTab === 'group-prayers' && (
        <div className="space-y-6">
          {groupPrayers.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-spiritual-100 inline-block p-4 rounded-full mb-4">
                <SafeIcon icon={FiUsers} className="w-8 h-8 text-spiritual-500" />
              </div>
              <h3 className="text-xl font-medium text-spiritual-800 mb-2">No Group Prayer Requests</h3>
              <p className="text-spiritual-600 mb-4">
                Share your prayer requests with the community to pray together.
              </p>
              <button
                onClick={() => setShowAddPrayer(true)}
                className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Add Public Prayer</span>
              </button>
            </div>
          ) : (
            groupPrayers.map((prayer, index) => (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-spiritual-800">{prayer.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryStyle(prayer.category)}`}>
                        {categories.find(c => c.id === prayer.category)?.name}
                      </span>
                      <SafeIcon icon={FiGlobe} className="w-4 h-4 text-spiritual-500" />
                    </div>
                    <p className="text-spiritual-600 mb-3">{prayer.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-spiritual-500">
                      <span>By {prayer.author || 'You'}</span>
                      <span>•</span>
                      <span>Added {new Date(prayer.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUsers} className="w-4 h-4" />
                        <span>{prayer.prayer_count || 0} people praying</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-spiritual-400 hover:text-spiritual-600">
                    <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
                  </button>
                </div>

                {/* Recent Prayers */}
                {prayer.recentPrayers && prayer.recentPrayers.length > 0 && (
                  <div className="border-t border-spiritual-200 pt-4 mb-4">
                    <h4 className="text-sm font-medium text-spiritual-800 mb-3">Recent Prayers</h4>
                    <div className="flex items-center space-x-4">
                      {prayer.recentPrayers.slice(0, 3).map((person, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-spiritual-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-spiritual-700">
                              {person.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="text-xs text-spiritual-600">
                            <div>{person.name}</div>
                            <div className="text-spiritual-500">{person.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-spiritual-200">
                  <button 
                    onClick={() => handlePrayForRequest(prayer.id)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-4 py-2 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200"
                  >
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                    <span>Pray for This</span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <button className="text-spiritual-600 hover:text-spiritual-800 text-sm font-medium">
                      View Comments
                    </button>
                    <button className="text-spiritual-600 hover:text-spiritual-800 text-sm font-medium">
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Answered Prayers Tab */}
      {activeTab === 'answered' && (
        <div className="space-y-6">
          {answeredPrayers.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-green-100 inline-block p-4 rounded-full mb-4">
                <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-spiritual-800 mb-2">No Answered Prayers Yet</h3>
              <p className="text-spiritual-600 mb-4">
                When God answers your prayers, mark them as answered to build a testimony of His faithfulness.
              </p>
              <button
                onClick={() => setActiveTab('my-prayers')}
                className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200"
              >
                View My Prayers
              </button>
            </div>
          ) : (
            answeredPrayers.map((prayer, index) => (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-green-200 bg-gradient-to-r from-green-50 to-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-spiritual-800">{prayer.title}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Answered
                      </span>
                    </div>
                    <p className="text-spiritual-600 mb-3">{prayer.description}</p>
                  </div>
                </div>

                {/* Answer */}
                {prayer.answer ? (
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                    <h4 className="font-medium text-green-800 mb-2">God's Answer</h4>
                    <p className="text-green-700">{prayer.answer}</p>
                    <span className="text-xs text-green-600 mt-2 block">{new Date(prayer.answered_at || prayer.updated_at || prayer.created_at).toLocaleDateString()}</span>
                  </div>
                ) : (
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                    <h4 className="font-medium text-green-800 mb-2">God's Answer</h4>
                    <p className="text-green-700">Prayer marked as answered. Click "Add Testimony" to share how God answered this prayer.</p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-green-200">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Add Testimony
                  </button>
                  <span className="text-xs text-spiritual-500">
                    Praise God for His faithfulness! 🙏
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Add Prayer Modal */}
      <AddPrayerModal 
        isOpen={showAddPrayer} 
        onClose={() => setShowAddPrayer(false)} 
        onSubmit={handleAddPrayer} 
      />
    </div>
  );
};

export default Prayer;