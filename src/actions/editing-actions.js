import {
  SELECT_TOOL_EDIT,
  SELECT_AREA,
  SELECT_HOLE,
  SELECT_LINE
} from '../constants';

export function selectToolEdit() {
  return {
    type: SELECT_TOOL_EDIT
  }
}

export function selectLine(layerID, lineID) {
  return {
    type: SELECT_LINE,
    layerID,
    lineID
  }
}

export function selectHole(layerID, holeID) {
  return {
    type: SELECT_HOLE,
    layerID,
    holeID
  }
}

export function selectArea(layerID, areaID) {
  return {
    type: SELECT_AREA,
    layerID,
    areaID
  }
}


