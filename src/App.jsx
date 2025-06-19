// App.jsx
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import ThankYouScreen from './components/ThankYouScreen';
import { questions, getTotalQuestions } from './data/questions';
import { 
  getCurrentSession, 
  saveAnswer, 
  updateCurrentQuestion, 
  completeSession 
} from './utils/sessionManager';

// App states
const APP_STATES = {
  WELCOME: 'welcome',
  SURVEY: 'survey',
  CONFIRMATION: 'confirmation',
  THANK_YOU: 'thank_you'
};

function App() {
  const [appState, setAppState] = useState(APP_STATES.WELCOME);
  const [currentSession, setCurrentSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize app - check for existing session
  useEffect(() => {
    const existingSession = getCurrentSession();
    if (existingSession && existingSession.status === 'IN_PROGRESS') {
      setCurrentSession(existingSession);
      setCurrentQuestionIndex(existingSession.currentQuestionIndex);
      setAppState(APP_STATES.SURVEY);
    }
  }, []);

  // Handle starting a new survey
  const handleStartSurvey = (session) => {
    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setAppState(APP_STATES.SURVEY);
  };

  // Handle answer changes
  const handleAnswerChange = (questionId, answer) => {
    if (saveAnswer(questionId, answer)) {
      // Update local session state
      const updatedSession = getCurrentSession();
      setCurrentSession(updatedSession);
    }
  };

  // Handle navigation to next question/confirmation
  const handleNext = () => {
    const totalQuestions = getTotalQuestions();
    
    if (currentQuestionIndex < totalQuestions - 1) {
      // Move to next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      updateCurrentQuestion(nextIndex);
    } else {
      // Show confirmation screen
      setAppState(APP_STATES.CONFIRMATION);
    }
  };

  // Handle navigation to previous question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      updateCurrentQuestion(prevIndex);
    }
  };

  // Handle skipping current question
  const handleSkip = () => {
    // Save null answer for skipped question
    const currentQuestion = questions[currentQuestionIndex];
    handleAnswerChange(currentQuestion.id, null);
    
    // Move to next question or confirmation
    handleNext();
  };

  // Handle survey submission
  const handleSubmitSurvey = async () => {
    setIsLoading(true);
    
    try {
      // Simulate brief loading for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Complete the session
      completeSession();
      
      // Update local state
      const completedSession = { 
        ...currentSession, 
        status: 'COMPLETED', 
        completedAt: new Date().toISOString() 
      };
      setCurrentSession(completedSession);
      
      // Show thank you screen
      setAppState(APP_STATES.THANK_YOU);
    } catch (error) {
      console.error('Error submitting survey:', error);
      // In a real app, you might show an error message here
    } finally {
      setIsLoading(false);
    }
  };

  // Handle returning to welcome screen
  const handleReturnToWelcome = () => {
    setAppState(APP_STATES.WELCOME);
    setCurrentSession(null);
    setCurrentQuestionIndex(0);
  };

  // Handle confirmation screen actions
  const handleConfirmSubmit = () => {
    handleSubmitSurvey();
  };

  const handleBackToSurvey = () => {
    setAppState(APP_STATES.SURVEY);
  };

  // Render confirmation screen
  const renderConfirmationScreen = () => {
    const answeredQuestions = currentSession?.answers ? 
      Object.keys(currentSession.answers).filter(qId => 
        currentSession.answers[qId] !== null && 
        currentSession.answers[qId] !== undefined
      ).length : 0;
    const totalQuestions = getTotalQuestions();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          {/* Confirmation Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Confirmation Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Submit?
          </h2>
          
          <p className="text-gray-600 mb-6">
            Please review your responses before submitting your feedback.
          </p>

          {/* Survey Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Questions Answered:</span>
              <span className="font-semibold text-gray-800">{answeredQuestions} of {totalQuestions}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-600">Completion:</span>
              <span className="font-semibold text-gray-800">
                {Math.round((answeredQuestions / totalQuestions) * 100)}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleConfirmSubmit}
              disabled={isLoading}
              className={`
                w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4
                ${isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600 text-white transform hover:scale-105 focus:ring-purple-200'
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit Survey'
              )}
            </button>
            
            <button
              onClick={handleBackToSurvey}
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              Review Answers
            </button>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-400 mt-6">
            Once submitted, your responses cannot be modified.
          </p>
        </div>
      </div>
    );
  };

  // Main render logic
  switch (appState) {
    case APP_STATES.WELCOME:
      return <WelcomeScreen onStartSurvey={handleStartSurvey} />;
      
    case APP_STATES.SURVEY:
      return (
        <QuestionScreen
          currentQuestionIndex={currentQuestionIndex}
          onAnswerChange={handleAnswerChange}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      );
      
    case APP_STATES.CONFIRMATION:
      return renderConfirmationScreen();
      
    case APP_STATES.THANK_YOU:
      return (
        <ThankYouScreen
          onReturnToWelcome={handleReturnToWelcome}
          sessionData={currentSession}
        />
      );
      
    default:
      return <WelcomeScreen onStartSurvey={handleStartSurvey} />;
  }
}

export default App;