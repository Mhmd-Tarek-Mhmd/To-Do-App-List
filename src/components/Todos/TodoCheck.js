import React from "react";

import styles from "./todos.module.css";

function TodoCheck({ ariaChecked, ariaLabel, handleClick, handleKeydown }) {
  return (
    <div
      role="checkbox"
      tabIndex="0"
      className={styles.TodoCheck}
      aria-checked={ariaChecked}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={(e) => e.keyCode === 13 && handleKeydown()}
    ></div>
  );
}

export default TodoCheck;
