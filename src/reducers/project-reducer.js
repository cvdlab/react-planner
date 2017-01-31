import {Seq, Map, List} from "immutable";
import {
  LOAD_PROJECT,
  NEW_PROJECT,
  OPEN_CATALOG,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT,
  SELECT_TOOL_EDIT,
  MODE_IDLE,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE,
  UNDO,
  ROLLBACK,
  SET_PROJECT_PROPERTIES,
  OPEN_PROJECT_CONFIGURATOR,
  INIT_CATALOG
} from '../constants';

import {State, Scene, Guide, Catalog} from "../models";

import {
  removeLine,
  removeHole,
  detectAndUpdateAreas,
  setProperties as setPropertiesOp,
  select,
  unselect,
  unselectAll as unselectAllOp,
  removeItem,
  loadLayerFromJSON,
  setPropertiesOnSelected
} from '../utils/layer-operations';

export default function (state, action) {

  switch (action.type) {

    case NEW_PROJECT:
      return newProject(state);

    case LOAD_PROJECT:
      return loadProject(state, action.sceneJSON);

    case OPEN_CATALOG:
      return openCatalog(state);

    case SELECT_TOOL_EDIT:
      return state.set('mode', MODE_IDLE);

    case UNSELECT_ALL:
      return unselectAll(state);

    case SET_PROPERTIES:
      return setProperties(state, action.properties);

    case REMOVE:
      return remove(state);

    case UNDO:
      return undo(state);

    case ROLLBACK:
      return rollback(state);

    case SET_PROJECT_PROPERTIES:
      return setProjectProperties(state, action.properties);

    case OPEN_PROJECT_CONFIGURATOR:
      return openProjectConfigurator(state);

    case INIT_CATALOG:
      return initCatalog(state, action.catalog);

    default:
      return state;

  }
}

function openCatalog(state) {
  return rollback(state)
    .set('mode', MODE_VIEWING_CATALOG);
}

function newProject(state) {
  return new State();
}

function loadProject(state, sceneJSON) {
  return new State({scene: sceneJSON, catalog: state.catalog.toJS()});
}


function setProperties(state, properties) {
  let scene = state.scene;
  scene = scene.set('layers', scene.layers.map(layer => setPropertiesOnSelected(layer, properties)));
  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function unselectAll(state) {
  let scene = state.scene;

  scene = scene.update('layers', layer => layer.map(unselectAllOp));

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function remove(state) {
  let scene = state.scene;
  let catalog = state.catalog;

  scene = scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    let {lines: selectedLines, holes: selectedHoles, items: selectedItems} = layer.selected;
    unselectAllOp(layer);
    selectedLines.forEach(lineID => removeLine(layer, lineID));
    selectedHoles.forEach(holeID => removeHole(layer, holeID));
    selectedItems.forEach(itemID => removeItem(layer, itemID));
    detectAndUpdateAreas(layer, catalog);
  }));

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function undo(state) {
  let sceneHistory = state.sceneHistory;

  if (state.scene === sceneHistory.last() && !sceneHistory.size > 1)
    sceneHistory = sceneHistory.pop();

  switch (sceneHistory.size) {
    case 0:
      return state;

    case 1:
      return state.merge({
        mode: MODE_IDLE,
        scene: sceneHistory.last(),
      });

    default:
      return state.merge({
        mode: MODE_IDLE,
        scene: sceneHistory.last(),
        sceneHistory: sceneHistory.pop()
      });
  }
}

export function rollback(state) {
  let sceneHistory = state.sceneHistory;

  if (sceneHistory.isEmpty()) return state;

  let scene = sceneHistory
    .last()
    .update('layers', layer => layer.map(unselectAllOp));

  return state.merge({
    mode: MODE_IDLE,
    scene,
    sceneHistory: state.sceneHistory.push(scene),
    snapElements: new List(),
    activeSnapElement: null,
    drawingSupport: new Map(),
    draggingSupport: new Map(),
    rotatingSupport: new Map(),
  });
}

function setProjectProperties(state, properties) {
  let scene = state.scene.merge(properties);
  return state.merge({
    mode: MODE_IDLE,
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}


function openProjectConfigurator(state) {
  return state.merge({
    mode: MODE_CONFIGURING_PROJECT,
  });
}

function initCatalog(state, catalog) {
  return state.set('catalog', new Catalog(catalog));
}
