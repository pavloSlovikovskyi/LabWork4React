import React from 'react';

function ToDoListItem({ todo, onToggleComplete, onRemoveTodo }) {
  return (
    <li className="flex items-center justify-between p-3 bg-black border border-gray-700 rounded shadow-sm">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggleComplete}
          className="w-5 h-5 accent-white bg-black border border-gray-600 rounded focus:ring-0"
        />
        <span className={`text-white text-base ${todo.completed ? 'line-through opacity-40' : ''}`}>
          {todo.todo}
        </span>
      </div>
      <button
        className="text-gray-400 hover:text-white px-2 py-1 rounded transition"
        onClick={onRemoveTodo}
      >
        Delete
      </button>
    </li>
  );
}

export default ToDoListItem;
