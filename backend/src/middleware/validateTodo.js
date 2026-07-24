const ApiError = require('../errors/ApiError');

function validateCreateTodo(req, res, next) {
  const { title, priority, dueDate } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('title');
  }

  if (priority && !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
    errors.push('priority');
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    errors.push('dueDate');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed for submitted task', errors, 'VALIDATION_FAILED'));
  }

  next();
}

function validateUpdateTodo(req, res, next) {
  const { title, priority, dueDate, completed } = req.body;
  const errors = [];

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    errors.push('title');
  }

  if (priority !== undefined && !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
    errors.push('priority');
  }

  if (dueDate !== undefined && dueDate !== null && isNaN(Date.parse(dueDate))) {
    errors.push('dueDate');
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('completed');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed for updated task fields', errors, 'VALIDATION_FAILED'));
  }

  next();
}

module.exports = {
  validateCreateTodo,
  validateUpdateTodo
};
