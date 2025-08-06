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
import { getNews } from './services/api';
import { getCategoriesInGroup } from './utils/categoryGroups';

// Main Home Page Component
const HomePage: React.FC<{ selectedCategory?: string }> = ({ selectedCategory }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);

  const fetchNews = async () => {
    try {
      console.log('📰 App: Fetching news for jumbotron...');
      const newsArticles = await getNews();
      setArticles(newsArticles);
      console.log('📰 App: Loaded', newsArticles.length, 'articles for jumbotron');
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filter articles based on selected category group
  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'news') {
      setFilteredArticles(articles);
      return;
    }

    const categoriesInGroup = getCategoriesInGroup(selectedCategory);
    const filtered = articles.filter(article => 
      categoriesInGroup.includes(article.category.toLowerCase())
    );
    
    console.log(`🎯 Filtering articles for category group "${selectedCategory}":`, {
      totalArticles: articles.length,
      filteredCount: filtered.length,
      categoriesInGroup
    });
    
    setFilteredArticles(filtered);
  }, [articles, selectedCategory]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Full-width Jumbotron at the top */}
      <div className="mb-8">
        <TopNewsCarousel articles={filteredArticles.slice(0, 5)} />
      </div>
      
      {/* Full-width Daily Verse */}
      <div className="mb-8">
        <DailyVerse />
      </div>
      
      {/* Grid layout for content below */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Takes 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          <NewsFeed selectedCategory={selectedCategory} />
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
  const [selectedCategory, setSelectedCategory] = useState<string>('news');

  const handleCategorySelect = (categoryId: string) => {
    console.log('🎯 Category selected:', categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <Routes>
          <Route path="/" element={<HomePage selectedCategory={selectedCategory} />} />
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