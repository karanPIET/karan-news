import React, { useState } from 'react';
import '../styles/Navbar.css';

const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];

export default function Navbar({ category, onCategoryChange, darkMode, toggleDarkMode, onSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearch(searchInput.trim());
    setSearchInput('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* ROW 1 → LOGO */}
        <div className="navbar-top">
          <button
            onClick={() => onCategoryChange('general')}
            className="navbar-logo"
          >
            KaranNews
          </button>
        </div>

        {/* ROW 2 → CONTENT */}
        <div className="navbar-bottom">

          {/* LEFT → Categories */}
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

          {/* RIGHT → Search + Dark Mode */}
          <div className="navbar-actions">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search news..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>

            <button
              onClick={toggleDarkMode}
              className="dark-mode-btn"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

        </div>

      </div>
    </nav>
  );
}