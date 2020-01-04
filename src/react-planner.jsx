import React from "react";
import PropTypes from "prop-types";

import { PlannerContext } from "./planner-context";

import { Toolbar } from "./components/toolbar";
import { Sidebar } from "./components/sidebar";
import { Content } from "./components/content";

import styles from "./react-planner.module.scss";

export const ReactPlanner = ({ stateExtractor }) => {
  return (
    <PlannerContext.Provider value={{ stateExtractor }}>
      <div className={styles.container}>
        <Toolbar />
        <Content />
        <Sidebar />
      </div>
    </PlannerContext.Provider>
  );
};

ReactPlanner.defaultProps = {
  stateExtractor: state => state
};

ReactPlanner.propTypes = {
  stateExtractor: PropTypes.func
};
