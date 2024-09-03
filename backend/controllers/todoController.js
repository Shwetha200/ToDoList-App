const Todo = require('../models/todoModel');

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });
    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.completed = req.body.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      await todo.remove();
      res.json({ message: 'Todo removed' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
