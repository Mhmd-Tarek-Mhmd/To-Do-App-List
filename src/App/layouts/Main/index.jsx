import "./main.css";
import Todo from "../../components/Todo";
import TodoInput from "../../components/TodoInput";
import TodosInfo from "../../components/TodosInfo";
import TodoFilters from "../../components/TodoFilters";

function Main({
  todo,
  todos,
  errMsg,
  isFiltered,
  handleAddTodo,
  handleSwapTodo,
  handleRemoveTodo,
  handleToggleTodo,
  handleChangeTodo,
  handleFilterTodos,
  handleClearCompleted,
}) {
  const isRender = isFiltered || todos.length;

  return (
    <main className="main">
      <div className="container">
        {/* Todo Input */}
        <TodoInput
          todo={todo}
          errMsg={errMsg}
          handleAddTodo={handleAddTodo}
          handleChangeTodo={handleChangeTodo}
        />

        {/* Todo List */}
        <ul className="main__todos | rounded shadow">
          {todos.length ? (
            todos.map((todo, i) => (
              <Todo
                key={todo.id}
                index={i}
                todo={todo}
                handleSwapTodo={handleSwapTodo}
                handleRemoveTodo={handleRemoveTodo}
                handleToggleTodo={handleToggleTodo}
              />
            ))
          ) : (
            <li className="rect">No tasks to show.</li>
          )}

          {/* Todos Info && Desktop Todo Filters */}
          {isRender ? (
            <TodosInfo
              handleFilterTodos={handleFilterTodos}
              handleClearCompleted={handleClearCompleted}
              activeTodos={todos.filter((todo) => !todo.isCompleted)}
              completedTodos={todos.filter((todo) => todo.isCompleted)}
            />
          ) : null}
        </ul>

        {/* Mobile Todo Filters */}
        {isRender ? (
          <TodoFilters
            className="rect shadow rounded d-sm-flex"
            handleFilterTodos={handleFilterTodos}
          />
        ) : null}

        {/* Note */}
        <p role="alert" className="main__note">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}

export default Main;
