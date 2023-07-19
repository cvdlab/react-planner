"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _translator = _interopRequireDefault(require("./translator/translator"));
var _catalog = _interopRequireDefault(require("./catalog/catalog"));
var _export = _interopRequireDefault(require("./actions/export"));
var _objectsUtils = require("./utils/objects-utils");
var _export2 = require("./components/export");
var _version = require("./version");
require("./styles/styles");
var _reactPlannerContext = _interopRequireDefault(require("./utils/react-planner-context"));
var _excluded = ["width", "height", "state", "stateExtractor"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Toolbar = _export2.ToolbarComponents.Toolbar;
var Sidebar = _export2.SidebarComponents.Sidebar;
var FooterBar = _export2.FooterBarComponents.FooterBar;
var footerBarH = 20;
var wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap',
  height: '100%'
};
function ReactPlannerContent(props) {
  var width = props.width,
    height = props.height,
    state = props.state,
    stateExtractor = props.stateExtractor,
    otherProps = _objectWithoutProperties(props, _excluded);
  var contentH = height - footerBarH;
  var extractedState = stateExtractor(state);
  var contextValue = (0, _react.useContext)(_reactPlannerContext["default"]); // Step 3: Access the context value using useContext

  (0, _react.useEffect)(function () {
    var store = contextValue.store;
    var projectActions = props.projectActions,
      catalog = props.catalog,
      stateExtractor = props.stateExtractor,
      plugins = props.plugins;
    plugins.forEach(function (plugin) {
      return plugin(store, stateExtractor);
    });
    projectActions.initCatalog(catalog);
  }, []);
  (0, _react.useEffect)(function () {
    if (props.state !== state) {
      var _stateExtractor = props.stateExtractor,
        _state = props.state,
        projectActions = props.projectActions,
        catalog = props.catalog;
      var plannerState = _stateExtractor(_state);
      var catalogReady = plannerState.getIn(['catalog', 'ready']);
      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }
    }
  }, [props.state]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, wrapperStyle)
  }, /*#__PURE__*/_react["default"].createElement(Toolbar, _extends({
    state: extractedState
  }, otherProps)), /*#__PURE__*/_react["default"].createElement(_export2.Content, _extends({
    width: width,
    height: contentH,
    state: extractedState
  }, otherProps, {
    onWheel: function onWheel(event) {
      return event.preventDefault();
    }
  })), /*#__PURE__*/_react["default"].createElement(Sidebar, _extends({
    state: extractedState
  }, otherProps)), /*#__PURE__*/_react["default"].createElement(FooterBar, _extends({
    width: width,
    height: footerBarH,
    state: extractedState
  }, otherProps)));
}
ReactPlannerContent.propTypes = {
  translator: _propTypes["default"].instanceOf(_translator["default"]),
  catalog: _propTypes["default"].instanceOf(_catalog["default"]),
  allowProjectFileSupport: _propTypes["default"].bool,
  plugins: _propTypes["default"].arrayOf(_propTypes["default"].func),
  autosaveKey: _propTypes["default"].string,
  autosaveDelay: _propTypes["default"].number,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  stateExtractor: _propTypes["default"].func.isRequired,
  toolbarButtons: _propTypes["default"].array,
  sidebarComponents: _propTypes["default"].array,
  footerbarComponents: _propTypes["default"].array,
  customContents: _propTypes["default"].object,
  softwareSignature: _propTypes["default"].string
};

// Step 3: Wrap the component tree with the Provider component
function ReactPlanner(props) {
  var state = props.state,
    translator = props.translator,
    catalog = props.catalog,
    projectActions = props.projectActions,
    sceneActions = props.sceneActions,
    linesActions = props.linesActions,
    holesActions = props.holesActions,
    verticesActions = props.verticesActions,
    itemsActions = props.itemsActions,
    areaActions = props.areaActions,
    viewer2DActions = props.viewer2DActions,
    viewer3DActions = props.viewer3DActions,
    groupsActions = props.groupsActions;
  return /*#__PURE__*/_react["default"].createElement(_reactPlannerContext["default"].Provider, {
    value: {
      state: state,
      translator: translator,
      catalog: catalog,
      projectActions: projectActions,
      sceneActions: sceneActions,
      linesActions: linesActions,
      holesActions: holesActions,
      verticesActions: verticesActions,
      itemsActions: itemsActions,
      areaActions: areaActions,
      viewer2DActions: viewer2DActions,
      viewer3DActions: viewer3DActions,
      groupsActions: groupsActions,
      store: props.store
    }
  }, /*#__PURE__*/_react["default"].createElement(ReactPlannerContent, props));
}

// Step 4: Define defaultProps directly on the component function
ReactPlanner.defaultProps = {
  translator: new _translator["default"](),
  catalog: new _catalog["default"](),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: "React-Planner ".concat(_version.VERSION),
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {}
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}
function mapDispatchToProps(dispatch) {
  return (0, _objectsUtils.objectsMap)(_export["default"], function (actionNamespace) {
    return (0, _redux.bindActionCreators)(_export["default"][actionNamespace], dispatch);
  });
}
var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReactPlanner);
exports["default"] = _default;