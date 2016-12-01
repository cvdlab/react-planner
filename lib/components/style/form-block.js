"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = FormBlock;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BASE_STYLE = {
  marginBottom: "16px"
};

function FormBlock(_ref) {
  var children = _ref.children,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, ["children", "style"]);

  return _react2.default.createElement(
    "div",
    _extends({ style: _extends({}, BASE_STYLE, { style: style }) }, rest),
    children
  );
}