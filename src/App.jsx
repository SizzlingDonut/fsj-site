import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import CareersPage from './components/CareersPage';
import CareerDetailPage from './components/CareerDetailPage';
import FirstVisitPopup from './components/FirstVisitPopup';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [quizRecommendations, setQuizRecommendations] = useState([]);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    if (page === 'career') {
      setSelectedCareer(data);
    }
  };

  const handleQuizComplete = (recommendations) => {
    setQuizRecommendations(recommendations);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'quiz':
        return <QuizPage onNavigate={handleNavigate} onComplete={handleQuizComplete} />;
      case 'careers':
        return <CareersPage onNavigate={handleNavigate} />;
      case 'career':
        return <CareerDetailPage careerSlug={selectedCareer} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <FirstVisitPopup onNavigate={handleNavigate} />
    </div>
  );
}

export default App;