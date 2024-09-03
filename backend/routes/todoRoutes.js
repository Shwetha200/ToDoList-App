const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const router = express.Router();

// Route for fetching all todos and creating a new one
router.route('/').get(getTodos).post(createTodo);

// Route for updating and deleting a specific todo
router.route('/:id').put(updateTodo).delete(deleteTodo);

module.exports = router;
