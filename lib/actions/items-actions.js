'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectToolDrawingItem = selectToolDrawingItem;
exports.updateDrawingItem = updateDrawingItem;
exports.endDrawingItem = endDrawingItem;

var _constants = require('../constants');

function selectToolDrawingItem(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_ITEM,
    sceneComponentType: sceneComponentType
  };
}

function updateDrawingItem(layerID, x, y) {
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: _constants.UPDATE_DRAWING_ITEM,
      layerID: layerID, x: x, y: y, catalog: catalog
    });
  };
}

function endDrawingItem(layerID, x, y) {
  return function (dispatch, getState, _ref2) {
    var catalog = _ref2.catalog;

    dispatch({
      type: _constants.END_DRAWING_ITEM,
      layerID: layerID, x: x, y: y, catalog: catalog
    });
  };
}