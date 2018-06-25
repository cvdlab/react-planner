import {
  NEW_PROJECT,
  LOAD_PROJECT,
  SAVE_PROJECT,
  OPEN_CATALOG,
  SELECT_TOOL_EDIT,
  UNSELECT_ALL,
  SET_PROPERTIES,
  SET_ITEMS_ATTRIBUTES,
  SET_LINES_ATTRIBUTES,
  SET_HOLES_ATTRIBUTES,
  REMOVE,
  UNDO,
  ROLLBACK,
  OPEN_PROJECT_CONFIGURATOR,
  SET_PROJECT_PROPERTIES,
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
  PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY,
  ALTERATE_STATE,
  SET_MODE,
  ADD_HORIZONTAL_GUIDE,
  ADD_VERTICAL_GUIDE,
  ADD_CIRCULAR_GUIDE,
  REMOVE_HORIZONTAL_GUIDE,
  REMOVE_VERTICAL_GUIDE,
  REMOVE_CIRCULAR_GUIDE
} from '../constants';

export function loadProject(sceneJSON) {
  return {
    type: LOAD_PROJECT,
    sceneJSON
  };
}

export function newProject() {
  return {
    type: NEW_PROJECT
  };
}

export function saveProject() {
  return {
    type: SAVE_PROJECT
  };
}

export function openCatalog() {
  return {
    type: OPEN_CATALOG
  };
}

export function changeCatalogPage(newPage, oldPage) {
  return {
    type: CHANGE_CATALOG_PAGE,
    newPage,
    oldPage
  };
}

export function goBackToCatalogPage(newPage) {
  return {
    type: GO_BACK_TO_CATALOG_PAGE,
    newPage
  };
}

export function selectToolEdit() {
  return {
    type: SELECT_TOOL_EDIT
  };
}

export function unselectAll() {
  return {
    type: UNSELECT_ALL
  };
}


export function setProperties(properties) {
  return {
    type: SET_PROPERTIES,
    properties
  };
}

export function setItemsAttributes(itemsAttributes) {

  itemsAttributes = itemsAttributes.set('rotation', parseFloat(itemsAttributes.get('rotation')));

  return {
    type: SET_ITEMS_ATTRIBUTES,
    itemsAttributes
  };
}

export function setLinesAttributes(linesAttributes) {

  linesAttributes = linesAttributes.withMutations(attributes => {
    attributes.setIn(['vertexOne', 'x'], parseFloat(linesAttributes.getIn(['vertexOne', 'x'])));
    attributes.setIn(['vertexOne', 'y'], parseFloat(linesAttributes.getIn(['vertexOne', 'y'])));
    attributes.setIn(['vertexTwo', 'x'], parseFloat(linesAttributes.getIn(['vertexTwo', 'x'])));
    attributes.setIn(['vertexTwo', 'y'], parseFloat(linesAttributes.getIn(['vertexTwo', 'y'])));
  });

  return {
    type: SET_LINES_ATTRIBUTES,
    linesAttributes
  };
}

export function setHolesAttributes(holesAttributes) {

  holesAttributes = holesAttributes.set('offset', parseFloat(holesAttributes.get('offset')));

  return {
    type: SET_HOLES_ATTRIBUTES,
    holesAttributes
  };
}

export function remove() {
  return {
    type: REMOVE
  };
}

export function undo() {
  return {
    type: UNDO
  };
}

export function rollback() {
  return {
    type: ROLLBACK
  };
}

export function openProjectConfigurator() {
  return {
    type: OPEN_PROJECT_CONFIGURATOR
  };
}

export function setProjectProperties(properties) {
  return {
    type: SET_PROJECT_PROPERTIES,
    properties
  };
}

export function initCatalog(catalog) {
  return {
    type: INIT_CATALOG,
    catalog
  };
}

export function updateMouseCoord(coords = {x, y}) {
  return {
    type: UPDATE_MOUSE_COORDS,
    coords
  };
}

export function updateZoomScale(scale) {
  return {
    type: UPDATE_ZOOM_SCALE,
    scale
  };
}

export function toggleSnap(mask) {
  return {
    type: TOGGLE_SNAP,
    mask
  };
}

export function throwError(error) {
  return {
    type: THROW_ERROR,
    error
  };
}

export function throwWarning(warning) {
  return {
    type: THROW_WARNING,
    warning
  };
}

export function copyProperties(properties) {
  return {
    type: COPY_PROPERTIES,
    properties
  };
}

export function pasteProperties() {
  return {
    type: PASTE_PROPERTIES
  };
}

export function pushLastSelectedCatalogElementToHistory( element ) {
  return {
    type: PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY,
    element
  };
}

export function setAlterateState() {
  return {
    type: ALTERATE_STATE
  };
}

export function setMode( mode ) {
  return {
    type: SET_MODE,
    mode
  };
}

export function addHorizontalGuide( coordinate ) {
  return {
    type: ADD_HORIZONTAL_GUIDE,
    coordinate
  };
}

export function addVerticalGuide( coordinate ) {
  return {
    type: ADD_VERTICAL_GUIDE,
    coordinate
  };
}

export function addCircularGuide( x, y, radius ) {
  return {
    type: ADD_CIRCULAR_GUIDE,
    x,
    y,
    radius
  };
}
export function removeHorizontalGuide( guideID ) {
  return {
    type: REMOVE_HORIZONTAL_GUIDE,
    guideID
  };
}

export function removeVerticalGuide( guideID ) {
  return {
    type: REMOVE_VERTICAL_GUIDE,
    guideID
  };
}

export function removeCircularGuide( guideID ) {
  return {
    type: REMOVE_CIRCULAR_GUIDE,
    guideID
  };
}