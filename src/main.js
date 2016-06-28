"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/app.jsx';
import reducers from './reducers/reducer';

let middlewares = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
let store = createStore(reducers, null, middlewares);

ReactDOM.render(
  React.createElement(Provider, {store},
    React.createElement(App)
  ),
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
  projectActions: require('./actions/project'),
  viewer2d: require('./actions/viewer2d')
};
console.group("Metior");
console.info("Metior is ready");
console.info("console.log(Metior)");
console.log(Metior);
console.groupEnd();
