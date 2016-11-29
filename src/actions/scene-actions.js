import {SELECT_LAYER, ADD_LAYER, SET_LAYER_PROPERTIES, SET_SCENE_PROPERTIES} from '../constants';

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

export function setLayerProperties(layerID, properties) {
  return {
    type: SET_LAYER_PROPERTIES,
    layerID,
    properties
  }
}


export function setSceneProperties(properties) {
  return {
    type: SET_SCENE_PROPERTIES,
    properties
  }
}
