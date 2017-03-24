'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Toolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fileO = require('react-icons/lib/fa/file-o');

var _fileO2 = _interopRequireDefault(_fileO);

var _mousePointer = require('react-icons/lib/fa/mouse-pointer');

var _mousePointer2 = _interopRequireDefault(_mousePointer);

var _zoomIn = require('react-icons/lib/ti/zoom-in');

var _zoomIn2 = _interopRequireDefault(_zoomIn);

var _zoomOut = require('react-icons/lib/ti/zoom-out');

var _zoomOut2 = _interopRequireDefault(_zoomOut);

var _handPaperO = require('react-icons/lib/fa/hand-paper-o');

var _handPaperO2 = _interopRequireDefault(_handPaperO);

var _directionsRun = require('react-icons/lib/md/directions-run');

var _directionsRun2 = _interopRequireDefault(_directionsRun);

var _plus = require('react-icons/lib/fa/plus');

var _plus2 = _interopRequireDefault(_plus);

var _undo = require('react-icons/lib/md/undo');

var _undo2 = _interopRequireDefault(_undo);

var _settings = require('react-icons/lib/md/settings');

var _settings2 = _interopRequireDefault(_settings);

var _toolbarSaveButton = require('./toolbar-save-button');

var _toolbarSaveButton2 = _interopRequireDefault(_toolbarSaveButton);

var _toolbarLoadButton = require('./toolbar-load-button');

var _toolbarLoadButton2 = _interopRequireDefault(_toolbarLoadButton);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _constants = require('../../constants');

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon2D = function Icon2D() {
  return _react2.default.createElement(
    'p',
    { style: {
        fontSize: "19px",
        textDecoration: "none",
        fontWeight: "bold",
        margin: "0px"
      } },
    '2D'
  );
};

var Icon3D = function Icon3D() {
  return _react2.default.createElement(
    'p',
    { style: {
        fontSize: "19px",
        textDecoration: "none",
        fontWeight: "bold",
        margin: "0px"
      } },
    '3D'
  );
};

var STYLE = {
  backgroundColor: '#28292D',
  padding: "10px"
};

function Toolbar(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      toolbarButtons = _ref.toolbarButtons,
      allowProjectFileSupport = _ref.allowProjectFileSupport;
  var projectActions = _ref2.projectActions,
      viewer2DActions = _ref2.viewer2DActions,
      editingActions = _ref2.editingActions,
      viewer3DActions = _ref2.viewer3DActions,
      linesActions = _ref2.linesActions,
      holesActions = _ref2.holesActions,
      itemsActions = _ref2.itemsActions,
      translator = _ref2.translator;


  var mode = state.get('mode');

  return _react2.default.createElement(
    'aside',
    { style: _extends({}, STYLE, { maxWidth: width, maxHeight: height }), className: 'toolbar' },
    _react2.default.createElement(
      _reactIf2.default,
      { condition: allowProjectFileSupport },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _toolbarButton2.default,
          { active: false, tooltip: translator.t("New project"),
            onClick: function onClick(event) {
              return projectActions.newProject();
            } },
          _react2.default.createElement(_fileO2.default, null)
        ),
        _react2.default.createElement(_toolbarSaveButton2.default, { state: state }),
        _react2.default.createElement(_toolbarLoadButton2.default, { state: state })
      )
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: [_constants.MODE_VIEWING_CATALOG].includes(mode),
        tooltip: translator.t("Open catalog"),
        onClick: function onClick(event) {
          return projectActions.openCatalog();
        } },
      _react2.default.createElement(_plus2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: [_constants.MODE_3D_VIEW].includes(mode), tooltip: translator.t("3D View"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DView();
        } },
      _react2.default.createElement(Icon3D, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: [_constants.MODE_IDLE].includes(mode), tooltip: translator.t("2D View"),
        onClick: function onClick(event) {
          return projectActions.rollback();
        } },
      [_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) ? _react2.default.createElement(Icon2D, null) : _react2.default.createElement(_mousePointer2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: [_constants.MODE_3D_FIRST_PERSON].includes(mode), tooltip: translator.t("3D First Person"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DFirstPerson();
        } },
      _react2.default.createElement(_directionsRun2.default, null)
    ),
    _react2.default.createElement(
      _reactIf2.default,
      { condition: ![_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _toolbarButton2.default,
          { active: [_constants.MODE_2D_ZOOM_IN].includes(mode), tooltip: translator.t("Zoom in"),
            onClick: function onClick(event) {
              return viewer2DActions.selectToolZoomIn();
            } },
          _react2.default.createElement(_zoomIn2.default, null)
        ),
        _react2.default.createElement(
          _toolbarButton2.default,
          { active: [_constants.MODE_2D_ZOOM_OUT].includes(mode), tooltip: translator.t("Zoom out"),
            onClick: function onClick(event) {
              return viewer2DActions.selectToolZoomOut();
            } },
          _react2.default.createElement(_zoomOut2.default, null)
        ),
        _react2.default.createElement(
          _toolbarButton2.default,
          { active: [_constants.MODE_2D_PAN].includes(mode), tooltip: translator.t("Pan"),
            onClick: function onClick(event) {
              return viewer2DActions.selectToolPan();
            } },
          _react2.default.createElement(_handPaperO2.default, null)
        )
      )
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: false, tooltip: translator.t("Undo (CTRL-Z)"),
        onClick: function onClick(event) {
          return projectActions.undo();
        } },
      _react2.default.createElement(_undo2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: [_constants.MODE_CONFIGURING_PROJECT].includes(mode), tooltip: translator.t("Configure project"),
        onClick: function onClick(event) {
          return projectActions.openProjectConfigurator();
        } },
      _react2.default.createElement(_settings2.default, null)
    ),
    toolbarButtons.map(function (Component, index) {
      return _react2.default.createElement(Component, { mode: mode, key: index });
    })
  );
}

Toolbar.propTypes = {
  state: _react.PropTypes.object.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired,
  allowProjectFileSupport: _react.PropTypes.bool.isRequired
};

Toolbar.contextTypes = {
  projectActions: _react.PropTypes.object.isRequired,
  viewer2DActions: _react.PropTypes.object.isRequired,
  editingActions: _react.PropTypes.object.isRequired,
  viewer3DActions: _react.PropTypes.object.isRequired,
  linesActions: _react.PropTypes.object.isRequired,
  holesActions: _react.PropTypes.object.isRequired,
  itemsActions: _react.PropTypes.object.isRequired,
  translator: _react.PropTypes.object.isRequired
};