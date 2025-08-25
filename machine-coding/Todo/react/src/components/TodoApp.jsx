import { useRef } from "react";
import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useMemo } from "react";
import FilterButtons from "./FilterButtons";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 0,
      content: "Hello there!",
    },
    {
      id: 1,
      content: "Get Groceries",
    },
  ]);
  const [filter, setFilter] = useState("all");
  const inputRef = useRef();
  const addTodo = (content) => {
    const newTodo = {
      id: Date.now(),
      content,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = inputRef.current;
    const val = ref.value.trim();
    if (val) {
      addTodo(val);
      ref.value = "";
    }
  };

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  return (
    <div className="todo-container">
      <div className="add-todo-container">
        <form onSubmit={handleSubmit}>
          <input
            className="todo-input"
            type="text"
            name="todo"
            placeholder="Add new todo..."
            ref={inputRef}
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
      <div className="todos-container">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoApp;
