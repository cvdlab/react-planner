"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = consoleDebugger;

var _export = require("../actions/export");

var _export2 = _interopRequireDefault(_export);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function consoleDebugger() {

  return function (store, stateExtractor) {
    window.ReactPlanner = _extends({}, _export2.default, {
      getStore: function getStore() {
        return store;
      },
      getState: function getState() {
        return stateExtractor(store.getState());
      },
      do: function _do(actions) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

        actions = actions.reverse();
        var dispatch = store.dispatch;
        var dispatchAction = function dispatchAction() {
          console.info("There are other " + actions.length + " actions on stack");
          if (actions.length === 0) return;
          dispatch(actions.pop());
          if (actions.length === 0) return;
          setTimeout(dispatchAction, delay);
        };
        setTimeout(dispatchAction, 0);
      }
    });

    console.groupCollapsed("ReactPlanner");
    console.info("ReactPlanner is ready");
    console.info("console.log(ReactPlanner)");
    console.log(window.ReactPlanner);
    console.groupEnd();
  };
}