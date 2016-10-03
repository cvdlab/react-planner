'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ContentX;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContentX(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var state = _ref.state;

  return _react2.default.createElement(
    'div',
    { style: { width: width, height: height } },
    _react2.default.createElement(
      'div',
      { style: { marginTop: height / 2, marginLeft: width / 2 } },
      'MY CONTENT'
    )
  );
}

ContentX.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  state: _react.PropTypes.object.isRequired
};