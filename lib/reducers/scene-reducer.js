'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {

  switch (action.type) {
    case _constants.ADD_LAYER:
      return state.set('scene', addLayer(state.scene, action.name, action.altitude));

    case _constants.SELECT_LAYER:
      return state.merge({
        'scene': selectLayer(state.scene, action.layerID)
      });

    case _constants.SET_LAYER_PROPERTIES:
      return state.set('scene', setLayerProperties(state.scene, action.layerID, action.properties));

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

function addLayer(scene, name, altitude) {
  var layerID = _idBroker2.default.acquireID();
  var layer = new _models.Layer({ id: layerID, name: name, altitude: altitude });
  return scene.setIn(['layers', layerID], layer);
}

function selectLayer(scene, layerID) {
  return scene.merge({
    'selectedLayer': layerID,
    'layers': scene.layers.map(function (layer) {
      return (0, _layerOperations.unselectAll)(layer);
    })
  });
}

function setLayerProperties(scene, layerID, properties) {
  return scene.mergeIn(['layers', layerID], properties);
}