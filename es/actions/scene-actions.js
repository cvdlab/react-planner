import { SELECT_LAYER, ADD_LAYER, SET_LAYER_PROPERTIES, OPEN_LAYER_CONFIGURATOR, REMOVE_LAYER } from '../constants';

export function selectLayer(layerID) {
  return {
    type: SELECT_LAYER,
    layerID: layerID
  };
}

export function openLayerConfigurator(layerID) {
  return {
    type: OPEN_LAYER_CONFIGURATOR,
    layerID: layerID
  };
}

export function addLayer(name, altitude) {
  return {
    type: ADD_LAYER,
    name: name, altitude: altitude
  };
}

export function setLayerProperties(layerID, properties) {
  return {
    type: SET_LAYER_PROPERTIES,
    layerID: layerID,
    properties: properties
  };
}

export function removeLayer(layerID) {
  return {
    type: REMOVE_LAYER,
    layerID: layerID
  };
}