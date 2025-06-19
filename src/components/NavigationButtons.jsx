// components/NavigationButtons.jsx
import React from 'react';

const NavigationButtons = ({ 
  currentIndex, 
  totalQuestions, 
  onNext, 
  onBack, 
  onSkip,
  isAnswered = false,
  isLastQuestion = false,
  disabled = false 
}) => {
  const isFirstQuestion = currentIndex === 0;

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      {/* Back Button */}
      <button
        onClick={onBack}
        disabled={isFirstQuestion || disabled}
        className={`
          flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${isFirstQuestion || disabled
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300'
          }
        `}
      >
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
        Back
      </button>

      {/* Center - Skip Button */}
      <button
        onClick={onSkip}
        disabled={disabled}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${disabled
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300'
          }
        `}
      >
        Skip
      </button>

      {/* Next/Submit Button */}
      <button
        onClick={onNext}
        disabled={disabled}
        className={`
          flex items-center px-6 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
          ${disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : isAnswered
            ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105 shadow-md'
            : 'bg-blue-400 hover:bg-blue-500 text-white'
          }
        `}
      >
        {isLastQuestion ? 'Submit' : 'Next'}
        {!isLastQuestion && (
          <svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        )}
        {isLastQuestion && (
          <svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default NavigationButtons;