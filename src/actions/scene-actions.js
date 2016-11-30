import {SELECT_LAYER, ADD_LAYER, SET_LAYER_PROPERTIES, OPEN_LAYER_CONFIGURATOR} from '../constants';

export function selectLayer(layerID) {
  return {
    type: SELECT_LAYER,
    layerID
  }
}

export function openLayerConfigurator(layerID){
  return {
    type: OPEN_LAYER_CONFIGURATOR,
    layerID
  }
}

export function addLayer(name, altitude) {
  return {
    type: ADD_LAYER,
    name, altitude
  }
}

export function setLayerProperties(layerID, properties) {
  return {
    type: SET_LAYER_PROPERTIES,
    layerID,
    properties
  }
}


