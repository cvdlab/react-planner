import {remove} from './actions/editing-actions';
import {MODE_IDLE} from './constants';

const KEY_DELETE = 46;
const KEY_BACKSPACE = 8;

export default function keyboard(store) {

  window.addEventListener('keydown', event => {
    switch (event.keyCode) {
      case KEY_BACKSPACE:
      case KEY_DELETE:
        if (store.getState().mode === MODE_IDLE) store.dispatch(remove());
        break;
    }
  });
}
