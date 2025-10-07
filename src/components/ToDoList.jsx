import React from 'react';
import useTodos from '../hooks/useTodos';
import AddToDoForm from './AddToDoForm';
import ToDoListItem from './ToDoListItem';

const ToDoList = () => {
  const { todos, isLoading, error, deleteTodo, toggleTodo, addTodo } = useTodos();

  return (
    <div className="w-full max-w-md mx-auto">
      <AddToDoForm onAddTodo={addTodo} />
      {isLoading && <div className="text-gray-400 text-center mb-2">Loading...</div>}
      {error && <div className="text-red-500 text-center mb-2">{error}</div>}
      <ul className="space-y-2">
        {todos.map(todo => (
          <ToDoListItem
            key={todo.id}
            todo={todo}
            onToggleComplete={() => toggleTodo(todo.id)}
            onRemoveTodo={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
