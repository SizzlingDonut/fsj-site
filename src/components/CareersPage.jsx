import React from 'react';
import { ArrowRight } from 'lucide-react';
import { careers } from '../data/careers';

export default function CareersPage({ onNavigate }) {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Career Paths
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover detailed information about various careers, including requirements, salary expectations, and growth opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career) => (
            <div key={career.slug} className="card card-hover">
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
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm">
                    <span className="font-medium">Average Salary:</span>
                    <span className="text-muted-foreground ml-2">{career.averageSalary}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Job Outlook:</span>
                    <span className="text-muted-foreground ml-2">{career.jobOutlook}</span>
                  </div>
                </div>
                
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

        <div className="text-center mt-16">
          <div className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Not sure which career is right for you?</h2>
            <p className="text-muted-foreground mb-6">
              Take our personalized career quiz to get recommendations based on your interests and goals.
            </p>
            <button 
              onClick={() => onNavigate('quiz')}
              className="btn btn-primary btn-lg"
            >
              Take Career Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}