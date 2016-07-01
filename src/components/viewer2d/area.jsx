import React from 'react';

const STYLE_BASE = {opacity: 0.3};
const STYLE_SELECTED = {opacity: 0.8, fill: "orange"};

export default function Area({layerID, area, vertices}, {editingActions}) {

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
          <rect x1="0" y1="0" width="4" height="10" fill={area.patternColor} stroke="0"
                style={area.selected ? STYLE_SELECTED : STYLE_BASE}/>
        </pattern>
      </defs>
      <path d={path} fill={`url(#${patternID})`} onClick={event => editingActions.selectArea(layerID, area.id)}/>
    </g>
  )

}

Area.propTypes = {
  vertices: React.PropTypes.object.isRequired,
  area: React.PropTypes.object.isRequired,
  layerID: React.PropTypes.string.isRequired
};

Area.contextTypes = {
  editingActions: React.PropTypes.object
};

