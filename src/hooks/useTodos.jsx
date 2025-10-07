import { useState, useEffect } from 'react';

const API_URL = 'https://dummyjson.com/todos';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos);
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const filtered = todos.filter(t => t.todo.toLowerCase().includes(searchTerm.toLowerCase()));
    const startIdx = (currentPage - 1) * limit;
    const paginated = filtered.slice(startIdx, startIdx + limit);
    setDisplayTodos(paginated);
  }, [todos, searchTerm, currentPage, limit]);

  const goToNextPage = () => {
    if (currentPage * limit < todos.filter(t => t.todo.toLowerCase().includes(searchTerm.toLowerCase())).length) {
      setCurrentPage(prev => prev + 1);
    }
  }; // ВИПРАВЛЕНО: додано закриваючу дужку

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const editTodoTitle = (id, newTitle) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, todo: newTitle } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), todo: text, completed: false, userId: 1 };
    setTodos(prev => [...prev, newTodo]);
  };

  return {
    todos: displayTodos,
    isLoading,
    error,
    currentPage,
    totalTodos: todos.length,
    goToNextPage,
    goToPrevPage,
    setLimit,
    setSearchTerm,
    searchTerm,
    editTodoTitle,
    deleteTodo,
    toggleTodo,
    addTodo,
  };
}
