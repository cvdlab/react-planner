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
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
var toggleButtonStyle = {
  width: '5.5em',
  color: '#CCC',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px solid transparent',
  margin: '-1px 5px 0 5px',
  borderRadius: '2px',
  display: 'inline-block'
};
var toggleButtonStyleOver = _objectSpread(_objectSpread({}, toggleButtonStyle), {}, {
  backgroundColor: '#1c82c6',
  border: '1px solid #FFF',
  color: SharedStyle.COLORS.white
});
var FooterToggleButton = function FooterToggleButton(_ref) {
  var toggleOn = _ref.toggleOn,
    toggleOff = _ref.toggleOff,
    text = _ref.text,
    _ref$toggleState = _ref.toggleState,
    toggleState = _ref$toggleState === void 0 ? false : _ref$toggleState,
    title = _ref.title;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    over = _useState2[0],
    setOver = _useState2[1];
  var _useState3 = useState(toggleState),
    _useState4 = _slicedToArray(_useState3, 2),
    active = _useState4[0],
    setActive = _useState4[1];
  var toggleOver = function toggleOver() {
    return setOver(true);
  };
  var toggleOut = function toggleOut() {
    return setOver(false);
  };
  var toggle = function toggle() {
    var isActive = !active;
    setActive(isActive);
    if (isActive) {
      toggleOn();
    } else {
      toggleOff();
    }
  };
  useEffect(function () {
    setActive(toggleState);
  }, [toggleState]);
  return /*#__PURE__*/React.createElement("div", {
    style: over || active ? toggleButtonStyleOver : toggleButtonStyle,
    onMouseOver: toggleOver,
    onMouseOut: toggleOut,
    onClick: toggle,
    title: title
  }, text);
};
FooterToggleButton.propTypes = {
  state: PropTypes.object.isRequired,
  toggleOn: PropTypes.func.isRequired,
  toggleOff: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleState: PropTypes.bool,
  title: PropTypes.string
};
export default FooterToggleButton;