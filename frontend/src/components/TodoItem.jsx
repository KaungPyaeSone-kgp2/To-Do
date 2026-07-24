import React from 'react';
import { Calendar, Repeat, Clock, CalendarDays, Edit2, Trash2 } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const { id, title, description, completed, priority, dueDate, taskType, frequency } = todo;

  const isRecurring = taskType === 'recurring' || (frequency && frequency !== 'once');

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        title={completed ? 'Mark as active' : 'Mark as completed'}
      />

      <div className="todo-content">
        <div className="todo-header">
          <h3 className="todo-title">{title}</h3>
          <div className="badge-group">
            {isRecurring ? (
              <span className={`badge-frequency ${frequency || 'daily'}`}>
                {frequency === 'weekly' ? <CalendarDays size={12} /> : <Clock size={12} />}
                <span>{frequency === 'weekly' ? 'Once a week' : 'Daily'}</span>
              </span>
            ) : (
              <span className="badge-frequency once">
                <Calendar size={12} />
                <span>Due Date</span>
              </span>
            )}
            <span className={`badge-priority ${priority || 'medium'}`}>
              {priority || 'medium'}
            </span>
          </div>
        </div>

        {description && (
          <p className="todo-description">{description}</p>
        )}

        <div className="todo-meta">
          {!isRecurring && dueDate && (
            <div className="meta-item">
              <Calendar size={14} />
              <span>Due: {dueDate}</span>
            </div>
          )}

          {isRecurring && (
            <div className="meta-item meta-recurring">
              <Repeat size={14} />
              <span>Repeats: {frequency === 'weekly' ? 'Once every week' : 'Every single day'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="icon-btn"
          onClick={() => onEdit(todo)}
          title="Edit task"
        >
          <Edit2 size={16} />
        </button>
        <button
          className="icon-btn icon-btn-danger"
          onClick={() => onDelete(id)}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
