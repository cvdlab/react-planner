import React from "react";

import { Toolbar } from "./components/toolbar";
import { Sidebar } from "./components/sidebar";
import { Content } from "./components/content";

import styles from "./react-planner.module.scss";

export const ReactPlanner = () => {
  return (
    <div className={styles.container}>
      <Toolbar />
      <Content />
      <Sidebar />
    </div>
  );
};
