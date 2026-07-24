import React from 'react';
import TodoItem from './TodoItem';
import { Inbox } from 'lucide-react';

export default function TodoList({ todos, onToggle, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="empty-state">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="empty-state">
        <Inbox size={48} className="empty-state-icon" />
        <h3>No tasks found</h3>
        <p>Create a new task above or adjust your search filters.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
