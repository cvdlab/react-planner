import React from 'react';
import {distanceFromTwoPoints} from '../../utils/geometry';

const STYLE_BASE = {stroke: "#8E9BA2", strokeWidth: "1px", fill: "#8E9BA2"};
const STYLE_SELECTED = {stroke: "#FFC107", strokeWidth: "1px", fill: "orange"};

export default function (line, layer) {

  //let line = layer.lines.get(hole.line);
  //let epsilon = line.properties.get('thickness') / 2;

  let epsilon = 3;

  let {x:x1, y:y1} = layer.vertices.get(line.vertices.get(0));
  let {x:x2, y: y2} = layer.vertices.get(line.vertices.get(1));

  let length = distanceFromTwoPoints(x1, y1, x2, y2);

  return <path
    d={`M${0} ${ -epsilon}  L${length} ${-epsilon}  L${length} ${epsilon}  L${0} ${epsilon}  z`}
    style={line.selected ? STYLE_SELECTED : STYLE_BASE}
  />

}
