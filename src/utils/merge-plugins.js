function funcChain(functions) {
  return function (...args) {
    let i = 0;
    let res = args;
    while (i < functions.length) {
      let f = functions[i];
      res = f.call(this, ...res);
      i++;
    }
    return res;
  };
}


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

  customReducer.length > 0 ? customReducer = funcChain(customReducer) : store => store;
  onReady = onReady.length > 0 ? funcChain(onReady) : () => null;

  return {customActions, toolbarButtons, customContents, customReducer, actionsExtraArgument, onReady};
}
