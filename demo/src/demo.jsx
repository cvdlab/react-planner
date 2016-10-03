import React, {PropTypes, Component} from 'react';
import {Planner, Catalog} from '../../src/index';
import actions from '../../src/actions/actions';

//INIT CATALOG
import area from './catalog/areas/area/area';
import door from './catalog/holes/door/door';
import windowCat from './catalog/holes/window/window';
import sashWindow from './catalog/holes/sash-window/sash-window';
import wall from './catalog/lines/wall/wall';
import item from './catalog/items/sofa/sofa';
import tv from './catalog/items/tv/tv';
import PropertyComposition from './addons/property-composition.jsx';


let catalog = new Catalog();
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
import ButtonX from './addons/buttonX.jsx';
let toolbarButtons = [
  ButtonX
];

//INIT CUSTOM CONTENT
import ContentX from './addons/contentX.jsx';
let customContents = {
  'MODE_MY_MODE': ContentX
};

//INIT CUSTOM REDUCER
let customReducer = (state, action) => {
  // console.log(action);
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

export default class Demo extends Component {

  render() {
    return (
      <Planner onReady={onReady}
               catalog={catalog}
               toolbarButtons={toolbarButtons}
               customContents={customContents}
               customReducer={customReducer}/>

    )
  }

}

Demo.propTypes = {};

Demo.contextTypes = {};
