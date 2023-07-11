"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propertyLenghtMeasure = _interopRequireDefault(require("../../../../catalog/properties/property-lenght-measure"));
var _propertyString = _interopRequireDefault(require("../../../../catalog/properties/property-string"));
var _excluded = ["element", "onUpdate", "attributeFormData", "state"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var HoleAttributesEditor = function HoleAttributesEditor(_ref) {
  var element = _ref.element,
    _onUpdate = _ref.onUpdate,
    attributeFormData = _ref.attributeFormData,
    state = _ref.state,
    rest = _objectWithoutProperties(_ref, _excluded);
  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_propertyString["default"], _extends({
    value: name,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('name', mapped);
    },
    configs: {
      label: 'Nome'
    },
    state: state
  }, rest)), /*#__PURE__*/_react["default"].createElement(_propertyLenghtMeasure["default"], _extends({
    value: offsetA,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('offsetA', mapped);
    },
    configs: {
      label: 'Offset 1',
      min: 0,
      max: Infinity,
      precision: 2
    },
    state: state
  }, rest)), /*#__PURE__*/_react["default"].createElement(_propertyLenghtMeasure["default"], _extends({
    value: offsetB,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('offsetB', mapped);
    },
    configs: {
      label: 'Offset 2',
      min: 0,
      max: Infinity,
      precision: 2
    },
    state: state
  }, rest)));
};
HoleAttributesEditor.propTypes = {
  element: _propTypes["default"].object.isRequired,
  onUpdate: _propTypes["default"].func.isRequired,
  attributeFormData: _propTypes["default"].object.isRequired,
  state: _propTypes["default"].object.isRequired
};
var _default = HoleAttributesEditor;
exports["default"] = _default;