import React from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Users, BookOpen, Star } from 'lucide-react';
import { getCareerBySlug, getRelatedCareers } from '../data/careers';
import CollegeFilter from './CollegeFilter';

export default function CareerDetailPage({ careerSlug, onNavigate }) {
  const career = getCareerBySlug(careerSlug);

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Career Not Found</h1>
          <button 
            onClick={() => onNavigate('careers')}
            className="btn btn-primary"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const relatedCareers = getRelatedCareers(career);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={career.image}
          alt={career.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => onNavigate('careers')}
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </button>
            <h1 className="text-3xl md:text-5xl font-bold">{career.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Career Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {career.fullDescription}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Key Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                  <div className="p-6">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Average Salary</h3>
                        <p className="text-muted-foreground">{career.averageSalary}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="p-6">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Job Outlook</h3>
                        <p className="text-muted-foreground">{career.jobOutlook}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Career Scope</h2>
              <p className="text-muted-foreground leading-relaxed">
                {career.scope}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Required Qualifications</h2>
              <div className="space-y-3">
                {career.qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{qualification}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Key Skills</h2>
              <div className="flex flex-wrap gap-3">
                {career.skills.map((skill, index) => (
                  <span key={index} className="badge badge-secondary px-3 py-1">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Work Environment</h2>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">
                  {career.workEnvironment}
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <CollegeFilter careerTitle={career.title} />
            
            {relatedCareers.length > 0 && (
              <div className="card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Related Careers</h3>
                  <p className="text-muted-foreground mb-4">
                    Other careers you might be interested in
                  </p>
                  <div className="space-y-4">
                    {relatedCareers.map((relatedCareer) => (
                      <button
                        key={relatedCareer.slug}
                        onClick={() => onNavigate('career', relatedCareer.slug)}
                        className="block w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <h4 className="font-medium">{relatedCareer.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {relatedCareer.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}