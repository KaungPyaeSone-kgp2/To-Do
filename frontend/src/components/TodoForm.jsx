import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X, Calendar, Repeat } from 'lucide-react';

export default function TodoForm({ onSubmit, editingTodo, onCancelEdit, defaultTaskType = 'dueDate' }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [taskType, setTaskType] = useState('dueDate'); // 'dueDate' or 'recurring'
  const [frequency, setFrequency] = useState('daily'); // 'daily' or 'weekly'
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority || 'medium');
      setTaskType(editingTodo.taskType || (editingTodo.frequency && editingTodo.frequency !== 'once' ? 'recurring' : 'dueDate'));
      setFrequency(editingTodo.frequency === 'weekly' ? 'weekly' : 'daily');
      setDueDate(editingTodo.dueDate || '');
    } else {
      resetForm();
    }
  }, [editingTodo, defaultTaskType]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    const initialType = defaultTaskType === 'recurring' ? 'recurring' : 'dueDate';
    setTaskType(initialType);
    setFrequency('daily');
    setDueDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      priority,
      taskType,
      frequency: taskType === 'recurring' ? frequency : 'once',
      dueDate: taskType === 'dueDate' ? (dueDate || null) : null
    });

    if (!editingTodo) {
      resetForm();
    }
  };

  return (
    <div className="todo-form-container">
      <div className="form-title">
        {editingTodo ? (
          <>
            <Save size={20} /> Edit Task
          </>
        ) : (
          <>
            <PlusCircle size={20} /> Add New Task
          </>
        )}
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        {/* Task Type Switcher (Function 1 vs Function 2) */}
        <div className="form-group">
          <label>Task Function Type</label>
          <div className="task-type-selector">
            <button
              type="button"
              className={`type-option ${taskType === 'dueDate' ? 'selected' : ''}`}
              onClick={() => setTaskType('dueDate')}
            >
              <Calendar size={16} />
              <span>Due Date Task</span>
            </button>

            <button
              type="button"
              className={`type-option ${taskType === 'recurring' ? 'selected' : ''}`}
              onClick={() => setTaskType('recurring')}
            >
              <Repeat size={16} />
              <span>Daily / Weekly Task</span>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="todo-title">Task Title *</label>
          <input
            id="todo-title"
            type="text"
            className="input-field"
            placeholder="e.g. Daily morning review or Submit weekly report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="todo-desc">Description (Optional)</label>
          <textarea
            id="todo-desc"
            className="textarea-field"
            placeholder="Add details, notes, or sub-tasks..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="todo-priority">Priority</label>
            <select
              id="todo-priority"
              className="select-field"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          {/* Conditional field based on Task Function Type */}
          {taskType === 'dueDate' ? (
            <div className="form-group">
              <label htmlFor="todo-duedate">Due Date</label>
              <input
                id="todo-duedate"
                type="date"
                className="input-field"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="todo-frequency">Recurrence Frequency</label>
              <select
                id="todo-frequency"
                className="select-field"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="daily">Daily Task (Every Day)</option>
                <option value="weekly">Once a Week (Weekly)</option>
              </select>
            </div>
          )}

          <div className="form-group" style={{ justifyContent: 'flex-end', display: 'flex', gap: '0.5rem' }}>
            {editingTodo && (
              <button type="button" className="btn-secondary" onClick={onCancelEdit}>
                <X size={18} /> Cancel
              </button>
            )}
            <button type="submit" className="btn-primary" style={{ height: '42px', marginTop: 'auto' }}>
              {editingTodo ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
