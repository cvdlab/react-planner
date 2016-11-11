'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_AREA:
      return selectArea(state, action.layerID, action.areaID);

    default:
      return state;
  }
};

var _layerOperations = require('../utils/layer-operations');

var _constants = require('../constants');

function selectArea(state, layerID, areaID) {
  var scene = state.scene;

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var area = layer.getIn(['areas', areaID]);
      (0, _layerOperations.unselectAll)(layer);
      (0, _layerOperations.select)(layer, 'areas', areaID);
      area.vertices.forEach(function (vertexID) {
        return (0, _layerOperations.select)(layer, 'vertices', vertexID);
      });
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}