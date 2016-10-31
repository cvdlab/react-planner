'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GuideVerticalStreak;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GuideVerticalStreak(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var guide = _ref.guide;

  var step = guide.properties.get('step');
  var colors = void 0;

  if (guide.properties.has('color')) {
    colors = [guide.properties.get('color')];
  } else {
    colors = guide.properties.get('colors');
  }

  var rendered = [];
  var i = 0;
  for (var x = 0; x <= height; x += step) {
    var color = colors[i % colors.length];
    i++;
    rendered.push(_react2.default.createElement('line', { key: x, x1: x, y1: '0', x2: x, y2: height, strokeWidth: '1', stroke: color }));
  }

  return _react2.default.createElement(
    'g',
    null,
    rendered
  );
}

GuideVerticalStreak.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  guide: _react.PropTypes.object.isRequired
};

GuideVerticalStreak.contextTypes = {};