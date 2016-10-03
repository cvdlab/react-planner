"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Planner from './components/planner.jsx';
import actions from './actions/actions';
import Catalog from './catalog/catalog';


//INIT CATALOG
import area from './catalog/areas/area/area';
import door from './catalog/holes/door/door';
import windowCat from './catalog/holes/window/window';
import sashWindow from './catalog/holes/sash-window/sash-window';
import wall from './catalog/lines/wall/wall';
import item from './catalog/items/sofa/sofa';
import tv from './catalog/items/tv/tv';

import PropertyColor from './catalog/properties/property-color.jsx';
import PropertyEnum from './catalog/properties/property-enum.jsx';
import PropertyString from './catalog/properties/property-string.jsx';
import PropertyNumber from './catalog/properties/property-number.jsx';
import PropertyComposition from './catalog/properties/property-composition.jsx';


let catalog = new Catalog();

catalog.registerPropertyType('color', PropertyColor, PropertyColor);
catalog.registerPropertyType('enum', PropertyEnum, PropertyEnum);
catalog.registerPropertyType('string', PropertyString, PropertyString);
catalog.registerPropertyType('number', PropertyNumber, PropertyNumber);
catalog.registerPropertyType('composition', PropertyComposition, PropertyComposition);


catalog.registerElement(area);
catalog.registerElement(door);
catalog.registerElement(windowCat);
catalog.registerElement(sashWindow);
catalog.registerElement(wall);
catalog.registerElement(item);
catalog.registerElement(tv);
//END CATALOG

//INIT TOOLBAR BUTTONS
import ButtonX from './demo/buttonX.jsx';
let toolbarButtons = [
  ButtonX
];

//INIT CUSTOM CONTENT
import ContentX from './demo/contentX.jsx';
let customContents = {
  'MODE_MY_MODE': ContentX
};

//INIT CUSTOM REDUCER
let customReducer = (state, action) => {
  console.log(action)
  return state;
};



let onReady = (store) => {
  window.Metior = {
    store,
    dispatch: store.dispatch,
    getState: () => store.getState().toJS(),
    ...actions
  };
  console.groupCollapsed("Metior");
  console.info("Metior is ready");
  console.info("console.log(Metior)");
  console.log(window.Metior);
  console.groupEnd();
};

ReactDOM.render(
  React.createElement(Planner, {onReady, catalog, toolbarButtons, customContents, customReducer}),
  document.getElementById('app')
);

