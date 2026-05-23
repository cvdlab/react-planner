const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import { loadProject } from '../actions/project-actions';

const TIMEOUT_DELAY = 500;

let timeout: any = null;

export default function autosave(autosaveKey: string, delay?: number) {

  return (store: any, stateExtractor: any) => {

    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      let data = localStorage.getItem(autosaveKey) as string;
      let json = JSON.parse(data);
      store.dispatch(loadProject(json));
    }

    //update
    store.subscribe(() => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        let state = stateExtractor(store.getState());
        (localStorage as Storage).setItem(autosaveKey, JSON.stringify(state.scene.toJS()));
        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, delay);
    });
  };
}
