export default function mergePlugins(plugins) {

  let customActions = {};
  let toolbarButtons = [];
  let customContents = {};
  let customReducer = [];
  let actionsExtraArgument = {};
  let onReady = [];

  plugins.forEach(plugin => {
    if (plugin.hasOwnProperty('actions')) Object.assign(customActions, plugin.actions);
    if (plugin.hasOwnProperty('actionsExtraArgument')) Object.assign(actionsExtraArgument, plugin.actionsExtraArgument);
    if (plugin.hasOwnProperty('toolbarButtons')) plugin.toolbarButtons.forEach(button => toolbarButtons.push(button));
    if (plugin.hasOwnProperty('contents')) Object.assign(customContents, plugin.contents);
    if (plugin.hasOwnProperty('reducer')) customReducer.push(plugin.reducer);
    if (plugin.hasOwnProperty('onReady')) onReady.push(plugin.onReady);
  });

  let onReadyFunc = store => {
    onReady.forEach(f => f(store))
  };

  let customReducerFunc = (state, action) => {
    customReducer.forEach(f => state = f(state, action));
    return state;
  };

  return {
    customActions,
    toolbarButtons,
    customContents,
    customReducer: customReducerFunc,
    actionsExtraArgument,
    onReady: onReadyFunc
  };
}
