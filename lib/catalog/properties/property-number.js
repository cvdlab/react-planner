"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyString;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyString(_ref) {
  var propertyName = _ref.propertyName,
      value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  return _react2.default.createElement(
    "div",
    { style: { marginBottom: "3px" } },
    _react2.default.createElement(
      "label",
      { style: { width: "30%", display: "inline-block" } },
      propertyName
    ),
    _react2.default.createElement(
      "div",
      { style: { display: "inline-block", width: "70%" } },
      _react2.default.createElement("input", { type: "number", style: { width: "100%" }, value: value,
        onChange: function onChange(event) {
          return onUpdate(parseFloat(event.target.value));
        },
        min: configs.min, max: configs.max })
    )
  );
}

PropertyString.propTypes = {
  propertyName: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};