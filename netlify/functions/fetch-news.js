/* eslint-disable no-undef */
export async function handler(event) {
  const { category = 'general', page = 1 } = event.queryStringParameters || {};
  const API_KEY = process.env.VITE_NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=12&apiKey=${API_KEY}`
    );
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error in serverless function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' })
    };
  }
}