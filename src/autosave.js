import {loadProject} from './actions/project-actions';

const storageKey = 'metior_scene_autosave_v1';
const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;

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
    let {scene} = store.getState();
    let json = JSON.stringify(scene.toJSON());
    localStorage.setItem(storageKey, json);
  });

}
