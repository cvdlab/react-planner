import React from 'react';

const STYLE_BASE = {stroke: "black", strokeWidth: "1px"};
const STYLE_SELECTED = {stroke: "#FFC107", strokeWidth: "1px"};
const STYLE_HOLE_BASE = {stroke: "black", strokeWidth: "3px"};

const {pow, sqrt, asin, PI} = Math;

function twoPointsDistance(x1, y1, x2, y2) {
  return sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2));
}

function angleBetweenTwoPoints(distance, y1, y2) {
  return asin((y1 - y2) / distance);
}


export default function Line({line, vertices, holes}) {

  let vertex0 = vertices.get(line.vertices.get(0));
  let vertex1 = vertices.get(line.vertices.get(1));

  let x1, y1, x2, y2;
  if (vertex0.x <= vertex1.x) {
    x1 = vertex0.x, y1 = vertex0.y;
    x2 = vertex1.x, y2 = vertex1.y;
  } else {
    x1 = vertex1.x, y1 = vertex1.y;
    x2 = vertex0.x, y2 = vertex0.y;
  }

  let lenght = sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2));
  let angle = (-asin((y1 - y2) / lenght)) * 180 / PI;


  let holesComp = line.holes.map(holeID => {
    let hole = holes.get(holeID);
    let startAt = lenght * hole.offset - hole.width / 2;
    return (
      <g key={holeID} transform={`translate(${startAt}, 0)`}>
        <line x1="0" y1="-10" x2="0" y2="10" style={STYLE_HOLE_BASE}/>
        <line x1={hole.width} y1="-10" x2={hole.width} y2="10" style={STYLE_HOLE_BASE}/>
        <line x1="0" y1="0" x2={hole.width} y2="0" style={STYLE_HOLE_BASE}/>
      </g>
    )
  });

  return (
    <g transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)`}>
      <line x1="0" y1="0" x2={lenght} y2="0" style={line.selected ? STYLE_SELECTED : STYLE_BASE}/>
      {holesComp}
    </g>
  );

}

Line.propTypes = {
  line: React.PropTypes.object.isRequired,
  vertices: React.PropTypes.object.isRequired,
  holes: React.PropTypes.object.isRequired
};
