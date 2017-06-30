import { MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW } from '../constants';
import { rollback, undo, remove, toggleSnap } from '../actions/project-actions';

const KEY_DELETE = 46;
const KEY_BACKSPACE = 8;
const KEY_ESC = 27;
const KEY_Z = 90;
const KEY_ALT = 18;

export default function keyboard() {

  return (store, stateExtractor) => {

    window.addEventListener('keydown', event => {

      let state = stateExtractor(store.getState());

      switch (event.keyCode) {
        case KEY_BACKSPACE:
        case KEY_DELETE:
          {
            if ([MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(state.get('mode')))
              store.dispatch(remove());
            break;
          }
        case KEY_ESC:
          {
            store.dispatch(rollback());
            break;
          }
        case KEY_Z:
          {
            if (event.getModifierState('Control') || event.getModifierState('Meta'))
              store.dispatch(undo());
            break;
          }
        case KEY_ALT:
          {
            store.dispatch(toggleSnap(0));
            break;
          }
      }

    });

    window.addEventListener('keyup', event => {

      switch (event.keyCode) {
        case KEY_ALT:
          {
            store.dispatch(toggleSnap(1));
            break;
          }
      }

    });

  }
}
