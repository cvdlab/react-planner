import React from 'react';
import Line from './line.jsx';
import Area from './area.jsx';
import Vertex from './vertex.jsx';
import Image from './image.jsx';

export default function Layer({layer, mode}) {

  let {lines, areas, vertices, holes, images, id: layerID} = layer;

  return (
    <g>
      {images.entrySeq().map(([imageID, image]) => <Image key={imageID} layer={layer} image={image} mode={mode} />)}
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} layer={layer} area={area} mode={mode} />)}
      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} layer={layer} line={line} mode={mode} />)}
      {vertices.entrySeq().map(([vertexID, vertex]) => <Vertex key={vertexID} layer={layer} vertex={vertex} mode={mode} />)}
    </g>
  );

}

Layer.propTypes = {
  layer: React.PropTypes.object.isRequired,
  mode: React.PropTypes.string.isRequired
};
