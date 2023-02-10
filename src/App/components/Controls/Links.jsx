import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./controls.module.css";

function Links() {
  return (
    <ul className={`${styles.Links} center-flex`}>
      <li>
        <NavLink to="/">All</NavLink>
      </li>
      <li>
        <NavLink to="/active">Active</NavLink>
      </li>
      <li>
        <NavLink to="/completed">Completed</NavLink>
      </li>
    </ul>
  );
}

export default Links;
