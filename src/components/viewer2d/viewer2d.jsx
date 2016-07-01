"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import {Viewer, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from 'react-svg-pan-zoom';
import {MODE_2D_PAN, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT} from '../../constants';
import Scene from './scene.jsx';

const TOOLS_MAP = {
  MODE_2D_PAN: TOOL_PAN,
  MODE_2D_ZOOM_IN: TOOL_ZOOM_IN,
  MODE_2D_ZOOM_OUT: TOOL_ZOOM_OUT
};


export default function Viewer2D({scene, width, height, viewer2D, mode}, {viewer2DActions}) {

  if (!viewer2D.has('mode')) {
    viewer2D = ViewerHelper.getDefaultValue();
    viewer2D = ViewerHelper.fitSVGToViewer(viewer2D, scene.width, scene.height, width, height);
  } else {
    viewer2D = viewer2D.toJS();
  }


  let onChange = event => viewer2DActions.updateCameraView(event.value);
  let viewerTool = TOOLS_MAP.hasOwnProperty(mode) ? TOOLS_MAP[mode] : TOOL_NONE;

  return (
    <Viewer value={viewer2D} onChange={onChange} tool={viewerTool} width={width} height={height}>
      <svg width={scene.width} height={scene.height} style={{cursor: "crosshair"}}>
        <Scene scene={scene}/>
      </svg>
    </Viewer>
  );
}


Viewer2D.propTypes = {
  mode: React.PropTypes.string.isRequired,
  scene: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  viewer2D: React.PropTypes.object.isRequired
};

Viewer2D.contextTypes = {
  viewer2DActions: React.PropTypes.object.isRequired
};
