"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ContentContainer;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  padding: "0 20px",
  overflowY: "scroll"
};

function ContentContainer(_ref) {
  var children = _ref.children,
      width = _ref.width,
      height = _ref.height;

  return _react2.default.createElement(
    "div",
    { style: _extends({ width: width, height: height }, STYLE), onWheel: function onWheel(event) {
        return event.stopPropagation();
      } },
    children
  );
}

ContentContainer.propsType = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired
};