import React from 'react';
import Line from './line.jsx';
import Area from './area.jsx';

export default function Layer({layer}) {

  let {lines, areas, vertices, holes, id: layerID} = layer;

  return (
    <g>
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} layer={layer} area={area}/>)}

      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} layer={layer} line={line} />)}
    </g>
  );

}

Layer.propTypes = {
  layer: React.PropTypes.object.isRequired
};
