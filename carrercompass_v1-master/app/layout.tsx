import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { QuizProvider } from '@/components/quiz-provider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/navbar';
import FirstVisitPopup from '@/components/first-visit-popup';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Career Compass - Find Your Perfect Career Path',
  description: 'Career Compass helps students discover their ideal career path through personalized quizzes, detailed career insights, and college recommendations.',
  keywords: 'career guidance, college finder, career quiz, student careers, educational counseling',
  openGraph: {
    title: 'Career Compass - Find Your Perfect Career Path',
    description: 'Discover your ideal career with personalized recommendations and college listings.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <QuizProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <FirstVisitPopup />
            <Toaster />
          </QuizProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}