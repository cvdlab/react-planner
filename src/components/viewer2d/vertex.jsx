import React, {PropTypes} from 'react';

const STYLE = {fill: "#0096fd", stroke: "#fff", cursor: "move"};

export default function Vertex({vertex, layer, mode}) {

  let {x, y} = vertex;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      data-element-root
      data-prototype={vertex.prototype}
      data-id={vertex.id}
      data-selected={vertex.selected}
      data-layer={layer.id}
    >
      <circle cx="0" cy="0" r="7" style={STYLE}/>
    </g>
  );
}

Vertex.propTypes = {
  vertex: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
