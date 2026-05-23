import {
  SELECT_HOLE,
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  BEGIN_DRAGGING_HOLE,
  UPDATE_DRAGGING_HOLE,
  END_DRAGGING_HOLE
} from '../constants';

export function selectHole(layerID: string, holeID: string) {
  return {
    type: SELECT_HOLE,
    layerID,
    holeID
  };
}

export function selectToolDrawingHole(sceneComponentType: string) {
  return {
    type: SELECT_TOOL_DRAWING_HOLE,
    sceneComponentType
  };
}

export function updateDrawingHole(layerID: string, x: number, y: number) {
  return {
    type: UPDATE_DRAWING_HOLE,
    layerID, x, y
  };
}

export function endDrawingHole(layerID: string, x: number, y: number) {
  return {
    type: END_DRAWING_HOLE,
    layerID, x, y
  };
}

export function beginDraggingHole(layerID: string, holeID: string, x: number, y: number) {
  return {
    type: BEGIN_DRAGGING_HOLE,
    layerID, holeID, x, y
  };
}

export function updateDraggingHole(x: number, y: number) {
  return {
    type: UPDATE_DRAGGING_HOLE,
    x, y
  };
}

export function endDraggingHole(x: number, y: number) {
  return {
    type: END_DRAGGING_HOLE,
    x, y
  };
}
