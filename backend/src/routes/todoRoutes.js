const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateCreateTodo, validateUpdateTodo } = require('../middleware/validateTodo');

router.get('/stats', todoController.getStats);

router.route('/')
  .get(todoController.getTodos)
  .post(validateCreateTodo, todoController.createTodo);

router.route('/:id')
  .get(todoController.getTodo)
  .put(validateUpdateTodo, todoController.updateTodo)
  .delete(todoController.deleteTodo);

router.patch('/:id/toggle', todoController.toggleTodo);

module.exports = router;
