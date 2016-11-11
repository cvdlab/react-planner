'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectToolEdit = selectToolEdit;
exports.unselectAll = unselectAll;
exports.selectLine = selectLine;
exports.selectHole = selectHole;
exports.selectArea = selectArea;
exports.selectItem = selectItem;
exports.setProperties = setProperties;
exports.remove = remove;
exports.undo = undo;
exports.rollback = rollback;

var _constants = require('../constants');

function selectToolEdit() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: _constants.SELECT_TOOL_EDIT
  };
}

function unselectAll() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: _constants.UNSELECT_ALL
  };
}

function selectLine(layerID, lineID) {
  console.warn('action deprecated (moved to linesActions)');
  return {
    type: _constants.SELECT_LINE,
    layerID: layerID,
    lineID: lineID
  };
}

function selectHole(layerID, holeID) {
  console.warn('action deprecated (moved to holesActions)');
  return {
    type: _constants.SELECT_HOLE,
    layerID: layerID,
    holeID: holeID
  };
}

function selectArea(layerID, areaID) {
  console.warn('action deprecated (moved to areaActions)');
  return {
    type: _constants.SELECT_AREA,
    layerID: layerID,
    areaID: areaID
  };
}

function selectItem(layerID, itemID) {
  console.warn('action deprecated (moved to itemsActions)');
  return {
    type: _constants.SELECT_ITEM,
    layerID: layerID,
    itemID: itemID
  };
}

function setProperties(properties) {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: _constants.SET_PROPERTIES,
    properties: properties
  };
}

function remove() {
  console.warn('action deprecated (moved to projectActions)');
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: _constants.REMOVE,
      catalog: catalog
    });
  };
}

function undo() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: _constants.UNDO
  };
}

function rollback() {
  console.warn('action deprecated (moved to projectActions)');
  return {
    type: _constants.ROLLBACK
  };
}