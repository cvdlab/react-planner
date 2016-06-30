import React from 'react';
import Viewer2D from './viewer2d/viewer2d.jsx';
import Viewer3D from './viewer3d/viewer3d';
import {MODE_3D_VIEW} from '../constants';

export default function Viewer({width, height, state, viewer2DActions}) {
  let scene = state.get('scene');
  let mode = state.get('mode');
  let viewer2D = state.get('viewer2D');

  let viewer = (mode === MODE_3D_VIEW) ?
      React.createElement(Viewer3D, {scene, mode, width, height})
    : React.createElement(Viewer2D, {scene, mode, width, height, viewer2D, viewer2DActions});

  return viewer;
}

Viewer.propTypes = {
  state: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  viewer2DActions: React.PropTypes.object.isRequired
};

