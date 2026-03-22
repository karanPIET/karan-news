const BASE_URL = '/.netlify/functions';

export const fetchNews = async (category, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}/fetch-news?category=${category}&page=${page}&pageSize=${pageSize}`
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