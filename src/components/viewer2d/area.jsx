import React from 'react';


export default function Area(props) {

  let {area, vertices} = props;
  let path = "";
  let first = true;

  area.vertices
    .valueSeq()
    .map(vertexID => vertices.get(vertexID))
    .forEach((vertex, vertexID) => {
      path += `${first ? 'M' : 'L'} ${vertex.x} ${vertex.y} `;
      first = false;
    });

  let patternID = `pattern_${area.id}_area`;

  return (
    <g>
      <defs xmlns="http://www.w3.org/2000/svg">
        <pattern id={patternID} width="10" height="10"
                 patternUnits="userSpaceOnUse" patternTransform={`rotate(${area.patternDirection})`}>
          <rect x1="0" y1="0" width="4" height="10" fill={area.patternColor} stroke="0" style={{opacity: 0.3}}/>
        </pattern>
      </defs>
      <path d={path} fill={`url(#${patternID})`}/>
    </g>
  )

}

Area.propTypes = {
  vertices: React.PropTypes.object.isRequired,
  area: React.PropTypes.object.isRequired
};
