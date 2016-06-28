"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import {Viewer, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from 'react-svg-pan-zoom';
import {MODE_2D_PAN, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT} from '../../constants';
import Scene from './scene.jsx';

const TOOLS_MAP = {
  MODE_2D_PAN: TOOL_PAN,
  MODE_2D_ZOOM_IN: TOOL_ZOOM_IN,
  MODE_2D_ZOOM_OUT: TOOL_ZOOM_OUT
};


export default class Viewer2D extends React.Component {

  render() {
    let props = this.props;

    let {scene, width, height, viewer2d, viewer2dActions, mode} = props;

    let onChange = event => viewer2dActions.updateCameraView(event.value);
    let viewerTool = TOOLS_MAP.hasOwnProperty(mode) ? TOOLS_MAP[mode] : TOOL_NONE;

    return (
      <Viewer value={viewer2d.state} onChange={onChange} tool={viewerTool} width={width} height={height}>
        <svg width={scene.width} height={scene.height} style={{cursor: "crosshair"}}>
          <Scene scene={scene}/>
        </svg>
      </Viewer>
    );
  }
}

Viewer2D.propTypes = {
  mode: React.PropTypes.string.isRequired,
  scene: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  viewer2d: React.PropTypes.object.isRequired,
  viewer2dActions: React.PropTypes.object.isRequired
};
