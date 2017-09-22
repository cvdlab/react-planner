import { Seq, Map, List } from "immutable";
import { LOAD_PROJECT, NEW_PROJECT, OPEN_CATALOG, MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT, SELECT_TOOL_EDIT, MODE_IDLE, UNSELECT_ALL, SET_PROPERTIES, SET_ITEMS_ATTRIBUTES, SET_LINES_ATTRIBUTES, SET_HOLES_ATTRIBUTES, REMOVE, UNDO, ROLLBACK, SET_PROJECT_PROPERTIES, OPEN_PROJECT_CONFIGURATOR, INIT_CATALOG, UPDATE_MOUSE_COORDS, UPDATE_ZOOM_SCALE, TOGGLE_SNAP, CHANGE_CATALOG_PAGE, GO_BACK_TO_CATALOG_PAGE, THROW_ERROR, THROW_WARNING, COPY_PROPERTIES, PASTE_PROPERTIES, PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY } from '../constants';

import { State, Scene, Guide, Catalog } from "../models";

import { removeLine, removeHole, detectAndUpdateAreas, setProperties as setPropertiesOp, setItemsAttributes as setItemsAttributesOp, setLinesAttributes as setLinesAttributesOp, setHolesAttributes as setHolesAttributesOp, select, unselect, unselectAll as unselectAllOp, removeItem, loadLayerFromJSON, setPropertiesOnSelected, updatePropertiesOnSelected, setAttributesOnSelected } from '../utils/layer-operations';

export default function (state, action) {

  switch (action.type) {
    case NEW_PROJECT:
      return newProject(state);

    case LOAD_PROJECT:
      return loadProject(state, action.sceneJSON);

    case OPEN_CATALOG:
      return openCatalog(state);

    case CHANGE_CATALOG_PAGE:
      return state.setIn(['catalog', 'page'], action.newPage).updateIn(['catalog', 'path'], function (path) {
        return path.push(action.oldPage);
      });

    case GO_BACK_TO_CATALOG_PAGE:
      var path = state.catalog.path;
      var pageIndex = state.catalog.path.findIndex(function (page) {
        return page === action.newPage;
      });
      return state.setIn(['catalog', 'page'], action.newPage).updateIn(['catalog', 'path'], function (path) {
        return path.take(pageIndex);
      });

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
  return rollback(state).set('mode', MODE_VIEWING_CATALOG);
}

function newProject(state) {
  return new State();
}

function loadProject(state, sceneJSON) {
  return new State({ scene: sceneJSON, catalog: state.catalog.toJS() });
}

function setProperties(state, properties) {
  var scene = state.scene;
  scene = scene.set('layers', scene.layers.map(function (layer) {
    return setPropertiesOnSelected(layer, properties);
  }));
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function updateProperties(state, properties) {
  var scene = state.scene;
  scene = scene.set('layers', scene.layers.map(function (layer) {
    return updatePropertiesOnSelected(layer, properties);
  }));
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function setItemsAttributes(state, attributes) {
  var scene = state.scene;
  scene = scene.set('layers', scene.layers.map(function (layer) {
    return setAttributesOnSelected(layer, attributes, state.catalog);
  }));
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function setLinesAttributes(state, attributes) {
  var scene = state.scene;

  scene = scene.set('layers', scene.layers.map(function (layer) {
    return setAttributesOnSelected(layer, attributes, state.catalog);
  }));

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function setHolesAttributes(state, attributes) {
  var scene = state.scene;
  scene = scene.set('layers', scene.layers.map(function (layer) {
    return setAttributesOnSelected(layer, attributes, state.catalog);
  }));
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function unselectAll(state) {
  var scene = state.scene;

  scene = scene.update('layers', function (layer) {
    return layer.map(unselectAllOp);
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function remove(state) {
  var scene = state.scene;
  var catalog = state.catalog;

  scene = scene.updateIn(['layers', scene.selectedLayer], function (layer) {
    return layer.withMutations(function (layer) {
      var _layer$selected = layer.selected,
          selectedLines = _layer$selected.lines,
          selectedHoles = _layer$selected.holes,
          selectedItems = _layer$selected.items;

      unselectAllOp(layer);
      selectedLines.forEach(function (lineID) {
        return removeLine(layer, lineID);
      });
      selectedHoles.forEach(function (holeID) {
        return removeHole(layer, holeID);
      });
      selectedItems.forEach(function (itemID) {
        return removeItem(layer, itemID);
      });
      detectAndUpdateAreas(layer, catalog);
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function undo(state) {
  var sceneHistory = state.sceneHistory;

  if (state.scene === sceneHistory.last() && !sceneHistory.size > 1) sceneHistory = sceneHistory.pop();

  switch (sceneHistory.size) {
    case 0:
      return state;

    case 1:
      return state.merge({
        mode: MODE_IDLE,
        scene: sceneHistory.last()
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
  var sceneHistory = state.sceneHistory;

  if (sceneHistory.isEmpty()) return state;

  var scene = sceneHistory.last().update('layers', function (layer) {
    return layer.map(unselectAllOp);
  });

  return state.merge({
    mode: MODE_IDLE,
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene),
    snapElements: new List(),
    activeSnapElement: null,
    drawingSupport: new Map(),
    draggingSupport: new Map(),
    rotatingSupport: new Map()
  });
}

function setProjectProperties(state, properties) {
  var scene = state.scene.merge(properties);
  return state.merge({
    mode: MODE_IDLE,
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function openProjectConfigurator(state) {
  return state.merge({
    mode: MODE_CONFIGURING_PROJECT
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
    error: error
  }));
}

var throwWarning = function throwWarning(state, warning) {
  return state.set('warnings', state.get('warnings').push({
    date: Date.now(),
    warning: warning
  }));
};

var copyProperties = function copyProperties(state, properties) {
  return state.set('clipboardProperties', properties.toJS());
};

var pasteProperties = function pasteProperties(state) {
  return updateProperties(state, state.get('clipboardProperties'));
};

var pushLastSelectedCatalogElementToHistory = function pushLastSelectedCatalogElementToHistory(state, element) {
  var currHistory = state.selectedElementsHistory;

  var previousPosition = currHistory.findIndex(function (el) {
    return el.name === element.name;
  });
  if (previousPosition !== -1) {
    currHistory = currHistory.splice(previousPosition, 1);
  }
  currHistory = currHistory.splice(0, 0, element);

  return state.set('selectedElementsHistory', currHistory);
};