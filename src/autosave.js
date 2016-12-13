const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import {loadProject} from './actions/project-actions';

const TIMEOUT_DELAY = 500;

let timeout = null;

export default function autosave(store, autosaveKey, delay) {

  delay = delay || TIMEOUT_DELAY;

  if (!autosaveKey) return;
  if (!localStorage) return;

  //revert
  if (localStorage.getItem(autosaveKey) !== null) {
    let data = localStorage.getItem(autosaveKey);
    let json = JSON.parse(data);
    store.dispatch(loadProject(json));
  }

  //update
  store.subscribe(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      let state = store.getState();
      let scene = state.sceneHistory.last();
      let json = JSON.stringify(scene.toJS());
      localStorage.setItem(autosaveKey, json);
    }, delay)
  });
}
