import React from 'react';
import Viewer2D from './viewer2d/viewer2d.jsx';
import Viewer3D from './viewer3d/viewer3d';
import {MODE_2D_ZOOM_OUT} from '../constants';

export default function Viewer({width, height, state, viewer2dActions}) {
  let scene = state.get('scene');
  let mode = state.get('mode');
  let viewer2d = state.get('viewer2d').toJS();

  let viewer = (mode === MODE_2D_ZOOM_OUT) ?
      React.createElement(Viewer3D, {scene, mode, width, height})
    : React.createElement(Viewer2D, {scene, mode, width, height, viewer2d, viewer2dActions});

  return viewer;
}

Viewer.propTypes = {
  state: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  viewer2dActions: React.PropTypes.object.isRequired
};

