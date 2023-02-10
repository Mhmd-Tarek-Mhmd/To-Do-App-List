import React from "react";

import styles from "./todos.module.css";
import Todo from "./Todo";
import TodoInput from "./TodoInput";

function TodosList({
  todos,
  todosValidation,
  addTodo,
  removeTodo,
  toggleTodo,
  swap,
}) {
  return (
    <>
      <TodoInput todosValidation={todosValidation} addTodo={addTodo} />

      <ul className={styles.TodosList}>
        {todos.length ? (
          todos.map((todo, i) => (
            <Todo
              key={todo.id}
              index={i}
              todo={todo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
              swap={swap}
            />
          ))
        ) : (
          <li className={styles.noTasks}>No tasks to show.</li>
        )}
      </ul>
    </>
  );
}

export default TodosList;
