import { VIEWER_ACTIONS } from "../constants";

export const viewerReducer = (state, action) => {
  switch (action.type) {
    case VIEWER_ACTIONS.SET_MATRIX: {
      // TODO Use Immer!
      return {
        ...state,
        viewer2D: {
          ...action.payload.viewerValue
        }
      };
    }
    default:
      return state;
  }
};
