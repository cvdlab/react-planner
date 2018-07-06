import React from 'react';
import PropTypes from 'prop-types';
import { GeometryUtils } from '../../utils/export';
import Ruler from './ruler';

export default function Line(_ref) {
  var line = _ref.line,
      layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;


  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.id === vertex1.id || GeometryUtils.samePoints(vertex0, vertex1)) return null; //avoid 0-length lines

  var x1 = vertex0.x,
      y1 = vertex0.y;
  var x2 = vertex1.x,
      y2 = vertex1.y;


  if (x1 > x2) {
    x1 = vertex1.x;
    y1 = vertex1.y;
    x2 = vertex0.x;
    y2 = vertex0.y;
  }

  var length = GeometryUtils.pointsDistance(x1, y1, x2, y2);
  var angle = GeometryUtils.angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2);

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
      renderedHole
    );
  });

  var thickness = line.getIn(['properties', 'thickness', 'length']);
  var half_thickness = thickness / 2;

  var renderedLine = catalog.getElement(line.type).render2D(line, layer);
  var renderedRuler = line.selected ? React.createElement(Ruler, { unit: scene.unit, length: length, transform: 'translate(0, ' + (half_thickness + 10) + ' )' }) : null;

  return React.createElement(
    'g',
    {
      transform: 'translate(' + x1 + ', ' + y1 + ') rotate(' + angle + ', 0, 0)',
      'data-element-root': true,
      'data-prototype': line.prototype,
      'data-id': line.id,
      'data-selected': line.selected,
      'data-layer': layer.id,
      style: line.selected ? { cursor: 'move' } : {}
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