import { SELECT_TOOL_EDIT, SELECT_AREA, SELECT_HOLE, SELECT_LINE, SELECT_ITEM, UNSELECT_ALL, SET_PROPERTIES, REMOVE, UNDO, ROLLBACK } from '../constants';

export function selectToolEdit() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: SELECT_TOOL_EDIT
  };
}

export function unselectAll() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: UNSELECT_ALL
  };
}

export function selectLine(layerID, lineID) {
  console.warn('action deprecated (moved to linesActions)');
  return {
    type: SELECT_LINE,
    layerID: layerID,
    lineID: lineID
  };
}

export function selectHole(layerID, holeID) {
  console.warn('action deprecated (moved to holesActions)');
  return {
    type: SELECT_HOLE,
    layerID: layerID,
    holeID: holeID
  };
}

export function selectArea(layerID, areaID) {
  console.warn('action deprecated (moved to areaActions)');
  return {
    type: SELECT_AREA,
    layerID: layerID,
    areaID: areaID
  };
}

export function selectItem(layerID, itemID) {
  console.warn('action deprecated (moved to itemsActions)');
  return {
    type: SELECT_ITEM,
    layerID: layerID,
    itemID: itemID
  };
}

export function setProperties(properties) {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: SET_PROPERTIES,
    properties: properties
  };
}

export function remove() {
  console.warn('action deprecated (moved to projectActions)');
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: REMOVE,
      catalog: catalog
    });
  };
}

export function undo() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: UNDO
  };
}

export function rollback() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: ROLLBACK
  };
}