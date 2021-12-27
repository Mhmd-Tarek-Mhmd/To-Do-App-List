import React from "react";

import * as styles from "./header.module.css";
import ThemeToggler from "./ThemeToggler";
import Logo from "./Logo";

function Header({ handleToggleTheme }) {
  return (
    <header className={styles.Header}>
      <div className="container space-between-flex">
        <Logo />

        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;
