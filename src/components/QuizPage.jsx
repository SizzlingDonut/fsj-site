import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { careers } from '../data/careers';

const questions = [
  {
    id: 'grade',
    title: 'What is your current academic level?',
    description: 'This helps us understand your educational background',
    type: 'radio',
    options: ['Class 10th', 'Class 12th', 'Undergraduate', 'Graduate', 'Postgraduate']
  },
  {
    id: 'scores',
    title: 'How would you rate your recent academic performance?',
    description: 'Your academic performance helps us suggest suitable career paths',
    type: 'radio',
    options: ['Excellent (90%+)', 'Very Good (75-89%)', 'Good (60-74%)', 'Average (50-59%)', 'Below Average (<50%)']
  },
  {
    id: 'interests',
    title: 'Which areas interest you the most? (Select all that apply)',
    description: 'Your interests are key to finding a fulfilling career',
    type: 'checkbox',
    options: ['Technology', 'Healthcare', 'Business', 'Arts', 'Science', 'Sports', 'Social Work', 'Environment']
  },
  {
    id: 'expectations',
    title: 'What are your primary career expectations?',
    description: 'Understanding your priorities helps us match you with suitable careers',
    type: 'radio',
    options: ['High salary', 'Work-life balance', 'Creative fulfillment', 'Social impact', 'Job security', 'Growth opportunities']
  },
  {
    id: 'field',
    title: 'Based on your interests, which field appeals to you most?',
    description: 'This final question helps narrow down your career recommendations',
    type: 'radio',
    options: ['Engineering', 'Medicine', 'Business', 'Arts', 'Science', 'Law', 'Education']
  }
];

function generateRecommendations(answers) {
  const gradeAnswer = answers.find(a => a.questionId === 'grade')?.answer;
  const scoresAnswer = answers.find(a => a.questionId === 'scores')?.answer;
  const interestsAnswer = answers.find(a => a.questionId === 'interests')?.answer;
  const expectationsAnswer = answers.find(a => a.questionId === 'expectations')?.answer;
  const fieldAnswer = answers.find(a => a.questionId === 'field')?.answer;

  const recommendations = [];
  
  if (interestsAnswer?.includes('Technology') || fieldAnswer === 'Engineering') {
    recommendations.push('software-engineering', 'data-science', 'cybersecurity');
  }
  
  if (interestsAnswer?.includes('Healthcare') || fieldAnswer === 'Medicine') {
    recommendations.push('medicine', 'nursing');
  }
  
  if (interestsAnswer?.includes('Business') || expectationsAnswer === 'High salary') {
    recommendations.push('finance', 'digital-marketing');
  }
  
  if (interestsAnswer?.includes('Arts') || fieldAnswer === 'Arts') {
    recommendations.push('graphic-design', 'digital-marketing', 'architecture');
  }
  
  if (interestsAnswer?.includes('Science') || fieldAnswer === 'Science') {
    recommendations.push('data-science', 'medicine');
  }

  if (recommendations.length === 0) {
    recommendations.push('software-engineering', 'digital-marketing', 'finance');
  }

  return [...new Set(recommendations)].slice(0, 6);
}

export default function QuizPage({ onNavigate, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      return;
    }

    const newAnswers = [...answers.filter(a => a.questionId !== question.id), 
                       { questionId: question.id, answer: currentAnswer }];
    setAnswers(newAnswers);
    
    if (isLastQuestion) {
      const recs = generateRecommendations(newAnswers);
      setRecommendations(recs);
      setIsCompleted(true);
      onComplete(recs);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer('');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers.find(a => a.questionId === questions[currentQuestion - 1].id);
      setCurrentAnswer(prevAnswer?.answer || '');
    }
  };

  const handleRadioChange = (value) => {
    setCurrentAnswer(value);
  };

  const handleCheckboxChange = (value, checked) => {
    const currentAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];
    if (checked) {
      setCurrentAnswer([...currentAnswers, value]);
    } else {
      setCurrentAnswer(currentAnswers.filter(answer => answer !== value));
    }
  };

  if (isCompleted) {
    const recommendedCareers = recommendations
      .map(slug => careers.find(career => career.slug === slug))
      .filter(career => career !== undefined);

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Career Recommendations
            </h1>
            <p className="text-xl text-muted-foreground">
              Based on your responses, here are the careers that align best with your profile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCareers.map((career) => (
              <div key={career.slug} className="card card-hover cursor-pointer">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={career.image}
                    alt={career.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
                  <p className="text-muted-foreground mb-4">{career.description}</p>
                  <button 
                    onClick={() => onNavigate('career', career.slug)}
                    className="btn btn-primary w-full"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('careers')}
              className="btn btn-outline btn-lg"
            >
              Explore All Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{question.title}</h2>
            <p className="text-muted-foreground mb-6">{question.description}</p>
            
            <div className="space-y-4">
              {question.type === 'radio' ? (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={currentAnswer === option}
                        onChange={(e) => handleRadioChange(e.target.value)}
                        className="w-4 h-4 text-primary border-2 border-primary focus:ring-primary focus:ring-2"
                      />
                      <span className="text-base flex-1">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        value={option}
                        checked={(currentAnswer || []).includes(option)}
                        onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                        className="w-4 h-4 text-primary border-2 border-primary rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-base flex-1">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="btn btn-outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
            className="btn btn-primary"
          >
            {isLastQuestion ? 'Get Results' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}