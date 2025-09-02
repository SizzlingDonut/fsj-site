"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

interface QuizState {
  answers: QuizAnswer[];
  currentQuestion: number;
  isCompleted: boolean;
  recommendations: string[];
}

interface QuizContextType {
  state: QuizState;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

type QuizAction =
  | { type: 'SET_ANSWER'; questionId: string; answer: string | string[] }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESET_QUIZ' }
  | { type: 'COMPLETE_QUIZ' };

const initialState: QuizState = {
  answers: [],
  currentQuestion: 0,
  isCompleted: false,
  recommendations: [],
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_ANSWER':
      const existingIndex = state.answers.findIndex(
        a => a.questionId === action.questionId
      );
      
      const newAnswers = existingIndex >= 0
        ? state.answers.map((answer, index) =>
            index === existingIndex
              ? { questionId: action.questionId, answer: action.answer }
              : answer
          )
        : [...state.answers, { questionId: action.questionId, answer: action.answer }];
      
      return {
        ...state,
        answers: newAnswers,
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    
    case 'COMPLETE_QUIZ':
      const recommendations = generateRecommendations(state.answers);
      return {
        ...state,
        isCompleted: true,
        recommendations,
      };
    
    case 'RESET_QUIZ':
      return initialState;
    
    default:
      return state;
  }
}

function generateRecommendations(answers: QuizAnswer[]): string[] {
  const gradeAnswer = answers.find(a => a.questionId === 'grade')?.answer as string;
  const scoresAnswer = answers.find(a => a.questionId === 'scores')?.answer as string;
  const interestsAnswer = answers.find(a => a.questionId === 'interests')?.answer as string[];
  const expectationsAnswer = answers.find(a => a.questionId === 'expectations')?.answer as string;
  const fieldAnswer = answers.find(a => a.questionId === 'field')?.answer as string;

  const recommendations: string[] = [];
  
  // Logic for recommendations based on interests and expectations
  if (interestsAnswer?.includes('Technology') || fieldAnswer === 'Engineering') {
    recommendations.push('software-engineering', 'data-science', 'cybersecurity');
  }
  
  if (interestsAnswer?.includes('Healthcare') || fieldAnswer === 'Medicine') {
    recommendations.push('medicine', 'nursing', 'pharmacy');
  }
  
  if (interestsAnswer?.includes('Business') || expectationsAnswer === 'High salary') {
    recommendations.push('finance', 'marketing', 'consulting');
  }
  
  if (interestsAnswer?.includes('Arts') || fieldAnswer === 'Arts') {
    recommendations.push('graphic-design', 'digital-marketing', 'architecture');
  }
  
  if (interestsAnswer?.includes('Science') || fieldAnswer === 'Science') {
    recommendations.push('research-scientist', 'biotechnology', 'environmental-science');
  }

  // Ensure we always have at least 3 recommendations
  if (recommendations.length === 0) {
    recommendations.push('software-engineering', 'digital-marketing', 'finance');
  }

  return recommendations.slice(0, 6); // Return top 6 recommendations
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const setAnswer = (questionId: string, answer: string | string[]) => {
    dispatch({ type: 'SET_ANSWER', questionId, answer });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const completeQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  };

  return (
    <QuizContext.Provider value={{ state, setAnswer, nextQuestion, resetQuiz, completeQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}