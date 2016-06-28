import React from 'react';
import Viewer2D from './viewer2d/viewer2d.jsx';

export default function Viewer ({width, height, state, viewer2dActions}) {
  let scene = state.get('scene');
  let mode = state.get('mode');
  let viewer2d = state.get('viewer2d').toJS();

  let viewer = React.createElement(Viewer2D, {scene, mode, width, height, viewer2d, viewer2dActions});

  return viewer;
}

Viewer.propTypes = {
  state: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  viewer2dActions: React.PropTypes.object.isRequired
};

