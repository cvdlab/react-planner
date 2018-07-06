import {
  MODE_IDLE,
  MODE_3D_FIRST_PERSON,
  MODE_3D_VIEW,
  MODE_SNAPPING,
  KEYBOARD_BUTTON_CODE
} from '../constants';

import {
  rollback,
  undo,
  remove,
  toggleSnap,
  copyProperties,
  pasteProperties,
  setAlterateState
} from '../actions/project-actions';

export default function keyboard() {

  return (store, stateExtractor) => {

    window.addEventListener('keydown', event => {

      let state = stateExtractor(store.getState());
      let mode = state.get('mode');

      switch (event.keyCode) {
        case KEYBOARD_BUTTON_CODE.BACKSPACE:
        case KEYBOARD_BUTTON_CODE.DELETE:
        {
          if ([MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode))
            store.dispatch(remove());
          break;
        }
        case KEYBOARD_BUTTON_CODE.ESC:
        {
          store.dispatch(rollback());
          break;
        }
        case KEYBOARD_BUTTON_CODE.Z:
        {
          if (event.getModifierState('Control') || event.getModifierState('Meta'))
            store.dispatch(undo());
          break;
        }
        case KEYBOARD_BUTTON_CODE.ALT:
        {
          if (MODE_SNAPPING.includes(mode))
            store.dispatch(toggleSnap(state.snapMask.merge({
              SNAP_POINT: false,
              SNAP_LINE: false,
              SNAP_SEGMENT: false,
              SNAP_GRID : false,
              SNAP_GUIDE : false,
              tempSnapConfiguartion: state.snapMask.toJS()
            })));
          break;
        }
        case KEYBOARD_BUTTON_CODE.C:
        {
          let selectedLayer = state.getIn(['scene', 'selectedLayer']);
          let selected = state.getIn(['scene', 'layers', selectedLayer, 'selected']);

          if ( ( mode === MODE_IDLE || mode === MODE_3D_VIEW ) && (selected.holes.size || selected.areas.size || selected.items.size || selected.lines.size)) {
            if (selected.holes.size) {
              let hole = state.getIn(['scene', 'layers', selectedLayer, 'holes', selected.holes.get(0)]);
              store.dispatch(copyProperties(hole.get('properties')));
            }
            else if (selected.areas.size) {
              let area = state.getIn(['scene', 'layers', selectedLayer, 'areas', selected.areas.get(0)]);
              store.dispatch(copyProperties(area.properties));
            }
            else if (selected.items.size) {
              let item = state.getIn(['scene', 'layers', selectedLayer, 'items', selected.items.get(0)]);
              store.dispatch(copyProperties(item.properties));
            }
            else if (selected.lines.size) {
              let line = state.getIn(['scene', 'layers', selectedLayer, 'lines', selected.lines.get(0)]);
              store.dispatch(copyProperties(line.properties));
            }
          }
          break;
        }
        case KEYBOARD_BUTTON_CODE.V:
        {
          store.dispatch(pasteProperties());
          break;
        }
        case KEYBOARD_BUTTON_CODE.CTRL:
        {
          store.dispatch(setAlterateState());
          break;
        }
      }

    });

    window.addEventListener('keyup', event => {

      let state = stateExtractor(store.getState());
      let mode = state.get('mode');

      switch (event.keyCode) {
        case KEYBOARD_BUTTON_CODE.ALT:
        {
          if (MODE_SNAPPING.includes(mode))
            store.dispatch(toggleSnap(state.snapMask.merge(state.snapMask.get('tempSnapConfiguartion'))));
          break;
        }
        case KEYBOARD_BUTTON_CODE.CTRL:
        {
          store.dispatch(setAlterateState());
          break;
        }
      }

    });

  }
}
