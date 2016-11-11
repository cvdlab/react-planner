'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectLine = selectLine;
exports.selectToolDrawingLine = selectToolDrawingLine;
exports.beginDrawingLine = beginDrawingLine;
exports.updateDrawingLine = updateDrawingLine;
exports.endDrawingLine = endDrawingLine;
exports.beginDraggingLine = beginDraggingLine;
exports.updateDraggingLine = updateDraggingLine;
exports.endDraggingLine = endDraggingLine;

var _constants = require('../constants');

function selectLine(layerID, lineID) {
  return {
    type: _constants.SELECT_LINE,
    layerID: layerID,
    lineID: lineID
  };
}

function selectToolDrawingLine(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_LINE,
    sceneComponentType: sceneComponentType
  };
}

function beginDrawingLine(layerID, x, y) {
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: _constants.BEGIN_DRAWING_LINE,
      layerID: layerID, x: x, y: y, catalog: catalog
    });
  };
}

function updateDrawingLine(x, y) {
  return function (dispatch, getState, _ref2) {
    var catalog = _ref2.catalog;

    dispatch({
      type: _constants.UPDATE_DRAWING_LINE,
      x: x, y: y, catalog: catalog
    });
  };
}

function endDrawingLine(x, y) {
  return function (dispatch, getState, _ref3) {
    var catalog = _ref3.catalog;

    dispatch({
      type: _constants.END_DRAWING_LINE,
      x: x, y: y, catalog: catalog
    });
  };
}

function beginDraggingLine(layerID, lineID, x, y) {
  return function (dispatch, getState, _ref4) {
    var catalog = _ref4.catalog;

    dispatch({
      type: _constants.BEGIN_DRAGGING_LINE,
      layerID: layerID, lineID: lineID, x: x, y: y, catalog: catalog
    });
  };
}

function updateDraggingLine(x, y) {
  return function (dispatch, getState, _ref5) {
    var catalog = _ref5.catalog;

    dispatch({
      type: _constants.UPDATE_DRAGGING_LINE,
      x: x, y: y, catalog: catalog
    });
  };
}

function endDraggingLine(x, y) {
  return function (dispatch, getState, _ref6) {
    var catalog = _ref6.catalog;

    dispatch({
      type: _constants.END_DRAGGING_LINE,
      x: x, y: y, catalog: catalog
    });
  };
}