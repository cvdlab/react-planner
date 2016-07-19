"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';
import store from './reducers/store';
import autosave from './autosave';

autosave(store);

ReactDOM.render(
  React.createElement(App, {store}),
  document.getElementById('app')
);


/*************************************************************************
 ****************************** DEBUG ************************************
 *************************************************************************/
window.Metior = {
  ReactPerf: require('react-addons-perf'),
  store: store,
  dispatch: store.dispatch,
  getState: () => store.getState().toJS(),
  projectActions: require('./actions/project-actions'),
  editingActions: require('./actions/editing-actions'),
  viewer2DActions: require('./actions/viewer2d-actions'),
  viewer3DActions: require('./actions/viewer3d-actions'),
  volumesActions: require('./actions/volumes-actions'),
  drawingActions: require('./actions/drawing-actions')
};
console.groupCollapsed("Metior");
console.info("Metior is ready");
console.info("console.log(Metior)");
console.log(window.Metior);
console.groupEnd();
