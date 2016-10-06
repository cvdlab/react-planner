import React, {PropTypes, Component} from 'react';
import {Planner} from '../../src/index';

import MyCatalog from './catalog/mycatalog';
import MyToolbarButtons from './addons/mytoolbar-buttons.jsx';
import MyContent from './addons/mycontent.jsx';
import MyReducer from './addons/myreducer.js';


let onReady = (store) => {
  console.log('ready!');
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
