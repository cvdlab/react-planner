"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _md = require("react-icons/md");
var _fa = require("react-icons/fa");
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
var _toolbarButton = _interopRequireDefault(require("./toolbar-button"));
var _toolbarSaveButton = _interopRequireDefault(require("./toolbar-save-button"));
var _toolbarLoadButton = _interopRequireDefault(require("./toolbar-load-button"));
var _reactIf = _interopRequireDefault(require("../../utils/react-if"));
var _constants = require("../../utils/constants");
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
var iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '0px',
  userSelect: 'none'
};
var Icon2D = function Icon2D(_ref) {
  var style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement("p", {
    style: _objectSpread(_objectSpread({}, iconTextStyle), style)
  }, "2D");
};
var Icon3D = function Icon3D(_ref2) {
  var style = _ref2.style;
  return /*#__PURE__*/_react["default"].createElement("p", {
    style: _objectSpread(_objectSpread({}, iconTextStyle), style)
  }, "3D");
};
var ASIDE_STYLE = {
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  border: '2px solid #ddd',
  borderRadius: '30px',
  padding: '10px',
  zIndex: 99999
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
var Toolbar = function Toolbar(_ref3) {
  var state = _ref3.state,
    toolbarButtons = _ref3.toolbarButtons,
    allowProjectFileSupport = _ref3.allowProjectFileSupport;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    projectActions = _useContext.projectActions,
    viewer3DActions = _useContext.viewer3DActions,
    translator = _useContext.translator;
  var mode = state.get('mode');
  var alterate = state.get('alterate');
  var alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : '';
  var sorter = [{
    index: 0,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: false,
      tooltip: translator.t('New project'),
      onClick: function onClick(event) {
        return confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
      }
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaFile, null))
  }, {
    index: 1,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarSaveButton["default"], {
      state: state
    })
  }, {
    index: 2,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarLoadButton["default"], {
      state: state
    })
  }, {
    index: 3,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_VIEWING_CATALOG].includes(mode),
      tooltip: translator.t('Open catalog'),
      onClick: function onClick(event) {
        return projectActions.openCatalog();
      }
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaPlus, null))
  }, {
    index: 4,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_3D_VIEW].includes(mode),
      tooltip: translator.t('3D View'),
      onClick: function onClick(event) {
        return viewer3DActions.selectTool3DView();
      }
    }, /*#__PURE__*/_react["default"].createElement(Icon3D, null))
  }, {
    index: 5,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_IDLE].includes(mode),
      tooltip: translator.t('2D View'),
      onClick: function onClick(event) {
        return projectActions.setMode(_constants.MODE_IDLE);
      }
    }, [_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) ? /*#__PURE__*/_react["default"].createElement(Icon2D, {
      style: {
        color: alterateColor
      }
    }) : /*#__PURE__*/_react["default"].createElement(_fa.FaMousePointer, {
      style: {
        color: alterateColor
      }
    }))
  }, {
    index: 6,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_3D_FIRST_PERSON].includes(mode),
      tooltip: translator.t('3D First Person'),
      onClick: function onClick(event) {
        return viewer3DActions.selectTool3DFirstPerson();
      }
    }, /*#__PURE__*/_react["default"].createElement(_md.MdDirectionsRun, null))
  }, {
    index: 7,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: false,
      tooltip: translator.t('Undo (CTRL-Z)'),
      onClick: function onClick(event) {
        return projectActions.undo();
      }
    }, /*#__PURE__*/_react["default"].createElement(_md.MdUndo, null))
  }, {
    index: 8,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_CONFIGURING_PROJECT].includes(mode),
      tooltip: translator.t('Configure project'),
      onClick: function onClick(event) {
        return projectActions.openProjectConfigurator();
      }
    }, /*#__PURE__*/_react["default"].createElement(_md.MdSettings, null))
  }];
  sorter = sorter.concat(toolbarButtons.map(function (Component, key) {
    return Component.prototype ?
    //if is a react component
    {
      condition: true,
      dom: /*#__PURE__*/_react["default"].createElement(Component, {
        mode: mode,
        state: state,
        key: key
      })
    } : {
      //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: /*#__PURE__*/_react["default"].createElement(Component.dom, {
        mode: mode,
        state: state,
        key: key
      })
    };
  }));
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'fixed',
      bottom: 30,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999
    }
  }, /*#__PURE__*/_react["default"].createElement("aside", {
    style: ASIDE_STYLE,
    className: "toolbar"
  }, sorter.sort(sortButtonsCb).map(mapButtonsCb)));
};
Toolbar.propTypes = {
  state: _propTypes["default"].object.isRequired,
  allowProjectFileSupport: _propTypes["default"].bool.isRequired,
  toolbarButtons: _propTypes["default"].array
};
var _default = /*#__PURE__*/(0, _react.memo)(Toolbar, function (prevProps, nextProps) {
  return prevProps.state.mode === nextProps.state.mode && prevProps.state.alterate === nextProps.state.alterate;
});
exports["default"] = _default;