'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GuideVerticalStreak;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GuideVerticalStreak(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var guide = _ref.guide;

  var step = guide.properties.get('step');
  var color = guide.properties.get('color');

  return _react2.default.createElement(
    'g',
    null,
    (0, _immutable.Range)(0, width + 1, step).map(function (x) {
      return _react2.default.createElement('line', { key: x, x1: x, y1: '0', x2: x, y2: height, strokeWidth: '1', stroke: color });
    })
  );
}

GuideVerticalStreak.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  guide: _react.PropTypes.object.isRequired
};

GuideVerticalStreak.contextTypes = {};