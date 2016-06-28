"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Layer from './layer.jsx';
import Grid from './grid.jsx';

export default class Viewer2D extends React.Component {

  render() {

    let {scene, width, height} = this.props;
    let layers = scene.layers;

    return (
      <div ref="svgWrapper">
        <svg width={width} height={height} style={{cursor: "crosshair"}}>
          <g transform={`translate(0, ${height}) scale(1, -1)`}>
            <Grid scene={scene}/>
            {layers.entrySeq().map(([layerID, layer]) => <Layer key={layerID} layer={layer}/>)}
          </g>
        </svg>
      </div>
    );
  }
}

Viewer2D.propTypes = {
  mode: React.PropTypes.string.isRequired,
  scene: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};
