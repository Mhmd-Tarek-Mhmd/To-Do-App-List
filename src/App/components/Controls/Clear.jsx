import React from "react";

function Clear({ handleFilterTodos, btnTitle }) {
  return <button onClick={handleFilterTodos}>{btnTitle}</button>;
}

export default Clear;
