import React from 'react';
import { Loader2 } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer({ loading }) {
  return (
    <footer className="footer">
      {loading && (
        <div className="footer-loader">
          <Loader2 size={24} className="spinner" />
          <span>Loading news...</span>
        </div>
      )}
      <p className="footer-text">
        © 2026 KaranNews. Powered by NewsAPI
      </p>
    </footer>
  );
}