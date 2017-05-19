'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GuideVerticalStreak;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GuideVerticalStreak(_ref) {
  var width = _ref.width,
      height = _ref.height,
      guide = _ref.guide;

  var step = guide.properties.get('step');
  var colors = void 0;

  if (guide.properties.has('color')) {
    colors = new _immutable.List([guide.properties.get('color')]);
  } else {
    colors = guide.properties.get('colors');
  }

  var rendered = [];
  var i = 0;
  for (var x = 0; x <= width; x += step) {
    var color = colors.get(i % colors.size);
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
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  guide: _propTypes2.default.object.isRequired
};