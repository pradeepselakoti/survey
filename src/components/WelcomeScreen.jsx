// components/WelcomeScreen.jsx
import React from 'react';
import { initializeSession } from '../utils/sessionManager';

const WelcomeScreen = ({ onStartSurvey }) => {
  const handleStartSurvey = () => {
    // Initialize a new session
    const session = initializeSession();
    
    // Call the parent function to start the survey
    onStartSurvey(session);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Welcome Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome!
        </h1>
        
        <p className="text-gray-600 mb-2 text-lg">
          We value your feedback
        </p>
        
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Please take a few minutes to share your experience with us. 
          Your responses help us improve our service and better serve you.
        </p>

        {/* Survey Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>~2 minutes</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>5 questions</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartSurvey}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg"
        >
          Start Survey
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-400 mt-6 leading-relaxed">
          Your responses are anonymous and will be used solely for improving our services.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;