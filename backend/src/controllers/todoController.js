const todoService = require('../services/todoService');

class TodoController {
  getTodos(req, res, next) {
    try {
      const { status, priority, search } = req.query;
      const todos = todoService.getAllTodos({ status, priority, search });
      res.json({
        success: true,
        count: todos.length,
        data: todos
      });
    } catch (error) {
      next(error);
    }
  }

  getTodo(req, res, next) {
    try {
      const { id } = req.params;
      const todo = todoService.getTodoById(id);
      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }

  createTodo(req, res, next) {
    try {
      const newTodo = todoService.createTodo(req.body);
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: newTodo
      });
    } catch (error) {
      next(error);
    }
  }

  updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const updatedTodo = todoService.updateTodo(id, req.body);
      res.json({
        success: true,
        message: 'Task updated successfully',
        data: updatedTodo
      });
    } catch (error) {
      next(error);
    }
  }

  toggleTodo(req, res, next) {
    try {
      const { id } = req.params;
      const toggledTodo = todoService.toggleTodoComplete(id);
      res.json({
        success: true,
        message: 'Task status updated',
        data: toggledTodo
      });
    } catch (error) {
      next(error);
    }
  }

  deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      todoService.deleteTodo(id);
      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  getStats(req, res, next) {
    try {
      const stats = todoService.getStatistics();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController();
