import { useState, useEffect, useMemo, useCallback } from 'react';

const API_URL = 'https://dummyjson.com/todos';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
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

  // мемоізація відфільтрованих todos
  const filteredTodos = useMemo(() => {
    return todos.filter(t => t.todo.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [todos, searchTerm]);

  // мемоізація пагінованих todos
  const displayTodos = useMemo(() => {
    const startIdx = (currentPage - 1) * limit;
    return filteredTodos.slice(startIdx, startIdx + limit);
  }, [filteredTodos, currentPage, limit]);

  // мемоізація функцій для стабільних референсій
  const goToNextPage = useCallback(() => {
    if (currentPage * limit < filteredTodos.length) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, limit, filteredTodos.length]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  }, [currentPage]);

  const editTodoTitle = useCallback((id, newTitle) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, todo: newTitle } : t));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const addTodo = useCallback((text) => {
    const newTodo = { id: Date.now(), todo: text, completed: false, userId: 1 };
    setTodos(prev => [...prev, newTodo]);
  }, []);

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
