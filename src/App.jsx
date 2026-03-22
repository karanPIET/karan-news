import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import NewsGrid from './components/NewsGrid';
import LoadMoreButton from './components/LoadMoreButton';
import Footer from './components/Footer';
import { fetchNews } from './services/newsApi';
import './styles/App.css';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('general');
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadNews(category, 1, false);
  }, []);

  const loadNews = async (selectedCategory, pageNum, append) => {
    setLoading(true);
    try {
      const data = await fetchNews(selectedCategory, pageNum);
      if (data.articles) {
        if (append) {
          setArticles(prev => [...prev, ...data.articles]);
        } else {
          setArticles(data.articles);
        }
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setArticles([]);
    loadNews(newCategory, 1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNews(category, nextPage, true);
  };

  return (
    <div className="app">
      <Navbar 
        category={category}
        onCategoryChange={handleCategoryChange}
      />
      
      <main className="main-content">
        <h2 className="category-title">{category} News</h2>
        <NewsGrid articles={articles} />
        
        {articles.length > 0 && !loading && (
          <LoadMoreButton onClick={handleLoadMore} />
        )}
      </main>

      <Footer loading={loading} />
    </div>
  );
}