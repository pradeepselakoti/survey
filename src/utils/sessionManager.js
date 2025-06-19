// utils/sessionManager.js

// Generate a unique session ID
export const generateSessionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `survey_${timestamp}_${random}`;
};

// Get current session data from localStorage
export const getCurrentSession = () => {
  const sessionId = localStorage.getItem('currentSessionId');
  if (!sessionId) return null;
  
  const sessionData = localStorage.getItem(sessionId);
  return sessionData ? JSON.parse(sessionData) : null;
};

// Initialize a new survey session
export const initializeSession = () => {
  const sessionId = generateSessionId();
  const sessionData = {
    sessionId,
    startTime: new Date().toISOString(),
    status: 'IN_PROGRESS',
    currentQuestionIndex: 0,
    answers: {},
    completedAt: null
  };
  
  // Store session ID and session data
  localStorage.setItem('currentSessionId', sessionId);
  localStorage.setItem(sessionId, JSON.stringify(sessionData));
  
  return sessionData;
};

// Save answer for a specific question
export const saveAnswer = (questionId, answer) => {
  const session = getCurrentSession();
  if (!session) return false;
  
  session.answers[questionId] = {
    value: answer,
    answeredAt: new Date().toISOString()
  };
  
  // Update session in localStorage
  localStorage.setItem(session.sessionId, JSON.stringify(session));
  return true;
};

// Update current question index
export const updateCurrentQuestion = (questionIndex) => {
  const session = getCurrentSession();
  if (!session) return false;
  
  session.currentQuestionIndex = questionIndex;
  localStorage.setItem(session.sessionId, JSON.stringify(session));
  return true;
};

// Mark session as completed
export const completeSession = () => {
  const session = getCurrentSession();
  if (!session) return false;
  
  session.status = 'COMPLETED';
  session.completedAt = new Date().toISOString();
  
  // Update session in localStorage
  localStorage.setItem(session.sessionId, JSON.stringify(session));
  
  // Clear current session reference
  localStorage.removeItem('currentSessionId');
  
  return true;
};

// Get answer for a specific question
export const getAnswer = (questionId) => {
  const session = getCurrentSession();
  if (!session || !session.answers[questionId]) return null;
  
  return session.answers[questionId].value;
};

// Check if question has been answered
export const isQuestionAnswered = (questionId) => {
  const session = getCurrentSession();
  return session && session.answers[questionId] !== undefined;
};

// Get all completed sessions (for analytics/review)
export const getAllCompletedSessions = () => {
  const completedSessions = [];
  
  // Loop through all localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    // Check if key is a session ID (starts with 'survey_')
    if (key && key.startsWith('survey_')) {
      try {
        const sessionData = JSON.parse(localStorage.getItem(key));
        if (sessionData.status === 'COMPLETED') {
          completedSessions.push(sessionData);
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
  }
  
  return completedSessions.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
};

// Clear old sessions (optional utility)
export const clearOldSessions = (daysOld = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    
    if (key && key.startsWith('survey_')) {
      try {
        const sessionData = JSON.parse(localStorage.getItem(key));
        const sessionDate = new Date(sessionData.startTime);
        
        if (sessionDate < cutoffDate) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.error('Error clearing old session:', error);
      }
    }
  }
};