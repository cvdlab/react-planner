import React, {PropTypes} from 'react';
import Layer from './layer.jsx';
import Grid from './grid.jsx';
import {MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE} from '../../constants';
export default function Scene({scene, mode}) {

  let {height, layers} = scene;
  let selectedLayer = scene.layers.get(scene.selectedLayer);

  let style = [
    MODE_WAITING_DRAWING_LINE,
    MODE_DRAWING_LINE,
    MODE_DRAWING_HOLE,
    MODE_DRAWING_HOLE
  ].includes(mode) ? {pointerEvents: 'none'} : {};

  return (
    <g style={style}>
      <Grid scene={scene}/>

      <g style={{opacity: 0.3, pointerEvents: "none"}}>
        {layers.entrySeq()
          .filter(([layerID, layer]) => layerID !== scene.selectedLayer && layer.visible)
          .map(([layerID, layer]) => <Layer key={layerID} layer={layer} mode={mode}/>)}
      </g>

      <Layer key={selectedLayer.id} layer={selectedLayer} mode={mode} scene={scene}/>
    </g>
  );
}


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
