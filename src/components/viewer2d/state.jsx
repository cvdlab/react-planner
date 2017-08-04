import React from 'react';
import PropTypes from 'prop-types';
import Scene from './scene';
import Snap from './snap';
import * as SharedStyle from '../../shared-style';

export default function State({state, catalog}) {

  let {viewer2D, mode, activeSnapElement, snapElements, scene} = state;
  let {width, height} = scene;

  activeSnapElement = activeSnapElement ?
    <Snap snap={activeSnapElement} width={scene.width} height={scene.height}/> : null;
// snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return (
    <g>
      <rect x="0" y="0" width={width} height={height} fill={SharedStyle.COLORS.white}/>
      <g transform={`translate(0, ${scene.height}) scale(1, -1)`}>
        <Scene scene={scene} catalog={catalog}/>
        {activeSnapElement}
        {snapElements}
      </g>
    </g>
  )
}

State.propTypes = {
  state: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
