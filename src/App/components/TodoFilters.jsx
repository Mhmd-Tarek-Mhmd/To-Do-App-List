import styles from "./components.module.css";

function TodoFilters({ className, handleFilterTodos }) {
  return (
    <div className={`${styles.TodoFilters} ${className}`}>
      <button
        type="button"
        className="control active"
        onClick={handleFilterTodos}
      >
        all
      </button>
      <button type="button" className="control" onClick={handleFilterTodos}>
        active
      </button>
      <button type="button" className="control" onClick={handleFilterTodos}>
        completed
      </button>
    </div>
  );
}

export default TodoFilters;
