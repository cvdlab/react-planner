import React, {Component} from 'react';
import {Planner, PluginBrowserAutosave} from '../../src/index'; //react-planner

import MyCatalog from './catalog/mycatalog';
import MyPlugin from './plugins/myplugin/myplugin';

let plugins = [
  // MyPlugin,
  PluginBrowserAutosave('react-planner_v0')
];

export default class Demo extends Component {
  render() {
    return (
      <Planner catalog={MyCatalog} plugins={plugins}/>
    )
  }
}
