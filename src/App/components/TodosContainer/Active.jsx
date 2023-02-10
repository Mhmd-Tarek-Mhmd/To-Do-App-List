import React from "react";

import Todos from "../Todos";
import Controls from "../Controls";

function Active({
  todos,
  todosValidation,
  addTodo,
  removeTodo,
  toggleTodo,
  swap,
  filterTodos,
}) {
  const activeTodos = todos.filter((todo) => !todo.completed);

  const handleFilterTodos = () =>
    filterTodos(todos.filter((todo) => todo.completed));

  return (
    <div className="container">
      <Todos
        todos={activeTodos}
        todosValidation={todosValidation}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        swap={swap}
      />

      <Controls
        todos={activeTodos}
        handleFilterTodos={handleFilterTodos}
        btnTitle="Clear Active"
      />
    </div>
  );
}

export default Active;
