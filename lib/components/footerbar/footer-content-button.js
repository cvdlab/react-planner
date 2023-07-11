"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var SharedStyle = _interopRequireWildcard(require("../../shared-style"));
var _fa = require("react-icons/fa");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var labelContainerStyle = {
  width: 'auto',
  display: 'inline-block',
  margin: 0,
  padding: '0px 5px 0px 0px'
};
var toggleButtonStyle = {
  color: '#CCC',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none'
};
var toggleButtonStyleOver = _objectSpread(_objectSpread({}, toggleButtonStyle), {}, {
  color: SharedStyle.COLORS.white
});
var contentContainerStyleActive = {
  position: 'fixed',
  width: 'calc( 100% - 2px )',
  height: '40%',
  left: 0,
  bottom: 20,
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  borderTop: SharedStyle.PRIMARY_COLOR.border,
  zIndex: 0,
  padding: 0,
  margin: 0,
  transition: 'all 300ms ease'
};
var contentContainerStyleInactive = _objectSpread(_objectSpread({}, contentContainerStyleActive), {}, {
  visibility: 'hidden',
  height: 0
});
var contentHeaderStyle = {
  position: 'relative',
  width: '100%',
  height: '2em',
  top: 0,
  left: 0,
  borderBottom: SharedStyle.PRIMARY_COLOR.border
};
var titleStyle = {
  position: 'relative',
  height: '2em',
  lineHeight: '2em',
  marginLeft: '1em'
};
var contentAreaStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc( 100% - 2em )',
  padding: '1em',
  overflowY: 'auto'
};
var iconCloseStyleOut = {
  position: 'absolute',
  width: '2em',
  height: '2em',
  right: 0,
  top: 0,
  padding: '0.5em',
  borderLeft: SharedStyle.PRIMARY_COLOR.border,
  cursor: 'pointer'
};
var iconCloseStyleOver = _objectSpread(_objectSpread({}, iconCloseStyleOut), {}, {
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.SECONDARY_COLOR.alt
});
var iconStyle = {
  width: '15px',
  height: '15px',
  marginTop: '-2px',
  marginRight: '2px'
};
var textStyle = {
  position: 'relative'
};
var FooterContentButton = function FooterContentButton(_ref) {
  var state = _ref.state,
    text = _ref.text,
    textStyle = _ref.textStyle,
    icon = _ref.icon,
    iconStyle = _ref.iconStyle,
    content = _ref.content,
    _ref$toggleState = _ref.toggleState,
    toggleState = _ref$toggleState === void 0 ? false : _ref$toggleState,
    title = _ref.title,
    titleStyle = _ref.titleStyle;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    over = _useState2[0],
    setOver = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    closeOver = _useState4[0],
    setCloseOver = _useState4[1];
  var _useState5 = (0, _react.useState)(toggleState),
    _useState6 = _slicedToArray(_useState5, 2),
    active = _useState6[0],
    setActive = _useState6[1];
  var toggleOver = function toggleOver() {
    return setOver(true);
  };
  var toggleOut = function toggleOut() {
    return setOver(false);
  };
  var toggleCloseOver = function toggleCloseOver() {
    return setCloseOver(true);
  };
  var toggleCloseOut = function toggleCloseOut() {
    return setCloseOver(false);
  };
  var toggle = function toggle() {
    var isActive = !active;
    setActive(isActive);
  };
  (0, _react.useEffect)(function () {
    setActive(toggleState);
  }, [toggleState]);
  var LabelIcon = icon || null;
  var labelIconStyle = iconStyle || {};
  var labelTextStyle = textStyle || {};
  var inputTitleStyle = titleStyle || {};
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: labelContainerStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: over || active ? toggleButtonStyleOver : toggleButtonStyle,
    onMouseOver: toggleOver,
    onMouseOut: toggleOut,
    onClick: toggle,
    title: title
  }, /*#__PURE__*/_react["default"].createElement(LabelIcon, {
    style: _objectSpread(_objectSpread({}, labelIconStyle), iconStyle)
  }), /*#__PURE__*/_react["default"].createElement("span", {
    style: _objectSpread(_objectSpread({}, textStyle), labelTextStyle)
  }, text)), /*#__PURE__*/_react["default"].createElement("div", {
    style: active ? contentContainerStyleActive : contentContainerStyleInactive
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: contentHeaderStyle
  }, /*#__PURE__*/_react["default"].createElement("b", {
    style: _objectSpread(_objectSpread({}, titleStyle), inputTitleStyle)
  }, title), /*#__PURE__*/_react["default"].createElement(_fa.FaTimes, {
    style: closeOver ? iconCloseStyleOver : iconCloseStyleOut,
    onMouseOver: toggleCloseOver,
    onMouseOut: toggleCloseOut,
    onClick: toggle
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: contentAreaStyle
  }, content)));
};
FooterContentButton.propTypes = {
  state: _propTypes["default"].object.isRequired,
  text: _propTypes["default"].string.isRequired,
  textStyle: _propTypes["default"].object,
  icon: _propTypes["default"].func,
  iconStyle: _propTypes["default"].object,
  content: _propTypes["default"].array.isRequired,
  toggleState: _propTypes["default"].bool,
  title: _propTypes["default"].string,
  titleStyle: _propTypes["default"].object
};
var _default = FooterContentButton;
exports["default"] = _default;