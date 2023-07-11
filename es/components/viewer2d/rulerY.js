function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
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
      positiveDomElements.push( /*#__PURE__*/React.createElement("div", {
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
      positiveDomElements.push( /*#__PURE__*/React.createElement("div", {
        key: _x,
        style: _objectSpread(_objectSpread({}, elementStyle), {}, {
          gridColumn: 1,
          gridRow: _x
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 4 * 20), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 3 * 20), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 2 * 20), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val + 1 * 20), /*#__PURE__*/React.createElement("div", {
        style: insideElementsStyle
      }, val)));
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: rulerStyle
  }, /*#__PURE__*/React.createElement("div", {
    id: "verticalMarker",
    style: markerStyle
  }), /*#__PURE__*/React.createElement("div", {
    id: "negativeRuler",
    style: negativeRulerContainer
  }), /*#__PURE__*/React.createElement("div", {
    id: "positiveRuler",
    style: positiveRulerContainer
  }, positiveDomElements));
};
RulerY.propTypes = {
  unitPixelSize: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  mouseY: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zeroTopPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};
RulerY.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};
export default RulerY;