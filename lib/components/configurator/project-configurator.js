"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _export = require("../style/export");
var _reactPlannerContext = _interopRequireDefault(require("../../react-planner-context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ProjectConfigurator = function ProjectConfigurator(_ref) {
  var width = _ref.width,
    height = _ref.height,
    state = _ref.state;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    projectActions = _useContext.projectActions,
    translator = _useContext.translator;
  var scene = state.scene;
  var _useState = (0, _react.useState)(scene.width),
    _useState2 = _slicedToArray(_useState, 2),
    dataWidth = _useState2[0],
    setDataWidth = _useState2[1];
  var _useState3 = (0, _react.useState)(scene.height),
    _useState4 = _slicedToArray(_useState3, 2),
    dataHeight = _useState4[0],
    setDataHeight = _useState4[1];
  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    var width = parseInt(dataWidth);
    var height = parseInt(dataHeight);
    if (width <= 100 || height <= 100) {
      alert('Scene size too small');
    } else {
      projectActions.setProjectProperties({
        width: width,
        height: height
      });
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_export.ContentContainer, {
    width: width,
    height: height
  }, /*#__PURE__*/_react["default"].createElement(_export.ContentTitle, null, translator.t('Project config')), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: onSubmit
  }, /*#__PURE__*/_react["default"].createElement(_export.FormBlock, null, /*#__PURE__*/_react["default"].createElement(_export.FormLabel, {
    htmlFor: "width"
  }, translator.t('width')), /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, {
    id: "width",
    placeholder: "width",
    value: dataWidth,
    onChange: function onChange(e) {
      return setDataWidth(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_export.FormBlock, null, /*#__PURE__*/_react["default"].createElement(_export.FormLabel, {
    htmlFor: "height"
  }, translator.t('height')), /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, {
    id: "height",
    placeholder: "height",
    value: dataHeight,
    onChange: function onChange(e) {
      return setDataHeight(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement("table", {
    style: {
      "float": 'right'
    }
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.CancelButton, {
    size: "large",
    onClick: function onClick(e) {
      return projectActions.rollback();
    }
  }, translator.t('Cancel'))), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormSubmitButton, {
    size: "large"
  }, translator.t('Save'))))))));
};
ProjectConfigurator.propTypes = {
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  state: _propTypes["default"].object.isRequired
};
var _default = ProjectConfigurator;
exports["default"] = _default;