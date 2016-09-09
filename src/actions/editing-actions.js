import {
  SELECT_TOOL_EDIT,
  SELECT_AREA,
  SELECT_HOLE,
  SELECT_LINE,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE
} from '../constants';

export function selectToolEdit() {
  return {
    type: SELECT_TOOL_EDIT
  }
}

export function unselectAll() {
  return {
    type: UNSELECT_ALL
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

export function setProperties(prototype, layerID, elementID, properties) {
  return {
    type: SET_PROPERTIES,
    prototype,
    layerID,
    elementID,
    properties
  }
}

export function remove() {
  return {
    type: REMOVE
  }
}
