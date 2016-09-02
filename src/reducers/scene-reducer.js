import {ADD_LAYER, SELECT_LAYER, SET_LAYER_PROPERTIES} from '../constants';
import {Layer} from '../models';
import IDBroker from '../utils/id-broker';

export default function (state, action) {

  switch (action.type) {
    case ADD_LAYER:
      return state.set('scene', addLayer(state.scene, action.name, action.altitude));

    case SELECT_LAYER:
      return state.set('scene', selectLayer(state.scene, action.layerID));

    case SET_LAYER_PROPERTIES:
      return state.set('scene', setLayerProperties(state.scene, action.layerID, action.properties));

    default:
      return state;
  }
}

function addLayer(scene, name, altitude) {
  let layerID = IDBroker.acquireID();
  let layer = new Layer({id: layerID, name, altitude});
  return scene.setIn(['layers', layerID], layer);
}

function selectLayer(scene, layerID) {
  return scene.set('selectedLayer', layerID);
}

function setLayerProperties(scene, layerID, properties) {
  return scene.mergeIn(['layers', layerID], properties);
}
