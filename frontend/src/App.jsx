import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsSummary from './components/StatsSummary';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import ErrorToast from './components/ErrorToast';
import { api } from './services/api';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({ status: 'all', priority: '', search: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Sync theme attribute to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await api.getTodos(filters);
      setTodos(res.data);
    } catch (err) {
      setApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.getStats();
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [filters]);

  const handleCreateOrUpdate = async (todoData) => {
    try {
      setApiError(null);
      if (editingTodo) {
        await api.updateTodo(editingTodo.id, todoData);
        setEditingTodo(null);
      } else {
        await api.createTodo(todoData);
      }
      fetchTodos();
      fetchStats();
    } catch (err) {
      setApiError(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      setApiError(null);
      await api.toggleTodo(id);
      fetchTodos();
      fetchStats();
    } catch (err) {
      setApiError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      setApiError(null);
      await api.deleteTodo(id);
      fetchTodos();
      fetchStats();
    } catch (err) {
      setApiError(err);
    }
  };

  return (
    <div className="app-container">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <StatsSummary stats={stats} />

      <TodoForm
        onSubmit={handleCreateOrUpdate}
        editingTodo={editingTodo}
        onCancelEdit={() => setEditingTodo(null)}
      />

      <TodoFilter filters={filters} onFilterChange={setFilters} />

      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onEdit={(todo) => setEditingTodo(todo)}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <ErrorToast error={apiError} onClose={() => setApiError(null)} />
    </div>
  );
}
