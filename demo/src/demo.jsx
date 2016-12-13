import React, {Component} from 'react';
import {Planner} from '../../src/index'; //react-planner
import ReactDimensions from 'react-dimensions';

import MyCatalog from './catalog/mycatalog';
import MyPlugin from './plugins/myplugin/myplugin';

export default class Demo extends Component {
  render() {
    return (
      <Planner catalog={MyCatalog} width={800} height={500} autosaveKey={'react-planner_v0'}/>
    )
  }
}


