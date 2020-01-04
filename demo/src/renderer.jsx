import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { ReactPlanner } from "react-planner";

import { store } from "./store";

ReactDOM.render(
  <div style={{ width: "100%", height: "100%" }}>
    <Provider store={store}>
      <ReactPlanner stateExtractor={state => state["react-planner"]} />
    </Provider>
  </div>,
  document.getElementById("app")
);
