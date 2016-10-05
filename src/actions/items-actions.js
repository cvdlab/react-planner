import {
  SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM,
  BEGIN_DRAGGING_ITEM,
  UPDATE_DRAGGING_ITEM,
  END_DRAGGING_ITEM
} from '../constants';


export function selectToolDrawingItem(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_ITEM,
    sceneComponentType
  }
}

export function updateDrawingItem(layerID, x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: UPDATE_DRAWING_ITEM,
      layerID, x, y, catalog
    })
  };
}

export function endDrawingItem(layerID, x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: END_DRAWING_ITEM,
      layerID, x, y, catalog
    })
  };
}

export function beginDraggingItem(layerID, itemID, x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: BEGIN_DRAGGING_ITEM,
      layerID, itemID, x, y, catalog
    })
  };
}

export function updateDraggingItem(x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: UPDATE_DRAGGING_ITEM,
      x, y, catalog
    });
  }
}

export function endDraggingItem(x, y) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: END_DRAGGING_ITEM,
      x, y, catalog
    });
  }
}
