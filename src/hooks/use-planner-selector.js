import { useContext } from "react";
import { PlannerContext } from "../planner-context";

import { useSelector } from "react-redux";

export const usePlannerSelector = selector => {
  const stateExtractor = useContext(PlannerContext).stateExtractor;
  return useSelector(reduxState => selector(stateExtractor(reduxState)));
};
