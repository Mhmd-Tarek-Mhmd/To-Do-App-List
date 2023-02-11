import styles from "./components.module.css";

function TodoCheck(props) {
  return <button {...props} className={styles.TodoCheck} />;
}

export default TodoCheck;
