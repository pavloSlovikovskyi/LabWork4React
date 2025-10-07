import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';
import AddToDoForm from './AddToDoForm';
import ToDoListItem from './ToDoListItem';

const TodoList = () => {
  const {
    todos,
    isLoading,
    error,
    deleteTodo,
    toggleTodo,
    addTodo,
    currentPage,
    totalTodos,
    goToPrevPage,
    goToNextPage,
    setLimit,
    setSearchTerm,
    searchTerm,
    editTodoTitle,
  } = useTodos();

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
  };

  const startEditing = (id, value) => {
    setEditId(id);
    setEditValue(value);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      editTodoTitle(id, editValue);
    }
    setEditId(null);
    setEditValue('');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AddToDoForm onAddTodo={addTodo} />

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Пошук задачі..."
        className="mb-3 px-3 py-2 w-full rounded border border-gray-700 bg-black text-white"
      />

      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-700 text-gray-400' : 'bg-white text-black'}`}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} | Total: {totalTodos}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage * 10 >= totalTodos}
          className={`px-3 py-1 rounded ${currentPage * 10 >= totalTodos ? 'bg-gray-700 text-gray-400' : 'bg-white text-black'}`}
        >
          Next
        </button>
        <select onChange={handleLimitChange} className="ml-3 bg-black text-white border border-gray-700 rounded px-2">
          {[5, 10, 20].map(n => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
      </div>

      {isLoading && <div className="text-gray-400 text-center mb-2">Loading...</div>}
      {error && <div className="text-red-500 text-center mb-2">{error}</div>}

      <ul className="space-y-2">
        {todos.map(todo =>
          <li key={todo.id} className="flex items-center justify-between p-3 bg-black border border-gray-700 rounded shadow-sm">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 accent-white bg-black border border-gray-600 rounded focus:ring-0"
              />
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={() => saveEdit(todo.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEdit(todo.id);
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
              {editId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-600 text-white px-2 py-1 rounded"
                  onClick={() => startEditing(todo.id, todo.todo)}
                >
                  Edit
                </button>
              )}
              <button
                className="text-gray-400 hover:text-white px-2 py-1 rounded transition"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
