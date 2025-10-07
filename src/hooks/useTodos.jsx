import { useState, useEffect } from 'react';

const API_URL = 'https://dummyjson.com/todos';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}?limit=10`)
      .then(res => res.json())
      .then(data => setTodos(data.todos))
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteTodo = (id) => {
    setIsLoading(true);
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos => todos.filter(todo => todo.id !== id)))
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setIsLoading(false));
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    setIsLoading(true);
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then(res => res.json())
      .then(updated => setTodos(todos => todos.map(t => t.id === id ? { ...t, completed: updated.completed } : t)))
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setIsLoading(false));
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      todo: text,
      completed: false,
      userId: 1,
    };
    setTodos(todos => [...todos, newTodo]);
  };

  return { todos, isLoading, error, deleteTodo, toggleTodo, addTodo };
}
