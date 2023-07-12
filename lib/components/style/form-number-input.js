"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormNumberInput;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
var _md = require("react-icons/md");
var _constants = require("../../utils/constants");
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var STYLE_INPUT = {
  display: 'block',
  width: '100%',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: SharedStyle.PRIMARY_COLOR.input,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid rgba(0,0,0,.15)',
  outline: 'none',
  height: '30px'
};
var confirmStyle = {
  position: 'absolute',
  cursor: 'pointer',
  width: '2em',
  height: '2em',
  right: '0.35em',
  top: '0.35em',
  backgroundColor: SharedStyle.SECONDARY_COLOR.main,
  color: '#FFF',
  transition: 'all 0.1s linear'
};
function FormNumberInput(_ref) {
  var value = _ref.value,
    min = _ref.min,
    max = _ref.max,
    precision = _ref.precision,
    onChange = _ref.onChange,
    onValid = _ref.onValid,
    onInvalid = _ref.onInvalid,
    style = _ref.style,
    placeholder = _ref.placeholder;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    translator = _useContext.translator;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    focus = _useState2[0],
    setFocus = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    valid = _useState4[0],
    setValid = _useState4[1];
  var _useState5 = (0, _react.useState)(value),
    _useState6 = _slicedToArray(_useState5, 2),
    showedValue = _useState6[0],
    setShowedValue = _useState6[1];
  (0, _react.useEffect)(function () {
    setShowedValue(value);
  }, [value]);
  var numericInputStyle = _objectSpread(_objectSpread({}, STYLE_INPUT), style);
  if (focus) numericInputStyle.border = "1px solid ".concat(SharedStyle.SECONDARY_COLOR.main);
  var regexp = new RegExp("^-?([0-9]+)?\\.?([0-9]{0,".concat(precision, "})?$"));
  if (!isNaN(min) && isFinite(min) && showedValue < min) setShowedValue(min); // value = min;
  if (!isNaN(max) && isFinite(max) && showedValue > max) setShowedValue(max);
  ; // value = max;

  var currValue = regexp.test(showedValue) ? showedValue : parseFloat(showedValue).toFixed(precision);
  var different = parseFloat(value).toFixed(precision) !== parseFloat(showedValue).toFixed(precision);
  var saveFn = function saveFn(e) {
    e.stopPropagation();
    if (valid) {
      var savedValue = showedValue !== '' && showedValue !== '-' ? parseFloat(showedValue) : 0;
      setShowedValue(savedValue);
      onChange({
        target: {
          value: savedValue
        }
      });
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: currValue,
    style: numericInputStyle,
    onChange: function onChange(evt) {
      var valid = regexp.test(evt.nativeEvent.target.value);
      if (valid) {
        setShowedValue(evt.nativeEvent.target.value);
        if (onValid) onValid(evt.nativeEvent);
      } else {
        if (onInvalid) onInvalid(evt.nativeEvent);
      }
      setValid(valid);
    },
    onFocus: function onFocus(e) {
      return setFocus(true);
    },
    onBlur: function onBlur(e) {
      return setFocus(false);
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode || e.which;
      if ((keyCode == _constants.KEYBOARD_BUTTON_CODE.ENTER || keyCode == _constants.KEYBOARD_BUTTON_CODE.TAB) && different) {
        saveFn(e);
      }
    },
    placeholder: placeholder
  }), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick(e) {
      if (different) saveFn(e);
    },
    title: translator.t('Confirm'),
    style: _objectSpread(_objectSpread({}, confirmStyle), {}, {
      visibility: different ? 'visible' : 'hidden',
      opacity: different ? '1' : '0'
    })
  }, /*#__PURE__*/_react["default"].createElement(_md.MdUpdate, {
    style: {
      width: '100%',
      height: '100%',
      padding: '0.2em',
      color: '#FFF'
    }
  })));
}
FormNumberInput.propTypes = {
  value: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  style: _propTypes["default"].object,
  onChange: _propTypes["default"].func.isRequired,
  onValid: _propTypes["default"].func,
  onInvalid: _propTypes["default"].func,
  min: _propTypes["default"].number,
  max: _propTypes["default"].number,
  precision: _propTypes["default"].number,
  placeholder: _propTypes["default"].string
};
FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};