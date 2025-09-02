import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { careers } from '@/lib/career-data';

export default function CareersPage() {
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
            <Card key={career.slug} className="card-hover">
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
                <CardDescription className="text-base">{career.description}</CardDescription>
              </CardHeader>
              <CardContent>
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

        <div className="text-center mt-16">
          <div className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Not sure which career is right for you?</h2>
            <p className="text-muted-foreground mb-6">
              Take our personalized career quiz to get recommendations based on your interests and goals.
            </p>
            <Link href="/quiz">
              <Button size="lg">
                Take Career Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}