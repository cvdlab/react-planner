'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectHole = selectHole;
exports.selectToolDrawingHole = selectToolDrawingHole;
exports.updateDrawingHole = updateDrawingHole;
exports.endDrawingHole = endDrawingHole;
exports.beginDraggingHole = beginDraggingHole;
exports.updateDraggingHole = updateDraggingHole;
exports.endDraggingHole = endDraggingHole;

var _constants = require('../constants');

function selectHole(layerID, holeID) {
  return {
    type: _constants.SELECT_HOLE,
    layerID: layerID,
    holeID: holeID
  };
}

function selectToolDrawingHole(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_HOLE,
    sceneComponentType: sceneComponentType
  };
}

function updateDrawingHole(layerID, x, y) {
  return {
    type: _constants.UPDATE_DRAWING_HOLE,
    layerID: layerID, x: x, y: y
  };
}

function endDrawingHole(layerID, x, y) {
  return {
    type: _constants.END_DRAWING_HOLE,
    layerID: layerID, x: x, y: y
  };
}

function beginDraggingHole(layerID, holeID, x, y) {
  return {
    type: _constants.BEGIN_DRAGGING_HOLE,
    layerID: layerID, holeID: holeID, x: x, y: y
  };
}

function updateDraggingHole(x, y) {
  return {
    type: _constants.UPDATE_DRAGGING_HOLE,
    x: x, y: y
  };
}

function endDraggingHole(x, y) {
  return {
    type: _constants.END_DRAGGING_HOLE,
    x: x, y: y
  };
}