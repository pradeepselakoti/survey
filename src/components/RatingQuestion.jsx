// components/RatingQuestion.jsx
import React, { useState, useEffect } from 'react';

const RatingQuestion = ({ 
  question, 
  currentAnswer, 
  onAnswerChange 
}) => {
  const [selectedRating, setSelectedRating] = useState(currentAnswer || null);
  const [hoveredRating, setHoveredRating] = useState(null);

  // Update local state when currentAnswer changes (for navigation)
  useEffect(() => {
    setSelectedRating(currentAnswer || null);
  }, [currentAnswer]);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    onAnswerChange(rating);
  };

  const handleRatingHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(null);
  };

  // Generate array of rating numbers based on scale
  const ratingNumbers = Array.from({ length: question.scale }, (_, i) => i + 1);

  // Determine if we should show a compact layout for 10-point scales
  const isCompactLayout = question.scale > 5;

  return (
    <div className="w-full">
      {/* Question Text */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
        {question.question}
      </h2>

      {/* Scale Labels */}
      {question.scaleLabels && (
        <div className="flex justify-between mb-6 text-sm text-gray-600">
          <span className="text-left">
            {question.scaleLabels[1]}
          </span>
          <span className="text-right">
            {question.scaleLabels[question.scale]}
          </span>
        </div>
      )}

      {/* Rating Buttons */}
      <div className={`
        grid gap-3 mb-8
        ${isCompactLayout 
          ? 'grid-cols-5 sm:grid-cols-10' 
          : 'grid-cols-5'
        }
      `}>
        {ratingNumbers.map((rating) => {
          const isSelected = selectedRating === rating;
          const isHovered = hoveredRating === rating;
          const isInHoverRange = hoveredRating && rating <= hoveredRating;

          return (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              onMouseEnter={() => handleRatingHover(rating)}
              onMouseLeave={handleRatingLeave}
              className={`
                relative h-12 w-full rounded-lg border-2 font-semibold text-lg
                transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-300
                ${isSelected
                  ? 'bg-blue-500 border-blue-500 text-white scale-110 shadow-lg'
                  : isInHoverRange
                  ? 'bg-blue-100 border-blue-300 text-blue-600 scale-105'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                }
                ${isCompactLayout ? 'text-sm' : 'text-lg'}
              `}
            >
              {rating}
              
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Current Selection Display */}
      {selectedRating && (
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-700 font-medium">
              Selected: {selectedRating} out of {question.scale}
            </span>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Click on a number to rate your experience
      </div>
    </div>
  );
};

export default RatingQuestion;