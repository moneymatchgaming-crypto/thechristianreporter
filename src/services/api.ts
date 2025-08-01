import axios from 'axios';
import { NewsArticle, CacheStatus, MinistryUpdate, BibleVerse, PrayerRequest, ChurchEvent } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// News API
export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await api.get('/api/news');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const getCacheStatus = async (): Promise<CacheStatus | null> => {
  try {
    const response = await api.get('/api/cache-status');
    return response.data;
  } catch (error) {
    console.error('Error fetching cache status:', error);
    return null;
  }
};

// Ministry Updates API
export const getMinistryUpdates = async (): Promise<MinistryUpdate[]> => {
  try {
    const response = await api.get('/api/ministry-updates');
    return response.data;
  } catch (error) {
    console.error('Error fetching ministry updates:', error);
    return [];
  }
};

// Bible Verse API
export const getDailyVerse = async (): Promise<BibleVerse | null> => {
  try {
    const response = await api.get('/api/daily-verse');
    return response.data;
  } catch (error) {
    console.error('Error fetching daily verse:', error);
    return null;
  }
};

export const refreshDailyVerse = async (): Promise<BibleVerse | null> => {
  try {
    const response = await api.post('/api/refresh-verse');
    return response.data.verse;
  } catch (error) {
    console.error('Error refreshing daily verse:', error);
    return null;
  }
};

// Prayer Requests API
export const getPrayerRequests = async (): Promise<PrayerRequest[]> => {
  try {
    const response = await api.get('/api/prayer-requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching prayer requests:', error);
    return [];
  }
};

// Church Events API
export const getChurchEvents = async (): Promise<ChurchEvent[]> => {
  try {
    const response = await api.get('/api/church-events');
    return response.data;
  } catch (error) {
    console.error('Error fetching church events:', error);
    return [];
  }
};

// Health check
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

export default api; 