import { Map, List } from 'immutable';
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
  SET_ITEMS_ATTRIBUTES,
  SET_LINES_ATTRIBUTES,
  SET_HOLES_ATTRIBUTES,
  REMOVE,
  UNDO,
  ROLLBACK,
  SET_PROJECT_PROPERTIES,
  OPEN_PROJECT_CONFIGURATOR,
  INIT_CATALOG,
  UPDATE_MOUSE_COORDS,
  UPDATE_ZOOM_SCALE,
  TOGGLE_SNAP,
  CHANGE_CATALOG_PAGE,
  GO_BACK_TO_CATALOG_PAGE,
  THROW_ERROR,
  THROW_WARNING,
  COPY_PROPERTIES,
  PASTE_PROPERTIES,
  PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY
} from '../constants';

import { State, Scene, Guide, Catalog } from '../models';

import {
  LayerOperations,
  history
} from '../utils/export';

export default function (state, action) {

  switch (action.type) {
    case NEW_PROJECT:
      return newProject(state);

    case LOAD_PROJECT:
      return loadProject(state, action.sceneJSON);

    case OPEN_CATALOG:
      return openCatalog(state);

    case CHANGE_CATALOG_PAGE:
      return state.setIn(['catalog', 'page'], action.newPage)
        .updateIn(['catalog', 'path'], path => path.push(action.oldPage));

    case GO_BACK_TO_CATALOG_PAGE:
      let path = state.catalog.path;
      let pageIndex = state.catalog.path.findIndex(page => page === action.newPage);
      return state.setIn(['catalog', 'page'], action.newPage)
        .updateIn(['catalog', 'path'], path => path.take(pageIndex));

    case SELECT_TOOL_EDIT:
      return state.set('mode', MODE_IDLE);

    case UNSELECT_ALL:
      return unselectAll(state);

    case SET_PROPERTIES:
      return setProperties(state, action.properties);

    case SET_ITEMS_ATTRIBUTES:
      return setItemsAttributes(state, action.itemsAttributes);

    case SET_LINES_ATTRIBUTES:
      return setLinesAttributes(state, action.linesAttributes);

    case SET_HOLES_ATTRIBUTES:
      return setHolesAttributes(state, action.holesAttributes);

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

    case UPDATE_MOUSE_COORDS:
      return updateMouseCoord(state, action.coords);

    case UPDATE_ZOOM_SCALE:
      return updateZoomScale(state, action.scale);

    case TOGGLE_SNAP:
      return toggleSnap(state, action.mask);

    case THROW_ERROR:
      return throwError(state, action.error);

    case THROW_WARNING:
      return throwWarning(state, action.warning);

    case COPY_PROPERTIES:
      return copyProperties(state, action.properties);

    case PASTE_PROPERTIES:
      return pasteProperties(state);

    case PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY:
      return pushLastSelectedCatalogElementToHistory(state, action.element);

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
  return new State({ scene: sceneJSON, catalog: state.catalog.toJS() });
}

function setProperties(state, properties) {
  let scene = state.scene;
  scene = scene.set('layers', scene.layers.map(layer => LayerOperations.setPropertiesOnSelected(layer, properties)));
  return state.merge({
    scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function updateProperties(state, properties) {
  let scene = state.scene;
  scene = scene.set('layers', scene.layers.map(layer => LayerOperations.updatePropertiesOnSelected(layer, properties)));
  return state.merge({
    scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function setItemsAttributes(state, attributes) {
  let scene = state.scene;
  scene = scene.set('layers', scene.layers.map(layer => LayerOperations.setAttributesOnSelected(layer, attributes, state.catalog)));
  return state.merge({
    scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function setLinesAttributes(state, attributes) {
  let scene = state.scene;

  scene = scene.set('layers', scene.layers.map(layer => LayerOperations.setAttributesOnSelected(layer, attributes, state.catalog)));

  return state.merge({
    scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function setHolesAttributes(state, attributes) {
  let scene = state.scene;
  scene = scene.set('layers', scene.layers.map(layer => LayerOperations.setAttributesOnSelected(layer, attributes, state.catalog)));
  return state.merge({
    scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function unselectAll(state) {
  let scene = state.scene;

  scene = scene.update('layers', layer => layer.map(unselectAllOp));

  return state.merge({
    scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function remove(state) {
  let scene = state.scene;
  let catalog = state.catalog;

  scene = scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    let { lines: selectedLines, holes: selectedHoles, items: selectedItems } = layer.selected;
    unselectAllOp(layer);
    selectedLines.forEach(lineID => LayerOperations.removeLine(layer, lineID));
    selectedHoles.forEach(holeID => LayerOperations.removeHole(layer, holeID));
    selectedItems.forEach(itemID => LayerOperations.removeItem(layer, itemID));
    LayerOperations.detectAndUpdateAreas(layer, catalog);
  }));

  return state.merge({
    scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function undo(state) {
  let sceneHistory = state.sceneHistory;
  if (state.scene === sceneHistory.last && sceneHistory.list.size > 1) {
    sceneHistory = history.historyPop(sceneHistory);
  }

  return state.merge({
    mode: MODE_IDLE,
    scene: sceneHistory.last,
    sceneHistory: history.historyPop(sceneHistory)
  });
}

export function rollback(state) {
  let sceneHistory = state.sceneHistory;

  if (!sceneHistory.last || sceneHistory.list.isEmpty()) {
    return state;
  }

  let scene = sceneHistory
    .last
    .update('layers', layer => layer.map(unselectAllOp));

  return state.merge({
    mode: MODE_IDLE,
    scene,
    sceneHistory: history.historyPush(sceneHistory, scene),
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
    sceneHistory: history.historyPush(state.sceneHistory, scene)
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

function updateMouseCoord(state, coords) {
  return state.set('mouse', new Map(coords));
}

function updateZoomScale(state, scale) {
  return state.set('zoom', scale);
}

function toggleSnap(state, mask) {
  return state.set('snapMask', mask);
}

function throwError(state, error) {
  return state.set('errors', state.get('errors').push({
    date: Date.now(),
    error
  }));
}

const throwWarning = (state, warning) => state.set('warnings', state.get('warnings').push({
  date: Date.now(),
  warning
}));

const copyProperties = (state, properties) => state.set('clipboardProperties', properties.toJS());

const pasteProperties = (state) => updateProperties(state, state.get('clipboardProperties'));

const pushLastSelectedCatalogElementToHistory = (state, element) => {
  let currHistory = state.selectedElementsHistory;

  let previousPosition = currHistory.findIndex(el => el.name === element.name);
  if (previousPosition !== -1) {
    currHistory = currHistory.splice(previousPosition, 1);
  }
  currHistory = currHistory.splice(0, 0, element);

  return state.set('selectedElementsHistory', currHistory);
};
