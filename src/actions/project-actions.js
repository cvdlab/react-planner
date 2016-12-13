import {browserUpload, browserDownload}  from '../utils/browser';
import {
  NEW_PROJECT,
  LOAD_PROJECT,
  SAVE_PROJECT,
  LOAD_PROJECT_FROM_FILE,
  SAVE_PROJECT_TO_FILE,
  OPEN_CATALOG,
  SELECT_TOOL_EDIT,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE,
  UNDO,
  ROLLBACK,
  OPEN_PROJECT_CONFIGURATOR,
  SET_PROJECT_PROPERTIES,
  INIT_CATALOG
} from '../constants';

export function loadProject(sceneJSON) {
  return {
    type: LOAD_PROJECT,
    sceneJSON
  }
}

export function newProject() {
  return {
    type: NEW_PROJECT
  }
}

export function saveProject() {
  return {
    type: SAVE_PROJECT
  }
}

export function loadProjectFromFile() {
  return function (dispatch, getState) {

    dispatch({type: LOAD_PROJECT_FROM_FILE});

    var upload = browserUpload();
    upload.then((data) => {
      dispatch(loadProject(JSON.parse(data)));
    });
  };
}

export function saveProjectToFile() {
  return function (dispatch, getState) {

    dispatch({type: SAVE_PROJECT_TO_FILE});

    var state = getState();
    let scene = state.get('scene').toJS();

    browserDownload(scene);
    dispatch(saveProject());
  };
}

export function openCatalog() {
  return {
    type: OPEN_CATALOG
  }
}

export function selectToolEdit() {
  return {
    type: SELECT_TOOL_EDIT
  }
}

export function unselectAll() {
  return {
    type: UNSELECT_ALL
  }
}


export function setProperties(properties) {
  return {
    type: SET_PROPERTIES,
    properties
  }
}

export function remove() {
  return {
    type: REMOVE
  }
}

export function undo() {
  return {
    type: UNDO
  }
}

export function rollback() {
  return {
    type: ROLLBACK
  }
}

export function openProjectConfigurator() {
  return {
    type: OPEN_PROJECT_CONFIGURATOR
  }
}

export function setProjectProperties(properties) {
  return {
    type: SET_PROJECT_PROPERTIES,
    properties
  }
}

export function initCatalog(catalog) {
  return {
    type: INIT_CATALOG,
    catalog
  }
}
