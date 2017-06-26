import {
  ADD_LAYER,
  SELECT_LAYER,
  SET_LAYER_PROPERTIES,
  MODE_IDLE,
  REMOVE_LAYER
} from '../constants';
import {Layer, Scene} from '../models';
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

    case REMOVE_LAYER:
      return removeLayer(state, action.layerID);

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
  let scene = state.scene;

  let layers = scene.layers.mergeIn([layerID], properties);
  layers = layers.sort((layerA, layerB) =>
    layerA.altitude !== layerB.altitude ? layerB.altitude - layerA.altitude : layerA.order - layerB.order
  );

  scene = scene.set('layers', layers);

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function removeLayer(state, layerID) {
  let scene = state.scene;
  let layers = scene.layers.delete(layerID);

  if (layers.isEmpty()) {
    scene = new Scene();
  } else {
    scene = scene.merge({
      selectedLayer: scene.selectedLayer !== layerID ? scene.selectedLayer : layers.first().id,
      layers,
    });
  }

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}
