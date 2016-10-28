'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GuideHorizontalStreak;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GuideHorizontalStreak(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var guide = _ref.guide;

  var step = guide.properties.get('step');
  var color = guide.properties.get('color');

  return _react2.default.createElement(
    'g',
    null,
    (0, _immutable.Range)(0, height + 1, step).map(function (y) {
      return _react2.default.createElement('line', { key: y, x1: '0', y1: y, x2: width, y2: y, strokeWidth: '1', stroke: color });
    })
  );
}

GuideHorizontalStreak.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  guide: _react.PropTypes.object.isRequired
};