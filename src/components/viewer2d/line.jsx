import React from 'react';
import PropTypes from 'prop-types';
import {GeometryUtils} from '../../utils/export';
import Ruler from './ruler';

export default function Line({line, layer, scene, catalog}) {

  let vertex0 = layer.vertices.get(line.vertices.get(0));
  let vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.id === vertex1.id || GeometryUtils.samePoints(vertex0, vertex1)) return null; //avoid 0-length lines

  let {x: x1, y: y1} = vertex0;
  let {x: x2, y: y2} = vertex1;

  if (x1 > x2) {
    ({x: x1, y: y1} = vertex1);
    ({x: x2, y: y2} = vertex0);
  }

  let length = GeometryUtils.pointsDistance(x1, y1, x2, y2);
  let angle = GeometryUtils.angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2);

  let renderedHoles = line.holes.map(holeID => {
    let hole = layer.holes.get(holeID);
    let startAt = length * hole.offset;
    let renderedHole = catalog.getElement(hole.type).render2D(hole, layer, scene);

    return (
      <g
        key={holeID}
        transform={`translate(${startAt}, 0)`}
        data-element-root
        data-prototype={hole.prototype}
        data-id={hole.id}
        data-selected={hole.selected}
        data-layer={layer.id}
      >
        {renderedHole}
      </g>
    );
  });

  let thickness = line.getIn(['properties', 'thickness', 'length']);
  let half_thickness = thickness / 2;

  let renderedLine = catalog.getElement(line.type).render2D(line, layer);
  let renderedRuler = line.selected ?
    <Ruler unit={scene.unit} length={length} transform={`translate(0, ${half_thickness + 10} )`}/> : null;

  return (
    <g
      transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)`}
      data-element-root
      data-prototype={line.prototype}
      data-id={line.id}
      data-selected={line.selected}
      data-layer={layer.id}
      style={line.selected ? {cursor: 'move'} : {}}
    >
      {renderedRuler}
      {renderedLine}
      {renderedHoles}
    </g>
  );

}

Line.propTypes = {
  line: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
