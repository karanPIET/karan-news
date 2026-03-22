import React from 'react';

export default function LoadMoreButton({ onClick }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <button
        onClick={onClick}
        className="load-more-btn"
      >
        Load More News
      </button>
    </div>
  );
}