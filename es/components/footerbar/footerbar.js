function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPlannerContext from '../../utils/react-planner-context';
import If from '../../utils/react-if';
import FooterToggleButton from './footer-toggle-button';
import FooterContentButton from './footer-content-button';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_GRID, SNAP_GUIDE } from '../../utils/snap';
import { MODE_SNAPPING } from '../../utils/constants';
import * as SharedStyle from '../../styles/shared-style';
import { MdAddCircle, MdWarning } from 'react-icons/md';
import { VERSION } from '../../version';
var footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  lineHeight: '14px',
  fontSize: '12px',
  color: SharedStyle.PRIMARY_COLOR.text_main,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: '3px 1em',
  margin: 0,
  boxSizing: 'border-box',
  cursor: 'default',
  userSelect: 'none',
  zIndex: '9001'
};
export var leftTextStyle = {
  position: 'relative',
  borderRight: '1px solid #FFF',
  "float": 'left',
  padding: '0 1em',
  display: 'inline-block'
};
export var rightTextStyle = {
  position: 'relative',
  borderLeft: '1px solid #FFF',
  "float": 'right',
  padding: '0 1em',
  display: 'inline-block'
};
var coordStyle = {
  display: 'inline-block',
  width: '6em',
  margin: 0,
  padding: 0
};
var appMessageStyle = {
  borderBottom: '1px solid #555',
  lineHeight: '1.5em'
};
var FooterBar = function FooterBar(_ref) {
  var globalState = _ref.state,
    width = _ref.width,
    height = _ref.height,
    footerbarComponents = _ref.footerbarComponents,
    softwareSignature = _ref.softwareSignature;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 1),
    state = _useState2[0];
  var _useContext = useContext(ReactPlannerContext),
    translator = _useContext.translator,
    projectActions = _useContext.projectActions;
  var _globalState$get$toJS = globalState.get('mouse').toJS(),
    x = _globalState$get$toJS.x,
    y = _globalState$get$toJS.y;
  var zoom = globalState.get('zoom');
  var mode = globalState.get('mode');
  var errors = globalState.get('errors').toArray();
  var errorsJsx = errors.map(function (err, ind) {
    return /*#__PURE__*/React.createElement("div", {
      key: ind,
      style: appMessageStyle
    }, "[ ", new Date(err.date).toLocaleString(), " ] ", err.error);
  });
  var errorLableStyle = errors.length ? {
    color: SharedStyle.MATERIAL_COLORS[500].red
  } : {};
  var errorIconStyle = errors.length ? {
    transform: 'rotate(45deg)',
    color: SharedStyle.MATERIAL_COLORS[500].red
  } : {
    transform: 'rotate(45deg)'
  };
  var warnings = globalState.get('warnings').toArray();
  var warningsJsx = warnings.map(function (warn, ind) {
    return /*#__PURE__*/React.createElement("div", {
      key: ind,
      style: appMessageStyle
    }, "[ ", new Date(warn.date).toLocaleString(), " ] ", warn.warning);
  });
  var warningLableStyle = warnings.length ? {
    color: SharedStyle.MATERIAL_COLORS[500].yellow
  } : {};
  var warningIconStyle = warningLableStyle;
  var updateSnapMask = function updateSnapMask(val) {
    return projectActions.toggleSnap(globalState.snapMask.merge(val));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, footerBarStyle), {}, {
      width: width,
      height: height
    })
  }, /*#__PURE__*/React.createElement(If, {
    condition: MODE_SNAPPING.includes(mode)
  }, /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, /*#__PURE__*/React.createElement("div", {
    title: translator.t('Mouse X Coordinate'),
    style: coordStyle
  }, "X : ", x.toFixed(3)), /*#__PURE__*/React.createElement("div", {
    title: translator.t('Mouse Y Coordinate'),
    style: coordStyle
  }, "Y : ", y.toFixed(3))), /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle,
    title: translator.t('Scene Zoom Level')
  }, "Zoom: ", zoom.toFixed(3), "X"), /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, /*#__PURE__*/React.createElement(FooterToggleButton, {
    state: state,
    toggleOn: function toggleOn() {
      updateSnapMask({
        SNAP_POINT: true
      });
    },
    toggleOff: function toggleOff() {
      updateSnapMask({
        SNAP_POINT: false
      });
    },
    text: "Snap PT",
    toggleState: globalState.snapMask.get(SNAP_POINT),
    title: translator.t('Snap to Point')
  }), /*#__PURE__*/React.createElement(FooterToggleButton, {
    state: state,
    toggleOn: function toggleOn() {
      updateSnapMask({
        SNAP_LINE: true
      });
    },
    toggleOff: function toggleOff() {
      updateSnapMask({
        SNAP_LINE: false
      });
    },
    text: "Snap LN",
    toggleState: globalState.snapMask.get(SNAP_LINE),
    title: translator.t('Snap to Line')
  }), /*#__PURE__*/React.createElement(FooterToggleButton, {
    state: state,
    toggleOn: function toggleOn() {
      updateSnapMask({
        SNAP_SEGMENT: true
      });
    },
    toggleOff: function toggleOff() {
      updateSnapMask({
        SNAP_SEGMENT: false
      });
    },
    text: "Snap SEG",
    toggleState: globalState.snapMask.get(SNAP_SEGMENT),
    title: translator.t('Snap to Segment')
  }), /*#__PURE__*/React.createElement(FooterToggleButton, {
    state: state,
    toggleOn: function toggleOn() {
      updateSnapMask({
        SNAP_GRID: true
      });
    },
    toggleOff: function toggleOff() {
      updateSnapMask({
        SNAP_GRID: false
      });
    },
    text: "Snap GRD",
    toggleState: globalState.snapMask.get(SNAP_GRID),
    title: translator.t('Snap to Grid')
  }), /*#__PURE__*/React.createElement(FooterToggleButton, {
    state: state,
    toggleOn: function toggleOn() {
      updateSnapMask({
        SNAP_GUIDE: true
      });
    },
    toggleOff: function toggleOff() {
      updateSnapMask({
        SNAP_GUIDE: false
      });
    },
    text: "Snap GDE",
    toggleState: globalState.snapMask.get(SNAP_GUIDE),
    title: translator.t('Snap to Guide')
  }))), footerbarComponents.map(function (Component, index) {
    return /*#__PURE__*/React.createElement(Component, {
      state: state,
      key: index
    });
  }), softwareSignature ? /*#__PURE__*/React.createElement("div", {
    style: rightTextStyle,
    title: softwareSignature + (softwareSignature.includes('React-Planner') ? '' : " using React-Planner ".concat(VERSION))
  }, softwareSignature) : null);
};
FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired,
  softwareSignature: PropTypes.string
};
export default FooterBar;