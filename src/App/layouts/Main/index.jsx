import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import styles from "./main.module.css";
import All from "../../components/TodosContainer/All";
import Active from "../../components/TodosContainer/Active";
import Completed from "../../components/TodosContainer/Completed";
import Note from "./Note";

function Main({
  todos,
  todosValidation,
  addTodo,
  removeTodo,
  toggleTodo,
  swap,
  filterTodos,
}) {
  return (
    <main className={styles.Main}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <All
                todos={todos}
                todosValidation={todosValidation}
                addTodo={addTodo}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                swap={swap}
                filterTodos={filterTodos}
              />
              <Note />
            </>
          }
        />

        <Route
          path="/active"
          element={
            <>
              <Active
                todos={todos}
                todosValidation={todosValidation}
                addTodo={addTodo}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                swap={swap}
                filterTodos={filterTodos}
              />
              <Note />
            </>
          }
        />

        <Route
          path="/completed"
          element={
            <>
              <Completed
                todos={todos}
                todosValidation={todosValidation}
                addTodo={addTodo}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                swap={swap}
                filterTodos={filterTodos}
              />
              <Note />
            </>
          }
        />

        <Route
          path="*"
          element={
            <Link
              to="/"
              style={{
                textAlign: "center",
                display: "block",
                color: "#fff",
              }}
            >
              Back to all todos
            </Link>
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
