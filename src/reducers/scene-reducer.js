import {
  ADD_LAYER,
  SELECT_LAYER,
  SET_LAYER_PROPERTIES,
  MODE_IDLE,
  OPEN_LAYER_CONFIGURATOR,
  MODE_CONFIGURING_LAYER
} from '../constants';
import {Layer} from '../models';
import IDBroker from '../utils/id-broker';
import {unselectAll} from '../utils/layer-operations';

export default function (state, action) {
  switch (action.type) {
    case ADD_LAYER:
      return addLayer(state, action.name, action.altitude);

    case SELECT_LAYER:
      return selectLayer(state, action.layerID);

    case SET_LAYER_PROPERTIES:
      return setLayerProperties(state, action.layerID, action.properties);

    case OPEN_LAYER_CONFIGURATOR:
      return openLayerConfigurator(state, action.layerID);

    default:
      return state;
  }
}

function addLayer(state, name, altitude) {
  let layerID = IDBroker.acquireID();
  name = name || `layer ${layerID}`;
  altitude = altitude || 0;

  let layer = new Layer({id: layerID, name, altitude});
  let scene = state.scene;
  scene = scene.merge({
    selectedLayer: layerID,
    layers: scene.layers.set(layerID, layer),
  });

  return state.merge({
    mode: MODE_CONFIGURING_LAYER,
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

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function setLayerProperties(state, layerID, properties) {
  let scene = state.scene.mergeIn(['layers', layerID], properties);
  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene),
    mode: MODE_IDLE
  });
}

function openLayerConfigurator(state, layerID) {
  return state.merge({
    scene: state.scene.set('selectedLayer', layerID),
    mode: MODE_CONFIGURING_LAYER
  })
}
