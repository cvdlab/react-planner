import React, { PropTypes } from 'react';

import Scene from './scene';
import Snap from './snap';

export default function State(_ref) {
  var state = _ref.state,
      catalog = _ref.catalog;
  var viewer2D = state.viewer2D,
      mode = state.mode,
      activeSnapElement = state.activeSnapElement,
      snapElements = state.snapElements,
      scene = state.scene;
  var width = scene.width,
      height = scene.height;


  activeSnapElement = activeSnapElement ? React.createElement(Snap, { snap: activeSnapElement, width: scene.width, height: scene.height }) : null;
  // snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return React.createElement(
    'g',
    null,
    React.createElement('rect', { x: '0', y: '0', width: width, height: height, fill: '#fff' }),
    React.createElement(
      'g',
      { transform: 'translate(0, ' + scene.height + ') scale(1, -1)' },
      React.createElement(Scene, { scene: scene, catalog: catalog }),
      activeSnapElement,
      snapElements
    )
  );
}

State.propTypes = {
  state: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};