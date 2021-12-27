import React, { useState, useEffect } from "react";

import * as styles from "./todos.module.css";
import TodoCheck from "./TodoCheck";

function TodoInput({ todosValidation, addTodo }) {
  const [todoContent, setTodoContent] = useState("");
  const [ariaChecked, setAriaChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * [1] Handle Error Msg
   */

  const setMsg = () => {
    let msg;
    msg = todoContent.length
      ? "This todo is already exist."
      : "Enter your todo.";
    setErrorMsg(msg);
  };

  /**
   * [2] Handle Check Btn
   */

  const handleCheckBtn = () => {
    if (todoContent.length) {
      setAriaChecked(true);

      // Reset Check Btn
      setTimeout(() => {
        setAriaChecked(false);
      }, 500);
    }
  };

  useEffect(() => {
    todosValidation && handleCheckBtn();
    // eslint-disable-next-line
  }, [todosValidation]);

  /**
   * [3] Handle Add Todo
   */

  const handleAddTodo = () => {
    addTodo(todoContent);
    setMsg();
    setTodoContent(""); // Reset input
  };

  return (
    <div className={styles.TodoInput}>
      <TodoCheck
        ariaChecked={ariaChecked}
        ariaLabel="Add todo"
        handleClick={handleAddTodo}
        handleKeydown={handleAddTodo}
      />

      <input
        type="text"
        placeholder="Create a new todo..."
        aria-label="Create a new todo"
        value={todoContent}
        onChange={(e) => setTodoContent(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && handleAddTodo(todoContent)}
      />

      {!todosValidation && <div className={styles.errorMsg}>{errorMsg}</div>}
    </div>
  );
}

export default TodoInput;
