'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectItem = selectItem;
exports.selectToolDrawingItem = selectToolDrawingItem;
exports.updateDrawingItem = updateDrawingItem;
exports.endDrawingItem = endDrawingItem;
exports.beginDraggingItem = beginDraggingItem;
exports.updateDraggingItem = updateDraggingItem;
exports.endDraggingItem = endDraggingItem;
exports.beginRotatingItem = beginRotatingItem;
exports.updateRotatingItem = updateRotatingItem;
exports.endRotatingItem = endRotatingItem;

var _constants = require('../constants');

function selectItem(layerID, itemID) {
  return {
    type: _constants.SELECT_ITEM,
    layerID: layerID,
    itemID: itemID
  };
}

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

function beginRotatingItem(layerID, itemID, x, y) {
  return function (dispatch, getState, _ref6) {
    var catalog = _ref6.catalog;

    dispatch({
      type: _constants.BEGIN_ROTATING_ITEM,
      layerID: layerID, itemID: itemID, x: x, y: y, catalog: catalog
    });
  };
}

function updateRotatingItem(x, y) {
  return function (dispatch, getState, _ref7) {
    var catalog = _ref7.catalog;

    dispatch({
      type: _constants.UPDATE_ROTATING_ITEM,
      x: x, y: y, catalog: catalog
    });
  };
}

function endRotatingItem(x, y) {
  return function (dispatch, getState, _ref8) {
    var catalog = _ref8.catalog;

    dispatch({
      type: _constants.END_ROTATING_ITEM,
      x: x, y: y, catalog: catalog
    });
  };
}