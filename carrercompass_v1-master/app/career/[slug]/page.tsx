import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign, TrendingUp, Users, BookOpen} from 'lucide-react';
import { getCareerBySlug, getRelatedCareers, careers } from '@/lib/career-data';
import CollegeFilter from '@/components/college-filter';

interface CareerPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return careers.map((career) => ({
    slug: career.slug,
  }));
}

export function generateMetadata({ params }: CareerPageProps) {
  const career = getCareerBySlug(params.slug);
  
  if (!career) {
    return {
      title: 'Career Not Found',
    };
  }

  return {
    title: `${career.title} - Career Details | Career Compass`,
    description: career.description,
    openGraph: {
      title: `${career.title} Career Path`,
      description: career.description,
      images: [career.image],
    },
  };
}

export default function CareerPage({ params }: CareerPageProps) {
  const career = getCareerBySlug(params.slug);

  if (!career) {
    notFound();
  }

  const relatedCareers = getRelatedCareers(career);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={career.image}
          alt={career.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <Link href="/careers" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Link>
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
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Average Salary</h3>
                        <p className="text-muted-foreground">{career.averageSalary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Job Outlook</h3>
                        <p className="text-muted-foreground">{career.jobOutlook}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
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
              <Card>
                <CardHeader>
                  <CardTitle>Related Careers</CardTitle>
                  <CardDescription>
                    Other careers you might be interested in
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedCareers.map((relatedCareer) => (
                    <Link
                      key={relatedCareer.slug}
                      href={`/career/${relatedCareer.slug}`}
                      className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium">{relatedCareer.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {relatedCareer.description}
                      </p>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}