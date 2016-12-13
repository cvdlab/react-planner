import React, {Component} from 'react';
import {Planner} from '../../src/index'; //react-planner
import ContainerDimensions from 'react-container-dimensions';
import MyCatalog from './catalog/mycatalog';


export default class Demo extends Component {
  render() {
    return (
      <ContainerDimensions>
        <Planner catalog={MyCatalog} width={800} height={600} autosaveKey={'react-planner_v0'}/>
      </ContainerDimensions>
    )
  }
}


