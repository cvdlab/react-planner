import React from 'react';
import Viewer2D from './viewer2d/viewer2d.jsx';
import Viewer3D from './viewer3d/viewer3d';
import Viewer3DFirstPerson from './viewer3d/viewer3d-first-person';
import {MODE_3D_VIEW, MODE_3D_FIRST_PERSON} from '../constants';

export default function Viewer({width, height, state}, {viewer2DActions}) {
  let scene = state.get('scene');
  let mode = state.get('mode');
  let viewer2D = state.get('viewer2D');

  let viewer;

  switch (mode) {
    case MODE_3D_VIEW:
      viewer = React.createElement(Viewer3D, {scene, mode, width, height});
      break;

    case MODE_3D_FIRST_PERSON:
      viewer = React.createElement(Viewer3DFirstPerson, {scene, mode, width, height});
      break;

    default:
      viewer = React.createElement(Viewer2D, {scene, mode, width, height, viewer2D, viewer2DActions});
  }

  return viewer;
}

Viewer.propTypes = {
  state: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

Viewer.contextTypes = {
  viewer2DActions: React.PropTypes.object.isRequired
};

