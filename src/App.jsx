// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import NewsGrid from './components/NewsGrid';
// import LoadMoreButton from './components/LoadMoreButton';
// import Footer from './components/Footer';
// import { fetchNews } from './services/newsApi';
// import './styles/App.css';

// export default function App() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [category, setCategory] = useState('general');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     loadNews(category, 1, false);
//   }, []);

//   const loadNews = async (selectedCategory, pageNum, append) => {
//     setLoading(true);
//     try {
//       const data = await fetchNews(selectedCategory, pageNum);
//       if (data.articles) {
//         if (append) {
//           setArticles(prev => [...prev, ...data.articles]);
//         } else {
//           setArticles(data.articles);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading news:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = (newCategory) => {
//     setCategory(newCategory);
//     setPage(1);
//     setArticles([]);
//     loadNews(newCategory, 1, false);
//   };

//   const handleLoadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     loadNews(category, nextPage, true);
//   };

//   return (
//     <div className="app">
//       <Navbar 
//         category={category}
//         onCategoryChange={handleCategoryChange}
//       />
      
//       <main className="main-content">
//         <h2 className="category-title">{category} News</h2>
//         <NewsGrid articles={articles} />
        
//         {articles.length > 0 && !loading && (
//           <LoadMoreButton onClick={handleLoadMore} />
//         )}
//       </main>

//       <Footer loading={loading} />
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import NewsGrid from './components/NewsGrid';
import Footer from './components/Footer';
import { fetchNews, searchNews } from './services/newsApi';
import './styles/App.css';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('general');
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  const loadMoreRef = useRef(null);

  useEffect(() => {
    loadNews(category, 1, false);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && articles.length > 0) {
          handleLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loading, articles, page, category, isSearchMode, searchQuery]);

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

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsSearchMode(false);
      setSearchQuery('');
      loadNews(category, 1, false);
      return;
    }

    setSearchQuery(query);
    setIsSearchMode(true);
    setPage(1);
    setLoading(true);

    try {
      const data = await searchNews(query, 1);
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error searching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setArticles([]);
    setIsSearchMode(false);
    setSearchQuery('');
    loadNews(newCategory, 1, false);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    if (isSearchMode) {
      setLoading(true);
      try {
        const data = await searchNews(searchQuery, nextPage);
        if (data.articles) {
          setArticles(prev => [...prev, ...data.articles]);
        }
      } catch (error) {
        console.error('Error loading more search results:', error);
      } finally {
        setLoading(false);
      }
    } else {
      loadNews(category, nextPage, true);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Navbar 
        category={category}
        onCategoryChange={handleCategoryChange}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        onSearch={handleSearch}
      />
      
      <main className="main-content">
        <h2 className="category-title">
          {isSearchMode ? `Search: "${searchQuery}"` : `${category} News`}
        </h2>
        
        {loading && articles.length === 0 && (
          <div className="center-loader">
            <div className="spinner"></div>
            <p>Loading news...</p>
          </div>
        )}
        
        <NewsGrid articles={articles} />
        
        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} style={{ height: '50px', margin: '2rem 0' }}>
          {loading && articles.length > 0 && (
            <div className="center-loader">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </main>

      <Footer loading={false} />
    </div>
  );
}