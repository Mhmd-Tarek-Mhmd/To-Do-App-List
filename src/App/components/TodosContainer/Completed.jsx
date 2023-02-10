import React from "react";

import Todos from "../Todos";
import Controls from "../Controls";

function Completed({
  todos,
  todosValidation,
  addTodo,
  removeTodo,
  toggleTodo,
  swap,
  filterTodos,
}) {
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleFilterTodos = () =>
    filterTodos(todos.filter((todo) => !todo.completed));

  return (
    <div className="container">
      <Todos
        todos={completedTodos}
        todosValidation={todosValidation}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        swap={swap}
      />

      <Controls
        todos={completedTodos}
        handleFilterTodos={handleFilterTodos}
        btnTitle="Clear Completed"
      />
    </div>
  );
}

export default Completed;
