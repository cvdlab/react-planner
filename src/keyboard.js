import {remove} from './actions/editing-actions';
import {MODE_IDLE, STORAGE_KEY} from './constants';
import {loadProject} from './actions/project-actions';

const KEY_DELETE = 46;
const KEY_BACKSPACE = 8;
const KEY_ESC = 27;

const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;

export default function keyboard(store) {

  window.addEventListener('keydown', event => {

    switch (event.keyCode) {
      case KEY_BACKSPACE:
      case KEY_DELETE:
        if (store.getState().mode === MODE_IDLE) store.dispatch(remove());
        break;

      case KEY_ESC:
        if (!localStorage) return;

        if (localStorage.getItem(STORAGE_KEY) !== null) {
          let data = localStorage.getItem(STORAGE_KEY);
          let json = JSON.parse(data);
          store.dispatch(loadProject(json));
        }
        break;
    }
  });
}
