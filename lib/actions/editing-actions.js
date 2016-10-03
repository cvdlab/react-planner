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

var _constants = require('../constants');

function selectToolEdit() {
  return {
    type: _constants.SELECT_TOOL_EDIT
  };
}

function unselectAll() {
  return {
    type: _constants.UNSELECT_ALL
  };
}

function selectLine(layerID, lineID) {
  return {
    type: _constants.SELECT_LINE,
    layerID: layerID,
    lineID: lineID
  };
}

function selectHole(layerID, holeID) {
  return {
    type: _constants.SELECT_HOLE,
    layerID: layerID,
    holeID: holeID
  };
}

function selectArea(layerID, areaID) {
  return {
    type: _constants.SELECT_AREA,
    layerID: layerID,
    areaID: areaID
  };
}

function selectItem(layerID, itemID) {
  return {
    type: _constants.SELECT_ITEM,
    layerID: layerID,
    itemID: itemID
  };
}

function setProperties(properties) {
  return {
    type: _constants.SET_PROPERTIES,
    properties: properties
  };
}

function remove() {
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: _constants.REMOVE,
      catalog: catalog
    });
  };
}