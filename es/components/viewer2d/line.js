import React, { PropTypes } from 'react';
import { pointsDistance, angleBetweenTwoPointsAndOrigin } from '../../utils/geometry';
import { MODE_IDLE } from '../../constants';
import Ruler from './ruler';

export default function Line(_ref) {
  var line = _ref.line,
      layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var unit = scene.unit;


  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.id === vertex1.id) return null; //avoid 0-length lines
  if (vertex0.x === vertex1.x && vertex0.y === vertex1.y) return null;

  var x1 = void 0,
      y1 = void 0,
      x2 = void 0,
      y2 = void 0;
  if (vertex0.x <= vertex1.x) {
    x1 = vertex0.x;
    y1 = vertex0.y;
    x2 = vertex1.x;
    y2 = vertex1.y;
  } else {
    x1 = vertex1.x;
    y1 = vertex1.y;
    x2 = vertex0.x;
    y2 = vertex0.y;
  }

  var length = pointsDistance(x1, y1, x2, y2);
  var angle = angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2);

  var renderedHoles = line.holes.map(function (holeID) {
    var hole = layer.holes.get(holeID);
    var startAt = length * hole.offset;
    var renderedHole = catalog.getElement(hole.type).render2D(hole, layer, scene);

    return React.createElement(
      'g',
      {
        key: holeID,
        transform: 'translate(' + startAt + ', 0)',
        'data-element-root': true,
        'data-prototype': hole.prototype,
        'data-id': hole.id,
        'data-selected': hole.selected,
        'data-layer': layer.id
      },
      ' ',
      renderedHole,
      ' '
    );
  });

  var renderedLine = catalog.getElement(line.type).render2D(line, layer);
  var renderedRuler = line.selected ? React.createElement(Ruler, { unit: unit, length: length, transform: 'translate(0, 15)' }) : null;

  return React.createElement(
    'g',
    {
      transform: 'translate(' + x1 + ', ' + y1 + ') rotate(' + angle + ', 0, 0)',
      'data-element-root': true,
      'data-prototype': line.prototype,
      'data-id': line.id,
      'data-selected': line.selected,
      'data-layer': layer.id,
      style: line.selected ? { cursor: "move" } : {}
    },
    renderedRuler,
    renderedLine,
    renderedHoles
  );
}

Line.propTypes = {
  line: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};