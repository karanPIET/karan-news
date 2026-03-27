// const BASE_URL = '/.netlify/functions';

// export const fetchNews = async (category, page = 1, pageSize = 12) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/fetch-news?category=${category}&page=${page}&pageSize=${pageSize}`
//     );
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch news');
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     throw error;
//   }
// };
// Detect environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || process.env.REACT_APP_NEWS_API_KEY;

export const fetchNews = async (category, page = 1, pageSize = 12) => {
  try {
    let response;
    
    if (isDevelopment) {
      // LOCAL: Direct API call
      response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
      );
    } else {
      // PRODUCTION: Netlify Function
      response = await fetch(
        `/.netlify/functions/fetch-news?category=${category}&page=${page}&pageSize=${pageSize}`
      );
    }
    
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

export const searchNews = async (query, page = 1, pageSize = 12) => {
  try {
    let response;
    
    if (isDevelopment) {
      // LOCAL: Direct API call
      response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
      );
    } else {
      // PRODUCTION: Netlify Function
      response = await fetch(
        `/.netlify/functions/search-news?query=${query}&page=${page}&pageSize=${pageSize}`
      );
    }
    
    if (!response.ok) {
      throw new Error('Failed to search news');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};