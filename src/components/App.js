import React from "react";

import Header from "./Header";
import Main from "./Main";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todosValidation, setTodosValidation] = React.useState(false);

  React.useEffect(() => {
    localStorage.reactTodos &&
      setTodos([...JSON.parse(localStorage.reactTodos)]);
  }, []);

  const createTodo = (todoContent) => {
    const allContent = todos.map((todo) => todo.todoContent);
    let todo = {
      id: Date.now(),
      todoContent,
      completed: false,
    };

    if (todoContent.length) {
      setTodosValidation(true);

      for (let i = 0; i < allContent.length; i++) {
        const content = allContent[i];

        if (content === todoContent) {
          todo = false;
          setTodosValidation(false);
          break;
        } else {
          setTodosValidation(true);
        }
      }
    } else {
      todo = false;
      setTodosValidation(false);
    }

    return todo;
  };

  const addTodo = (todoContent) => {
    const todo = createTodo(todoContent);

    if (todo !== false) {
      todos.push(todo);
      setTodos([...todos]);
      localStorage.setItem("reactTodos", JSON.stringify(todos));
    }
  };

  const removeTodo = (todoID) => {
    const newTodos = todos.filter((todo) => todo.id !== todoID);

    setTodos([...newTodos]);
    localStorage.setItem("reactTodos", JSON.stringify(newTodos));
  };

  const filterTodos = (todos) => {
    setTodos([...todos]);
    localStorage.setItem("reactTodos", JSON.stringify(todos));
  };

  const toggleTodo = (todoIndex) => {
    const completedTodo = todos[todoIndex].completed;
    todos[todoIndex].completed = !completedTodo;

    setTodos([...todos]);
    localStorage.setItem("reactTodos", JSON.stringify(todos));
  };

  const swap = (todo1, i1, todo2, i2) => {
    todos[i1] = todo2;
    todos[i2] = todo1;

    setTodos([...todos]);
    localStorage.setItem("reactTodos", JSON.stringify(todos));
  };

  return (
    <>
      <Header />

      <Main
        todos={todos}
        todosValidation={todosValidation}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        swap={swap}
        filterTodos={filterTodos}
      />
    </>
  );
}

export default App;
