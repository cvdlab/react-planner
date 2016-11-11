'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadProject = loadProject;
exports.newProject = newProject;
exports.saveProject = saveProject;
exports.loadProjectFromFile = loadProjectFromFile;
exports.saveProjectToFile = saveProjectToFile;
exports.openCatalog = openCatalog;
exports.selectToolEdit = selectToolEdit;
exports.unselectAll = unselectAll;
exports.setProperties = setProperties;
exports.remove = remove;
exports.undo = undo;
exports.rollback = rollback;

var _browser = require('../utils/browser');

var _constants = require('../constants');

function loadProject(data) {
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: _constants.LOAD_PROJECT,
      data: data, catalog: catalog
    });
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

function loadProjectFromFile() {
  return function (dispatch, getState) {

    dispatch({ type: _constants.LOAD_PROJECT_FROM_FILE });

    var upload = (0, _browser.browserUpload)();
    upload.then(function (data) {
      dispatch(loadProject(JSON.parse(data)));
    });
  };
}

function saveProjectToFile() {
  return function (dispatch, getState) {

    dispatch({ type: _constants.SAVE_PROJECT_TO_FILE });

    var state = getState();
    var scene = state.get('scene').toJS();

    (0, _browser.browserDownload)(scene);
    dispatch(saveProject());
  };
}

function openCatalog() {
  return function (dispatch, getState, _ref2) {
    var catalog = _ref2.catalog;

    dispatch({
      type: _constants.OPEN_CATALOG,
      catalog: catalog
    });
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
  return function (dispatch, getState, _ref3) {
    var catalog = _ref3.catalog;

    dispatch({
      type: _constants.REMOVE,
      catalog: catalog
    });
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