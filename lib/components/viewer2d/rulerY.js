"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var RulerY = function RulerY(props) {
  var elementH = props.unitPixelSize * props.zoom;
  var elementStyle = {
    width: '8px',
    borderBottom: '1px solid ' + props.fontColor,
    paddingBottom: '0.2em',
    fontSize: '10px',
    height: elementH,
    textOrientation: 'upright',
    writingMode: 'vertical-lr',
    letterSpacing: '-2px',
    textAlign: 'right'
  };
  var insideElementsStyle = {
    height: '20%',
    width: '100%',
    textOrientation: 'upright',
    writingMode: 'vertical-lr',
    display: 'inline-block',
    letterSpacing: '-2px',
    textAlign: 'right'
  };
  var rulerStyle = {
    backgroundColor: props.backgroundColor,
    height: props.height,
    width: '100%',
    color: props.fontColor
  };
  var markerStyle = {
    position: 'absolute',
    top: props.zeroTopPosition - props.mouseY * props.zoom - 6.5,
    left: 8,
    width: 0,
    height: 0,
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderLeft: '8px solid ' + props.markerColor,
    zIndex: 9001
  };
  var rulerContainer = {
    position: 'absolute',
    width: '100%',
    display: 'grid',
    gridRowGap: '0',
    gridColumnGap: '0',
    gridTemplateColumns: '100%',
    grdAutoRows: "".concat(elementH, "px"),
    paddingLeft: '5px'
  };
  var positiveRulerContainer = _objectSpread(_objectSpread({}, rulerContainer), {}, {
    top: props.zeroTopPosition - props.positiveUnitsNumber * elementH,
    height: props.positiveUnitsNumber * elementH
  });
  var negativeRulerContainer = _objectSpread(_objectSpread({}, rulerContainer), {}, {
    top: props.zeroTopPosition + props.negativeUnitsNumber * elementH,
    height: props.negativeUnitsNumber * elementH
  });
  var positiveDomElements = [];
  if (elementH <= 200) {
    for (var x = 1; x <= props.positiveUnitsNumber; x++) {
      positiveDomElements.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: x,
        style: _objectSpread(_objectSpread({}, elementStyle), {}, {
          gridColumn: 1,
          gridRow: x
        })
      }, elementH > 30 ? (props.positiveUnitsNumber - x) * 100 : ''));
    }
  } else if (elementH > 200) {
    for (var _x = 1; _x <= props.positiveUnitsNumber; _x++) {
      var val = (props.positiveUnitsNumber - _x) * 100;
      positiveDomElements.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: _x,
        style: _objectSpread(_objectSpread({}, elementStyle), {}, {
          gridColumn: 1,
          gridRow: _x
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: insideElementsStyle
      }, val + 4 * 20), /*#__PURE__*/_react["default"].createElement("div", {
        style: insideElementsStyle
      }, val + 3 * 20), /*#__PURE__*/_react["default"].createElement("div", {
        style: insideElementsStyle
      }, val + 2 * 20), /*#__PURE__*/_react["default"].createElement("div", {
        style: insideElementsStyle
      }, val + 1 * 20), /*#__PURE__*/_react["default"].createElement("div", {
        style: insideElementsStyle
      }, val)));
    }
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: rulerStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "verticalMarker",
    style: markerStyle
  }), /*#__PURE__*/_react["default"].createElement("div", {
    id: "negativeRuler",
    style: negativeRulerContainer
  }), /*#__PURE__*/_react["default"].createElement("div", {
    id: "positiveRuler",
    style: positiveRulerContainer
  }, positiveDomElements));
};
RulerY.propTypes = {
  unitPixelSize: _propTypes["default"].number.isRequired,
  zoom: _propTypes["default"].number.isRequired,
  mouseY: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  zeroTopPosition: _propTypes["default"].number.isRequired,
  backgroundColor: _propTypes["default"].string,
  fontColor: _propTypes["default"].string,
  markerColor: _propTypes["default"].string
};
RulerY.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};
var _default = RulerY;
exports["default"] = _default;