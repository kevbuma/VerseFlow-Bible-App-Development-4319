import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageCircle, FiSend, FiBook, FiHeart, FiGraduationCap, FiStar, FiCopy, FiThumbsUp } = FiIcons;

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [aiTone, setAiTone] = useState('teacher');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'user',
      message: 'What does it mean to have faith like a mustard seed?',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      type: 'ai',
      message: 'Great question! When Jesus spoke about faith like a mustard seed in Matthew 17:20, He was highlighting the power of even small faith. The mustard seed was the smallest seed known to His audience, yet it grows into a large plant.\n\nThe key isn\'t the size of your faith, but the object of your faith - God Himself. Even small, genuine faith in our mighty God can accomplish what seems impossible. It\'s about quality, not quantity.\n\nRelated verses you might find helpful:\n• Matthew 17:20 - "If you have faith like a grain of mustard seed..."\n• Luke 17:6 - Jesus repeats this teaching\n• Mark 11:23 - Faith that moves mountains',
      timestamp: '2:31 PM',
      relatedVerses: [
        {
          reference: 'Matthew 17:20',
          text: 'If you have faith like a grain of mustard seed, you will say to this mountain, "Move from here to there," and it will move, and nothing will be impossible for you.'
        },
        {
          reference: 'Luke 17:6',
          text: 'If you had faith like a grain of mustard seed, you could say to this mulberry tree, "Be uprooted and planted in the sea," and it would obey you.'
        }
      ]
    }
  ]);

  const aiTones = [
    { id: 'teacher', name: 'Teacher', icon: FiGraduationCap, description: 'Educational and instructive' },
    { id: 'scholar', name: 'Scholar', icon: FiBook, description: 'Academic and detailed' },
    { id: 'mentor', name: 'Mentor', icon: FiStar, description: 'Wise and guiding' },
    { id: 'encourager', name: 'Encourager', icon: FiHeart, description: 'Supportive and uplifting' }
  ];

  const quickQuestions = [
    'What does this verse mean?',
    'How do I apply this to my life?',
    'What are related verses?',
    'What\'s the historical context?',
    'How does this connect to Jesus?'
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newUserMessage = {
        id: chatHistory.length + 1,
        type: 'user',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, newUserMessage]);
      setMessage('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatHistory.length + 2,
          type: 'ai',
          message: `Thank you for your question about "${message.trim()}". This is a mock response in ${aiTones.find(t => t.id === aiTone)?.name} mode. In a real implementation, this would connect to an AI service to provide biblical insights and guidance.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleQuickQuestion = (question) => {
    setMessage(question);
  };

  const handleCopyMessage = (messageText) => {
    navigator.clipboard.writeText(messageText);
    toast.success('Message copied to clipboard!');
  };

  const handleLikeMessage = () => {
    toast.success('Thank you for the feedback!');
  };

  return (
    <div className="h-screen flex flex-col bg-spiritual-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-spiritual-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-spiritual-500 to-divine-500 p-2 rounded-lg">
                <SafeIcon icon={FiMessageCircle} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-spiritual-800">AI Study Assistant</h1>
                <p className="text-sm text-spiritual-600">Ask questions about Scripture, theology, and Christian living</p>
              </div>
            </div>
            {/* AI Tone Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-spiritual-600">Tone:</span>
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className="px-3 py-1 border border-spiritual-300 rounded-lg text-sm focus:ring-2 focus:ring-spiritual-500"
              >
                {aiTones.map((tone) => (
                  <option key={tone.id} value={tone.id}>{tone.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          {/* AI Tone Display */}
          <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-spiritual-200">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={aiTones.find(t => t.id === aiTone)?.icon} className="w-5 h-5 text-spiritual-500" />
              <div>
                <span className="font-medium text-spiritual-800">
                  {aiTones.find(t => t.id === aiTone)?.name} Mode
                </span>
                <p className="text-sm text-spiritual-600">
                  {aiTones.find(t => t.id === aiTone)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-6">
            {chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl ${
                  chat.type === 'user' 
                    ? 'bg-spiritual-500 text-white' 
                    : 'bg-white border border-spiritual-200'
                } rounded-xl p-4 shadow-sm`}>
                  <div className="whitespace-pre-wrap text-sm">
                    {chat.message}
                  </div>
                  {chat.relatedVerses && (
                    <div className="mt-4 space-y-2">
                      {chat.relatedVerses.map((verse, index) => (
                        <div key={index} className="bg-spiritual-50 rounded-lg p-3 border-l-4 border-spiritual-300">
                          <div className="font-medium text-spiritual-800 text-sm mb-1">{verse.reference}</div>
                          <div className="text-spiritual-700 text-sm italic">{verse.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {chat.type === 'ai' && (
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-spiritual-200">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleLikeMessage}
                          className="p-1 text-spiritual-600 hover:text-spiritual-800 transition-colors"
                        >
                          <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCopyMessage(chat.message)}
                          className="p-1 text-spiritual-600 hover:text-spiritual-800 transition-colors"
                        >
                          <SafeIcon icon={FiCopy} className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-spiritual-500">{chat.timestamp}</span>
                    </div>
                  )}
                  {chat.type === 'user' && (
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-white opacity-70">{chat.timestamp}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white border border-spiritual-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-spiritual-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-spiritual-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-spiritual-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-spiritual-600">AI is typing...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-spiritual-800 mb-2">Quick Questions:</h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1 bg-white border border-spiritual-300 text-spiritual-600 rounded-full text-sm hover:bg-spiritual-50 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-spiritual-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about the Bible, theology, or Christian living..."
                className="w-full px-4 py-3 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-spiritual-500 to-divine-500 text-white p-3 rounded-lg hover:from-spiritual-600 hover:to-divine-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SafeIcon icon={FiSend} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;