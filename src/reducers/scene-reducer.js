import {ADD_LAYER, SELECT_LAYER, SET_LAYER_PROPERTIES, MODE_IDLE} from '../constants';
import {Layer} from '../models';
import IDBroker from '../utils/id-broker';
import {unselectAll} from '../utils/layer-operations';

export default function (state, action) {
  switch (action.type) {
    case ADD_LAYER:
      return addLayer(state, action.name, action.altitude);

    case SELECT_LAYER:
      return  selectLayer(state, action.layerID);

    case SET_LAYER_PROPERTIES:
      return setLayerProperties(state, action.layerID, action.properties);

    default:
      return state;
  }
}

function addLayer(state, name, altitude) {
  let layerID = IDBroker.acquireID();
  let layer = new Layer({id: layerID, name, altitude});
  let scene = state.scene.setIn(['layers', layerID], layer);
  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function selectLayer(state, layerID) {
  let scene = state.scene;
  scene = scene.merge({
    selectedLayer: layerID,
    layers: scene.layers.map(layer => unselectAll(layer))
  });

  return state.set('scene', scene);
}

function setLayerProperties(state, layerID, properties) {
  let scene = state.scene.mergeIn(['layers', layerID], properties);
  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}
