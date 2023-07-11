function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["width", "height", "state", "stateExtractor"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import { objectsMap } from './utils/objects-utils';
import { ToolbarComponents, Content, SidebarComponents, FooterBarComponents } from './components/export';
import { VERSION } from './version';
import './styles/export';
import ReactPlannerContext from './react-planner-context';
var Toolbar = ToolbarComponents.Toolbar;
var Sidebar = SidebarComponents.Sidebar;
var FooterBar = FooterBarComponents.FooterBar;
var toolbarW = 50;
var sidebarW = 300;
var footerBarH = 20;
var wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};
function ReactPlanner(props) {
  var width = props.width,
    height = props.height,
    state = props.state,
    stateExtractor = props.stateExtractor,
    otherProps = _objectWithoutProperties(props, _excluded);
  var contentW = width - toolbarW - sidebarW;
  var toolbarH = height - footerBarH;
  var contentH = height - footerBarH;
  var sidebarH = height - footerBarH;
  var extractedState = stateExtractor(state);
  var contextValue = useContext(ReactPlannerContext); // Step 3: Access the context value using useContext

  useEffect(function () {
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
  useEffect(function () {
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
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, wrapperStyle), {}, {
      height: height
    })
  }, /*#__PURE__*/React.createElement(Toolbar, _extends({
    width: toolbarW,
    height: toolbarH,
    state: extractedState
  }, otherProps)), /*#__PURE__*/React.createElement(Content, _extends({
    width: contentW,
    height: contentH,
    state: extractedState
  }, otherProps, {
    onWheel: function onWheel(event) {
      return event.preventDefault();
    }
  })), /*#__PURE__*/React.createElement(Sidebar, _extends({
    width: sidebarW,
    height: sidebarH,
    state: extractedState
  }, otherProps)), /*#__PURE__*/React.createElement(FooterBar, _extends({
    width: width,
    height: footerBarH,
    state: extractedState
  }, otherProps)));
}
ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string
};

// Step 3: Wrap the component tree with the Provider component
function ReactPlannerWrapper(props) {
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
  return /*#__PURE__*/React.createElement(ReactPlannerContext.Provider, {
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
  }, /*#__PURE__*/React.createElement(ReactPlanner, props));
}

// Step 4: Define defaultProps directly on the component function
ReactPlannerWrapper.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: "React-Planner ".concat(VERSION),
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
  return objectsMap(actions, function (actionNamespace) {
    return bindActionCreators(actions[actionNamespace], dispatch);
  });
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactPlannerWrapper);