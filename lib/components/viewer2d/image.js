'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Image;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Image(_ref) {
  var layer = _ref.layer;
  var image = _ref.image;
  var mode = _ref.mode;


  var vertex0 = layer.vertices.get(image.vertices.get(0));
  var vertex1 = layer.vertices.get(image.vertices.get(1));

  var x1 = void 0,
      y1 = void 0,
      x2 = void 0,
      y2 = void 0;
  if (vertex0.x <= vertex1.x) {
    x1 = vertex0.x;
    y1 = vertex0.y;
    x2 = vertex1.x;
    y2 = vertex1.y;
  } else {
    x1 = vertex1.x;
    y1 = vertex1.y;
    x2 = vertex0.x;
    y2 = vertex0.y;
  }

  var width = x2 - x1,
      height = y2 - y1;

  return _react2.default.createElement(
    'g',
    { transform: 'translate(' + x1 + ', ' + y1 + ')' },
    _react2.default.createElement(
      'g',
      { transform: 'translate(0, ' + height + ') scale(1, -1)' },
      _react2.default.createElement('image', { x: 0, y: 0, width: width, height: height, xlinkHref: image.uri })
    )
  );
}

Image.propTypes = {
  layer: _react.PropTypes.object.isRequired,
  image: _react.PropTypes.object.isRequired,
  mode: _react.PropTypes.string.isRequired
};

Image.contextTypes = {};