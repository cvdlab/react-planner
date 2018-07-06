'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyboard;

var _constants = require('../constants');

var _projectActions = require('../actions/project-actions');

function keyboard() {

  return function (store, stateExtractor) {

    window.addEventListener('keydown', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case _constants.KEYBOARD_BUTTON_CODE.BACKSPACE:
        case _constants.KEYBOARD_BUTTON_CODE.DELETE:
          {
            if ([_constants.MODE_IDLE, _constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode)) store.dispatch((0, _projectActions.remove)());
            break;
          }
        case _constants.KEYBOARD_BUTTON_CODE.ESC:
          {
            store.dispatch((0, _projectActions.rollback)());
            break;
          }
        case _constants.KEYBOARD_BUTTON_CODE.Z:
          {
            if (event.getModifierState('Control') || event.getModifierState('Meta')) store.dispatch((0, _projectActions.undo)());
            break;
          }
        case _constants.KEYBOARD_BUTTON_CODE.ALT:
          {
            if (_constants.MODE_SNAPPING.includes(mode)) store.dispatch((0, _projectActions.toggleSnap)(state.snapMask.merge({
              SNAP_POINT: false,
              SNAP_LINE: false,
              SNAP_SEGMENT: false,
              SNAP_GRID: false,
              SNAP_GUIDE: false,
              tempSnapConfiguartion: state.snapMask.toJS()
            })));
            break;
          }
        case _constants.KEYBOARD_BUTTON_CODE.C:
          {
            var selectedLayer = state.getIn(['scene', 'selectedLayer']);
            var selected = state.getIn(['scene', 'layers', selectedLayer, 'selected']);

            if ((mode === _constants.MODE_IDLE || mode === _constants.MODE_3D_VIEW) && (selected.holes.size || selected.areas.size || selected.items.size || selected.lines.size)) {
              if (selected.holes.size) {
                var hole = state.getIn(['scene', 'layers', selectedLayer, 'holes', selected.holes.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(hole.get('properties')));
              } else if (selected.areas.size) {
                var area = state.getIn(['scene', 'layers', selectedLayer, 'areas', selected.areas.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(area.properties));
              } else if (selected.items.size) {
                var item = state.getIn(['scene', 'layers', selectedLayer, 'items', selected.items.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(item.properties));
              } else if (selected.lines.size) {
                var line = state.getIn(['scene', 'layers', selectedLayer, 'lines', selected.lines.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(line.properties));
              }
            }
            break;
          }
        case _constants.KEYBOARD_BUTTON_CODE.V:
          {
            store.dispatch((0, _projectActions.pasteProperties)());
            break;
          }
        case _constants.KEYBOARD_BUTTON_CODE.CTRL:
          {
            store.dispatch((0, _projectActions.setAlterateState)());
            break;
          }
      }
    });

    window.addEventListener('keyup', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case _constants.KEYBOARD_BUTTON_CODE.ALT:
          {
            if (_constants.MODE_SNAPPING.includes(mode)) store.dispatch((0, _projectActions.toggleSnap)(state.snapMask.merge(state.snapMask.get('tempSnapConfiguartion'))));
            break;
          }
        case _constants.KEYBOARD_BUTTON_CODE.CTRL:
          {
            store.dispatch((0, _projectActions.setAlterateState)());
            break;
          }
      }
    });
  };
}