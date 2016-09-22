import React from 'react';

export default function (element, layer) {
  let path = "";
  let first = true;

  element.vertices.valueSeq()
    .map(vertexID => layer.vertices.get(vertexID))
    .forEach((vertex, vertexID) => {
      path += `${first ? 'M' : 'L'} ${vertex.x} ${vertex.y} `;
      first = false;
    });

  let fill = element.selected ? "#99c3fb" : element.properties.get('patternColor');

  return (
    <g>
      <path d={path} fill={fill}/>
    </g>
  )
}
