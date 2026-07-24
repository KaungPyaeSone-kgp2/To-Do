import React from 'react';
import { LayoutList, Calendar, Repeat, Clock, CalendarDays } from 'lucide-react';

export default function Sidebar({ activeView, onViewChange, subFilter, onSubFilterChange, stats }) {
  const { total = 0, dueDateCount = 0, recurringCount = 0, dailyCount = 0, weeklyCount = 0 } = stats || {};

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menu</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-item ${activeView === 'all' ? 'active' : ''}`}
          onClick={() => onViewChange('all')}
        >
          <div className="sidebar-item-icon color-all">
            <LayoutList size={18} />
          </div>
          <span className="sidebar-item-text">All Tasks</span>
          <span className="sidebar-badge">{total}</span>
        </button>

        <div className="sidebar-divider" />

        <div className="sidebar-section-label">FUNCTION CATEGORIES</div>

        {/* Function 1: Due Date Tasks */}
        <button
          className={`sidebar-item ${activeView === 'dueDate' ? 'active' : ''}`}
          onClick={() => onViewChange('dueDate')}
        >
          <div className="sidebar-item-icon color-duedate">
            <Calendar size={18} />
          </div>
          <div className="sidebar-item-details">
            <span className="sidebar-item-text">Due Date Tasks</span>
            <span className="sidebar-item-sub">One-time scheduled due dates</span>
          </div>
          <span className="sidebar-badge badge-duedate">{dueDateCount}</span>
        </button>

        {/* Function 2: Daily & Weekly Recurring Tasks */}
        <button
          className={`sidebar-item ${activeView === 'recurring' ? 'active' : ''}`}
          onClick={() => onViewChange('recurring')}
        >
          <div className="sidebar-item-icon color-recurring">
            <Repeat size={18} />
          </div>
          <div className="sidebar-item-details">
            <span className="sidebar-item-text">Daily & Weekly Tasks</span>
            <span className="sidebar-item-sub">Routine repeating tasks</span>
          </div>
          <span className="sidebar-badge badge-recurring">{recurringCount}</span>
        </button>

        {/* Sub-filters for Recurring Tasks when selected */}
        {activeView === 'recurring' && (
          <div className="sidebar-sub-items">
            <button
              className={`sidebar-sub-item ${subFilter === 'all' ? 'active' : ''}`}
              onClick={() => onSubFilterChange('all')}
            >
              <Repeat size={14} />
              <span>All Recurring</span>
              <span className="sub-badge">{recurringCount}</span>
            </button>
            <button
              className={`sidebar-sub-item ${subFilter === 'daily' ? 'active' : ''}`}
              onClick={() => onSubFilterChange('daily')}
            >
              <Clock size={14} />
              <span>Daily Tasks</span>
              <span className="sub-badge">{dailyCount}</span>
            </button>
            <button
              className={`sidebar-sub-item ${subFilter === 'weekly' ? 'active' : ''}`}
              onClick={() => onSubFilterChange('weekly')}
            >
              <CalendarDays size={14} />
              <span>Once a Week</span>
              <span className="sub-badge">{weeklyCount}</span>
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}
