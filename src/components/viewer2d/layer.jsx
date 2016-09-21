import React, {PropTypes} from 'react';
import Line from './line.jsx';
import Area from './area.jsx';
import Vertex from './vertex.jsx';
import Image from './image.jsx';

export default function Layer({layer, mode, pixelPerUnit, unit}) {

  let {lines, areas, vertices, holes, images, id: layerID} = layer;

  return (
    <g>
      {images.entrySeq().map(([imageID, image]) => <Image key={imageID} layer={layer} image={image} mode={mode}/>)}
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} layer={layer} area={area} mode={mode}
                                                      pixelPerUnit={pixelPerUnit} unit={unit}/>)}
      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} layer={layer} line={line} mode={mode}
                                                      pixelPerUnit={pixelPerUnit} unit={unit}/>)}
      {vertices.entrySeq()
        .filter(([vertexID, vertex]) => vertex.selected)
        .map(([vertexID, vertex]) => <Vertex key={vertexID} layer={layer} vertex={vertex} mode={mode}/>)}
    </g>
  );

}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  pixelPerUnit: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};
