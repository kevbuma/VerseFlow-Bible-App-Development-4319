import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiPlus, FiMessageSquare, FiHeart, FiShare2, FiLock, FiGlobe } = FiIcons;

const Groups = () => {
  const [activeTab, setActiveTab] = useState('my-groups');

  const myGroups = [
    {
      id: 1,
      name: 'Young Adults Bible Study',
      description: 'Weekly study focusing on practical Christian living',
      members: 24,
      privacy: 'private',
      lastActivity: '2 hours ago',
      currentStudy: 'Book of James',
      unreadMessages: 5,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Psalms Deep Dive',
      description: 'Exploring the beauty and depth of the Psalms',
      members: 18,
      privacy: 'public',
      lastActivity: '1 day ago',
      currentStudy: 'Psalm 23',
      unreadMessages: 2,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Marriage & Family',
      description: 'Biblical principles for strong relationships',
      members: 32,
      privacy: 'private',
      lastActivity: '3 days ago',
      currentStudy: 'Ephesians 5',
      unreadMessages: 0,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop'
    }
  ];

  const discoverGroups = [
    {
      id: 4,
      name: 'New Testament Survey',
      description: 'Comprehensive study through the New Testament',
      members: 156,
      privacy: 'public',
      category: 'Bible Study',
      leader: 'Pastor Mike',
      schedule: 'Sundays 7 PM',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Women of Faith',
      description: 'Empowering women through Biblical truth',
      members: 89,
      privacy: 'private',
      category: 'Women\'s Ministry',
      leader: 'Sarah Johnson',
      schedule: 'Wednesdays 6:30 PM',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Men\'s Brotherhood',
      description: 'Iron sharpening iron - men growing together',
      members: 45,
      privacy: 'private',
      category: 'Men\'s Ministry',
      leader: 'David Chen',
      schedule: 'Saturdays 8 AM',
      image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=400&h=300&fit=crop'
    }
  ];

  const recentDiscussions = [
    {
      id: 1,
      group: 'Young Adults Bible Study',
      title: 'How do we handle trials with faith?',
      author: 'Emily R.',
      replies: 12,
      lastReply: '30 minutes ago',
      excerpt: 'James 1:2-4 talks about considering trials as joy...'
    },
    {
      id: 2,
      group: 'Psalms Deep Dive',
      title: 'The shepherd imagery in Psalm 23',
      author: 'Michael T.',
      replies: 8,
      lastReply: '2 hours ago',
      excerpt: 'What does it mean that the Lord is our shepherd?'
    },
    {
      id: 3,
      group: 'Marriage & Family',
      title: 'Practical ways to show love',
      author: 'Lisa M.',
      replies: 15,
      lastReply: '4 hours ago',
      excerpt: 'Beyond the 5 love languages, what are some biblical ways...'
    }
  ];

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
            <h1 className="text-3xl font-bold text-spiritual-800 mb-2">Bible Study Groups</h1>
            <p className="text-spiritual-600">
              Connect with others in meaningful Bible study and fellowship
            </p>
          </div>
          <button className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white px-6 py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 flex items-center space-x-2">
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Create Group</span>
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-spiritual-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'my-groups', label: 'My Groups' },
              { id: 'discover', label: 'Discover' },
              { id: 'discussions', label: 'Recent Discussions' }
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

      {/* My Groups Tab */}
      {activeTab === 'my-groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-spiritual-100 hover:shadow-xl transition-all duration-300"
            >
              <div 
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${group.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute top-3 right-3 flex items-center space-x-2">
                  <SafeIcon 
                    icon={group.privacy === 'private' ? FiLock : FiGlobe} 
                    className="w-4 h-4 text-white" 
                  />
                  {group.unreadMessages > 0 && (
                    <span className="bg-divine-500 text-white text-xs px-2 py-1 rounded-full">
                      {group.unreadMessages}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-spiritual-800 mb-2">{group.name}</h3>
                <p className="text-spiritual-600 text-sm mb-4">{group.description}</p>
                
                <div className="flex items-center justify-between text-sm text-spiritual-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                    <span>{group.members} members</span>
                  </div>
                  <span>{group.lastActivity}</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs text-spiritual-500">Current Study:</span>
                  <p className="text-sm font-medium text-spiritual-800">{group.currentStudy}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-2 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                    <span>Join Discussion</span>
                  </button>
                  <button className="px-3 py-2 border border-spiritual-300 text-spiritual-600 rounded-lg hover:bg-spiritual-50 transition-colors">
                    <SafeIcon icon={FiShare2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoverGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-spiritual-100 hover:shadow-xl transition-all duration-300"
            >
              <div 
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${group.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute top-3 right-3">
                  <SafeIcon 
                    icon={group.privacy === 'private' ? FiLock : FiGlobe} 
                    className="w-4 h-4 text-white" 
                  />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white bg-opacity-90 text-spiritual-800 text-xs px-2 py-1 rounded-full">
                    {group.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-spiritual-800 mb-2">{group.name}</h3>
                <p className="text-spiritual-600 text-sm mb-4">{group.description}</p>
                
                <div className="space-y-2 text-sm text-spiritual-500 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Leader:</span>
                    <span className="font-medium">{group.leader}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Schedule:</span>
                    <span className="font-medium">{group.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Members:</span>
                    <span className="font-medium">{group.members}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-spiritual-500 to-divine-500 text-white py-3 rounded-lg font-medium hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200">
                  Join Group
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Recent Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {recentDiscussions.map((discussion, index) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-spiritual-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-spiritual-100 text-spiritual-700 rounded-full">
                      {discussion.group}
                    </span>
                    <span className="text-xs text-spiritual-500">{discussion.lastReply}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-spiritual-800 mb-2">{discussion.title}</h3>
                  <p className="text-spiritual-600 text-sm mb-3">{discussion.excerpt}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-spiritual-500">
                    <span>By {discussion.author}</span>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                      <span>{discussion.replies} replies</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-spiritual-600 hover:text-spiritual-800 hover:bg-spiritual-100 rounded-lg transition-colors">
                    <SafeIcon icon={FiShare2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Groups;