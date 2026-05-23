import { SELECT_LAYER, ADD_LAYER, SET_LAYER_PROPERTIES, REMOVE_LAYER } from '../constants';

export function selectLayer(layerID: string) {
  return {
    type: SELECT_LAYER,
    layerID
  };
}

export function addLayer(name: string, altitude: number) {
  return {
    type: ADD_LAYER,
    name, altitude
  };
}

export function setLayerProperties(layerID: string, properties: any) {
  return {
    type: SET_LAYER_PROPERTIES,
    layerID,
    properties
  };
}

export function removeLayer(layerID: string) {
  return {
    type: REMOVE_LAYER,
    layerID
  };
}
