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

function beginDrawingLine(layerID, x, y, detectSnap) {
  return {
    type: _constants.BEGIN_DRAWING_LINE,
    layerID: layerID, x: x, y: y, detectSnap: detectSnap
  };
}

function updateDrawingLine(x, y, detectSnap) {
  return {
    type: _constants.UPDATE_DRAWING_LINE,
    x: x, y: y, detectSnap: detectSnap
  };
}

function endDrawingLine(x, y, detectSnap) {
  return {
    type: _constants.END_DRAWING_LINE,
    x: x, y: y, detectSnap: detectSnap
  };
}

function beginDraggingLine(layerID, lineID, x, y, detectSnap) {
  return {
    type: _constants.BEGIN_DRAGGING_LINE,
    layerID: layerID, lineID: lineID, x: x, y: y, detectSnap: detectSnap
  };
}

function updateDraggingLine(x, y, detectSnap) {
  return {
    type: _constants.UPDATE_DRAGGING_LINE,
    x: x, y: y, detectSnap: detectSnap
  };
}

function endDraggingLine(x, y, detectSnap) {
  return {
    type: _constants.END_DRAGGING_LINE,
    x: x, y: y, detectSnap: detectSnap
  };
}