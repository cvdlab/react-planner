import {BEGIN_DRAGGING_VERTEX, UPDATE_DRAGGING_VERTEX, END_DRAGGING_VERTEX} from '../constants'

export function beginDraggingVertex(layerID, vertexID, x, y) {
  return {
    type: BEGIN_DRAGGING_VERTEX,
    layerID, vertexID, x, y
  }
}

export function updateDraggingVertex(x, y) {
  return {
    type: UPDATE_DRAGGING_VERTEX,
    x, y
  }
}

export function endDraggingVertex(x, y) {
  return {
    type: END_DRAGGING_VERTEX,
    x, y,

  }
}
