import {
  SELECT_TOOL_EDIT,
  SELECT_AREA,
  SELECT_HOLE,
  SELECT_LINE,
  SELECT_ITEM,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE,
  UNDO,
  ROLLBACK
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

export function selectItem(layerID, itemID) {
  return {
    type: SELECT_ITEM,
    layerID,
    itemID
  }
}

export function setProperties(properties) {
  return {
    type: SET_PROPERTIES,
    properties
  }
}

export function remove() {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: REMOVE,
      catalog
    })
  }
}

export function undo() {
  return {
    type: UNDO
  }
}

export function rollback() {
  return {
    type: ROLLBACK
  }
}
