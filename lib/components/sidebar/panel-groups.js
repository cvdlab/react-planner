"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _panel = _interopRequireDefault(require("./panel"));
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
var _ti = require("react-icons/ti");
var _fa = require("react-icons/fa");
var _immutable = require("immutable");
var _constants = require("../../utils/constants");
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
var VISIBILITY_MODE = {
  MODE_IDLE: _constants.MODE_IDLE,
  MODE_2D_ZOOM_IN: _constants.MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT: _constants.MODE_2D_ZOOM_OUT,
  MODE_2D_PAN: _constants.MODE_2D_PAN,
  MODE_3D_VIEW: _constants.MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON: _constants.MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: _constants.MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE: _constants.MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE: _constants.MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM: _constants.MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE: _constants.MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: _constants.MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM: _constants.MODE_DRAGGING_ITEM,
  MODE_DRAGGING_HOLE: _constants.MODE_DRAGGING_HOLE,
  MODE_FITTING_IMAGE: _constants.MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE: _constants.MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: _constants.MODE_ROTATING_ITEM
};
var styleEditButton = {
  marginLeft: '5px',
  border: '0px',
  background: 'none',
  color: SharedStyle.COLORS.white,
  fontSize: '14px',
  outline: '0px'
};
var tablegroupStyle = {
  width: '100%',
  cursor: 'pointer',
  maxHeight: '20em',
  padding: '0 1em',
  marginLeft: '1px'
};
var iconColStyle = {
  width: '2em',
  textAlign: 'center'
};
var styleHoverColor = {
  color: SharedStyle.SECONDARY_COLOR.main
};
var styleEditButtonHover = _objectSpread(_objectSpread({}, styleEditButton), styleHoverColor);
var styleAddLabel = {
  fontSize: '10px',
  marginLeft: '5px'
};
var styleEyeVisible = {
  fontSize: '1.25em'
};
var styleEyeHidden = _objectSpread(_objectSpread({}, styleEyeVisible), {}, {
  color: '#a5a1a1'
});
var newLayerLableStyle = {
  fontSize: '1.3em',
  cursor: 'pointer',
  textAlign: 'center'
};
var newLayerLableHoverStyle = _objectSpread(_objectSpread({}, newLayerLableStyle), styleHoverColor);
var PanelGroups = function PanelGroups(_ref) {
  var mode = _ref.mode,
    groups = _ref.groups,
    layers = _ref.layers;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    translator = _useContext.translator,
    groupsActions = _useContext.groupsActions;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    newEmptyHover = _useState2[0],
    setNewEmptyHover = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    newSelectedHover = _useState4[0],
    setNewSelectedHover = _useState4[1];
  if (!VISIBILITY_MODE[mode]) return null;
  return /*#__PURE__*/_react["default"].createElement(_panel["default"], {
    name: translator.t('Groups'),
    opened: groups.size > 0
  }, groups.size ? /*#__PURE__*/_react["default"].createElement("table", {
    style: tablegroupStyle
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", {
    colSpan: "4"
  }), /*#__PURE__*/_react["default"].createElement("th", null, translator.t('Elements')), /*#__PURE__*/_react["default"].createElement("th", null, translator.t('Name')))), /*#__PURE__*/_react["default"].createElement("tbody", null, groups.entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      groupID = _ref3[0],
      group = _ref3[1];
    var selectClick = function selectClick(e) {
      return groupsActions.selectGroup(groupID);
    };
    var swapVisibility = function swapVisibility(e) {
      e.stopPropagation();
      groupsActions.setGroupProperties(groupID, new _immutable.Map({
        visible: !group.get('visible')
      }));
    };
    var chainToGroup = function chainToGroup(e) {
      layers.forEach(function (layer) {
        var layerID = layer.get('id');
        var layerElements = {
          'lines': layer.get('lines'),
          'items': layer.get('items'),
          'holes': layer.get('holes'),
          'areas': layer.get('areas')
        };
        var _loop = function _loop(elementPrototype) {
          var ElementList = layerElements[elementPrototype];
          ElementList.filter(function (el) {
            return el.get('selected');
          }).forEach(function (element) {
            groupsActions.addToGroup(groupID, layerID, elementPrototype, element.get('id'));
          });
        };
        for (var elementPrototype in layerElements) {
          _loop(elementPrototype);
        }
      });
      selectClick(e);
    };
    var isCurrentgroup = group.get('selected');
    var shouldHighlight = isCurrentgroup;
    var rowStyle = !shouldHighlight ? null : styleHoverColor;
    var dimension = group.get('elements').reduce(function (sum, layer) {
      return sum + layer.reduce(function (lSum, elProt) {
        return lSum + elProt.size;
      }, 0);
    }, 0);
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: groupID,
      style: rowStyle
    }, /*#__PURE__*/_react["default"].createElement("td", {
      style: iconColStyle,
      title: translator.t('Toggle Group Visibility')
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaEye, {
      onClick: swapVisibility,
      style: !group.get('visible') ? styleEyeHidden : styleEyeVisible
    })), /*#__PURE__*/_react["default"].createElement("td", {
      style: iconColStyle,
      title: translator.t('Chain selected Elements to Group')
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaLink, {
      onClick: chainToGroup,
      style: !shouldHighlight ? styleEditButton : styleEditButtonHover
    })), /*#__PURE__*/_react["default"].createElement("td", {
      style: iconColStyle,
      title: translator.t('Un-chain all Group\'s Elements and remove Group')
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaUnlink, {
      onClick: function onClick(e) {
        return groupsActions.removeGroup(groupID);
      },
      style: !shouldHighlight ? styleEditButton : styleEditButtonHover
    })), /*#__PURE__*/_react["default"].createElement("td", {
      style: iconColStyle,
      title: translator.t('Delete group and all Elements')
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaTrash, {
      onClick: function onClick(e) {
        return groupsActions.removeGroupAndDeleteElements(groupID);
      },
      style: !shouldHighlight ? styleEditButton : styleEditButtonHover
    })), /*#__PURE__*/_react["default"].createElement("td", {
      onClick: selectClick,
      style: {
        width: '0em',
        textAlign: 'center'
      }
    }, dimension), /*#__PURE__*/_react["default"].createElement("td", {
      onClick: selectClick
    }, group.get('name')));
  }))) : null, /*#__PURE__*/_react["default"].createElement("table", {
    style: {
      width: '100%',
      marginTop: '0.1em'
    }
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: !newEmptyHover ? newLayerLableStyle : newLayerLableHoverStyle,
    onMouseOver: function onMouseOver() {
      return setNewEmptyHover(true);
    },
    onMouseOut: function onMouseOut() {
      return setNewEmptyHover(false);
    },
    onClick: function onClick(e) {
      return groupsActions.addGroup();
    }
  }, /*#__PURE__*/_react["default"].createElement(_ti.TiPlus, null), /*#__PURE__*/_react["default"].createElement("b", {
    style: styleAddLabel
  }, translator.t('New Empty Group'))), /*#__PURE__*/_react["default"].createElement("td", {
    style: !newSelectedHover ? newLayerLableStyle : newLayerLableHoverStyle,
    onMouseOver: function onMouseOver() {
      return setNewSelectedHover(true);
    },
    onMouseOut: function onMouseOut() {
      return setNewSelectedHover(false);
    },
    onClick: function onClick(e) {
      return groupsActions.addGroupFromSelected();
    }
  }, /*#__PURE__*/_react["default"].createElement(_ti.TiPlus, null), /*#__PURE__*/_react["default"].createElement("b", {
    style: styleAddLabel
  }, translator.t('New Group from selected')))))));
};
PanelGroups.propTypes = {
  mode: _propTypes["default"].string.isRequired,
  groups: _propTypes["default"].object.isRequired,
  layers: _propTypes["default"].object.isRequired
};
var _default = /*#__PURE__*/(0, _react.memo)(PanelGroups, function (prevProps, nextProps) {
  return prevProps.groups.hashCode() !== nextProps.groups.hashCode() || prevProps.layers.hashCode() !== nextProps.layers.hashCode() || prevProps.mode !== nextProps.mode;
});
exports["default"] = _default;