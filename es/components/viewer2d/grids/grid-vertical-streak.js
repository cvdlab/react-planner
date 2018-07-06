import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

export default function GridVerticalStreak(_ref) {
  var width = _ref.width,
      height = _ref.height,
      grid = _ref.grid;

  var step = grid.properties.get('step');
  var colors = void 0;

  if (grid.properties.has('color')) {
    colors = new List([grid.properties.get('color')]);
  } else {
    colors = grid.properties.get('colors');
  }

  var rendered = [];
  var i = 0;
  for (var x = 0; x <= width; x += step) {
    var color = colors.get(i % colors.size);
    i++;
    rendered.push(React.createElement('line', { key: x, x1: x, y1: '0', x2: x, y2: height, strokeWidth: '1', stroke: color }));
  }

  return React.createElement(
    'g',
    null,
    rendered
  );
}

GridVerticalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  grid: PropTypes.object.isRequired
};