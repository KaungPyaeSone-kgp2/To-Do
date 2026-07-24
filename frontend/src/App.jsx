import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
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
  const [activeView, setActiveView] = useState('all'); // 'all', 'dueDate', 'recurring'
  const [subFilter, setSubFilter] = useState('all'); // 'all', 'daily', 'weekly'
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

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch data with abort controller signal to prevent search race conditions
  const fetchTodos = async (signal) => {
    try {
      if (isInitialLoading) {
        setIsLoading(true);
      }
      const queryParams = { ...filters };

      if (activeView === 'dueDate') {
        queryParams.taskType = 'dueDate';
      } else if (activeView === 'recurring') {
        queryParams.taskType = 'recurring';
        if (subFilter !== 'all') {
          queryParams.frequency = subFilter;
        }
      }

      const res = await api.getTodos(queryParams, signal);
      setTodos(res.data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setApiError(err);
      }
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
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
    const controller = new AbortController();
    fetchTodos(controller.signal);
    fetchStats();

    return () => controller.abort();
  }, [activeView, subFilter, filters]);

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

  const handleViewChange = (view) => {
    setActiveView(view);
    if (view === 'recurring') {
      setSubFilter('all');
    }
  };

  return (
    <div className="app-container">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className="app-layout">
        <Sidebar
          activeView={activeView}
          onViewChange={handleViewChange}
          subFilter={subFilter}
          onSubFilterChange={setSubFilter}
          stats={stats}
        />

        <main className="main-content">
          <StatsSummary stats={stats} />

          <TodoForm
            onSubmit={handleCreateOrUpdate}
            editingTodo={editingTodo}
            onCancelEdit={() => setEditingTodo(null)}
            defaultTaskType={activeView === 'recurring' ? 'recurring' : 'dueDate'}
          />

          <TodoFilter filters={filters} onFilterChange={setFilters} />

          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onEdit={(todo) => setEditingTodo(todo)}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </main>
      </div>

      <ErrorToast error={apiError} onClose={() => setApiError(null)} />
    </div>
  );
}
