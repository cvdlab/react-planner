'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Grid;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

var _area = require('./area');

var _area2 = _interopRequireDefault(_area);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Grid(_ref) {
  var scene = _ref.scene;
  var pixelPerUnit = scene.pixelPerUnit;
  var unit = scene.unit;
  var width = scene.width;
  var height = scene.height;


  var patternID = 'grid-pattern';

  var verticalLines = (0, _immutable.Range)(0, width + 1, pixelPerUnit / 5);
  var horizontalLines = (0, _immutable.Range)(0, height + 1, pixelPerUnit / 5);

  var color = function color(coord) {
    return coord % pixelPerUnit === 0 ? '#b9b9b9' : '#efefef';
  };

  var vLine = function vLine(x) {
    return _react2.default.createElement('line', { key: x, x1: x, y1: '0', x2: x, y2: height, strokeWidth: '1', stroke: color(x) });
  };
  var hLine = function hLine(y) {
    return _react2.default.createElement('line', { key: y, x1: '0', y1: y, x2: width, y2: y, strokeWidth: '1', stroke: color(y) });
  };

  return _react2.default.createElement(
    'g',
    null,
    verticalLines.map(vLine),
    horizontalLines.map(hLine)
  );
}

Grid.propTypes = {
  scene: _react2.default.PropTypes.object.isRequired
};