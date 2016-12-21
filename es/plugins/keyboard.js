import { MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW } from '../constants';
import { rollback, undo, remove } from '../actions/project-actions';

var KEY_DELETE = 46;
var KEY_BACKSPACE = 8;
var KEY_ESC = 27;
var KEY_Z = 90;

export default function keyboard() {

  return function (store, stateExtractor) {

    window.addEventListener('keydown', function (event) {

      var state = stateExtractor(store.getState());

      switch (event.keyCode) {
        case KEY_BACKSPACE:
        case KEY_DELETE:
          if ([MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(state.get('mode'))) store.dispatch(remove());
          break;

        case KEY_ESC:
          store.dispatch(rollback());
          break;

        case KEY_Z:
          if (event.getModifierState('Control') || event.getModifierState('Meta')) store.dispatch(undo());
          break;
      }
    });
  };
}