// components/QuestionScreen.jsx
import React from 'react';
import RatingQuestion from './RatingQuestion';
import TextQuestion from './TextQuestion';
import NavigationButtons from './NavigationButtons';
import { questions } from '../data/questions';
import { getAnswer, isQuestionAnswered } from '../utils/sessionManager';

const QuestionScreen = ({ 
  currentQuestionIndex, 
  onAnswerChange, 
  onNext, 
  onBack, 
  onSkip 
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  // Get current answer for this question
  const currentAnswer = getAnswer(currentQuestion.id);
  const isAnswered = isQuestionAnswered(currentQuestion.id);

  // Handle answer change for current question
  const handleAnswerChange = (answer) => {
    onAnswerChange(currentQuestion.id, answer);
  };

  // Render the appropriate question component based on type
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'rating':
        return (
          <RatingQuestion
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'text':
        return (
          <TextQuestion
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswerChange={handleAnswerChange}
          />
        );
      default:
        return (
          <div className="text-center text-red-500">
            <p>Unknown question type: {currentQuestion.type}</p>
          </div>
        );
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Question not found</p>
          <p className="text-gray-500 mt-2">Please check your question data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Progress Header */}
        <div className="mb-8">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Question Type Badge */}
          <div className="flex items-center">
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${currentQuestion.type === 'rating' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
              }
            `}>
              {currentQuestion.type === 'rating' && (
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
              {currentQuestion.type === 'text' && (
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
              {currentQuestion.type === 'rating' ? 'Rating' : 'Feedback'}
            </span>
            
            {/* Answer Status Indicator */}
            {isAnswered && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Answered
              </span>
            )}
          </div>
        </div>

        {/* Question Content */}
        <div className="mb-8">
          {renderQuestion()}
        </div>

        {/* Navigation */}
        <NavigationButtons
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onNext={onNext}
          onBack={onBack}
          onSkip={onSkip}
          isAnswered={isAnswered}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  );
};

export default QuestionScreen;