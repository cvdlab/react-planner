'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ContentContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  padding: '0 20px',
  overflowY: 'auto'
};

function ContentContainer(_ref) {
  var children = _ref.children,
      width = _ref.width,
      height = _ref.height,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style;

  return _react2.default.createElement(
    'div',
    { style: _extends({ width: width, height: height }, STYLE, style), onWheel: function onWheel(event) {
        return event.stopPropagation();
      } },
    children
  );
}

ContentContainer.propsType = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  style: _propTypes2.default.object
};