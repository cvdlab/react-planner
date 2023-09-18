"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
var _new = _interopRequireDefault(require("./icons/new.svg"));
var _catalog = _interopRequireDefault(require("./icons/catalog.svg"));
var _D = _interopRequireDefault(require("./icons/2D.svg"));
var _D2 = _interopRequireDefault(require("./icons/3D.svg"));
var _undo = _interopRequireDefault(require("./icons/undo.svg"));
var _redo = _interopRequireDefault(require("./icons/redo.svg"));
var _settings = _interopRequireDefault(require("./icons/settings.svg"));
var _toolbarButton = _interopRequireDefault(require("./toolbar-button"));
var _toolbarSaveButton = _interopRequireDefault(require("./toolbar-save-button"));
var _toolbarLoadButton = _interopRequireDefault(require("./toolbar-load-button"));
var _reactIf = _interopRequireDefault(require("../../utils/react-if"));
var _constants = require("../../utils/constants");
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ASIDE_STYLE = {
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  fontSize: '10px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  border: '2px solid',
  borderRadius: '30px',
  borderColor: SharedStyle.PRIMARY_COLOR.alt,
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
var Toolbar = function Toolbar(_ref) {
  var state = _ref.state,
    toolbarButtons = _ref.toolbarButtons,
    allowProjectFileSupport = _ref.allowProjectFileSupport;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    projectActions = _useContext.projectActions,
    viewer3DActions = _useContext.viewer3DActions,
    translator = _useContext.translator;
  var mode = state.get('mode');
  var sorter = [{
    index: 0,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: false,
      tooltip: translator.t('New project'),
      onClick: function onClick(event) {
        return confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
      }
    }, /*#__PURE__*/_react["default"].createElement(_new["default"], null), "New")
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
    }, /*#__PURE__*/_react["default"].createElement(_catalog["default"], null), "Catalog")
  }, {
    index: 4,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_IDLE].includes(mode),
      tooltip: translator.t('2D View'),
      onClick: function onClick(event) {
        return projectActions.setMode(_constants.MODE_IDLE);
      }
    }, /*#__PURE__*/_react["default"].createElement(_D["default"], null), "2D")
  }, {
    index: 5,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_3D_VIEW].includes(mode),
      tooltip: translator.t('3D View'),
      onClick: function onClick(event) {
        return viewer3DActions.selectTool3DView();
      }
    }, /*#__PURE__*/_react["default"].createElement(_D2["default"], null), "3D")
  },
  // TODO(react-planner #16)
  // {
  //   index: 6, condition: true, dom: <ToolbarButton
  //     active={[MODE_3D_FIRST_PERSON].includes(mode)}
  //     tooltip={translator.t('3D First Person')}
  //     onClick={event => viewer3DActions.selectTool3DFirstPerson()}>
  //     <MdDirectionsRun />
  //   </ToolbarButton>
  // },
  {
    index: 6,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: false,
      tooltip: translator.t('Undo (CTRL-Z)'),
      onClick: function onClick(event) {
        return projectActions.undo();
      }
    }, /*#__PURE__*/_react["default"].createElement(_undo["default"], null), "Undo")
  }, {
    index: 7,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: false,
      tooltip: translator.t('Redo (CTRL-Y)'),
      onClick: function onClick(event) {
        return projectActions.redo();
      }
    }, /*#__PURE__*/_react["default"].createElement(_redo["default"], null), "Redo")
  }, {
    index: 8,
    condition: true,
    dom: /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
      active: [_constants.MODE_CONFIGURING_PROJECT].includes(mode),
      tooltip: translator.t('Configure project'),
      onClick: function onClick(event) {
        return projectActions.openProjectConfigurator();
      }
    }, /*#__PURE__*/_react["default"].createElement(_settings["default"], null), "Settings")
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
  return prevProps.state.hashCode() === nextProps.state.hashCode();
});
exports["default"] = _default;