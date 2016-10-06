import React, {PropTypes} from 'react';
import Line from './line.jsx';
import Area from './area.jsx';
import Vertex from './vertex.jsx';
import Image from './image.jsx';
import Item from './item.jsx';

export default function Layer({layer, mode, scene}) {

  let {pixelPerUnit, unit} = scene;
  let {lines, areas, vertices, holes, id: layerID, items} = layer;

  return (
    <g>
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} layer={layer} area={area} mode={mode}
                                                      pixelPerUnit={pixelPerUnit} unit={unit}/>)}
      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} layer={layer} line={line} mode={mode}
                                                      scene={scene}/>)}
      {items.entrySeq().map(([itemID, item]) => <Item key={itemID} layer={layer} item={item} mode={mode}
                                                      scene={scene}/>)}
      {vertices.entrySeq()
        .filter(([vertexID, vertex]) => vertex.selected)
        .map(([vertexID, vertex]) => <Vertex key={vertexID} layer={layer} vertex={vertex} mode={mode}/>)}
    </g>
  );

}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  scene: PropTypes.object.isRequired,
};
