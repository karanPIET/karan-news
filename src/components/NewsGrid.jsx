import React from 'react';
import NewsCard from './NewsCard';

export default function NewsGrid({ articles }) {
  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}