import { SELECT_LINE, SELECT_TOOL_DRAWING_LINE, BEGIN_DRAWING_LINE, UPDATE_DRAWING_LINE, END_DRAWING_LINE, BEGIN_DRAGGING_LINE, UPDATE_DRAGGING_LINE, END_DRAGGING_LINE } from '../constants';

export function selectLine(layerID, lineID) {
  return {
    type: SELECT_LINE,
    layerID: layerID,
    lineID: lineID
  };
}

export function selectToolDrawingLine(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_LINE,
    sceneComponentType: sceneComponentType
  };
}

export function beginDrawingLine(layerID, x, y) {
  return {
    type: BEGIN_DRAWING_LINE,
    layerID: layerID, x: x, y: y
  };
}

export function updateDrawingLine(x, y) {
  return {
    type: UPDATE_DRAWING_LINE,
    x: x, y: y
  };
}

export function endDrawingLine(x, y) {
  return {
    type: END_DRAWING_LINE,
    x: x, y: y
  };
}

export function beginDraggingLine(layerID, lineID, x, y) {
  return {
    type: BEGIN_DRAGGING_LINE,
    layerID: layerID, lineID: lineID, x: x, y: y
  };
}

export function updateDraggingLine(x, y) {
  return {
    type: UPDATE_DRAGGING_LINE,
    x: x, y: y
  };
}

export function endDraggingLine(x, y) {
  return {
    type: END_DRAGGING_LINE,
    x: x, y: y
  };
}