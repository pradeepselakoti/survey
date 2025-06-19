// components/ThankYouScreen.jsx
import React, { useState, useEffect } from 'react';

const ThankYouScreen = ({ onReturnToWelcome, sessionData }) => {
  const [countdown, setCountdown] = useState(5);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Mark as complete after a brief delay for animation
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 500);

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          onReturnToWelcome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timers
    return () => {
      clearTimeout(completeTimer);
      clearInterval(countdownTimer);
    };
  }, [onReturnToWelcome]);

  const handleReturnNow = () => {
    onReturnToWelcome();
  };

  // Calculate survey stats
  const totalQuestions = sessionData ? Object.keys(sessionData.answers || {}).length : 0;
  const completionTime = sessionData ? 
    Math.round((new Date(sessionData.completedAt) - new Date(sessionData.startTime)) / 1000) : 0;
  const completionMinutes = Math.floor(completionTime / 60);
  const completionSeconds = completionTime % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className={`
        bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center
        transform transition-all duration-500
        ${isComplete ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Success Animation */}
        <div className="mb-6">
          <div className={`
            w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4
            transform transition-all duration-700 delay-200
            ${isComplete ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
          `}>
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className={`
          text-3xl font-bold text-gray-800 mb-4
          transform transition-all duration-500 delay-300
          ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          Thank You!
        </h1>
        
        <p className={`
          text-gray-600 mb-6 text-lg leading-relaxed
          transform transition-all duration-500 delay-400
          ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          Your feedback has been successfully submitted and will help us improve our service.
        </p>

        {/* Survey Stats */}
        {sessionData && (
          <div className={`
            bg-gray-50 rounded-lg p-4 mb-6
            transform transition-all duration-500 delay-500
            ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-700">{totalQuestions}</div>
                <div className="text-gray-500">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-700">
                  {completionMinutes}:{completionSeconds.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-500">Time Taken</div>
              </div>
            </div>
          </div>
        )}

        {/* Countdown Display */}
        <div className={`
          mb-6
          transform transition-all duration-500 delay-600
          ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
            <span className="text-2xl font-bold text-blue-600">{countdown}</span>
          </div>
          <p className="text-gray-500 text-sm">
            Returning to start screen in {countdown} second{countdown !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Return Button */}
        <button
          onClick={handleReturnNow}
          className={`
            w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl
            transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200
            ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ transitionDelay: '700ms' }}
        >
          Return to Start
        </button>

        {/* Appreciation Message */}
        <div className={`
          mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg
          transform transition-all duration-500 delay-800
          ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">We appreciate you!</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your voice matters and helps us create better experiences for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;