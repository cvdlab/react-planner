'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyboard;

var _constants = require('../constants');

var _projectActions = require('../actions/project-actions');

var _snap = require('../utils/snap');

var KEY_DELETE = 46;
var KEY_BACKSPACE = 8;
var KEY_ESC = 27;
var KEY_Z = 90;
var KEY_ALT = 18;

function keyboard() {

  return function (store, stateExtractor) {

    window.addEventListener('keydown', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case KEY_BACKSPACE:
        case KEY_DELETE:
          {
            if ([_constants.MODE_IDLE, _constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode)) store.dispatch((0, _projectActions.remove)());
            break;
          }
        case KEY_ESC:
          {
            store.dispatch((0, _projectActions.rollback)());
            break;
          }
        case KEY_Z:
          {
            if (event.getModifierState('Control') || event.getModifierState('Meta')) store.dispatch((0, _projectActions.undo)());
            break;
          }
        case KEY_ALT:
          {
            if (_constants.MODE_SNAPPING.includes(mode)) store.dispatch((0, _projectActions.toggleSnap)(state.snapMask.merge({ SNAP_POINT: false, SNAP_LINE: false, SNAP_SEGMENT: false, tempSnapConfiguartion: state.snapMask.toJS() })));
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
            if (_constants.MODE_SNAPPING.includes(mode)) store.dispatch((0, _projectActions.toggleSnap)(state.snapMask.merge(state.snapMask.get('tempSnapConfiguartion'))));
            break;
          }
      }
    });
  };
}