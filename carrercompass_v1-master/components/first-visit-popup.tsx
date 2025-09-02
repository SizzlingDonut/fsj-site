"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function FirstVisitPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has visited before
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
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto shadow-2xl border-2">
        <CardHeader className="text-center pb-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Compass className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-gradient">
            Welcome to Career Compass!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Your personalized journey to discovering the perfect career path starts here.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Take our <strong>5-question adaptive quiz</strong> tailored to your academic background
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Get <strong>personalized career recommendations</strong> based on your interests and goals
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Discover <strong>top colleges and universities</strong> in your area for your chosen field
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-3 pt-6">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Explore Later
          </Button>
          <Link href="/quiz" className="flex-1">
            <Button onClick={handleGetStarted} className="w-full">
              Start Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}