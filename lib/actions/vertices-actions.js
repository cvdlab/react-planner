'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginDraggingVertex = beginDraggingVertex;
exports.updateDraggingVertex = updateDraggingVertex;
exports.endDraggingVertex = endDraggingVertex;

var _constants = require('../constants');

function beginDraggingVertex(layerID, vertexID, x, y, detectSnap) {
  return {
    type: _constants.BEGIN_DRAGGING_VERTEX,
    layerID: layerID, vertexID: vertexID, x: x, y: y, detectSnap: detectSnap
  };
}

function updateDraggingVertex(x, y, detectSnap) {
  return {
    type: _constants.UPDATE_DRAGGING_VERTEX,
    x: x, y: y, detectSnap: detectSnap
  };
}

function endDraggingVertex(x, y, detectSnap) {
  return {
    type: _constants.END_DRAGGING_VERTEX,
    x: x, y: y, detectSnap: detectSnap

  };
}