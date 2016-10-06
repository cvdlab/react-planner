import React, {PropTypes, Component} from 'react';
import {Planner} from '../../src/index';
import actions from '../../src/actions/actions';

import MyCatalog from './catalog/mycatalog';
import MyToolbarButtons from './addons/mytoolbar-buttons.jsx';
import MyContent from './addons/mycontent.jsx';
import MyReducer from './addons/myreducer.js';



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
               catalog={MyCatalog}
               toolbarButtons={MyToolbarButtons}
               customContents={MyContent}
               customReducer={MyReducer}/>

    )
  }

}
