import { MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW, MODE_SNAPPING } from '../constants';
import { rollback, undo, remove, toggleSnap } from '../actions/project-actions';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_MASK } from '../utils/snap';

var KEY_DELETE = 46;
var KEY_BACKSPACE = 8;
var KEY_ESC = 27;
var KEY_Z = 90;
var KEY_ALT = 18;

export default function keyboard() {

  return function (store, stateExtractor) {

    window.addEventListener('keydown', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case KEY_BACKSPACE:
        case KEY_DELETE:
          {
            if ([MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode)) store.dispatch(remove());
            break;
          }
        case KEY_ESC:
          {
            store.dispatch(rollback());
            break;
          }
        case KEY_Z:
          {
            if (event.getModifierState('Control') || event.getModifierState('Meta')) store.dispatch(undo());
            break;
          }
        case KEY_ALT:
          {
            if (MODE_SNAPPING.includes(mode)) store.dispatch(toggleSnap(state.snapMask.merge({ SNAP_POINT: false, SNAP_LINE: false, SNAP_SEGMENT: false, tempSnapConfiguartion: state.snapMask.toJS() })));
            break;
          }
      }
    });

    window.addEventListener('keyup', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case KEY_ALT:
          {
            if (MODE_SNAPPING.includes(mode)) store.dispatch(toggleSnap(state.snapMask.merge(state.snapMask.get('tempSnapConfiguartion'))));
            break;
          }
      }
    });
  };
}