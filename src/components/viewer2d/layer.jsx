import React from 'react';
import Line from './line.jsx';
import Area from './area.jsx';

export default function Layer({layer}) {

  let {lines, areas, vertices, holes} = layer;

  return (
    <g>
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} area={area} vertices={vertices}/>)}
      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} line={line} vertices={vertices} holes={holes}/>)}
    </g>
  );

}

Layer.propTypes = {
  layer: React.PropTypes.object.isRequired
};
