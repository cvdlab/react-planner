import {
  SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE,
  END_DRAWING_LINE,
  BEGIN_DRAGGING_LINE,
  UPDATE_DRAGGING_LINE,
  END_DRAGGING_LINE
} from '../constants';


export function selectToolDrawingLine(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_LINE,
    sceneComponentType
  }
}

export function beginDrawingLine(layerID, x, y) {
  return {
    type: BEGIN_DRAWING_LINE,
    layerID, x, y
  }
}

export function updateDrawingLine(layerID, x, y) {
  return {
    type: UPDATE_DRAWING_LINE,
    layerID, x, y
  }
}

export function endDrawingLine(layerID, x, y) {
  return {
    type: END_DRAWING_LINE,
    layerID, x, y
  }
}

export function beginDraggingLine(x, y) {
  return {
    type: BEGIN_DRAGGING_LINE,
    x, y
  }
}

export function updateDraggingLine(x, y) {
  return {
    type: UPDATE_DRAGGING_LINE,
    x, y
  }
}

export function endDraggingLine(x, y) {
  return {
    type: END_DRAGGING_LINE,
    x, y
  }
}
