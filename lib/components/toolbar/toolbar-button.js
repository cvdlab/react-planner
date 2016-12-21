"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarButton;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "5px",
  fontSize: "25px"
};

function ToolbarButton(props) {

  var color = props.active === true ? '#1CA6FC' : '#C2C2C2';

  return _react2.default.createElement(
    "div",
    { style: STYLE },
    _react2.default.createElement(
      "a",
      { href: "javascript:;", style: { color: color, textDecoration: "none" }, onClick: props.onClick, title: props.tooltip },
      props.children
    )
  );
}