import React from "react";

import { usePlannerSelector } from "../../hooks/use-planner-selector";

import { Viewer2D } from "../viewer2d";

import { CONTENTS } from "../../constants";
import styles from "./content.module.scss";

const CONTENTS_COMPONENTS = {
  [CONTENTS.VIEWER_2D_CONTENT]: <Viewer2D />
};

export const Content = () => {
  const currentContent = usePlannerSelector(state => state.content);
  return (
    <div className={styles.content}>
      {CONTENTS_COMPONENTS[currentContent] || null}
    </div>
  );
};
