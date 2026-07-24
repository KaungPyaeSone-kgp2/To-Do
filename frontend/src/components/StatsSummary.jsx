import React from 'react';
import { ListTodo, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function StatsSummary({ stats }) {
  const { total = 0, completed = 0, active = 0, highPriority = 0 } = stats || {};

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-total">
          <ListTodo size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">In Progress</div>
          <div className="stat-value">{active}</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-active">
          <Clock size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{completed}</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-completed">
          <CheckCircle2 size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">High Priority</div>
          <div className="stat-value">{highPriority}</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-urgent">
          <AlertTriangle size={22} />
        </div>
      </div>
    </div>
  );
}
