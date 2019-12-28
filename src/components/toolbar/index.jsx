import React from "react";

import styles from "./toolbar.module.scss";

export const Toolbar = () => (
  <menu className={styles.toolbar}>
    <ul className={styles["toolbar-button-container"]}>
      <li>1</li>
      <li>2</li>
    </ul>
  </menu>
);
