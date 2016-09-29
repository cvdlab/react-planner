"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';
import initStore from './reducers/store';
import autosave from './autosave';
import keyboard from './keyboard';
import actions from './actions/actions';
import Catalog from './catalog/catalog';


//init catalog-view
import area from './catalog/areas/area/area';
import door from './catalog/holes/door/door';
import window from './catalog/holes/window/window';
import wall from './catalog/lines/wall/wall';
import item from './catalog/items/sofa/sofa';
import tv from './catalog/items/tv/tv';

let catalog = new Catalog();
catalog.registerElement(area);
catalog.registerElement(door);
catalog.registerElement(window);
catalog.registerElement(wall);
catalog.registerElement(item);
catalog.registerElement(tv);


//init store
let store = initStore({catalog});

autosave(store);
keyboard(store);

ReactDOM.render(
  React.createElement(App, {store, catalog}),
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
  ...actions
};
console.groupCollapsed("Metior");
console.info("Metior is ready");
console.info("console.log(Metior)");
console.log(window.Metior);
console.groupEnd();
