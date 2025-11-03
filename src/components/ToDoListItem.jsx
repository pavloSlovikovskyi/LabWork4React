import React from 'react';

function ToDoListItem({ 
  todo, 
  onToggleComplete, 
  onRemoveTodo, 
  onStartEditing,
  isEditing,
  editValue,
  onEditValueChange,
  onSaveEdit
}) {
  return (
    <li className="flex items-center justify-between p-3 bg-black border border-gray-700 rounded shadow-sm">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggleComplete}
          className="w-5 h-5 accent-white bg-black border border-gray-600 rounded focus:ring-0"
        />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={onEditValueChange}
            onBlur={onSaveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSaveEdit();
            }}
            className="bg-gray-900 text-white px-2 rounded focus:outline-none"
            autoFocus
          />
        ) : (
          <span className={`text-white text-base ${todo.completed ? 'line-through opacity-40' : ''}`}>
            {todo.todo}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={onSaveEdit}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            className="bg-yellow-600 text-white px-2 py-1 rounded"
            onClick={onStartEditing}
          >
            Edit
          </button>
        )}
        <button
          className="text-gray-400 hover:text-white px-2 py-1 rounded transition"
          onClick={onRemoveTodo}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// мемоізація з власною функцією порівняння
export default React.memo(ToDoListItem, (prevProps, nextProps) => {
  return (
    prevProps.todo.id === nextProps.todo.id &&
    prevProps.todo.completed === nextProps.todo.completed &&
    prevProps.todo.todo === nextProps.todo.todo &&
    prevProps.isEditing === nextProps.isEditing &&
    prevProps.editValue === nextProps.editValue
  );
});
