'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadProject = loadProject;
exports.newProject = newProject;
exports.saveProject = saveProject;
exports.openCatalog = openCatalog;
exports.selectToolEdit = selectToolEdit;
exports.unselectAll = unselectAll;
exports.setProperties = setProperties;
exports.remove = remove;
exports.undo = undo;
exports.rollback = rollback;
exports.openProjectConfigurator = openProjectConfigurator;
exports.setProjectProperties = setProjectProperties;
exports.initCatalog = initCatalog;

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