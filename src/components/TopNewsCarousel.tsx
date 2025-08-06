import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { ChevronLeft, ChevronRight, ExternalLink, Clock } from 'lucide-react';

interface TopNewsCarouselProps {
  articles: NewsArticle[];
}

// Fallback image function
const getFallbackImage = (category: string): string => {
  // Array of beautiful Christian-themed images from Unsplash
  const christianImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop'
  ];
  
  // Category-specific placeholders
  const placeholders: { [key: string]: string } = {
    'church': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'ministry': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'youth': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    'missions': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'worship': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop',
    'world': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    'us': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'politics': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
    'health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    'finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    'israel': 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=400&fit=crop',
    'entertainment': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    'faith': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'social-justice': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
    'music': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    'catholic': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'regional': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
    'teaching': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'lifestyle': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    'orthodox': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'news': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    'research': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'apologetics': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'pentecostal': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'methodist': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'episcopal': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'lutheran': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'ucc': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'adventist': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'theology': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'prayer': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'bible-study': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'orphan-care': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'culture': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'spiritual-warfare': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'writing': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'default': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
  };
  
  // For church-themed categories, prioritize Christian images (70% chance)
  const churchThemedCategories = ['church', 'catholic', 'orthodox', 'methodist', 'episcopal', 'lutheran', 'ucc', 'adventist', 'pentecostal', 'faith', 'prayer', 'bible-study', 'theology', 'worship'];
  
  if (churchThemedCategories.includes(category.toLowerCase())) {
    // 70% chance for Christian images, 30% for regular placeholders
    if (Math.random() < 0.7) {
      return christianImages[Math.floor(Math.random() * christianImages.length)];
    }
  }
  
  // For all categories, mix Christian images with regular images (30% chance for Christian images)
  if (Math.random() < 0.3) {
    return christianImages[Math.floor(Math.random() * christianImages.length)];
  }
  
  return placeholders[category.toLowerCase()] || placeholders.default;
};

const TopNewsCarousel: React.FC<TopNewsCarouselProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true 
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (articles.length === 0) return null;

  const currentArticle = articles[currentIndex];
  const hasImageError = imageError[currentArticle.id] || false;
  const shouldUseFallback = !currentArticle.imageUrl || hasImageError;
  const displayImageUrl = shouldUseFallback ? getFallbackImage(currentArticle.category) : currentArticle.imageUrl;

  // Debug image URLs
  console.log('🎯 TopNewsCarousel - Current article:', {
    title: currentArticle.title,
    imageUrl: currentArticle.imageUrl,
    fallbackImage: shouldUseFallback ? displayImageUrl : 'none',
    hasImage: !!currentArticle.imageUrl,
    hasError: hasImageError
  });

  return (
    <section 
      className="relative bg-white rounded-lg shadow-lg overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-96 md:h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={displayImageUrl} 
            alt={currentArticle.title}
            className="w-full h-full object-cover"
            onError={() => {
              console.log('❌ Image failed to load:', displayImageUrl);
              setImageError(prev => ({ ...prev, [currentArticle.id]: true }));
            }}
            onLoad={() => {
              console.log('✅ Image loaded successfully:', displayImageUrl);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 md:p-8 text-white">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                  {currentArticle.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-bold mb-4 line-clamp-2">
                <a 
                  href={currentArticle.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-200 transition-colors"
                >
                  {currentArticle.title}
                </a>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl mb-6 text-gray-200 line-clamp-2">
                {truncateText(currentArticle.description, 200)}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(currentArticle.pubDate)}</span>
                  </div>
                  <span className="font-medium">{currentArticle.source}</span>
                </div>

                <a 
                  href={currentArticle.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Read Full Story</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {articles.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Next article"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {articles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to article ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopNewsCarousel; 