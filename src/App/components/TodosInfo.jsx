import TodoFilters from "./TodoFilters";
import styles from "./components.module.css";

function TodosInfo({
  activeTodos,
  completedTodos,
  handleFilterTodos,
  handleClearCompleted,
}) {
  return (
    <li className={`rect ${styles.TodosInfo}`}>
      <span>{activeTodos.length} items left</span>

      <TodoFilters
        className="d-md-flex"
        handleFilterTodos={handleFilterTodos}
      />

      <button
        type="button"
        className="control"
        onClick={handleClearCompleted}
        disabled={!Boolean(completedTodos.length)}
      >
        Clear Completed
      </button>
    </li>
  );
}

export default TodosInfo;
