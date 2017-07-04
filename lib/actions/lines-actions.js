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

function beginDrawingLine(layerID, x, y, snapMask) {
  return {
    type: _constants.BEGIN_DRAWING_LINE,
    layerID: layerID, x: x, y: y, snapMask: snapMask
  };
}

function updateDrawingLine(x, y, snapMask) {
  return {
    type: _constants.UPDATE_DRAWING_LINE,
    x: x, y: y, snapMask: snapMask
  };
}

function endDrawingLine(x, y, snapMask) {
  return {
    type: _constants.END_DRAWING_LINE,
    x: x, y: y, snapMask: snapMask
  };
}

function beginDraggingLine(layerID, lineID, x, y, snapMask) {
  return {
    type: _constants.BEGIN_DRAGGING_LINE,
    layerID: layerID, lineID: lineID, x: x, y: y, snapMask: snapMask
  };
}

function updateDraggingLine(x, y, snapMask) {
  return {
    type: _constants.UPDATE_DRAGGING_LINE,
    x: x, y: y, snapMask: snapMask
  };
}

function endDraggingLine(x, y, snapMask) {
  return {
    type: _constants.END_DRAGGING_LINE,
    x: x, y: y, snapMask: snapMask
  };
}