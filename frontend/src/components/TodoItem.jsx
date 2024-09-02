import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <p className={`${todo.completed ? 'line-through' : ''}`}>{todo.text}</p>
      <div>
        <button
          className={`mr-2 ${todo.completed ? 'text-green-600' : 'text-gray-600'}`}
          onClick={() => toggleComplete(todo._id, !todo.completed)}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        {/* <button
          className="text-red-600"
          onClick={() => deleteTodo(todo._id)}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default TodoItem;
