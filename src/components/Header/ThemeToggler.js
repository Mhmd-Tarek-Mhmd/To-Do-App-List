import React from "react";

import * as styles from "./header.module.css";

function ThemeToggler() {
  const [theme, setTheme] = React.useState("LIGHT");
  React.useEffect(() => {
    if (
      localStorage.reactTodosTheme &&
      localStorage.reactTodosTheme === "DARK"
    ) {
      setTheme(localStorage.reactTodosTheme);
      document.querySelector("html").classList.add("dark");
    }
  }, []);

  const handleToggleTheme = () => {
    let newTheme;
    newTheme = theme === "LIGHT" ? "DARK" : "LIGHT";

    setTheme(newTheme);
    localStorage.setItem("reactTodosTheme", newTheme);
    document.querySelector("html").classList.toggle("dark");
  };

  return (
    <button
      aria-label="Theme toggler"
      className={styles.ThemeToggler}
      onClick={handleToggleTheme}
    ></button>
  );
}

export default ThemeToggler;
