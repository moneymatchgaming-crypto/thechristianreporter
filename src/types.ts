export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  imageUrl?: string;
  author?: string;
}

export interface NewsSource {
  name: string;
  url: string;
  category: string;
  active: boolean;
}

export interface CacheStatus {
  lastUpdated: string;
  totalArticles: number;
  sourcesCount: number;
  nextUpdate: string;
}

export interface MinistryUpdate {
  id: string;
  title: string;
  description: string;
  ministry: string;
  date: string;
  impact: 'local' | 'national' | 'global';
  category: 'evangelism' | 'disaster-relief' | 'education' | 'healthcare' | 'social-justice';
}

export interface SocialMediaPost {
  id: string;
  platform: 'youtube' | 'tiktok';
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  thumbnail?: string;
  url: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  duration?: string;
}

export interface BibleVerse {
  reference: string;
  text: string;
  translation: string;
}

export interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  date: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  church: string;
  type: 'service' | 'conference' | 'outreach' | 'youth' | 'worship';
} 