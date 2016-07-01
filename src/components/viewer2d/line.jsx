import React from 'react';

const STYLE_BASE = {stroke: "#8E9BA2", strokeWidth: "1px", fill: "#e8e8e8"};
const STYLE_SELECTED = {stroke: "#FFC107", strokeWidth: "1px", fill: "orange"};

const STYLE_HOLE_BASE = {stroke: "#737373", strokeWidth: "3px", fill: "#737373"};
const STYLE_HOLE_SELECTED = {stroke: "#737373", strokeWidth: "3px", fill: "orange"};

const {pow, sqrt, asin, PI} = Math;

function twoPointsDistance(x1, y1, x2, y2) {
  return sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2));
}

function angleBetweenTwoPoints(distance, y1, y2) {
  return asin((y1 - y2) / distance);
}


export default function Line({line, vertices, holes, layerID}, {editingActions}) {

  let vertex0 = vertices.get(line.vertices.get(0));
  let vertex1 = vertices.get(line.vertices.get(1));

  let x1, y1, x2, y2;
  if (vertex0.x <= vertex1.x) {
    ({x: x1, y: y1} = vertex0);
    ({x: x2, y: y2} = vertex1);
  } else {
    ({x: x1, y: y1} = vertex1);
    ({x: x2, y: y2} = vertex0);
  }

  let lenght = sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2));
  let angle = (-asin((y1 - y2) / lenght)) * 180 / PI;
  let epsilon = line.thickness / 2;

  let holesComp = line.holes.map(holeID => {
    let hole = holes.get(holeID);
    let startAt = lenght * hole.offset - hole.width / 2;
    let holePath = `M${0} ${ -epsilon}  L${hole.width} ${-epsilon}  L${hole.width} ${epsilon}  L${0} ${epsilon}  z`;
    let holeStyle = hole.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    return (
      <g key={holeID} transform={`translate(${startAt}, 0)`}>
        <path d={holePath} style={holeStyle} onClick={event => editingActions.selectHole(layerID, hole.id)}/>
        <line x1={hole.width / 2} y1={- 10 - epsilon} x2={hole.width / 2} y2={10 + epsilon} style={holeStyle}/>
      </g>
    )
  });


  return (
    <g transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)`}>
      <path
        d={`M${0} ${ -epsilon}  L${lenght} ${-epsilon}  L${lenght} ${epsilon}  L${0} ${epsilon}  z`}
        style={line.selected ? STYLE_SELECTED : STYLE_BASE}
        onClick={event => editingActions.selectLine(layerID, line.id)}/>
      {holesComp}
    </g>
  );

}

Line.propTypes = {
  line: React.PropTypes.object.isRequired,
  vertices: React.PropTypes.object.isRequired,
  holes: React.PropTypes.object.isRequired,
  layerID: React.PropTypes.string.isRequired
};

Line.contextTypes = {
  editingActions: React.PropTypes.object
};
