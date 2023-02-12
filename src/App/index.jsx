import { useState, useEffect } from "react";
import { useDidUpdateEffect } from "./hooks";

import "./app.css";
import Header from "./layouts/Header";
import Main from "./layouts/Main";

const storageKey = "reactTodos";

function App() {
  // App State
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [filter, setFilter] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [theme, setTheme] = useState(
    matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // State Changes
  useEffect(() => {
    theme === "dark" && document.documentElement.classList.add("dark");
    localStorage[storageKey] &&
      setTodos([...JSON.parse(localStorage[storageKey])]);
  }, []);

  useDidUpdateEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [JSON.stringify(todos)]);
  useEffect(() => {
    if (filter === "active") {
      setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
    } else if (filter === "completed") {
      setFilteredTodos(todos.filter((todo) => todo.isCompleted));
    }
  }, [JSON.stringify(todos), filter]);

  useEffect(() => void setErrMsg(""), [todo]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [theme]);

  // Action Handlers
  const handleChangeTodo = ({ target }) => {
    setTodo(target.value);
  };
  const handleAddTodo = () => {
    if (todo) {
      if (!todos.map((todo) => todo.todoTxt).includes(todo)) {
        setTodos([
          ...todos,
          {
            id: Math.random() * Math.random(),
            todoTxt: todo,
            isCompleted: false,
          },
        ]);
        setTodo("");
      } else {
        setErrMsg("This todo is already exists");
      }
    } else {
      setErrMsg("Enter your todo");
    }
  };
  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };
  const handleFilterTodos = ({ target }) => {
    const type = target.innerHTML !== "all" ? target.innerHTML : null;
    setFilter(type);

    target.parentElement.querySelector(".active").classList.remove("active");
    target.classList.add("active");
  };
  const handleSwapTodo = (todo1, i1, todo2, i2) => {
    const [swappedTodos, setSwappedTodos] = filter
      ? [filteredTodos, setFilteredTodos]
      : [todos, setTodos];

    swappedTodos[i1] = todo2;
    swappedTodos[i2] = todo1;
    setSwappedTodos([...swappedTodos]);
  };
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  return (
    <>
      <Header
        theme={theme}
        handleToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />

      <Main
        todo={todo}
        todos={todos}
        errMsg={errMsg}
        filter={filter}
        filteredTodos={filteredTodos}
        handleAddTodo={handleAddTodo}
        handleSwapTodo={handleSwapTodo}
        handleChangeTodo={handleChangeTodo}
        handleRemoveTodo={handleRemoveTodo}
        handleToggleTodo={handleToggleTodo}
        handleFilterTodos={handleFilterTodos}
        handleClearCompleted={handleClearCompleted}
      />
    </>
  );
}

export default App;
