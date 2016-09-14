import {loadProject} from './actions/project-actions';
import {SAFE_SCENE_MODES, STORAGE_KEY}  from './constants';

const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;

export default function autosave(store) {

  if (!localStorage) return;

  //revert
  if (localStorage.getItem(STORAGE_KEY) !== null) {
    let data = localStorage.getItem(STORAGE_KEY);
    let json = JSON.parse(data);
    store.dispatch(loadProject(json));
  }

  //update
  store.subscribe(() => {
    let {scene, mode} = store.getState();
    if (SAFE_SCENE_MODES.includes(mode)) {
      let json = JSON.stringify(scene.toJSON());
      localStorage.setItem(STORAGE_KEY, json);
    }
  });

}
