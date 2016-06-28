import React from 'react';
import Viewer2D from './viewer2d/viewer2d.jsx';

export default function ({width, height, state}) {

  let scene = state.get('scene');
  let mode = state.get('mode');

  let viewer = Viewer2D;

  return React.createElement(viewer, {scene, mode, width, height});
}
