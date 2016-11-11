import {remove} from './actions/editing-actions';
import {MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW, STORAGE_KEY} from './constants';
import {rollback, undo} from './actions/project-actions';

const KEY_DELETE = 46;
const KEY_BACKSPACE = 8;
const KEY_ESC = 27;
const KEY_Z = 90;

export default function keyboard(store) {
  window.addEventListener('keydown', event => {
    switch (event.keyCode) {
      case KEY_BACKSPACE:
      case KEY_DELETE:
        if ([MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(store.getState().mode))
          store.dispatch(remove());
        break;

      case KEY_ESC:
        store.dispatch(rollback());
        break;

      case KEY_Z:
        if (event.getModifierState('Control') || event.getModifierState('Meta'))
          store.dispatch(undo());
        break;
    }
  });
}
