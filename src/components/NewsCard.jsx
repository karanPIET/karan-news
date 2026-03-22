import React from 'react';
import { truncateText } from '../utils/helpers';
import '../styles/NewsCard.css';

export default function NewsCard({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
    >
      <div className="news-card-inner">
        <div className="news-image">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="news-placeholder">📰</div>';
              }}
            />
          ) : (
            <div className="news-placeholder">📰</div>
          )}
        </div>

        <div className="news-content">
          <h3 className="news-title">{article.title}</h3>
          <p className="news-description">
            {truncateText(article.description, 100)}
          </p>
          <div className="news-meta">
            <span>{article.source.name}</span>
            {article.publishedAt && (
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}