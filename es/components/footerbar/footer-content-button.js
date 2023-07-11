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
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { FaTimes as IconClose } from 'react-icons/fa';
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
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    over = _useState2[0],
    setOver = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    closeOver = _useState4[0],
    setCloseOver = _useState4[1];
  var _useState5 = useState(toggleState),
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
  useEffect(function () {
    setActive(toggleState);
  }, [toggleState]);
  var LabelIcon = icon || null;
  var labelIconStyle = iconStyle || {};
  var labelTextStyle = textStyle || {};
  var inputTitleStyle = titleStyle || {};
  return /*#__PURE__*/React.createElement("div", {
    style: labelContainerStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: over || active ? toggleButtonStyleOver : toggleButtonStyle,
    onMouseOver: toggleOver,
    onMouseOut: toggleOut,
    onClick: toggle,
    title: title
  }, /*#__PURE__*/React.createElement(LabelIcon, {
    style: _objectSpread(_objectSpread({}, labelIconStyle), iconStyle)
  }), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, textStyle), labelTextStyle)
  }, text)), /*#__PURE__*/React.createElement("div", {
    style: active ? contentContainerStyleActive : contentContainerStyleInactive
  }, /*#__PURE__*/React.createElement("div", {
    style: contentHeaderStyle
  }, /*#__PURE__*/React.createElement("b", {
    style: _objectSpread(_objectSpread({}, titleStyle), inputTitleStyle)
  }, title), /*#__PURE__*/React.createElement(IconClose, {
    style: closeOver ? iconCloseStyleOver : iconCloseStyleOut,
    onMouseOver: toggleCloseOver,
    onMouseOut: toggleCloseOut,
    onClick: toggle
  })), /*#__PURE__*/React.createElement("div", {
    style: contentAreaStyle
  }, content)));
};
FooterContentButton.propTypes = {
  state: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  icon: PropTypes.func,
  iconStyle: PropTypes.object,
  content: PropTypes.array.isRequired,
  toggleState: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object
};
export default FooterContentButton;