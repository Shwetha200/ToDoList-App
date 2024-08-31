const Todo = require('../models/todoModel');

// Get all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Create a new todo
const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
};

// Update a todo
const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    todo.completed = req.body.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    await todo.remove();
    res.json({ message: 'Todo removed' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
