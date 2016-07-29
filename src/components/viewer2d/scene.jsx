import React, {PropTypes} from 'react';
import Layer from './layer.jsx';
import Grid from './grid.jsx';

export default function Scene({scene, ignoreEvents}) {

  let {height, layers} = scene;
  let style = ignoreEvents ? {pointerEvents: 'none'} : {};

  return (
    <g style={style}>
      <Grid scene={scene}/>
      {layers.entrySeq().map(([layerID, layer]) => <Layer key={layerID} layer={layer}/>)}
    </g>
  );
}


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  ignoreEvents: PropTypes.bool.isRequired
};
