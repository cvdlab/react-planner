'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectToolDrawingItem = selectToolDrawingItem;
exports.updateDrawingItem = updateDrawingItem;
exports.endDrawingItem = endDrawingItem;
exports.beginDraggingItem = beginDraggingItem;
exports.updateDraggingItem = updateDraggingItem;
exports.endDraggingItem = endDraggingItem;

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

function beginDraggingItem(layerID, itemID, x, y) {
  return function (dispatch, getState, _ref3) {
    var catalog = _ref3.catalog;

    dispatch({
      type: _constants.BEGIN_DRAGGING_ITEM,
      layerID: layerID, itemID: itemID, x: x, y: y, catalog: catalog
    });
  };
}

function updateDraggingItem(x, y) {
  return function (dispatch, getState, _ref4) {
    var catalog = _ref4.catalog;

    dispatch({
      type: _constants.UPDATE_DRAGGING_ITEM,
      x: x, y: y, catalog: catalog
    });
  };
}

function endDraggingItem(x, y) {
  return function (dispatch, getState, _ref5) {
    var catalog = _ref5.catalog;

    dispatch({
      type: _constants.END_DRAGGING_ITEM,
      x: x, y: y, catalog: catalog
    });
  };
}