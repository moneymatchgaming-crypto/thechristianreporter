import React, { useState, useEffect } from 'react';
import { BibleVerse } from '../types';
import { getDailyVerse, refreshDailyVerse } from '../services/api';
import { BookOpen, RefreshCw } from 'lucide-react';

const DailyVerse: React.FC = () => {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setLoading(true);
        const verseData = await getDailyVerse();
        setVerse(verseData);
      } catch (error) {
        console.error('Error fetching daily verse:', error);
        // Fallback verse
        setVerse({
          reference: 'John 3:16',
          text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
          translation: 'NIV'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  const refreshVerse = async () => {
    try {
      setLoading(true);
      const verseData = await refreshDailyVerse();
      if (verseData) {
        setVerse(verseData);
      }
    } catch (error) {
      console.error('Error refreshing verse:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-faith-50 to-gold-50 rounded-lg shadow-md p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-faith-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading today's verse...</p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-faith-50 to-gold-50 rounded-lg shadow-md p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-faith-600" />
            <h2 className="text-2xl font-bold text-gray-900 font-serif">
              Daily Bible Verse
            </h2>
          </div>
          <button
            onClick={refreshVerse}
            disabled={loading}
            className="flex items-center space-x-2 text-faith-600 hover:text-faith-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        {verse && (
          <div className="text-center space-y-4">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-faith-200">
              <blockquote className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed mb-6">
                "{verse.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <cite className="text-lg font-semibold text-faith-700 not-italic">
                  — {verse.reference}
                </cite>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {verse.translation}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Scripture taken from {verse.translation}. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyVerse; 