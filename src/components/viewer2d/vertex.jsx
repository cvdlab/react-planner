import React, {PropTypes} from 'react';

const STYLE={
  fill: '#485054'
};

export default function Vertex({vertex, layer, mode}) {

  let {x, y} = vertex;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r="4" style={STYLE}></circle>
    </g>
  );
}

Vertex.propTypes = {
  vertex: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
