'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyboard;

var _editingActions = require('./actions/editing-actions');

var _constants = require('./constants');

var _projectActions = require('./actions/project-actions');

var KEY_DELETE = 46;
var KEY_BACKSPACE = 8;
var KEY_ESC = 27;

var localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;

function keyboard(store) {

  window.addEventListener('keydown', function (event) {

    switch (event.keyCode) {
      case KEY_BACKSPACE:
      case KEY_DELETE:
        if (store.getState().mode === _constants.MODE_IDLE) store.dispatch((0, _editingActions.remove)());
        break;

      case KEY_ESC:
        if (!localStorage) return;

        if (localStorage.getItem(_constants.STORAGE_KEY) !== null) {
          var data = localStorage.getItem(_constants.STORAGE_KEY);
          var json = JSON.parse(data);
          store.dispatch((0, _projectActions.loadProject)(json));
        }
        break;
    }
  });
}