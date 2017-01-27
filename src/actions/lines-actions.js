import {
  SELECT_LINE,
  SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE,
  END_DRAWING_LINE,
  BEGIN_DRAGGING_LINE,
  UPDATE_DRAGGING_LINE,
  END_DRAGGING_LINE
} from '../constants';

export function selectLine(layerID, lineID) {
  return {
    type: SELECT_LINE,
    layerID,
    lineID
  }
}

export function selectToolDrawingLine(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_LINE,
    sceneComponentType
  }
}

export function beginDrawingLine(layerID, x, y, detectSnap) {
  return {
    type: BEGIN_DRAWING_LINE,
    layerID, x, y, detectSnap
  }
}

export function updateDrawingLine(x, y, detectSnap) {
  return {
    type: UPDATE_DRAWING_LINE,
    x, y, detectSnap
  }
}

export function endDrawingLine(x, y, detectSnap) {
  return {
    type: END_DRAWING_LINE,
    x, y, detectSnap
  }
}

export function beginDraggingLine(layerID, lineID, x, y, detectSnap) {
  return {
    type: BEGIN_DRAGGING_LINE,
    layerID, lineID, x, y, detectSnap
  }
}

export function updateDraggingLine(x, y, detectSnap) {
  return {
    type: UPDATE_DRAGGING_LINE,
    x, y, detectSnap
  }
}

export function endDraggingLine(x, y, detectSnap) {
  return {
    type: END_DRAGGING_LINE,
    x, y, detectSnap
  }
}
