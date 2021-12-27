import React from "react";

import styles from "./controls.module.css";
import ItemsLeft from "./ItemsLeft";
import Links from "./Links";
import Clear from "./Clear";

function MobileControls({ todos, handleFilterTodos, btnTitle }) {
  return (
    <div className={`${styles.Controls} ${styles.MobileControls}`}>
      <ItemsLeft todos={todos} />
      <Clear handleFilterTodos={handleFilterTodos} btnTitle={btnTitle} />
      <Links />
    </div>
  );
}

export default MobileControls;
