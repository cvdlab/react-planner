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

var _snapScene = require('../utils/snap-scene');

var _snap = require('../utils/snap');

var _layerOperations = require('../utils/layer-operations');

function beginDraggingVertex(state, layerID, vertexID, x, y) {

  var snapElements = (0, _snapScene.sceneSnapElements)(state.scene);

  return state.merge({
    mode: _constants.MODE_DRAGGING_VERTEX,
    snapElements: snapElements,
    draggingSupport: (0, _immutable.Map)({
      layerID: layerID, vertexID: vertexID
    })
  });
}

function updateDraggingVertex(state, x, y) {
  var draggingSupport = state.draggingSupport;
  var snapElements = state.snapElements;
  var scene = state.scene;

  var snap = (0, _snap.nearestSnap)(snapElements, x, y);
  if (snap) {
    ;

    var _snap$point = snap.point;
    x = _snap$point.x;
    y = _snap$point.y;
  }var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');
  return state.merge({
    activeSnapElement: snap ? snap.snap : null,
    scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x: x, y: y })
  });
}

function endDraggingVertex(state, x, y) {
  var _state = state;
  var draggingSupport = _state.draggingSupport;

  var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');

  state = updateDraggingVertex(state, x, y);
  state = state.updateIn(['scene', 'layers', layerID], function (layer) {
    return (0, _layerOperations.mergeEqualsVertices)(layer, vertexID);
  });

  return state.merge({
    mode: _constants.MODE_IDLE,
    draggingSupport: null,

    activeSnapElement: null,
    snapElements: new _immutable.List()
  });
}