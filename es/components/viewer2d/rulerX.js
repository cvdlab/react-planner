function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../styles/shared-style';
var RulerX = function RulerX(props) {
  var elementW = props.unitPixelSize * props.zoom;
  var elementStyle = {
    display: 'inline-block',
    width: elementW,
    position: 'relative',
    borderLeft: '1px solid ' + props.fontColor,
    paddingLeft: '0.2em',
    fontSize: '10px',
    height: '100%'
  };
  var insideElementsStyle = {
    width: '20%',
    display: 'inline-block',
    margin: 0,
    padding: 0
  };
  var rulerStyle = {
    backgroundColor: props.backgroundColor,
    position: 'relative',
    width: props.width,
    height: '100%',
    color: props.fontColor
  };
  var markerStyle = {
    position: 'absolute',
    left: props.zeroLeftPosition + props.mouseX * props.zoom - 6.5,
    top: 8,
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '8px solid ' + props.markerColor,
    zIndex: 9001
  };
  var rulerContainer = {
    position: 'absolute',
    height: '10px',
    top: '4px',
    display: 'grid',
    gridRowGap: '0',
    gridColumnGap: '0',
    gridTemplateRows: '100%',
    grdAutoColumns: "".concat(elementW, "px")
  };
  var positiveRulerContainer = _objectSpread(_objectSpread({}, rulerContainer), {}, {
    width: props.positiveUnitsNumber * elementW,
    left: props.zeroLeftPosition
  });
  var negativeRulerContainer = _objectSpread(_objectSpread({}, rulerContainer), {}, {
    width: props.negativeUnitsNumber * elementW,
    left: props.zeroLeftPosition - props.negativeUnitsNumber * elementW
  });
  var positiveDomElements = [];
  if (elementW <= 200) {
    for (var x = 0; x < props.positiveUnitsNumber; x++) {
      positiveDomElements.push( /*#__PURE__*/React.createElement("div", {
        key: x,
        style: _objectSpread(_objectSpread({}, elementStyle), {}, {
          gridColumn: x + 1,
          gridRow: 1
        })
      }, elementW > 30 ? x * 100 : ''));
    }
  } else if (elementW > 200) {
    for (var _x = 0; _x < props.positiveUnitsNumber; _x++) {
      var val = _x * 100;
      positiveDomElements.push( /*#__PURE__*/React.createElement("div", {
        key: _x,
        style: _objectSpread(_objectSpread({}, elementStyle), {}, {
          gridColumn: _x + 1,
          gridRow: 1
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 1 * 20), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 2 * 20), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 3 * 20), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 4 * 20)));
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: rulerStyle
  }, /*#__PURE__*/React.createElement("div", {
    id: "horizontalMarker",
    style: markerStyle
  }), /*#__PURE__*/React.createElement("div", {
    id: "negativeRuler",
    style: negativeRulerContainer
  }), /*#__PURE__*/React.createElement("div", {
    id: "positiveRuler",
    style: positiveRulerContainer
  }, positiveDomElements));
};
RulerX.propTypes = {
  unitPixelSize: PropTypes.number.isRequired,
  positiveUnitsNumber: PropTypes.number,
  negativeUnitsNumber: PropTypes.number,
  zoom: PropTypes.number.isRequired,
  mouseX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  zeroLeftPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};
RulerX.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};
export default RulerX;