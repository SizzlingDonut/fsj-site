import React, { useState, useEffect } from 'react';
import { Compass, ArrowRight, X } from 'lucide-react';

export default function FirstVisitPopup({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('career-compass-visited');
    if (!hasVisited) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('career-compass-visited', 'true');
    setIsVisible(false);
  };

  const handleGetStarted = () => {
    localStorage.setItem('career-compass-visited', 'true');
    setIsVisible(false);
    onNavigate('quiz');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card w-full max-w-lg mx-auto shadow-2xl border-2">
        <div className="p-6 text-center relative">
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 p-2 hover:bg-accent rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Compass className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gradient mb-2">
            Welcome to Career Compass!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your personalized journey to discovering the perfect career path starts here.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground text-left">
                  Take our <strong>5-question adaptive quiz</strong> tailored to your academic background
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground text-left">
                  Get <strong>personalized career recommendations</strong> based on your interests and goals
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground text-left">
                  Discover <strong>top colleges and universities</strong> in your area for your chosen field
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button onClick={handleClose} className="btn btn-outline flex-1">
              Explore Later
            </button>
            <button onClick={handleGetStarted} className="btn btn-primary flex-1">
              Start Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}