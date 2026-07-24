const todoRepository = require('../repositories/todoRepository');
const ApiError = require('../errors/ApiError');

class TodoService {
  getAllTodos(filters = {}) {
    let todos = todoRepository.findAll();

    // Filter by status (active/completed)
    if (filters.status === 'completed') {
      todos = todos.filter(t => t.completed);
    } else if (filters.status === 'active') {
      todos = todos.filter(t => !t.completed);
    }

    // Filter by priority
    if (filters.priority && ['low', 'medium', 'high'].includes(filters.priority.toLowerCase())) {
      todos = todos.filter(t => t.priority === filters.priority.toLowerCase());
    }

    // Filter by taskType (dueDate / recurring)
    if (filters.taskType && ['dueDate', 'recurring'].includes(filters.taskType)) {
      todos = todos.filter(t => (t.taskType || 'dueDate') === filters.taskType);
    }

    // Filter by frequency (once / daily / weekly)
    if (filters.frequency && ['once', 'daily', 'weekly'].includes(filters.frequency.toLowerCase())) {
      todos = todos.filter(t => (t.frequency || 'once') === filters.frequency.toLowerCase());
    }

    // Search query
    if (filters.search) {
      const query = filters.search.toLowerCase();
      todos = todos.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query)
      );
    }

    return todos;
  }

  getTodoById(id) {
    const todo = todoRepository.findById(id);
    if (!todo) {
      throw ApiError.notFound(`To-Do item with ID '${id}' was not found.`);
    }
    return todo;
  }

  createTodo(todoData) {
    return todoRepository.create(todoData);
  }

  updateTodo(id, updateFields) {
    const existing = todoRepository.findById(id);
    if (!existing) {
      throw ApiError.notFound(`To-Do item with ID '${id}' was not found.`);
    }
    return todoRepository.update(id, updateFields);
  }

  toggleTodoComplete(id) {
    const existing = todoRepository.findById(id);
    if (!existing) {
      throw ApiError.notFound(`To-Do item with ID '${id}' was not found.`);
    }
    return todoRepository.update(id, { completed: !existing.completed });
  }

  deleteTodo(id) {
    const existing = todoRepository.findById(id);
    if (!existing) {
      throw ApiError.notFound(`To-Do item with ID '${id}' was not found.`);
    }
    return todoRepository.delete(id);
  }

  getStatistics() {
    const all = todoRepository.findAll();
    const total = all.length;
    const completed = all.filter(t => t.completed).length;
    const active = total - completed;
    const highPriority = all.filter(t => !t.completed && t.priority === 'high').length;
    const dueDateCount = all.filter(t => (t.taskType || 'dueDate') === 'dueDate').length;
    const recurringCount = all.filter(t => t.taskType === 'recurring').length;
    const dailyCount = all.filter(t => t.frequency === 'daily').length;
    const weeklyCount = all.filter(t => t.frequency === 'weekly').length;

    return {
      total,
      completed,
      active,
      highPriority,
      dueDateCount,
      recurringCount,
      dailyCount,
      weeklyCount
    };
  }
}

module.exports = new TodoService();
