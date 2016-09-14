import {loadProject} from './actions/project-actions';
import * as constants from './constants';

const storageKey = 'metior_scene_autosave_v1';
const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
const SAFE_MODES = [
  constants.MODE_IDLE,
  constants.MODE_3D_VIEW,
  constants.MODE_3D_FIRST_PERSON,
  constants.MODE_WAITING_DRAWING_LINE
];

export default function autosave(store) {

  if (!localStorage) return;

  //revert
  if (localStorage.getItem(storageKey) !== null) {
    let data = localStorage.getItem(storageKey);
    let json = JSON.parse(data);
    store.dispatch(loadProject(json));
  }

  //update
  store.subscribe(() => {
    let {scene, mode} = store.getState();
    if (SAFE_MODES.includes(mode)) {
      let json = JSON.stringify(scene.toJSON());
      localStorage.setItem(storageKey, json);
    }
  });

}
