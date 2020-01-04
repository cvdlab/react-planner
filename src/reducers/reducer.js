import { State } from "../models";

import { viewerReducer } from "./viewer-reducer";

export default (state, action) => {
  state = state || State;
  state = viewerReducer(state, action);
  return state;
};
