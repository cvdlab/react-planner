import { BEGIN_DRAGGING_VERTEX, UPDATE_DRAGGING_VERTEX, END_DRAGGING_VERTEX } from '../constants';

export function beginDraggingVertex(layerID, vertexID, x, y, detectSnap) {
  return {
    type: BEGIN_DRAGGING_VERTEX,
    layerID: layerID, vertexID: vertexID, x: x, y: y, detectSnap: detectSnap
  };
}

export function updateDraggingVertex(x, y, detectSnap) {
  return {
    type: UPDATE_DRAGGING_VERTEX,
    x: x, y: y, detectSnap: detectSnap
  };
}

export function endDraggingVertex(x, y, detectSnap) {
  return {
    type: END_DRAGGING_VERTEX,
    x: x, y: y, detectSnap: detectSnap

  };
}