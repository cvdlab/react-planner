'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginDraggingVertex = beginDraggingVertex;
exports.updateDraggingVertex = updateDraggingVertex;
exports.endDraggingVertex = endDraggingVertex;

var _constants = require('../constants');

function beginDraggingVertex(layerID, vertexID, x, y) {
  return {
    type: _constants.BEGIN_DRAGGING_VERTEX,
    layerID: layerID, vertexID: vertexID, x: x, y: y
  };
}

function updateDraggingVertex(x, y) {
  return {
    type: _constants.UPDATE_DRAGGING_VERTEX,
    x: x, y: y
  };
}

function endDraggingVertex(x, y) {
  return {
    type: _constants.END_DRAGGING_VERTEX,
    x: x, y: y

  };
}