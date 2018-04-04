'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.BEGIN_DRAGGING_VERTEX:
      return beginDraggingVertex(state, action.layerID, action.vertexID, action.x, action.y);

    case _constants.UPDATE_DRAGGING_VERTEX:
      return updateDraggingVertex(state, action.x, action.y);

    case _constants.END_DRAGGING_VERTEX:
      return endDraggingVertex(state, action.x, action.y);

    default:
      return state;
  }
};

var _constants = require('../constants');

var _immutable = require('immutable');

var _export = require('../utils/export');

function beginDraggingVertex(state, layerID, vertexID, x, y) {

  var snapElements = _export.SnapSceneUtils.sceneSnapElements(state.scene, new _immutable.List(), state.snapMask);

  return state.merge({
    mode: _constants.MODE_DRAGGING_VERTEX,
    snapElements: snapElements,
    draggingSupport: (0, _immutable.Map)({
      layerID: layerID, vertexID: vertexID
    })
  });
}

function updateDraggingVertex(state, x, y) {
  var draggingSupport = state.draggingSupport,
      snapElements = state.snapElements,
      scene = state.scene;


  var snap = null;
  if (state.snapMask && !state.snapMask.isEmpty()) {
    snap = _export.SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
    if (snap) {
      ;
      var _snap$point = snap.point;
      x = _snap$point.x;
      y = _snap$point.y;
    }
  }

  var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');
  return state.merge({
    activeSnapElement: snap ? snap.snap : null,
    scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x: x, y: y })
  });
}

function endDraggingVertex(state, x, y) {
  var catalog = state.catalog;

  var draggingSupport = state.draggingSupport;

  var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');
  var lineIDs = state.scene.layers.get(layerID).vertices.get(vertexID).lines;

  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {

      lineIDs.forEach(function (lineID) {
        var line = layer.lines.get(lineID);

        if (line) {

          var oldVertexID = void 0;

          if (line.vertices.get(0) === vertexID) {
            // I need to invert vertices
            oldVertexID = line.vertices.get(1);
          } else {
            oldVertexID = line.vertices.get(0);
          }

          var oldVertex = layer.vertices.get(oldVertexID);
          var vertex = layer.vertices.get(vertexID);

          var oldHoles = [];

          var orderedVertices = _export.GeometryUtils.orderVertices([oldVertex, vertex]);

          line.holes.forEach(function (holeID) {
            var hole = layer.holes.get(holeID);
            var oldLineLength = _export.GeometryUtils.pointsDistance(oldVertex.x, oldVertex.y, vertex.x, vertex.y);

            var alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y, orderedVertices[1].x - orderedVertices[0].x);

            var offset = hole.offset;

            if (orderedVertices[1].x === line.vertices.get(1).x && orderedVertices[1].y === line.vertices(1).y) {
              offset = 1 - offset;
            }

            var xp = oldLineLength * offset * Math.cos(alpha) + orderedVertices[0].x;
            var yp = oldLineLength * offset * Math.sin(alpha) + orderedVertices[0].y;

            oldHoles.push({ hole: hole, offsetPosition: { x: xp, y: yp } });
          });

          _export.LayerOperations.mergeEqualsVertices(layer, vertexID);
          _export.LayerOperations.removeLine(layer, lineID);

          if (!_export.GeometryUtils.samePoints(oldVertex, vertex)) {
            _export.LayerOperations.addLineAvoidingIntersections(layer, line.type, oldVertex.x, oldVertex.y, vertex.x, vertex.y, catalog, line.properties, oldHoles);
          }
        }
      });

      _export.LayerOperations.detectAndUpdateAreas(layer, catalog);
    });
  });

  return state.merge({
    mode: _constants.MODE_IDLE,
    draggingSupport: null,
    scene: scene,

    activeSnapElement: null,
    snapElements: new _immutable.List(),
    sceneHistory: _export.history.historyPush(state.sceneHistory, scene)
  });
}