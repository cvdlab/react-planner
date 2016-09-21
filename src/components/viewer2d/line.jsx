import React, {PropTypes} from 'react';
import {distanceFromTwoPoints, angleBetweenTwoPointsAndOrigin} from '../../utils/geometry';
import {MODE_IDLE} from '../../constants';

export default function Line({line, layer, mode}, {editingActions, sceneComponents}) {

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

  let length = distanceFromTwoPoints(x1, y1, x2, y2);
  let angle = angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2);

  let renderedHoles = line.holes.map(holeID => {
    let hole = layer.holes.get(holeID);
    let startAt = length * hole.offset - hole.properties.get('width') / 2;
    let renderedHole = sceneComponents[hole.type].render2D(hole, layer);

    return <g
      key={holeID}
      transform={`translate(${startAt}, 0)`}
      data-element-root
      data-prototype={hole.prototype}
      data-id={hole.id}
      data-selected={hole.selected}
      data-layer={layer.id}
    > {renderedHole} </g>;
  });

  let renderedLine = sceneComponents[line.type].render2D(line, layer);

  return (
    <g
      transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)`}
      data-element-root
      data-prototype={line.prototype}
      data-id={line.id}
      data-selected={line.selected}
      data-layer={layer.id}
      style={line.selected ? {cursor: "move"} : {}}
    >
      {renderedLine}
      {renderedHoles}
    </g>
  );

}

Line.propTypes = {
  line: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

Line.contextTypes = {
  editingActions: PropTypes.object,
  sceneComponents: React.PropTypes.object
};
