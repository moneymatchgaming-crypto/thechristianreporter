import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import TopNewsCarousel from './components/TopNewsCarousel';
import DailyVerse from './components/DailyVerse';
import SmartPrayerRequests from './components/SmartPrayerRequests';
import EventsCalendar from './components/EventsCalendar';
import ChristianSocialMedia from './components/ChristianSocialMedia';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import { NewsArticle } from './types';

// Main Home Page Component
const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?limit=100'); // Request 100 articles instead of default 12
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || data || []);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
                   {/* Full-width Jumbotron at the top */}
             <div className="mb-8">
               <TopNewsCarousel articles={articles.slice(0, 5)} />
             </div>
      
      {/* Full-width Daily Verse */}
      <div className="mb-8">
        <DailyVerse />
      </div>
      
      {/* Grid layout for content below */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Takes 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          <NewsFeed />
        </div>
        
        {/* Sidebar - Takes 1/3 width */}
        <div className="space-y-8">
          <ChristianSocialMedia />
          <SmartPrayerRequests />
          <EventsCalendar />
        </div>
      </div>
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 