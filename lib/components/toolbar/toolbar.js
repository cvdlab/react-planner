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

var _floppyO = require('react-icons/lib/fa/floppy-o');

var _floppyO2 = _interopRequireDefault(_floppyO);

var _folderOpenO = require('react-icons/lib/fa/folder-open-o');

var _folderOpenO2 = _interopRequireDefault(_folderOpenO);

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

var STYLE = { backgroundColor: '#28292D', padding: "10px 10px" };

function Toolbar(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      toolbarButtons = _ref.toolbarButtons;
  var projectActions = _ref2.projectActions,
      viewer2DActions = _ref2.viewer2DActions,
      editingActions = _ref2.editingActions,
      viewer3DActions = _ref2.viewer3DActions,
      linesActions = _ref2.linesActions,
      holesActions = _ref2.holesActions,
      itemsActions = _ref2.itemsActions;


  var mode = state.get('mode');

  return _react2.default.createElement(
    'aside',
    { style: _extends({}, STYLE, { width: width, height: height }) },
    _react2.default.createElement(
      _toolbarButton2.default,
      { tooltip: 'New project', onClick: function onClick(event) {
          return projectActions.newProject();
        } },
      _react2.default.createElement(_fileO2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { tooltip: 'Save project', onClick: function onClick(event) {
          return projectActions.saveProjectToFile();
        } },
      _react2.default.createElement(_floppyO2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { tooltip: 'Load project', onClick: function onClick(event) {
          return projectActions.loadProjectFromFile();
        } },
      _react2.default.createElement(_folderOpenO2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: [_constants.MODE_3D_VIEW].includes(mode), tooltip: '3D View',
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DView();
        } },
      _react2.default.createElement(Icon3D, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: [_constants.MODE_IDLE].includes(mode), tooltip: '2D View',
        onClick: function onClick(event) {
          return editingActions.selectToolEdit();
        } },
      [_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) ? _react2.default.createElement(Icon2D, null) : _react2.default.createElement(_mousePointer2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: [_constants.MODE_3D_FIRST_PERSON].includes(mode), tooltip: '3D First Person',
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
          { active: [_constants.MODE_2D_ZOOM_IN].includes(mode), tooltip: 'Zoom in',
            onClick: function onClick(event) {
              return viewer2DActions.selectToolZoomIn();
            } },
          _react2.default.createElement(_zoomIn2.default, null)
        ),
        _react2.default.createElement(
          _toolbarButton2.default,
          { active: [_constants.MODE_2D_ZOOM_OUT].includes(mode), tooltip: 'Zoom out',
            onClick: function onClick(event) {
              return viewer2DActions.selectToolZoomOut();
            } },
          _react2.default.createElement(_zoomOut2.default, null)
        ),
        _react2.default.createElement(
          _toolbarButton2.default,
          { active: [_constants.MODE_2D_PAN].includes(mode), tooltip: 'Pan',
            onClick: function onClick(event) {
              return viewer2DActions.selectToolPan();
            } },
          _react2.default.createElement(_handPaperO2.default, null)
        )
      )
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: [_constants.MODE_VIEWING_CATALOG].includes(mode),
        tooltip: 'Open catalog',
        onClick: function onClick(event) {
          return projectActions.openCatalog();
        } },
      _react2.default.createElement(_plus2.default, null)
    ),
    toolbarButtons.map(function (Component, index) {
      return _react2.default.createElement(Component, { mode: mode, key: index });
    })
  );
}

Toolbar.propTypes = {
  state: _react.PropTypes.object.isRequired
};

Toolbar.contextTypes = {
  projectActions: _react.PropTypes.object.isRequired,
  viewer2DActions: _react.PropTypes.object.isRequired,
  editingActions: _react.PropTypes.object.isRequired,
  viewer3DActions: _react.PropTypes.object.isRequired,
  linesActions: _react.PropTypes.object.isRequired,
  holesActions: _react.PropTypes.object.isRequired,
  itemsActions: _react.PropTypes.object.isRequired
};