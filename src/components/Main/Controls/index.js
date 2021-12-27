import React from "react";

import DesktopControls from "./DesktopControls";
import MobileControls from "./MobileControls";

function Controls({ todos, handleFilterTodos, btnTitle }) {
  return (
    <div>
      <DesktopControls
        todos={todos}
        handleFilterTodos={handleFilterTodos}
        btnTitle={btnTitle}
      />
      <MobileControls
        todos={todos}
        handleFilterTodos={handleFilterTodos}
        btnTitle={btnTitle}
      />
    </div>
  );
}

export default Controls;
