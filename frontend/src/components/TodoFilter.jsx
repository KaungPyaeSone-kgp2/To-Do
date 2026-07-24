import React from 'react';
import { Search } from 'lucide-react';

export default function TodoFilter({ filters, onFilterChange }) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select
          className="select-field"
          style={{ width: 'auto', padding: '0.45rem 0.8rem', fontSize: '0.85rem' }}
          value={filters.priority || ''}
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <div className="status-tabs">
          <button
            className={`tab-btn ${(!filters.status || filters.status === 'all') ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filters, status: 'all' })}
          >
            All
          </button>
          <button
            className={`tab-btn ${filters.status === 'active' ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filters, status: 'active' })}
          >
            Active
          </button>
          <button
            className={`tab-btn ${filters.status === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filters, status: 'completed' })}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}
