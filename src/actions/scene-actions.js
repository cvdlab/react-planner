import {SELECT_LAYER, ADD_LAYER, SET_LAYER_PROPERTIES} from '../constants';

export function selectLayer(layerID) {
  return {
    type: SELECT_LAYER,
    layerID
  }
}

export function addLayer(name, altitude) {
  return {
    type: ADD_LAYER,
    name, altitude
  }
}

export function setLayerProperties(layerID, name, altitude) {
  return {
    type: SET_LAYER_PROPERTIES,
    layerID, name, altitude
  }
}
