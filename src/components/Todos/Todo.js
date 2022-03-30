import React from "react";

import styles from "./todos.module.css";
import TodoCheck from "./TodoCheck";

export default function Todo({ todo, removeTodo, toggleTodo, index, swap }) {
  const handleToggleTodo = () => toggleTodo(index);

  const handleDragStart = (e, todo, i) => {
    e.target.style.opacity = "0.4";

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify(todo));
    e.dataTransfer.setData("text/html", i);
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    return false;
  };
  const handleDrop = (e, todo, i) => {
    e.stopPropagation();
    swap(
      JSON.parse(e.dataTransfer.getData("text/plain")),
      e.dataTransfer.getData("text/html"),
      todo,
      i
    );

    return false;
  };

  return (
    <li
      className={styles.Todo}
      draggable
      onDragStart={(e) => handleDragStart(e, todo, index)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, todo, index)}
    >
      <TodoCheck
        ariaChecked={todo.completed}
        ariaLabel="Toggle todo"
        handleClick={handleToggleTodo}
        handleKeydown={handleToggleTodo}
      />

      <p
        className={`${styles.paragraph} ${todo.completed && styles.completed}`}
        onClick={handleToggleTodo}
      >
        {todo.todoContent}
      </p>

      <button
        className={styles.removeTodo}
        aria-label="Delete todo"
        onClick={() => removeTodo(todo.id)}
      ></button>
    </li>
  );
}
