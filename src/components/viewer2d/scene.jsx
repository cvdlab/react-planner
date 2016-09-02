import React, {PropTypes} from 'react';
import Layer from './layer.jsx';
import Grid from './grid.jsx';

export default function Scene({scene, ignoreEvents}) {

  let {height, layers} = scene;
  let style = ignoreEvents ? {pointerEvents: 'none'} : {};
  let selectedLayer = scene.layers.get(scene.selectedLayer);

  return (
    <g style={style}>
      <Grid scene={scene}/>

      <g style={{opacity: 0.3}}>
        {layers.entrySeq()
          .filter(([layerID, layer]) => layerID !== scene.selectedLayer && layer.visible)
          .map(([layerID, layer]) => <Layer key={layerID} layer={layer}/>)}
      </g>

      <Layer key={selectedLayer.id} layer={selectedLayer}/>
    </g>
  );
}


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  ignoreEvents: PropTypes.bool.isRequired
};
