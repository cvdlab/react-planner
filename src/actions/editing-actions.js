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
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: SELECT_TOOL_EDIT
  }
}

export function unselectAll() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: UNSELECT_ALL
  }
}

export function selectLine(layerID, lineID) {
  console.warn('action deprecated (moved to linesActions)');
  return {
    type: SELECT_LINE,
    layerID,
    lineID
  }
}

export function selectHole(layerID, holeID) {
  console.warn('action deprecated (moved to holesActions)');
  return {
    type: SELECT_HOLE,
    layerID,
    holeID
  }
}

export function selectArea(layerID, areaID) {
  console.warn('action deprecated (moved to areaActions)');
  return {
    type: SELECT_AREA,
    layerID,
    areaID
  }
}

export function selectItem(layerID, itemID) {
  console.warn('action deprecated (moved to itemsActions)');
  return {
    type: SELECT_ITEM,
    layerID,
    itemID
  }
}

export function setProperties(properties) {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: SET_PROPERTIES,
    properties
  }
}

export function remove() {
  console.warn('action deprecated (moved to projectActions)');
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: REMOVE,
      catalog
    })
  }
}

export function undo() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: UNDO
  }
}

export function rollback() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: ROLLBACK
  }
}
