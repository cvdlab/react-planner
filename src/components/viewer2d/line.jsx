import React, {PropTypes} from 'react';

const STYLE_BASE = {stroke: "#8E9BA2", strokeWidth: "1px", fill: "#8E9BA2"};
const STYLE_SELECTED = {stroke: "#FFC107", strokeWidth: "1px", fill: "orange"};


const {pow, sqrt, asin, PI} = Math;

function twoPointsDistance(x1, y1, x2, y2) {
  return sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2));
}

function angleBetweenTwoPoints(distance, y1, y2) {
  return asin((y1 - y2) / distance);
}


export default function Line({line, layer}, {editingActions, sceneComponents}) {

  let vertex0 = layer.vertices.get(line.vertices.get(0));
  let vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.id === vertex1.id) return null; //avoid 0-length lines

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
  //let epsilon = line.thickness / 2;
  let epsilon = 3;

  let holesComp = line.holes.map(holeID => {
    let hole = layer.holes.get(holeID);
    let onHoleClick = event => {
      editingActions.selectHole(layerID, hole.id);
      event.stopPropagation();
    };

    let startAt = lenght * hole.offset - hole.properties.get('width') / 2;
    let renderedHole = sceneComponents[hole.type].render2D(hole, layer);

    return (<g key={holeID} transform={`translate(${startAt}, 0)`} onClick={onHoleClick}> {renderedHole} </g>);
  });


  let onLineClick = event => {
    editingActions.selectLine(layer.id, line.id);
    event.stopPropagation();
  };

  return (
    <g transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)`}>
      <path
        d={`M${0} ${ -epsilon}  L${lenght} ${-epsilon}  L${lenght} ${epsilon}  L${0} ${epsilon}  z`}
        style={line.selected ? STYLE_SELECTED : STYLE_BASE}
        onClick={onLineClick}/>
      {holesComp}
    </g>
  );

}

Line.propTypes = {
  line: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

Line.contextTypes = {
  editingActions: PropTypes.object,
  sceneComponents: React.PropTypes.object
};
