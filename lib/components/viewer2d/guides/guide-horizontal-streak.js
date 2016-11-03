'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GuideHorizontalStreak;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GuideHorizontalStreak(_ref) {
  var width = _ref.width,
      height = _ref.height,
      guide = _ref.guide;

  var step = guide.properties.get('step');
  var colors = void 0;

  if (guide.properties.has('color')) {
    colors = [guide.properties.get('color')];
  } else {
    colors = guide.properties.get('colors');
  }

  var rendered = [];
  var i = 0;
  for (var y = 0; y <= height; y += step) {
    var color = colors[i % colors.length];
    i++;
    rendered.push(_react2.default.createElement('line', { key: y, x1: '0', y1: y, x2: width, y2: y, strokeWidth: '1', stroke: color }));
  }

  return _react2.default.createElement(
    'g',
    null,
    rendered
  );
}

GuideHorizontalStreak.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  guide: _react.PropTypes.object.isRequired
};