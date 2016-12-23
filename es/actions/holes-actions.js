import { SELECT_HOLE, SELECT_TOOL_DRAWING_HOLE, UPDATE_DRAWING_HOLE, END_DRAWING_HOLE, BEGIN_DRAGGING_HOLE, UPDATE_DRAGGING_HOLE, END_DRAGGING_HOLE } from '../constants';

export function selectHole(layerID, holeID) {
  return {
    type: SELECT_HOLE,
    layerID: layerID,
    holeID: holeID
  };
}

export function selectToolDrawingHole(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_HOLE,
    sceneComponentType: sceneComponentType
  };
}

export function updateDrawingHole(layerID, x, y) {
  return {
    type: UPDATE_DRAWING_HOLE,
    layerID: layerID, x: x, y: y
  };
}

export function endDrawingHole(layerID, x, y) {
  return {
    type: END_DRAWING_HOLE,
    layerID: layerID, x: x, y: y
  };
}

export function beginDraggingHole(layerID, holeID, x, y) {
  return {
    type: BEGIN_DRAGGING_HOLE,
    layerID: layerID, holeID: holeID, x: x, y: y
  };
}

export function updateDraggingHole(x, y) {
  return {
    type: UPDATE_DRAGGING_HOLE,
    x: x, y: y
  };
}

export function endDraggingHole(x, y) {
  return {
    type: END_DRAGGING_HOLE,
    x: x, y: y
  };
}