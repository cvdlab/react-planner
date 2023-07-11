"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLayer = addLayer;
exports.removeLayer = removeLayer;
exports.selectLayer = selectLayer;
exports.setLayerProperties = setLayerProperties;
var _constants = require("../constants");
function selectLayer(layerID) {
  return {
    type: _constants.SELECT_LAYER,
    layerID: layerID
  };
}
function addLayer(name, altitude) {
  return {
    type: _constants.ADD_LAYER,
    name: name,
    altitude: altitude
  };
}
function setLayerProperties(layerID, properties) {
  return {
    type: _constants.SET_LAYER_PROPERTIES,
    layerID: layerID,
    properties: properties
  };
}
function removeLayer(layerID) {
  return {
    type: _constants.REMOVE_LAYER,
    layerID: layerID
  };
}