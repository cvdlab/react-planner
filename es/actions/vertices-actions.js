import { BEGIN_DRAGGING_VERTEX, UPDATE_DRAGGING_VERTEX, END_DRAGGING_VERTEX } from '../constants';

export function beginDraggingVertex(layerID, vertexID, x, y, snapMask) {
  return {
    type: BEGIN_DRAGGING_VERTEX,
    layerID: layerID, vertexID: vertexID, x: x, y: y, snapMask: snapMask
  };
}

export function updateDraggingVertex(x, y, snapMask) {
  return {
    type: UPDATE_DRAGGING_VERTEX,
    x: x, y: y, snapMask: snapMask
  };
}

export function endDraggingVertex(x, y, snapMask) {
  return {
    type: END_DRAGGING_VERTEX,
    x: x, y: y, snapMask: snapMask

  };
}