'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Ruler;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function Ruler(_ref) {
  var length = _ref.length,
      unit = _ref.unit,
      transform = _ref.transform;


  var distanceText = length.toFixed(2) + ' ' + unit;

  return _react2.default.createElement(
    'g',
    { transform: transform },
    _react2.default.createElement(
      'text',
      { x: length / 2, y: '-3', transform: 'scale(1, -1)', style: STYLE_TEXT },
      distanceText
    ),
    _react2.default.createElement('line', { x1: '0', y1: '-5', x2: '0', y2: '5', style: STYLE }),
    _react2.default.createElement('line', { x1: length, y1: '-5', x2: length, y2: '5', style: STYLE }),
    _react2.default.createElement('line', { x1: '0', y1: '0', x2: length, y2: '0', style: STYLE })
  );
}

Ruler.propTypes = {
  length: _propTypes2.default.number.isRequired,
  unit: _propTypes2.default.string.isRequired,
  transform: _propTypes2.default.string.isRequired
};