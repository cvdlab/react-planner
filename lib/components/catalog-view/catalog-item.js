"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _fa = require("react-icons/fa");
var SharedStyle = _interopRequireWildcard(require("../../shared-style"));
var _reactPlannerContext = _interopRequireDefault(require("../../react-planner-context"));
var _STYLE_DESCRIPTION;
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
  transition: 'all .15s ease-in-out',
  WebkitTransition: 'all .15s ease-in-out',
  alignSelf: 'center',
  justifySelf: 'center'
};
var STYLE_BOX_HOVER = _objectSpread(_objectSpread({}, STYLE_BOX), {}, {
  background: SharedStyle.SECONDARY_COLOR.main
});
var STYLE_TITLE = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  marginBottom: '.5em',
  textTransform: 'capitalize'
};
var STYLE_TITLE_HOVER = _objectSpread(_objectSpread({}, STYLE_TITLE), {}, {
  color: SharedStyle.COLORS.white
});
var STYLE_IMAGE_CONTAINER = {
  width: '100%',
  height: '8em',
  position: 'relative',
  overflow: 'hidden',
  border: 'solid 1px #e6e6e6',
  padding: 0,
  margin: 0,
  marginBottom: '5px'
};
var STYLE_IMAGE = {
  position: 'absolute',
  background: '#222',
  width: '100%',
  height: '100%',
  backgroundSize: 'contain',
  backgroundPosition: '50% 50%',
  backgroundColor: SharedStyle.COLORS.white,
  backgroundRepeat: 'no-repeat',
  transition: 'all .2s ease-in-out'
};
var STYLE_IMAGE_HOVER = _objectSpread(_objectSpread({}, STYLE_IMAGE), {}, {
  transform: 'scale(1.2)'
});
var STYLE_PLUS_HOVER = {
  marginTop: '1.5em',
  color: SharedStyle.SECONDARY_COLOR.main,
  fontSize: '2em',
  opacity: '0.7',
  width: '100%'
};
var STYLE_DESCRIPTION = (_STYLE_DESCRIPTION = {
  display: 'block'
}, _defineProperty(_STYLE_DESCRIPTION, "display", '-webkit-box'), _defineProperty(_STYLE_DESCRIPTION, "height", '2em'), _defineProperty(_STYLE_DESCRIPTION, "margin", '0 auto'), _defineProperty(_STYLE_DESCRIPTION, "fontSize", '0.75em'), _defineProperty(_STYLE_DESCRIPTION, "fontStyle", 'italic'), _defineProperty(_STYLE_DESCRIPTION, "lineHeight", '1em'), _defineProperty(_STYLE_DESCRIPTION, "WebkitLineClamp", '2'), _defineProperty(_STYLE_DESCRIPTION, "WebkitBoxOrient", 'vertical'), _defineProperty(_STYLE_DESCRIPTION, "overflow", 'hidden'), _defineProperty(_STYLE_DESCRIPTION, "textOverflow", 'ellipsis'), _STYLE_DESCRIPTION);
var STYLE_TAGS = {
  listStyle: 'none',
  margin: '0px',
  padding: '0px',
  fontSize: '11px',
  marginBottom: '3px'
};
var STYLE_TAG = {
  display: 'inline-block',
  background: '#337ab7',
  color: SharedStyle.COLORS.white,
  padding: '1px 4px',
  marginRight: '3px',
  borderRadius: '3px'
};
var CatalogItem = function CatalogItem(_ref) {
  var element = _ref.element;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    hover = _useState2[0],
    setHover = _useState2[1];
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    linesActions = _useContext.linesActions,
    itemsActions = _useContext.itemsActions,
    holesActions = _useContext.holesActions,
    projectActions = _useContext.projectActions;
  var select = function select() {
    switch (element.prototype) {
      case 'lines':
        linesActions.selectToolDrawingLine(element.name);
        break;
      case 'items':
        itemsActions.selectToolDrawingItem(element.name);
        break;
      case 'holes':
        holesActions.selectToolDrawingHole(element.name);
        break;
    }
    projectActions.pushLastSelectedCatalogElementToHistory(element);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: hover ? STYLE_BOX_HOVER : STYLE_BOX,
    onClick: select,
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("b", {
    style: !hover ? STYLE_TITLE : STYLE_TITLE_HOVER
  }, element.info.title), /*#__PURE__*/_react["default"].createElement("div", {
    style: STYLE_IMAGE_CONTAINER
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread(_objectSpread({}, !hover ? STYLE_IMAGE : STYLE_IMAGE_HOVER), {}, {
      backgroundImage: 'url(' + element.info.image + ')'
    })
  }, hover ? /*#__PURE__*/_react["default"].createElement(_fa.FaPlusCircle, {
    style: STYLE_PLUS_HOVER
  }) : null)), /*#__PURE__*/_react["default"].createElement("ul", {
    style: STYLE_TAGS
  }, element.info.tag.map(function (tag, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      style: STYLE_TAG,
      key: index
    }, tag);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: STYLE_DESCRIPTION
  }, element.info.description));
};
CatalogItem.propTypes = {
  element: _propTypes["default"].object.isRequired
};
var _default = CatalogItem;
exports["default"] = _default;