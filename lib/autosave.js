'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autosave;

var _projectActions = require('./actions/project-actions');

var _constants = require('./constants');

var localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;

function autosave(store) {

  if (!localStorage) return;

  //revert
  if (localStorage.getItem(_constants.STORAGE_KEY) !== null) {
    var data = localStorage.getItem(_constants.STORAGE_KEY);
    var json = JSON.parse(data);
    store.dispatch((0, _projectActions.loadProject)(json));
  }

  //update
  store.subscribe(function () {
    var _store$getState = store.getState(),
        scene = _store$getState.scene,
        mode = _store$getState.mode;

    if (_constants.SAFE_SCENE_MODES.includes(mode)) {
      var _json = JSON.stringify(scene.toJSON());
      localStorage.setItem(_constants.STORAGE_KEY, _json);
    }
  });
}