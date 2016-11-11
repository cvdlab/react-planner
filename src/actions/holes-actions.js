import {
  SELECT_HOLE,
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  BEGIN_DRAGGING_HOLE,
  UPDATE_DRAGGING_HOLE,
  END_DRAGGING_HOLE
} from '../constants';

export function selectHole(layerID, holeID) {
  return {
    type: SELECT_HOLE,
    layerID,
    holeID
  }
}

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


export function beginDraggingHole(layerID, holeID, x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: BEGIN_DRAGGING_HOLE,
      layerID, holeID, x, y, catalog
    })
  };
}

export function updateDraggingHole(x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: UPDATE_DRAGGING_HOLE,
      x, y, catalog
    });
  }
}

export function endDraggingHole(x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: END_DRAGGING_HOLE,
      x, y, catalog
    });
  }
}
