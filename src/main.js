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
let Metior = window.Metior = {};
Metior.ReactPerf = require('react-addons-perf');
Metior.store = store;
Metior.dispatch = store.dispatch;
Metior.getState = () => store.getState().toJS();
Metior.actions = {
  projectActions: require('./actions/project-actions'),
  viewer2D: require('./actions/viewer2d-actions'),
  viewer3D: require('./actions/viewer3d-actions')
};
console.groupCollapsed("Metior");
console.info("Metior is ready");
console.info("console.log(Metior)");
console.log(Metior);
console.groupEnd();
