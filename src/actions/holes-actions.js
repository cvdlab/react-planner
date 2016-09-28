import {
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
} from '../constants';


export function selectToolDrawingHole(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_HOLE,
    sceneComponentType
  }
}

export function updateDrawingHole(layerID, x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: UPDATE_DRAWING_HOLE,
      layerID, x, y, catalog
    });
  }
}

export function endDrawingHole(layerID, x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: END_DRAWING_HOLE,
      layerID, x, y, catalog
    });
  };
}
