import { VIEWER_ACTIONS } from "../constants";

export const setViewer = viewerValue => {
  return {
    type: VIEWER_ACTIONS.SET_MATRIX,
    payload: {
      viewerValue
    }
  };
};
