'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergePlugins;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function funcChain(functions) {
  return function () {
    var i = 0;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var res = args;
    while (i < functions.length) {
      var f = functions[i];
      res = f.call.apply(f, [this].concat(_toConsumableArray(res)));
      i++;
    }
    return res;
  };
}

function mergePlugins(plugins) {

  var customActions = {};
  var toolbarButtons = [];
  var customContents = {};
  var customReducer = [];
  var actionsExtraArgument = {};
  var onReady = [];

  plugins.forEach(function (plugin) {
    if (plugin.hasOwnProperty('actions')) Object.assign(customActions, plugin.actions);
    if (plugin.hasOwnProperty('actionsExtraArgument')) Object.assign(actionsExtraArgument, plugin.actionsExtraArgument);
    if (plugin.hasOwnProperty('toolbarButtons')) plugin.toolbarButtons.forEach(function (button) {
      return toolbarButtons.push(button);
    });
    if (plugin.hasOwnProperty('contents')) Object.assign(customContents, plugin.contents);
    if (plugin.hasOwnProperty('reducer')) customReducer.push(plugin.reducer);
    if (plugin.hasOwnProperty('onReady')) onReady.push(plugin.onReady);
  });

  var customReducerFunc = customReducer.length > 0 ? funcChain(customReducer) : function (store) {
    return store;
  };
  var onReadyFunc = onReady.length > 0 ? funcChain(onReady) : function () {
    return null;
  };

  return {
    customActions: customActions,
    toolbarButtons: toolbarButtons,
    customContents: customContents,
    customReducer: customReducerFunc,
    actionsExtraArgument: actionsExtraArgument,
    onReady: onReadyFunc
  };
}