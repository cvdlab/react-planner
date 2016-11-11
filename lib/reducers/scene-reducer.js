'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.ADD_LAYER:
      return addLayer(state, action.name, action.altitude);

    case _constants.SELECT_LAYER:
      return selectLayer(state, action.layerID);

    case _constants.SET_LAYER_PROPERTIES:
      return setLayerProperties(state, action.layerID, action.properties);

    default:
      return state;
  }
};

var _constants = require('../constants');

var _models = require('../models');

var _idBroker = require('../utils/id-broker');

var _idBroker2 = _interopRequireDefault(_idBroker);

var _layerOperations = require('../utils/layer-operations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addLayer(state, name, altitude) {
  var layerID = _idBroker2.default.acquireID();
  var layer = new _models.Layer({ id: layerID, name: name, altitude: altitude });
  var scene = state.scene.setIn(['layers', layerID], layer);
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function selectLayer(state, layerID) {
  var scene = state.scene;
  scene = scene.merge({
    selectedLayer: layerID,
    layers: scene.layers.map(function (layer) {
      return (0, _layerOperations.unselectAll)(layer);
    })
  });

  return state.set('scene', scene);
}

function setLayerProperties(state, layerID, properties) {
  var scene = state.scene.mergeIn(['layers', layerID], properties);
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}