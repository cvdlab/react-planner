import React from 'react';
import Layer from './layer.jsx';
import Grid from './grid.jsx';

export default function Scene({scene}){

  let {height, layers} = scene;

  return (
    <g transform={`translate(0, ${height}) scale(1, -1)`}>
      <Grid scene={scene}/>
      {layers.entrySeq().map(([layerID, layer]) => <Layer key={layerID} layer={layer}/>)}
    </g>
  );
}


Scene.propTypes = {
  scene: React.PropTypes.object.isRequired
};
