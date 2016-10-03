"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyColor;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyColor(_ref) {
  var propertyName = _ref.propertyName;
  var value = _ref.value;
  var onUpdate = _ref.onUpdate;
  var configs = _ref.configs;

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
      _react2.default.createElement("input", { type: "color", value: value, onChange: function onChange(event) {
          return onUpdate(event.target.value);
        } })
    )
  );
}

PropertyColor.propTypes = {
  propertyName: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};