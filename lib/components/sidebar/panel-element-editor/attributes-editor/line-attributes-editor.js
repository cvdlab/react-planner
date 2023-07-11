"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _export = require("../../../style/export");
var _export2 = require("../../../../catalog/properties/export");
var _reactPlannerContext = _interopRequireDefault(require("../../../../react-planner-context"));
var _excluded = ["element", "onUpdate", "attributeFormData", "state"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var tableStyle = {
  width: '100%'
};
var firstTdStyle = {
  width: '6em'
};
var inputStyle = {
  textAlign: 'left'
};
var LineAttributesEditor = function LineAttributesEditor(_ref) {
  var element = _ref.element,
    _onUpdate = _ref.onUpdate,
    attributeFormData = _ref.attributeFormData,
    state = _ref.state,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    translator = _useContext.translator;
  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var vertexOne = attributeFormData.has('vertexOne') ? attributeFormData.get('vertexOne') : null;
  var vertexTwo = attributeFormData.has('vertexTwo') ? attributeFormData.get('vertexTwo') : null;
  var lineLength = attributeFormData.has('lineLength') ? attributeFormData.get('lineLength') : null;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("table", {
    style: tableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, translator.t('Name')), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormTextInput, {
    value: name,
    onChange: function onChange(event) {
      return _onUpdate('name', event.target.value);
    },
    style: inputStyle
  }))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, "X1"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, _extends({
    value: vertexOne.get('x'),
    onChange: function onChange(event) {
      return _onUpdate('vertexOne', {
        'x': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, "Y1"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, _extends({
    value: vertexOne.get('y'),
    onChange: function onChange(event) {
      return _onUpdate('vertexOne', {
        'y': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, "X2"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, _extends({
    value: vertexTwo.get('x'),
    onChange: function onChange(event) {
      return _onUpdate('vertexTwo', {
        'x': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, "Y2"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, _extends({
    value: vertexTwo.get('y'),
    onChange: function onChange(event) {
      return _onUpdate('vertexTwo', {
        'y': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))))), /*#__PURE__*/_react["default"].createElement(_export2.PropertyLengthMeasure, {
    value: lineLength,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('lineLength', mapped);
    },
    configs: {
      label: translator.t('Length'),
      min: 0,
      max: Infinity,
      precision: 2
    },
    state: state
  }));
};
LineAttributesEditor.propTypes = {
  element: _propTypes["default"].object.isRequired,
  onUpdate: _propTypes["default"].func.isRequired,
  onValid: _propTypes["default"].func,
  attributeFormData: _propTypes["default"].object.isRequired,
  state: _propTypes["default"].object.isRequired
};
var _default = LineAttributesEditor;
exports["default"] = _default;