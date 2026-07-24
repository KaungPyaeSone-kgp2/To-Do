import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X } from 'lucide-react';

export default function TodoForm({ onSubmit, editingTodo, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority || 'medium');
      setDueDate(editingTodo.dueDate || '');
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      dueDate: dueDate || null
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
        <div className="form-group">
          <label htmlFor="todo-title">Task Title *</label>
          <input
            id="todo-title"
            type="text"
            className="input-field"
            placeholder="e.g. Design responsive navbar with Dark Mode"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
