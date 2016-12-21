import { NEW_PROJECT, LOAD_PROJECT, SAVE_PROJECT, OPEN_CATALOG, SELECT_TOOL_EDIT, UNSELECT_ALL, SET_PROPERTIES, REMOVE, UNDO, ROLLBACK, OPEN_PROJECT_CONFIGURATOR, SET_PROJECT_PROPERTIES, INIT_CATALOG } from '../constants';

export function loadProject(sceneJSON) {
  return {
    type: LOAD_PROJECT,
    sceneJSON: sceneJSON
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
    properties: properties
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
    properties: properties
  };
}

export function initCatalog(catalog) {
  return {
    type: INIT_CATALOG,
    catalog: catalog
  };
}