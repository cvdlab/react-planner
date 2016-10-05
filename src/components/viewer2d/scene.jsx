import React, {PropTypes} from 'react';
import Layer from './layer.jsx';
import Grid from './grid.jsx';
import * as constants from '../../constants';
export default function Scene({scene, mode}) {

  let {height, layers} = scene;
  let selectedLayer = scene.layers.get(scene.selectedLayer);

  let style = [
    constants.MODE_WAITING_DRAWING_LINE,
    constants.MODE_DRAWING_LINE,
    constants.MODE_DRAWING_HOLE,
    constants.MODE_DRAWING_ITEM,
    constants.MODE_DRAGGING_HOLE,
    constants.MODE_DRAGGING_ITEM,
    constants.MODE_DRAGGING_LINE,
    constants.MODE_DRAGGING_VERTEX
  ].includes(mode) ? {pointerEvents: 'none'} : {};

  return (
    <g style={style}>
      <Grid scene={scene}/>

      <g style={{opacity: 0.3, pointerEvents: "none"}}>
        {layers.entrySeq()
          .filter(([layerID, layer]) => layerID !== scene.selectedLayer && layer.visible)
          .map(([layerID, layer]) => <Layer key={layerID} layer={layer} mode={mode}/>)}
      </g>

      <Layer key={selectedLayer.id} layer={selectedLayer} mode={mode} pixelPerUnit={scene.pixelPerUnit}
             unit={scene.unit}/>
    </g>
  );
}


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
