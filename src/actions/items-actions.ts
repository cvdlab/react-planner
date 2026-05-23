import {
  SELECT_ITEM,
  SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM,
  BEGIN_DRAGGING_ITEM,
  UPDATE_DRAGGING_ITEM,
  END_DRAGGING_ITEM,
  BEGIN_ROTATING_ITEM,
  UPDATE_ROTATING_ITEM,
  END_ROTATING_ITEM
} from '../constants';

export function selectItem(layerID: string, itemID: string) {
  return {
    type: SELECT_ITEM,
    layerID,
    itemID
  };
}

export function selectToolDrawingItem(sceneComponentType: string) {
  return {
    type: SELECT_TOOL_DRAWING_ITEM,
    sceneComponentType
  };
}

export function updateDrawingItem(layerID: string, x: number, y: number) {
  return {
    type: UPDATE_DRAWING_ITEM,
    layerID, x, y
  };
}

export function endDrawingItem(layerID: string, x: number, y: number) {
  return {
    type: END_DRAWING_ITEM,
    layerID, x, y
  };
}

export function beginDraggingItem(layerID: string, itemID: string, x: number, y: number) {
  return {
    type: BEGIN_DRAGGING_ITEM,
    layerID, itemID, x, y
  };
}

export function updateDraggingItem(x: number, y: number) {
  return {
    type: UPDATE_DRAGGING_ITEM,
    x, y
  };
}

export function endDraggingItem(x: number, y: number) {
  return {
    type: END_DRAGGING_ITEM,
    x, y
  };
}

export function beginRotatingItem(layerID: string, itemID: string, x: number, y: number) {
  return {
    type: BEGIN_ROTATING_ITEM,
    layerID, itemID, x, y
  };
}

export function updateRotatingItem(x: number, y: number) {
  return {
    type: UPDATE_ROTATING_ITEM,
    x, y
  };
}

export function endRotatingItem(x: number, y: number) {
  return {
    type: END_ROTATING_ITEM,
    x, y
  };
}
