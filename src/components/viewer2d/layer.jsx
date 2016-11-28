import React, {PropTypes} from 'react';
import Line from './line';
import Area from './area';
import Vertex from './vertex';
import Item from './item';

export default function Layer({layer, mode, scene, catalog}) {

  let {unit} = scene;
  let {lines, areas, vertices, holes, id: layerID, items} = layer;

  return (
    <g>
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} layer={layer} area={area} mode={mode}
                                                      unit={unit} catalog={catalog}/>)}
      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} layer={layer} line={line} mode={mode}
                                                      scene={scene} catalog={catalog}/>)}
      {items.entrySeq().map(([itemID, item]) => <Item key={itemID} layer={layer} item={item} mode={mode}
                                                      scene={scene} catalog={catalog}/>)}
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
  catalog: PropTypes.object.isRequired,
};
