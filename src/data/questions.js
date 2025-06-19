// data/questions.js
export const questions = [
  {
    id: 1,
    type: 'rating',
    question: 'How would you rate your overall experience with our service?',
    scale: 5,
    scaleLabels: {
      1: 'Very Poor',
      5: 'Excellent'
    },
    required: false
  },
  {
    id: 2,
    type: 'rating',
    question: 'How satisfied are you with the quality of our products?',
    scale: 5,
    scaleLabels: {
      1: 'Very Dissatisfied',
      5: 'Very Satisfied'
    },
    required: false
  },
  {
    id: 3,
    type: 'rating',
    question: 'How likely are you to recommend us to a friend or colleague?',
    scale: 10,
    scaleLabels: {
      1: 'Not at all likely',
      10: 'Extremely likely'
    },
    required: false
  },
  {
    id: 4,
    type: 'rating',
    question: 'How would you rate the friendliness of our staff?',
    scale: 5,
    scaleLabels: {
      1: 'Very Unfriendly',
      5: 'Very Friendly'
    },
    required: false
  },
  {
    id: 5,
    type: 'text',
    question: 'Please share any additional feedback or suggestions for improvement:',
    placeholder: 'Your feedback helps us improve our service...',
    maxLength: 500,
    required: false
  }
];

// Helper function to get question by ID
export const getQuestionById = (id) => {
  return questions.find(q => q.id === id);
};

// Helper function to get total number of questions
export const getTotalQuestions = () => {
  return questions.length;
};