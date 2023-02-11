import TodoCheck from "./TodoCheck";
import styles from "./components.module.css";

function TodoInput({ errMsg, todo, handleAddTodo, handleChangeTodo }) {
  const handleSubmitTodo = (e) => {
    e.preventDefault();
    handleAddTodo();
  };

  return (
    <form
      onSubmit={handleSubmitTodo}
      className={`rect shadow rounded ${styles.TodoInput}`}
    >
      <TodoCheck type="submit" aria-label="Add todo" />

      <input
        autoFocus
        type="text"
        value={todo}
        onChange={handleChangeTodo}
        aria-label="Create a new todo"
        placeholder="Create a new todo..."
      />

      {errMsg && (
        <p role="alert" className="error">
          {errMsg}
        </p>
      )}
    </form>
  );
}

export default TodoInput;
