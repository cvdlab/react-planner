'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergePlugins;
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

  var onReadyFunc = function onReadyFunc(store) {
    onReady.forEach(function (f) {
      return f(store);
    });
  };

  var customReducerFunc = function customReducerFunc(state, action) {
    customReducer.forEach(function (f) {
      return state = f(state, action);
    });
    return state;
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