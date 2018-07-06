'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadProject = loadProject;
exports.newProject = newProject;
exports.saveProject = saveProject;
exports.openCatalog = openCatalog;
exports.changeCatalogPage = changeCatalogPage;
exports.goBackToCatalogPage = goBackToCatalogPage;
exports.selectToolEdit = selectToolEdit;
exports.unselectAll = unselectAll;
exports.setProperties = setProperties;
exports.setItemsAttributes = setItemsAttributes;
exports.setLinesAttributes = setLinesAttributes;
exports.setHolesAttributes = setHolesAttributes;
exports.remove = remove;
exports.undo = undo;
exports.rollback = rollback;
exports.openProjectConfigurator = openProjectConfigurator;
exports.setProjectProperties = setProjectProperties;
exports.initCatalog = initCatalog;
exports.updateMouseCoord = updateMouseCoord;
exports.updateZoomScale = updateZoomScale;
exports.toggleSnap = toggleSnap;
exports.throwError = throwError;
exports.throwWarning = throwWarning;
exports.copyProperties = copyProperties;
exports.pasteProperties = pasteProperties;
exports.pushLastSelectedCatalogElementToHistory = pushLastSelectedCatalogElementToHistory;
exports.setAlterateState = setAlterateState;
exports.setMode = setMode;
exports.addHorizontalGuide = addHorizontalGuide;
exports.addVerticalGuide = addVerticalGuide;
exports.addCircularGuide = addCircularGuide;
exports.removeHorizontalGuide = removeHorizontalGuide;
exports.removeVerticalGuide = removeVerticalGuide;
exports.removeCircularGuide = removeCircularGuide;

var _constants = require('../constants');

function loadProject(sceneJSON) {
  return {
    type: _constants.LOAD_PROJECT,
    sceneJSON: sceneJSON
  };
}

function newProject() {
  return {
    type: _constants.NEW_PROJECT
  };
}

function saveProject() {
  return {
    type: _constants.SAVE_PROJECT
  };
}

function openCatalog() {
  return {
    type: _constants.OPEN_CATALOG
  };
}

function changeCatalogPage(newPage, oldPage) {
  return {
    type: _constants.CHANGE_CATALOG_PAGE,
    newPage: newPage,
    oldPage: oldPage
  };
}

function goBackToCatalogPage(newPage) {
  return {
    type: _constants.GO_BACK_TO_CATALOG_PAGE,
    newPage: newPage
  };
}

function selectToolEdit() {
  return {
    type: _constants.SELECT_TOOL_EDIT
  };
}

function unselectAll() {
  return {
    type: _constants.UNSELECT_ALL
  };
}

function setProperties(properties) {
  return {
    type: _constants.SET_PROPERTIES,
    properties: properties
  };
}

function setItemsAttributes(itemsAttributes) {

  itemsAttributes = itemsAttributes.set('rotation', parseFloat(itemsAttributes.get('rotation')));

  return {
    type: _constants.SET_ITEMS_ATTRIBUTES,
    itemsAttributes: itemsAttributes
  };
}

function setLinesAttributes(linesAttributes) {

  linesAttributes = linesAttributes.withMutations(function (attributes) {
    attributes.setIn(['vertexOne', 'x'], parseFloat(linesAttributes.getIn(['vertexOne', 'x'])));
    attributes.setIn(['vertexOne', 'y'], parseFloat(linesAttributes.getIn(['vertexOne', 'y'])));
    attributes.setIn(['vertexTwo', 'x'], parseFloat(linesAttributes.getIn(['vertexTwo', 'x'])));
    attributes.setIn(['vertexTwo', 'y'], parseFloat(linesAttributes.getIn(['vertexTwo', 'y'])));
  });

  return {
    type: _constants.SET_LINES_ATTRIBUTES,
    linesAttributes: linesAttributes
  };
}

function setHolesAttributes(holesAttributes) {

  holesAttributes = holesAttributes.set('offset', parseFloat(holesAttributes.get('offset')));

  return {
    type: _constants.SET_HOLES_ATTRIBUTES,
    holesAttributes: holesAttributes
  };
}

function remove() {
  return {
    type: _constants.REMOVE
  };
}

function undo() {
  return {
    type: _constants.UNDO
  };
}

function rollback() {
  return {
    type: _constants.ROLLBACK
  };
}

function openProjectConfigurator() {
  return {
    type: _constants.OPEN_PROJECT_CONFIGURATOR
  };
}

function setProjectProperties(properties) {
  return {
    type: _constants.SET_PROJECT_PROPERTIES,
    properties: properties
  };
}

function initCatalog(catalog) {
  return {
    type: _constants.INIT_CATALOG,
    catalog: catalog
  };
}

function updateMouseCoord() {
  var coords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: x, y: y };

  return {
    type: _constants.UPDATE_MOUSE_COORDS,
    coords: coords
  };
}

function updateZoomScale(scale) {
  return {
    type: _constants.UPDATE_ZOOM_SCALE,
    scale: scale
  };
}

function toggleSnap(mask) {
  return {
    type: _constants.TOGGLE_SNAP,
    mask: mask
  };
}

function throwError(error) {
  return {
    type: _constants.THROW_ERROR,
    error: error
  };
}

function throwWarning(warning) {
  return {
    type: _constants.THROW_WARNING,
    warning: warning
  };
}

function copyProperties(properties) {
  return {
    type: _constants.COPY_PROPERTIES,
    properties: properties
  };
}

function pasteProperties() {
  return {
    type: _constants.PASTE_PROPERTIES
  };
}

function pushLastSelectedCatalogElementToHistory(element) {
  return {
    type: _constants.PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY,
    element: element
  };
}

function setAlterateState() {
  return {
    type: _constants.ALTERATE_STATE
  };
}

function setMode(mode) {
  return {
    type: _constants.SET_MODE,
    mode: mode
  };
}

function addHorizontalGuide(coordinate) {
  return {
    type: _constants.ADD_HORIZONTAL_GUIDE,
    coordinate: coordinate
  };
}

function addVerticalGuide(coordinate) {
  return {
    type: _constants.ADD_VERTICAL_GUIDE,
    coordinate: coordinate
  };
}

function addCircularGuide(x, y, radius) {
  return {
    type: _constants.ADD_CIRCULAR_GUIDE,
    x: x,
    y: y,
    radius: radius
  };
}
function removeHorizontalGuide(guideID) {
  return {
    type: _constants.REMOVE_HORIZONTAL_GUIDE,
    guideID: guideID
  };
}

function removeVerticalGuide(guideID) {
  return {
    type: _constants.REMOVE_VERTICAL_GUIDE,
    guideID: guideID
  };
}

function removeCircularGuide(guideID) {
  return {
    type: _constants.REMOVE_CIRCULAR_GUIDE,
    guideID: guideID
  };
}