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

  let patternID = `pattern_${element.id}_area`;
  let fill = element.selected ? "orange" : element.properties.get('patternColor');

  return (
    <g>
      <defs>
        <pattern id={patternID} width="10" height="10"
                 patternUnits="userSpaceOnUse" patternTransform={`rotate(${element.properties.get('patternDirection')})`}>
          <rect x="0" y="0" width="10" height="10" fill="#fff" />
          <rect x1="0" y1="0" width="4" height="10" stroke="0" fill={fill}/>
        </pattern>
      </defs>

      <path d={path} fill={`url(#${patternID})`}/>
    </g>
  )
}
