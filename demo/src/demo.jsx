import React, {PropTypes, Component} from 'react';
import {Planner} from '../../src/index'; //react-planner

import MyCatalog from './catalog/mycatalog';
import MyPlugin from './plugins/myplugin/myplugin';

let onReady = (store) => {
  console.log('ready!');
};

export default class Demo extends Component {
  render() {
    return (
      <Planner onReady={onReady} catalog={MyCatalog} plugins={[MyPlugin]} />
    )
  }
}
