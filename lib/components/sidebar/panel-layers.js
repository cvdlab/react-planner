"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = require("immutable");
var _panel = _interopRequireDefault(require("./panel"));
var _reactPlannerContext = _interopRequireDefault(require("../../react-planner-context"));
var _ti = require("react-icons/ti");
var _fa = require("react-icons/fa");
var _export = require("../style/export");
var _constants = require("../../constants");
var SharedStyle = _interopRequireWildcard(require("../../shared-style"));
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
  MODE_ROTATING_ITEM: _constants.MODE_ROTATING_ITEM,
  MODE_UPLOADING_IMAGE: _constants.MODE_UPLOADING_IMAGE,
  MODE_FITTING_IMAGE: _constants.MODE_FITTING_IMAGE
};
var styleEditButton = {
  cursor: 'pointer',
  marginLeft: '5px',
  border: '0px',
  background: 'none',
  color: SharedStyle.COLORS.white,
  fontSize: '14px',
  outline: '0px'
};
var tableLayerStyle = {
  width: '100%',
  cursor: 'pointer',
  overflowY: 'auto',
  maxHeight: '20em',
  display: 'block',
  padding: '0 1em',
  marginLeft: '1px'
};
var iconColStyle = {
  width: '2em'
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
var firstTdStyle = {
  width: '6em'
};
var newLayerLableStyle = {
  margin: '0.5em 0',
  fontSize: '1.3em',
  cursor: 'pointer',
  textAlign: 'center'
};
var newLayerLableHoverStyle = _objectSpread(_objectSpread({}, newLayerLableStyle), styleHoverColor);
var layerInputTableStyle = {
  width: '100%',
  borderSpacing: '2px 0',
  padding: '5px 15px'
};
var inputTableButtonStyle = {
  "float": 'right',
  marginTop: '0.5em',
  borderSpacing: '0'
};
var PanelLayers = function PanelLayers(_ref) {
  var state = _ref.state;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    sceneActions = _useContext.sceneActions,
    translator = _useContext.translator;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    headHovered = _useState2[0],
    setHeadHovered = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    layerAddUIVisible = _useState4[0],
    setLayerAddUIVisible = _useState4[1];
  var _useState5 = (0, _react.useState)(new _immutable.Map()),
    _useState6 = _slicedToArray(_useState5, 2),
    editingLayer = _useState6[0],
    setEditingLayer = _useState6[1];
  var addLayer = function addLayer(e) {
    e.stopPropagation();
    if (!layerAddUIVisible) {
      sceneActions.addLayer('', 0);
      setLayerAddUIVisible(false);
    } else setLayerAddUIVisible(!layerAddUIVisible);
  };
  var resetLayerMod = function resetLayerMod(e) {
    e.stopPropagation();
    setLayerAddUIVisible(false);
    setEditingLayer(new _immutable.Map());
  };
  var updateLayer = function updateLayer(e, layerData) {
    e.stopPropagation();
    var _layerData$toJS = layerData.toJS(),
      id = _layerData$toJS.id,
      name = _layerData$toJS.name,
      opacity = _layerData$toJS.opacity,
      altitude = _layerData$toJS.altitude,
      order = _layerData$toJS.order;
    altitude = parseInt(altitude);
    sceneActions.setLayerProperties(id, {
      name: name,
      opacity: opacity,
      altitude: altitude,
      order: order
    });
    setLayerAddUIVisible(false);
    setEditingLayer(new _immutable.Map());
  };
  var delLayer = function delLayer(e, layerID) {
    e.stopPropagation();
    sceneActions.removeLayer(layerID);
    setLayerAddUIVisible(false);
    setEditingLayer(new _immutable.Map());
  };
  if (!VISIBILITY_MODE[state.mode]) return null;
  var scene = state.scene;
  var isLastLayer = scene.layers.size === 1;
  return /*#__PURE__*/_react["default"].createElement(_panel["default"], {
    name: translator.t('Layers')
  }, /*#__PURE__*/_react["default"].createElement("table", {
    style: tableLayerStyle
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", {
    colSpan: "3"
  }), /*#__PURE__*/_react["default"].createElement("th", null, translator.t('Altitude')), /*#__PURE__*/_react["default"].createElement("th", null, translator.t('Name')))), /*#__PURE__*/_react["default"].createElement("tbody", null, scene.layers.entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      layerID = _ref3[0],
      layer = _ref3[1];
    var selectClick = function selectClick(e) {
      return sceneActions.selectLayer(layerID);
    };
    var configureClick = function configureClick(e) {
      setEditingLayer(layer);
      setLayerAddUIVisible(true);
    };
    var swapVisibility = function swapVisibility(e) {
      e.stopPropagation();
      sceneActions.setLayerProperties(layerID, {
        visible: !layer.visible
      });
    };
    var isCurrentLayer = layerID === scene.selectedLayer;
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: layerID,
      onClick: selectClick,
      onDoubleClick: configureClick,
      style: !isCurrentLayer ? null : styleHoverColor
    }, /*#__PURE__*/_react["default"].createElement("td", {
      style: iconColStyle
    }, !isCurrentLayer ? /*#__PURE__*/_react["default"].createElement(_fa.FaEye, {
      onClick: swapVisibility,
      style: !layer.visible ? styleEyeHidden : styleEyeVisible
    }) : null), /*#__PURE__*/_react["default"].createElement("td", {
      style: iconColStyle
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaPencilAlt, {
      onClick: configureClick,
      style: !isCurrentLayer ? styleEditButton : styleEditButtonHover,
      title: translator.t('Configure layer')
    })), /*#__PURE__*/_react["default"].createElement("td", {
      style: iconColStyle
    }, !isLastLayer ? /*#__PURE__*/_react["default"].createElement(_fa.FaTrash, {
      onClick: function onClick(e) {
        return delLayer(e, layerID);
      },
      style: !isCurrentLayer ? styleEditButton : styleEditButtonHover,
      title: translator.t('Delete layer')
    }) : null), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        width: '6em',
        textAlign: 'center'
      }
    }, "[ h : ", layer.altitude, " ]"), /*#__PURE__*/_react["default"].createElement("td", null, layer.name));
  }))), /*#__PURE__*/_react["default"].createElement("p", {
    style: !headHovered ? newLayerLableStyle : newLayerLableHoverStyle,
    onMouseOver: function onMouseOver() {
      return setHeadHovered(true);
    },
    onMouseOut: function onMouseOut() {
      return setHeadHovered(false);
    },
    onClick: function onClick(e) {
      return addLayer(e);
    }
  }, !layerAddUIVisible ? /*#__PURE__*/_react["default"].createElement(_ti.TiPlus, null) : /*#__PURE__*/_react["default"].createElement(_ti.TiDelete, null), /*#__PURE__*/_react["default"].createElement("b", {
    style: styleAddLabel
  }, translator.t('New layer'))), layerAddUIVisible && editingLayer ? /*#__PURE__*/_react["default"].createElement("table", {
    style: layerInputTableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", {
    style: {
      marginTop: '1em'
    }
  }, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, translator.t('Name'), ":"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormTextInput, {
    value: editingLayer.get('name'),
    onChange: function onChange(e) {
      setEditingLayer(editingLayer.merge({
        name: e.target.value
      }));
    }
  }))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, translator.t('opacity'), ":"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: Math.round(editingLayer.get('opacity') * 100),
    onChange: function onChange(e) {
      return setEditingLayer(editingLayer.merge({
        opacity: e.target.value / 100
      }));
    }
  }))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, translator.t('altitude'), ":"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, {
    value: editingLayer.get('altitude'),
    onChange: function onChange(e) {
      return setEditingLayer(editingLayer.merge({
        altitude: e.target.value
      }));
    }
  }))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: firstTdStyle
  }, translator.t('order'), ":"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, {
    value: editingLayer.get('order'),
    onChange: function onChange(e) {
      return setEditingLayer(editingLayer.merge({
        order: e.target.value
      }));
    }
  }))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/_react["default"].createElement("table", {
    style: inputTableButtonStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.CancelButton, {
    size: "small",
    onClick: function onClick(e) {
      resetLayerMod(e);
    }
  }, translator.t('Reset'))), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormSubmitButton, {
    size: "small",
    onClick: function onClick(e) {
      updateLayer(e, editingLayer);
    }
  }, translator.t('Save')))))))))) : null);
};
PanelLayers.propTypes = {
  state: _propTypes["default"].object.isRequired
};
var _default = /*#__PURE__*/(0, _react.memo)(PanelLayers, function (prevProps, nextProps) {
  return prevProps.state.scene.layers.size === nextProps.state.scene.layers.size && prevProps.state.sceneHistory.hashCode() === nextProps.state.sceneHistory.hashCode();
});
exports["default"] = _default;