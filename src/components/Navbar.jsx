import React from 'react';
import '../styles/Navbar.css';

const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];

export default function Navbar({ category, onCategoryChange }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button
          onClick={() => onCategoryChange('general')}
          className="navbar-logo"
        >
          KaranNews
        </button>

        <div className="navbar-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`category-btn ${category === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}