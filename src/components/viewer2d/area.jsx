import React from 'react';

const STYLE_BASE = {};
const STYLE_SELECTED = {fill: "orange"};

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
  let onClick = event => {
    editingActions.selectArea(layerID, area.id);
    event.stopPropagation();
  };

  return (
    <g>
      <defs>
        <pattern id={patternID} width="10" height="10"
                 patternUnits="userSpaceOnUse" patternTransform={`rotate(${area.properties.get('patternDirection')})`}>
          <rect x="0" y="0" width="10" height="10" fill="#fff" />
          <rect x1="0" y1="0" width="4" height="10" fill={area.properties.get('patternColor')} stroke="0"
                style={area.selected ? STYLE_SELECTED : STYLE_BASE}/>
        </pattern>
      </defs>

      <path d={path} fill={`url(#${patternID})`} onClick={onClick}/>
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

