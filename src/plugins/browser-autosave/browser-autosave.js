const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import {State} from '../../models';

const RESTORE_PROJECT_FROM_STORAGE = 'RESTORE_PROJECT_FROM_STORAGE';
const TIMEOUT_DELAY = 500;
let timeout = null;

export default function (storageKey, delay = TIMEOUT_DELAY) {
  return {
    onReady: function (store) {
      if (!localStorage) return;

      //revert
      if (localStorage.getItem(storageKey) !== null) {
        let data = localStorage.getItem(storageKey);
        let json = JSON.parse(data);
        store.dispatch({
          type: RESTORE_PROJECT_FROM_STORAGE,
          scene: json
        });
      }

      //update
      store.subscribe(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          let state = store.getState();
          let scene = state.sceneHistory.last();
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(storageKey, json);
        }, delay)
      });
    },

    reducer: function (state, action) {
      switch (action.type) {
        case RESTORE_PROJECT_FROM_STORAGE:
          return new State({
            scene: action.scene
          });

        default:
          return state;
      }
    }
  }
}
