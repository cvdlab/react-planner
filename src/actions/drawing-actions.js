import {
  SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE,
  END_DRAWING_LINE,
  SELECT_TOOL_DRAWING_HOLE,
  BEGIN_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE
} from '../constants';


export function selectToolDrawingLine(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_LINE,
    sceneComponentType
  }
}

export function beginDrawingLine(x, y) {
  return {
    type: BEGIN_DRAWING_LINE,
    x, y
  }
}

export function updateDrawingLine(x, y) {
  return {
    type: UPDATE_DRAWING_LINE,
    x, y
  }
}

export function endDrawingLine(x, y) {
  return {
    type: END_DRAWING_LINE,
    x, y
  }
}


export function selectToolDrawingHole(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_HOLE,
    sceneComponentType
  }
}

export function beginDrawingHole(x, y) {
  return {
    type: BEGIN_DRAWING_HOLE,
    x, y
  }
}

export function updateDrawingHole(x, y) {
  return {
    type: UPDATE_DRAWING_HOLE,
    x, y
  }
}

export function endDrawingHole(x, y) {
  return {
    type: END_DRAWING_HOLE,
    x, y
  }
}
