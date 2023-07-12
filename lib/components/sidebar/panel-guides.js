"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _panel = _interopRequireDefault(require("./panel"));
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
var _reactTabs = require("react-tabs");
var _fa = require("react-icons/fa");
var _export = require("../../components/style/export");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var tabStyle = {
  margin: '1em'
};
var iconStyle = {
  fontSize: '14px',
  margin: '2px',
  cursor: 'pointer'
};
var addGuideStyle = {
  cursor: 'pointer',
  height: '2em'
};
var tableTabStyle = {
  width: '100%',
  textAlign: 'center'
};
var PanelGuides = function PanelGuides(_ref) {
  var state = _ref.state;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    projectActions = _useContext.projectActions,
    translator = _useContext.translator;
  var guides = state.scene.guides;
  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    addHGVisible = _useState2[0],
    setAddHGVisible = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    addVGVisible = _useState4[0],
    setAddVGVisible = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    addCGVisible = _useState6[0],
    setAddCGVisible = _useState6[1];
  return /*#__PURE__*/_react["default"].createElement(_panel["default"], {
    name: translator.t('Guides')
  }, /*#__PURE__*/_react["default"].createElement(_reactTabs.Tabs, {
    id: "guidesTabs",
    style: tabStyle
  }, /*#__PURE__*/_react["default"].createElement(_reactTabs.TabList, null, /*#__PURE__*/_react["default"].createElement(_reactTabs.Tab, null, translator.t('Horizontal')), /*#__PURE__*/_react["default"].createElement(_reactTabs.Tab, null, translator.t('Vertical'))), /*#__PURE__*/_react["default"].createElement(_reactTabs.TabPanel, null, /*#__PURE__*/_react["default"].createElement("table", {
    style: tableTabStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, guides.get('horizontal').entrySeq().map(function (_ref2, ind) {
    var _ref3 = _slicedToArray(_ref2, 2),
      hgKey = _ref3[0],
      hgVal = _ref3[1];
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: hgKey
    }, /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        width: '2em'
      }
    }, ind + 1), /*#__PURE__*/_react["default"].createElement("td", null, hgVal), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        width: '5em'
      }
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaTrash, {
      style: iconStyle,
      onClick: function onClick(e) {
        return projectActions.removeHorizontalGuide(hgKey);
      }
    })));
  }), addHGVisible ? /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: "3",
    style: addGuideStyle,
    onClick: function onClick(e) {
      return setAddHGVisible(false);
    }
  }, translator.t('+ Add Horizontal Giude'))) : /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, {
    value: 0,
    onChange: function onChange(e) {
      projectActions.addHorizontalGuide(e.target.value);
      return setAddHGVisible(true);
    },
    min: 0,
    max: state.getIn(['scene', 'height'])
  })), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_fa.FaTimes, {
    style: iconStyle,
    onClick: function onClick(e) {
      return setAddHGVisible(true);
    }
  })))))), /*#__PURE__*/_react["default"].createElement(_reactTabs.TabPanel, null, /*#__PURE__*/_react["default"].createElement("table", {
    style: tableTabStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, guides.get('vertical').entrySeq().map(function (_ref4, ind) {
    var _ref5 = _slicedToArray(_ref4, 2),
      hgKey = _ref5[0],
      hgVal = _ref5[1];
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: hgKey
    }, /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        width: '2em'
      }
    }, ind + 1), /*#__PURE__*/_react["default"].createElement("td", null, hgVal), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        width: '5em'
      }
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaTrash, {
      style: iconStyle,
      onClick: function onClick(e) {
        return projectActions.removeVerticalGuide(hgKey);
      }
    })));
  }), addVGVisible ? /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: "3",
    style: addGuideStyle,
    onClick: function onClick(e) {
      return setAddVGVisible(false);
    }
  }, translator.t('+ Add Vertical Giude'))) : /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, {
    value: 0,
    onChange: function onChange(e) {
      projectActions.addVerticalGuide(e.target.value);
      return setAddVGVisible(true);
    },
    min: 0,
    max: state.getIn(['scene', 'height'])
  })), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_fa.FaTimes, {
    style: iconStyle,
    onClick: function onClick(e) {
      return setAddVGVisible(true);
    }
  }))))))));
};
PanelGuides.propTypes = {
  state: _propTypes["default"].object.isRequired
};
var _default = /*#__PURE__*/(0, _react.memo)(PanelGuides, function (prevProps, nextProps) {
  return prevProps.state.getIn(['scene', 'guides']).hashCode() !== nextProps.state.getIn(['scene', 'guides']).hashCode();
});
exports["default"] = _default;