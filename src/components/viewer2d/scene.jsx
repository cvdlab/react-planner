import React, {PropTypes} from 'react';
import Layer from './layer';
import Guides from './guides/guides';
export default function Scene({scene, mode, catalog}) {

  let {height, layers} = scene;
  let selectedLayer = scene.layers.get(scene.selectedLayer);

  return (
    <g>
      <Guides scene={scene}/>

      <g style={{opacity: 0.3, pointerEvents: "none"}}>
        {layers.entrySeq()
          .filter(([layerID, layer]) => layerID !== scene.selectedLayer && layer.visible)
          .map(([layerID, layer]) => <Layer key={layerID} layer={layer} mode={mode} scene={scene} catalog={catalog}/>)}
      </g>

      <Layer key={selectedLayer.id} layer={selectedLayer} mode={mode} scene={scene} catalog={catalog}/>
    </g>
  );
}


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  catalog: PropTypes.object.isRequired
};
