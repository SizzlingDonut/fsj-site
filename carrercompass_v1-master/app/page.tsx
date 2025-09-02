import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, Search, GraduationCap, TrendingUp, Users, Target } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "Adaptive Career Quiz",
      description: "Answer 5 intelligent questions that adapt based on your responses to get personalized career recommendations."
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Receive tailored career suggestions based on your academic performance, interests, and career expectations."
    },
    {
      icon: Search,
      title: "Smart College Finder",
      description: "Discover the best colleges and universities in your area for your chosen career path with detailed information."
    },
    {
      icon: TrendingUp,
      title: "Career Insights",
      description: "Get comprehensive details about career prospects, salary expectations, and growth opportunities."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Guided" },
    { number: "500+", label: "Career Paths" },
    { number: "1,200+", label: "Partner Colleges" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Find Your Perfect
              <span className="text-gradient block">Career Path</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Career Compass guides students through personalized quizzes and expert insights to discover their ideal career and find the best colleges to get there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button size="lg" className="text-lg px-8 py-3 h-auto">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 h-auto">
                  Explore Careers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Career Compass Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform combines advanced algorithms with educational expertise to guide you toward your ideal career path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three Simple Steps
            </h2>
            <p className="text-xl text-muted-foreground">
              Start your career discovery journey in just minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Take the Quiz</h3>
              <p className="text-muted-foreground">
                Answer 5 adaptive questions about your academic background, interests, and career goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive personalized career suggestions with detailed information about each path.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Your College</h3>
              <p className="text-muted-foreground">
                Discover the best colleges and universities for your chosen career path in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Your Future?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have found their perfect career path with Career Compass. Your journey starts with a single click.
          </p>
          <Link href="/quiz">
            <Button size="lg" className="text-lg px-10 py-4 h-auto">
              Start Your Career Quiz Now
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}