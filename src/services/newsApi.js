const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};