// components/TextQuestion.jsx
import React, { useState, useEffect } from 'react';

const TextQuestion = ({ 
  question, 
  currentAnswer, 
  onAnswerChange 
}) => {
  const [textValue, setTextValue] = useState(currentAnswer || '');
  const [characterCount, setCharacterCount] = useState(0);

  // Update local state when currentAnswer changes (for navigation)
  useEffect(() => {
    const value = currentAnswer || '';
    setTextValue(value);
    setCharacterCount(value.length);
  }, [currentAnswer]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    const maxLength = question.maxLength || 500;
    
    // Enforce character limit
    if (value.length <= maxLength) {
      setTextValue(value);
      setCharacterCount(value.length);
      onAnswerChange(value.trim() || null);
    }
  };

  const handleTextareaFocus = (e) => {
    // Auto-resize textarea on focus
    e.target.style.height = 'auto';
    e.target.style.height = Math.max(120, e.target.scrollHeight) + 'px';
  };

  const handleTextareaInput = (e) => {
    // Auto-resize textarea as user types
    e.target.style.height = 'auto';
    e.target.style.height = Math.max(120, e.target.scrollHeight) + 'px';
  };

  const maxLength = question.maxLength || 500;
  const remainingChars = maxLength - characterCount;
  const isNearLimit = remainingChars <= 50;
  const hasContent = textValue.trim().length > 0;

  return (
    <div className="w-full">
      {/* Question Text */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
        {question.question}
      </h2>

      {/* Textarea Container */}
      <div className="relative mb-4">
        <textarea
          value={textValue}
          onChange={handleTextChange}
          onFocus={handleTextareaFocus}
          onInput={handleTextareaInput}
          placeholder={question.placeholder || 'Please share your thoughts...'}
          className={`
            w-full min-h-[120px] p-4 border-2 rounded-lg resize-none
            transition-all duration-200 focus:outline-none
            ${hasContent
              ? 'border-blue-300 focus:border-blue-500 bg-blue-50 focus:bg-white'
              : 'border-gray-300 focus:border-blue-400 bg-white'
            }
            placeholder-gray-400 text-gray-700 leading-relaxed
          `}
          rows="4"
          maxLength={maxLength}
        />
        
        {/* Floating label when content exists */}
        {hasContent && (
          <div className="absolute -top-2 left-3 px-2 bg-white text-xs text-blue-600 font-medium">
            Your feedback
          </div>
        )}
      </div>

      {/* Character Counter */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Optional - skip if you prefer
        </div>
        
        <div className={`
          text-sm font-medium
          ${isNearLimit 
            ? remainingChars <= 10 
              ? 'text-red-500' 
              : 'text-orange-500'
            : 'text-gray-500'
          }
        `}>
          {characterCount} / {maxLength}
        </div>
      </div>

      {/* Content Status */}
      {hasContent && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 font-medium">
              Thank you for sharing your feedback!
            </span>
          </div>
        </div>
      )}

      {/* Writing Tips */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Help us improve by sharing:
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            What did you like most about your experience?
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            What could we do better next time?
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Any specific suggestions for improvement?
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TextQuestion;