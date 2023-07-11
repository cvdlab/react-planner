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
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { MdNavigateNext } from 'react-icons/md';
import * as SharedStyle from '../../shared-style';
import ReactPlannerContext from '../../react-planner-context';
var STYLE_BOX = {
  width: '14em',
  height: '14em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .2s ease-in-out',
  WebkitTransition: 'all .2s ease-in-out',
  alignSelf: 'center',
  justifySelf: 'center'
};
var STYLE_BOX_HOVER = _objectSpread(_objectSpread({}, STYLE_BOX), {}, {
  background: SharedStyle.SECONDARY_COLOR.main
});
var STYLE_TITLE = {
  width: '100%',
  position: 'absolute',
  textAlign: 'center',
  display: 'block',
  marginBottom: '.5em',
  padding: '1em',
  textTransform: 'capitalize',
  WebkitTransition: 'all .15s ease-in-out'
};
var STYLE_TITLE_HOVERED = _objectSpread(_objectSpread({}, STYLE_TITLE), {}, {
  fontSize: '1.4em',
  transform: 'translateY(-60px)',
  color: 'rgb(28, 166, 252)',
  marginTop: '0.5em'
});
var STYLE_NEXT_HOVER = {
  position: 'absolute',
  color: SharedStyle.SECONDARY_COLOR.main,
  fontSize: '5em',
  width: '100%'
};
var CONTAINER_DIV = {
  background: SharedStyle.COLORS.white,
  marginBottom: '5px',
  border: 'solid 1px #EEE',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
var CatalogPageItem = function CatalogPageItem(_ref) {
  var page = _ref.page,
    oldPage = _ref.oldPage;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    hover = _useState2[0],
    setHover = _useState2[1];
  var _useContext = useContext(ReactPlannerContext),
    projectActions = _useContext.projectActions;
  var changePage = function changePage(newPage) {
    projectActions.changeCatalogPage(newPage, oldPage.name);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: hover ? STYLE_BOX_HOVER : STYLE_BOX,
    onClick: function onClick() {
      return changePage(page.name);
    },
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  }, hover ? /*#__PURE__*/React.createElement("div", {
    style: CONTAINER_DIV
  }, /*#__PURE__*/React.createElement("b", {
    style: STYLE_TITLE_HOVERED
  }, page.label), /*#__PURE__*/React.createElement(MdNavigateNext, {
    style: STYLE_NEXT_HOVER
  })) : /*#__PURE__*/React.createElement("div", {
    style: CONTAINER_DIV
  }, /*#__PURE__*/React.createElement("b", {
    style: STYLE_TITLE
  }, page.label)));
};
CatalogPageItem.propTypes = {
  page: PropTypes.object.isRequired,
  oldPage: PropTypes.object.isRequired
};
export default CatalogPageItem;