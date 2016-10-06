'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectToolDrawingHole = selectToolDrawingHole;
exports.updateDrawingHole = updateDrawingHole;
exports.endDrawingHole = endDrawingHole;
exports.beginDraggingHole = beginDraggingHole;
exports.updateDraggingHole = updateDraggingHole;
exports.endDraggingHole = endDraggingHole;

var _constants = require('../constants');

function selectToolDrawingHole(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_HOLE,
    sceneComponentType: sceneComponentType
  };
}

function updateDrawingHole(layerID, x, y) {
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: _constants.UPDATE_DRAWING_HOLE,
      layerID: layerID, x: x, y: y, catalog: catalog
    });
  };
}

function endDrawingHole(layerID, x, y) {
  return function (dispatch, getState, _ref2) {
    var catalog = _ref2.catalog;

    dispatch({
      type: _constants.END_DRAWING_HOLE,
      layerID: layerID, x: x, y: y, catalog: catalog
    });
  };
}

function beginDraggingHole(layerID, holeID, x, y) {
  return function (dispatch, getState, _ref3) {
    var catalog = _ref3.catalog;

    dispatch({
      type: _constants.BEGIN_DRAGGING_HOLE,
      layerID: layerID, holeID: holeID, x: x, y: y, catalog: catalog
    });
  };
}

function updateDraggingHole(x, y) {
  return function (dispatch, getState, _ref4) {
    var catalog = _ref4.catalog;

    dispatch({
      type: _constants.UPDATE_DRAGGING_HOLE,
      x: x, y: y, catalog: catalog
    });
  };
}

function endDraggingHole(x, y) {
  return function (dispatch, getState, _ref5) {
    var catalog = _ref5.catalog;

    dispatch({
      type: _constants.END_DRAGGING_HOLE,
      x: x, y: y, catalog: catalog
    });
  };
}