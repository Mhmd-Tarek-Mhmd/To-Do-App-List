import React from "react";

import styles from "./controls.module.css";
import ItemsLeft from "./ItemsLeft";
import Links from "./Links";
import Clear from "./Clear";

function DesktopControls({ todos, handleFilterTodos, btnTitle }) {
  return (
    <div className={`${styles.Controls} ${styles.DesktopControls}`}>
      <ItemsLeft todos={todos} />
      <Links />
      <Clear handleFilterTodos={handleFilterTodos} btnTitle={btnTitle} />
    </div>
  );
}

export default DesktopControls;
