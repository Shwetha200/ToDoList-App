import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('/api/todos');
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const { data } = await axios.post('/api/todos', { text });
      setTodos([...todos, data]);
      setText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const { data } = await axios.put(`/api/todos/${id}`, { completed });
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="bg-blue-500 text-white p-2 mt-2 w-full"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
