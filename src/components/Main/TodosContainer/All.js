import React from "react";

import Todos from "../../Todos";
import Controls from "../Controls";

function All({
  todos,
  todosValidation,
  addTodo,
  removeTodo,
  toggleTodo,
  swap,
  filterTodos,
}) {
  const handleFilterTodos = () => filterTodos([]);

  return (
    <div className="container">
      <Todos
        todos={todos}
        todosValidation={todosValidation}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        swap={swap}
      />

      <Controls
        todos={todos}
        handleFilterTodos={handleFilterTodos}
        btnTitle="Clear All"
      />
    </div>
  );
}

export default All;
