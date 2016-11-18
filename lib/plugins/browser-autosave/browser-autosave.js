'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (storageKey) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TIMEOUT_DELAY;

  return {
    onReady: function onReady(store) {
      if (!localStorage) return;

      //revert
      if (localStorage.getItem(storageKey) !== null) {
        var data = localStorage.getItem(storageKey);
        var json = JSON.parse(data);
        store.dispatch({
          type: RESTORE_PROJECT_FROM_STORAGE,
          scene: json
        });
      }

      //update
      store.subscribe(function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function () {
          var state = store.getState();
          var scene = state.sceneHistory.last();
          var json = JSON.stringify(scene.toJS());
          localStorage.setItem(storageKey, json);
        }, delay);
      });
    },

    reducer: function reducer(state, action) {
      switch (action.type) {
        case RESTORE_PROJECT_FROM_STORAGE:
          return new _models.State({
            scene: action.scene
          });

        default:
          return state;
      }
    }
  };
};

var _models = require('../../models');

var localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;


var RESTORE_PROJECT_FROM_STORAGE = 'RESTORE_PROJECT_FROM_STORAGE';
var TIMEOUT_DELAY = 500;
var timeout = null;