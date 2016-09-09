import React from 'react';
import Line from './line.jsx';
import Area from './area.jsx';

export default function Layer({layer, mode}) {

  let {lines, areas, vertices, holes, id: layerID} = layer;

  return (
    <g>
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} layer={layer} area={area} mode={mode} />)}

      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} layer={layer} line={line} mode={mode} />)}
    </g>
  );

}

Layer.propTypes = {
  layer: React.PropTypes.object.isRequired,
  mode: React.PropTypes.string.isRequired
};
