import React from 'react';
import { CheckSquare, Sun, Moon } from 'lucide-react';

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
          <CheckSquare size={24} />
        </div>
        <h1 className="brand-title">TaskPulse</h1>
      </div>
      <button 
        className="theme-toggle-btn"
        onClick={onToggleTheme}
        aria-label="Toggle Color Theme"
      >
        {theme === 'dark' ? (
          <>
            <Sun size={18} /> Light Mode
          </>
        ) : (
          <>
            <Moon size={18} /> Dark Mode
          </>
        )}
      </button>
    </header>
  );
}
