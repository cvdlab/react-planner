"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("../../utils/constants");
var _convertUnits = _interopRequireDefault(require("convert-units"));
var _export = require("../../components/style/export");
var _immutable = require("immutable");
var _math = require("../../utils/math");
var _sharedPropertyStyle = _interopRequireDefault(require("./shared-property-style"));
var _excluded = ["hook", "label"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var internalTableStyle = {
  borderCollapse: 'collapse'
};
var secondTdStyle = {
  padding: 0
};
var unitContainerStyle = {
  width: '5em'
};
var PropertyLengthMeasure = function PropertyLengthMeasure(_ref) {
  var value = _ref.value,
    onUpdate = _ref.onUpdate,
    onValid = _ref.onValid,
    configs = _ref.configs,
    sourceElement = _ref.sourceElement,
    internalState = _ref.internalState,
    state = _ref.state;
  var length = value.get('length') || 0;
  var _length = value.get('_length') || length;
  var _unit = value.get('_unit') || _constants.UNIT_CENTIMETER;
  var hook = configs.hook,
    label = configs.label,
    configRest = _objectWithoutProperties(configs, _excluded);
  var update = function update(lengthInput, unitInput) {
    var newLength = (0, _math.toFixedFloat)(lengthInput);
    var merged = value.merge({
      length: unitInput !== _constants.UNIT_CENTIMETER ? (0, _convertUnits["default"])(newLength).from(unitInput).to(_constants.UNIT_CENTIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    });
    if (hook) {
      return hook(merged, sourceElement, internalState, state).then(function (val) {
        return onUpdate(val);
      });
    }
    return onUpdate(merged);
  };
  return /*#__PURE__*/_react["default"].createElement("table", {
    className: "PropertyLengthMeasure",
    style: _sharedPropertyStyle["default"].tableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: _sharedPropertyStyle["default"].firstTdStyle
  }, /*#__PURE__*/_react["default"].createElement(_export.FormLabel, null, label)), /*#__PURE__*/_react["default"].createElement("td", {
    style: secondTdStyle
  }, /*#__PURE__*/_react["default"].createElement("table", {
    style: internalTableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, _extends({
    value: _length,
    onChange: function onChange(event) {
      return update(event.target.value, _unit);
    },
    onValid: onValid
  }, configRest))), /*#__PURE__*/_react["default"].createElement("td", {
    style: unitContainerStyle
  }, /*#__PURE__*/_react["default"].createElement(_export.FormSelect, {
    value: _unit,
    onChange: function onChange(event) {
      return update(_length, event.target.value);
    }
  }, _constants.UNITS_LENGTH.map(function (el) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: el,
      value: el
    }, el);
  }))))))))));
};
PropertyLengthMeasure.propTypes = {
  value: _propTypes["default"].instanceOf(_immutable.Map).isRequired,
  onUpdate: _propTypes["default"].func.isRequired,
  onValid: _propTypes["default"].func,
  configs: _propTypes["default"].object.isRequired,
  sourceElement: _propTypes["default"].object,
  internalState: _propTypes["default"].object,
  state: _propTypes["default"].object.isRequired
};
var _default = PropertyLengthMeasure;
exports["default"] = _default;