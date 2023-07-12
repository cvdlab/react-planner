"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Sidebar;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _panelElementEditor = _interopRequireDefault(require("./panel-element-editor/panel-element-editor"));
var _panelGroupEditor = _interopRequireDefault(require("./panel-group-editor"));
var _panelMultiElementsEditor = _interopRequireDefault(require("./panel-element-editor/panel-multi-elements-editor"));
var _panelLayers = _interopRequireDefault(require("./panel-layers"));
var _panelGuides = _interopRequireDefault(require("./panel-guides"));
var _panelGroups = _interopRequireDefault(require("./panel-groups"));
var _panelLayerElements = _interopRequireDefault(require("./panel-layer-elements"));
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
var _reactIf = _interopRequireDefault(require("../../utils/react-if"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  display: 'block',
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: '20px'
};
var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }
  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }
  return a.index - b.index;
};
var mapButtonsCb = function mapButtonsCb(el, ind) {
  return /*#__PURE__*/_react["default"].createElement(_reactIf["default"], {
    key: ind,
    condition: el.condition,
    style: {
      position: 'relative'
    }
  }, el.dom);
};
function Sidebar(_ref) {
  var state = _ref.state,
    width = _ref.width,
    height = _ref.height,
    sidebarComponents = _ref.sidebarComponents;
  var selectedLayer = state.getIn(['scene', 'selectedLayer']);

  //TODO change in multi-layer check
  var selected = state.getIn(['scene', 'layers', selectedLayer, 'selected']);
  var multiselected = selected.lines.size > 1 || selected.items.size > 1 || selected.holes.size > 1 || selected.areas.size > 1 || selected.lines.size + selected.items.size + selected.holes.size + selected.areas.size > 1;
  var selectedGroup = state.getIn(['scene', 'groups']).findEntry(function (g) {
    return g.get('selected');
  });
  var sorter = [{
    index: 0,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_panelGuides["default"], {
      state: state
    })
  }, {
    index: 1,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_panelLayers["default"], {
      state: state
    })
  }, {
    index: 2,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_panelLayerElements["default"], {
      mode: state.mode,
      layers: state.scene.layers,
      selectedLayer: state.scene.selectedLayer
    })
  }, {
    index: 3,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_panelGroups["default"], {
      mode: state.mode,
      groups: state.scene.groups,
      layers: state.scene.layers
    })
  }, {
    index: 4,
    condition: !multiselected,
    dom: /*#__PURE__*/_react["default"].createElement(_panelElementEditor["default"], {
      state: state
    })
  },
  //{ index: 5, condition: multiselected, dom: <PanelMultiElementsEditor state={state} /> },
  {
    index: 6,
    condition: !!selectedGroup,
    dom: /*#__PURE__*/_react["default"].createElement(_panelGroupEditor["default"], {
      state: state,
      groupID: selectedGroup ? selectedGroup[0] : null
    })
  }];
  sorter = sorter.concat(sidebarComponents.map(function (Component, key) {
    return Component.prototype ?
    //if is a react component
    {
      condition: true,
      dom: /*#__PURE__*/_react["default"].createElement(Component, {
        state: state,
        key: key
      })
    } : {
      //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: /*#__PURE__*/_react["default"].createElement(Component.dom, {
        state: state,
        key: key
      })
    };
  }));
  return /*#__PURE__*/_react["default"].createElement("aside", {
    style: _objectSpread({
      width: width,
      height: height
    }, STYLE),
    onKeyDown: function onKeyDown(event) {
      return event.stopPropagation();
    },
    onKeyUp: function onKeyUp(event) {
      return event.stopPropagation();
    },
    className: "sidebar"
  }, sorter.sort(sortButtonsCb).map(mapButtonsCb));
}
Sidebar.propTypes = {
  state: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};