import {
  SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM,
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
