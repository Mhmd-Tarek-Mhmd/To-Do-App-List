import TodoCheck from "./TodoCheck";
import styles from "./components.module.css";

function Todo({
  todo,
  index,
  handleSwapTodo,
  handleRemoveTodo,
  handleToggleTodo,
}) {
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
    handleSwapTodo(
      JSON.parse(e.dataTransfer.getData("text/plain")),
      e.dataTransfer.getData("text/html"),
      todo,
      i
    );
    return false;
  };

  return (
    <li
      className="rect"
      draggable
      onDragStart={(e) => handleDragStart(e, todo, index)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, todo, index)}
    >
      <TodoCheck
        role="checkbox"
        aria-checked={todo.isCompleted}
        onClick={() => handleToggleTodo(todo.id)}
        aria-label={`Set ${todo.todoTxt} todo as ${
          todo.isCompleted ? "active" : "completed"
        }`}
      />

      <p
        onClick={() => handleToggleTodo(todo.id)}
        className={`${styles.todoTxt} ${
          todo.isCompleted ? styles.completed : ""
        }`}
      >
        {todo.todoTxt}
      </p>

      <button
        type="button"
        className={styles.removeTodo}
        onClick={() => handleRemoveTodo(todo.id)}
        aria-label={`Delete ${todo.todoTxt} todo`}
      >
        {/* prettier-ignore */}
        <svg aria-hidden='true' focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentColor" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </button>
    </li>
  );
}

export default Todo;
