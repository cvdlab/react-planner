import React from 'react';

const STYLE_HOLE_BASE = {stroke: "#000", strokeWidth: "3px", fill: "#000"};
const STYLE_HOLE_SELECTED = {stroke: "orange", strokeWidth: "3px", fill: "orange"};

export default function (hole, layer) {
  //let line = layer.lines.get(hole.line);
  //let epsilon = line.properties.get('thickness') / 2;

  let epsilon = 3;

  let holeWidth = hole.properties.get('width');
  let holePath = `M${0} ${ -epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
  let holeStyle = hole.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;

  return (
    <g>
      <path d={holePath} style={holeStyle}/>
      <line x1={holeWidth / 2 } y1={- 10 - epsilon} x2={holeWidth / 2 } y2={10 + epsilon} style={holeStyle}/>
    </g>
  );
}
