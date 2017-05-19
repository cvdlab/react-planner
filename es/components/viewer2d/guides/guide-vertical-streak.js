import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

export default function GuideVerticalStreak(_ref) {
  var width = _ref.width,
      height = _ref.height,
      guide = _ref.guide;

  var step = guide.properties.get('step');
  var colors = void 0;

  if (guide.properties.has('color')) {
    colors = new List([guide.properties.get('color')]);
  } else {
    colors = guide.properties.get('colors');
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

GuideVerticalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  guide: PropTypes.object.isRequired
};