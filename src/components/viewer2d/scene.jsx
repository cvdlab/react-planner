import React, {PropTypes} from 'react';
import Layer from './layer.jsx';
import Grid from './grid.jsx';
export default function Scene({scene, mode}) {

  let {height, layers} = scene;
  let selectedLayer = scene.layers.get(scene.selectedLayer);

  return (
    <g>
      <Grid scene={scene}/>

      <g style={{opacity: 0.3, pointerEvents: "none"}}>
        {layers.entrySeq()
          .filter(([layerID, layer]) => layerID !== scene.selectedLayer && layer.visible)
          .map(([layerID, layer]) => <Layer key={layerID} layer={layer} mode={mode} scene={scene}/>)}
      </g>

      <Layer key={selectedLayer.id} layer={selectedLayer} mode={mode} scene={scene}/>
    </g>
  );
}


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
