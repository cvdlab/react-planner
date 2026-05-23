import { BEGIN_DRAGGING_VERTEX, UPDATE_DRAGGING_VERTEX, END_DRAGGING_VERTEX } from '../constants';

export function beginDraggingVertex(layerID: string, vertexID: string, x: number, y: number, snapMask: number) {
  return {
    type: BEGIN_DRAGGING_VERTEX,
    layerID, vertexID, x, y, snapMask
  };
}

export function updateDraggingVertex(x: number, y: number, snapMask: number) {
  return {
    type: UPDATE_DRAGGING_VERTEX,
    x, y, snapMask
  };
}

export function endDraggingVertex(x: number, y: number, snapMask: number) {
  return {
    type: END_DRAGGING_VERTEX,
    x, y, snapMask
  };
}
