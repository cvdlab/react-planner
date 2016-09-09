import {remove} from './actions/editing-actions';
import {MODE_IDLE} from './constants';

const KEY_DELETE = 46;

export default function keyboard(store) {

  window.addEventListener('keydown', event => {
    switch (event.keyCode) {
      case KEY_DELETE:
        let state = store.getState();
        if (state.mode === MODE_IDLE) store.dispatch(remove());
        break;
    }
  });
}
