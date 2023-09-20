"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _panel = _interopRequireDefault(require("../panel"));
var _immutable = require("immutable");
var _constants = require("../../../utils/constants");
var _export = require("../../../components/style/export");
var _export2 = require("../../../class/export");
var _reactPlannerContext = _interopRequireDefault(require("../../../utils/react-planner-context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var tableStyle = {
  width: '100%'
};
var firstTdStyle = {
  width: '6em'
};
var PanelMultiElementsEditor = function PanelMultiElementsEditor(_ref) {
  var state = _ref.state;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    selectedGroupID = _useState2[0],
    setSelectedGroupID = _useState2[1];
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    groupsActions = _useContext.groupsActions;
  var mode = state.mode;
  if (![_constants.MODE_IDLE, _constants.MODE_2D_ZOOM_IN, _constants.MODE_2D_ZOOM_OUT, _constants.MODE_2D_PAN, _constants.MODE_3D_VIEW, _constants.MODE_3D_FIRST_PERSON, _constants.MODE_WAITING_DRAWING_LINE, _constants.MODE_DRAWING_LINE, _constants.MODE_DRAWING_HOLE, _constants.MODE_DRAWING_ITEM, _constants.MODE_DRAGGING_LINE, _constants.MODE_DRAGGING_VERTEX, _constants.MODE_DRAGGING_ITEM, _constants.MODE_DRAGGING_HOLE, _constants.MODE_ROTATING_ITEM, _constants.MODE_UPLOADING_IMAGE, _constants.MODE_FITTING_IMAGE].includes(mode)) return null;
  var groups = state.getIn(['scene', 'groups']);

  //TODO change in multi-layer check
  var selectedLayer = state.getIn(['scene', 'selectedLayer']);
  var selecteds = state.getIn(['scene', 'layers', selectedLayer, 'selected']);
  var addSelectToGroup = function addSelectToGroup(state, groupID, layerID, selecteds) {
    if (!groupID || groupID === '' || !selecteds || !selecteds.size) return;
    console.log('TODO: need to be added to group', groupID, 'elements', selecteds);

    /*let selectedJs = selecteds.toJS();
     for( let lineID in selectedJs.lines ) Group.addElement( state, groupID, layerID, 'lines', lineID );*/
  };

  return /*#__PURE__*/_react["default"].createElement(_panel["default"], {
    name: 'Multiselected',
    opened: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: '5px 15px'
    }
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Multiselection tab"), /*#__PURE__*/_react["default"].createElement("table", {
    style: tableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, "Add to Group"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormSelect, {
    value: selectedGroupID,
    onChange: function onChange(e) {
      return setSelectedGroupID(e.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    key: 0,
    value: ''
  }), groups.entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      groupID = _ref3[0],
      group = _ref3[1];
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: groupID,
      value: groupID
    }, group.get('name'));
  }))), /*#__PURE__*/_react["default"].createElement("td", {
    style: {
      cursor: 'pointer',
      padding: '0.5em 0',
      textAlign: 'center'
    },
    onClick: function onClick(e) {
      if (!selectedGroupID || selectedGroupID === '' || !selecteds || !selecteds.size) return;
      var selectedJs = selecteds.toJS();
      for (var x = 0; x < selectedJs.lines.length; x++) groupsActions.addToGroup(selectedGroupID, selectedLayer, 'lines', selectedJs.lines[x]);
    }
  }, "+"))))));
};
PanelMultiElementsEditor.propTypes = {
  state: _propTypes["default"].object.isRequired
};
var _default = PanelMultiElementsEditor;
exports["default"] = _default;