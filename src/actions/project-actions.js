import {browserUpload,browserDownload}  from '../utils/browser';
import {NEW_PROJECT, LOAD_PROJECT, SAVE_PROJECT, LOAD_PROJECT_FROM_FILE, SAVE_PROJECT_TO_FILE} from '../constants';

export function loadProject(data) {
  return {
    type: LOAD_PROJECT,
    data
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
