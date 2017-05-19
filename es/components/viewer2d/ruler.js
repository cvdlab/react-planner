import React from 'react';
import PropTypes from 'prop-types';

var STYLE = {
  stroke: "#0096fd",
  strokeWidth: "1px"
};

var STYLE_TEXT = {
  textAnchor: "middle",
  fontSize: "12px",
  fontFamily: "'Courier New', Courier, monospace",
  pointerEvents: "none",
  fontWeight: "bold",

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none", /* Chrome/Safari/Opera */
  MozUserSelect: "none", /* Firefox */
  MsUserSelect: "none", /* Internet Explorer/Edge */
  userSelect: "none"
};

export default function Ruler(_ref) {
  var length = _ref.length,
      unit = _ref.unit,
      transform = _ref.transform;


  var distanceText = length.toFixed(2) + ' ' + unit;

  return React.createElement(
    'g',
    { transform: transform },
    React.createElement(
      'text',
      { x: length / 2, y: '-3', transform: 'scale(1, -1)', style: STYLE_TEXT },
      distanceText
    ),
    React.createElement('line', { x1: '0', y1: '-5', x2: '0', y2: '5', style: STYLE }),
    React.createElement('line', { x1: length, y1: '-5', x2: length, y2: '5', style: STYLE }),
    React.createElement('line', { x1: '0', y1: '0', x2: length, y2: '0', style: STYLE })
  );
}

Ruler.propTypes = {
  length: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  transform: PropTypes.string.isRequired
};