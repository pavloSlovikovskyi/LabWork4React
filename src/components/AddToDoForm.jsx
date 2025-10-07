import React, { useState } from 'react';

function AddToDoForm({ onAddTodo }) {
  const [newTodoText, setNewTodoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    onAddTodo(newTodoText);
    setNewTodoText('');
  };

  return (
    <form
      className="flex w-full max-w-md mx-auto mb-4 bg-black p-2 rounded border border-gray-700"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add new task..."
        className="flex-grow px-3 py-2 text-white bg-black placeholder-gray-400 rounded-l focus:outline-none"
      />
      <button
        type="submit"
        className="bg-white text-black px-4 py-2 font-semibold rounded-r border-l border-gray-700 hover:bg-gray-100 transition"
      >
        Add
      </button>
    </form>
  );
}

export default AddToDoForm;
