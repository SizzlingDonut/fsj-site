"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useQuiz } from '@/components/quiz-provider';
import { careers } from '@/lib/career-data';
import Link from 'next/link';
import Image from 'next/image';

interface Question {
  id: string;
  title: string;
  description: string;
  type: 'radio' | 'checkbox';
  options: string[];
}

const questions: Question[] = [
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

export default function QuizPage() {
  const { state, setAnswer, nextQuestion, completeQuiz } = useQuiz();
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const router = useRouter();

  const currentQuestion = questions[state.currentQuestion];
  const isLastQuestion = state.currentQuestion === questions.length - 1;

  const handleNext = () => {
    if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      return;
    }

    setAnswer(currentQuestion.id, currentAnswer);
    
    if (isLastQuestion) {
      completeQuiz();
    } else {
      nextQuestion();
      setCurrentAnswer('');
    }
  };

  const handleBack = () => {
    if (state.currentQuestion > 0) {
      // In a more sophisticated implementation, we'd track previous answers
      window.history.back();
    }
  };

  const handleRadioChange = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];
    if (checked) {
      setCurrentAnswer([...currentAnswers, value]);
    } else {
      setCurrentAnswer(currentAnswers.filter(answer => answer !== value));
    }
  };

  if (state.isCompleted) {
    const recommendedCareers = state.recommendations
      .map(slug => careers.find(career => career.slug === slug))
      .filter((career): career is NonNullable<typeof career> => career !== undefined);

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
              <Card key={career.slug} className="card-hover cursor-pointer">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={career.image}
                    alt={career.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/career/${career.slug}`}>
                    <Button className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/careers">
              <Button variant="outline" size="lg">
                Explore All Careers
              </Button>
            </Link>
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
            <span>Question {state.currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((state.currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
            <CardDescription className="text-base">{currentQuestion.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.type === 'radio' ? (
              <RadioGroup value={currentAnswer as string} onValueChange={handleRadioChange}>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-1 py-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`checkbox-${index}`}
                      checked={(currentAnswer as string[]).includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                    />
                    <Label htmlFor={`checkbox-${index}`} className="text-base cursor-pointer flex-1 py-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={state.currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
          >
            {isLastQuestion ? 'Get Results' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}