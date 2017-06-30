import { MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW } from '../constants';
import { rollback, undo, remove, toggleSnap } from '../actions/project-actions';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_MASK } from '../utils/snap';

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
            store.dispatch(toggleSnap(state.snapMask.merge({ SNAP_POINT: false, SNAP_LINE: false, SNAP_SEGMENT: false, tempSnapConfiguartion: state.snapMask.toJS() })));
            break;
          }
      }

    });

    window.addEventListener('keyup', event => {

      let state = stateExtractor(store.getState());

      switch (event.keyCode) {
        case KEY_ALT:
          {
            store.dispatch(toggleSnap(state.snapMask.merge(state.snapMask.get('tempSnapConfiguartion'))));
            break;
          }
      }

    });

  }
}
