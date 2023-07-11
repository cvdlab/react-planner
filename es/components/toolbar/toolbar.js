function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { MdSettings, MdUndo, MdDirectionsRun } from 'react-icons/md';
import { FaFile, FaMousePointer, FaPlus } from 'react-icons/fa';
import ReactPlannerContext from '../../react-planner-context';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import If from '../../utils/react-if';
import { MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT } from '../../constants';
import * as SharedStyle from '../../shared-style';
var iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '0px',
  userSelect: 'none'
};
var Icon2D = function Icon2D(_ref) {
  var style = _ref.style;
  return /*#__PURE__*/React.createElement("p", {
    style: _objectSpread(_objectSpread({}, iconTextStyle), style)
  }, "2D");
};
var Icon3D = function Icon3D(_ref2) {
  var style = _ref2.style;
  return /*#__PURE__*/React.createElement("p", {
    style: _objectSpread(_objectSpread({}, iconTextStyle), style)
  }, "3D");
};
var ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: '10px'
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
  return /*#__PURE__*/React.createElement(If, {
    key: ind,
    condition: el.condition,
    style: {
      position: 'relative'
    }
  }, el.dom);
};
var Toolbar = function Toolbar(_ref3) {
  var state = _ref3.state,
    width = _ref3.width,
    height = _ref3.height,
    toolbarButtons = _ref3.toolbarButtons,
    allowProjectFileSupport = _ref3.allowProjectFileSupport;
  var _useContext = useContext(ReactPlannerContext),
    projectActions = _useContext.projectActions,
    viewer3DActions = _useContext.viewer3DActions,
    translator = _useContext.translator;
  var mode = state.get('mode');
  var alterate = state.get('alterate');
  var alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : '';
  var sorter = [{
    index: 0,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: false,
      tooltip: translator.t('New project'),
      onClick: function onClick(event) {
        return confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
      }
    }, /*#__PURE__*/React.createElement(FaFile, null))
  }, {
    index: 1,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/React.createElement(ToolbarSaveButton, {
      state: state
    })
  }, {
    index: 2,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/React.createElement(ToolbarLoadButton, {
      state: state
    })
  }, {
    index: 3,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_VIEWING_CATALOG].includes(mode),
      tooltip: translator.t('Open catalog'),
      onClick: function onClick(event) {
        return projectActions.openCatalog();
      }
    }, /*#__PURE__*/React.createElement(FaPlus, null))
  }, {
    index: 4,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_3D_VIEW].includes(mode),
      tooltip: translator.t('3D View'),
      onClick: function onClick(event) {
        return viewer3DActions.selectTool3DView();
      }
    }, /*#__PURE__*/React.createElement(Icon3D, null))
  }, {
    index: 5,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_IDLE].includes(mode),
      tooltip: translator.t('2D View'),
      onClick: function onClick(event) {
        return projectActions.setMode(MODE_IDLE);
      }
    }, [MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? /*#__PURE__*/React.createElement(Icon2D, {
      style: {
        color: alterateColor
      }
    }) : /*#__PURE__*/React.createElement(FaMousePointer, {
      style: {
        color: alterateColor
      }
    }))
  }, {
    index: 6,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_3D_FIRST_PERSON].includes(mode),
      tooltip: translator.t('3D First Person'),
      onClick: function onClick(event) {
        return viewer3DActions.selectTool3DFirstPerson();
      }
    }, /*#__PURE__*/React.createElement(MdDirectionsRun, null))
  }, {
    index: 7,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: false,
      tooltip: translator.t('Undo (CTRL-Z)'),
      onClick: function onClick(event) {
        return projectActions.undo();
      }
    }, /*#__PURE__*/React.createElement(MdUndo, null))
  }, {
    index: 8,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_CONFIGURING_PROJECT].includes(mode),
      tooltip: translator.t('Configure project'),
      onClick: function onClick(event) {
        return projectActions.openProjectConfigurator();
      }
    }, /*#__PURE__*/React.createElement(MdSettings, null))
  }];
  sorter = sorter.concat(toolbarButtons.map(function (Component, key) {
    return Component.prototype ?
    //if is a react component
    {
      condition: true,
      dom: /*#__PURE__*/React.createElement(Component, {
        mode: mode,
        state: state,
        key: key
      })
    } : {
      //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: /*#__PURE__*/React.createElement(Component.dom, {
        mode: mode,
        state: state,
        key: key
      })
    };
  }));
  return /*#__PURE__*/React.createElement("aside", {
    style: _objectSpread(_objectSpread({}, ASIDE_STYLE), {}, {
      maxWidth: width,
      maxHeight: height
    }),
    className: "toolbar"
  }, sorter.sort(sortButtonsCb).map(mapButtonsCb));
};
Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};
export default /*#__PURE__*/memo(Toolbar, function (prevProps, nextProps) {
  return prevProps.state.mode === nextProps.state.mode && prevProps.height === nextProps.height && prevProps.width === nextProps.width && prevProps.state.alterate === nextProps.state.alterate;
});