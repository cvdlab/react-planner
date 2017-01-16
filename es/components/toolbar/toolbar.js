var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';
import IconNewFile from 'react-icons/lib/fa/file-o';
import IconPointer from 'react-icons/lib/fa/mouse-pointer';
import IconZoomPlus from 'react-icons/lib/ti/zoom-in';
import IconZoomMinus from 'react-icons/lib/ti/zoom-out';
import IconPan from 'react-icons/lib/fa/hand-paper-o';
import Icon3DFirstPerson from 'react-icons/lib/md/directions-run';
import IconCatalog from 'react-icons/lib/fa/plus';
import IconUndo from 'react-icons/lib/md/undo';
import IconConfigure from 'react-icons/lib/md/settings';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import ToolBarScreenshotButton from './toolbar-screenshot-button';

import If from "../../utils/react-if";

var Icon2D = function Icon2D() {
  return React.createElement(
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
  return React.createElement(
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

import { MODE_IDLE, MODE_2D_PAN, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT } from '../../constants';

import ToolbarButton from './toolbar-button';
var STYLE = { backgroundColor: '#28292D', padding: "10px 10px" };

export default function Toolbar(_ref, _ref2) {
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

  return React.createElement(
    'aside',
    { style: _extends({}, STYLE, { width: width, height: height }), className: 'toolbar' },
    React.createElement(
      If,
      { condition: allowProjectFileSupport },
      React.createElement(
        'div',
        null,
        React.createElement(
          ToolbarButton,
          { active: false, tooltip: translator.t("New project"), onClick: function onClick(event) {
              return projectActions.newProject();
            } },
          React.createElement(IconNewFile, null)
        ),
        React.createElement(ToolbarSaveButton, { state: state }),
        React.createElement(ToolbarLoadButton, { state: state })
      )
    ),
    React.createElement(
      ToolbarButton,
      {
        active: [MODE_VIEWING_CATALOG].includes(mode),
        tooltip: translator.t("Open catalog"),
        onClick: function onClick(event) {
          return projectActions.openCatalog();
        } },
      React.createElement(IconCatalog, null)
    ),
    React.createElement(
      ToolbarButton,
      { active: [MODE_3D_VIEW].includes(mode), tooltip: translator.t("3D View"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DView();
        } },
      React.createElement(Icon3D, null)
    ),
    React.createElement(
      ToolbarButton,
      { active: [MODE_IDLE].includes(mode), tooltip: translator.t("2D View"),
        onClick: function onClick(event) {
          return projectActions.rollback();
        } },
      [MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? React.createElement(Icon2D, null) : React.createElement(IconPointer, null)
    ),
    React.createElement(
      ToolbarButton,
      { active: [MODE_3D_FIRST_PERSON].includes(mode), tooltip: translator.t("3D First Person"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DFirstPerson();
        } },
      React.createElement(Icon3DFirstPerson, null)
    ),
    React.createElement(
      If,
      { condition: ![MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) },
      React.createElement(
        'div',
        null,
        React.createElement(
          ToolbarButton,
          { active: [MODE_2D_ZOOM_IN].includes(mode), tooltip: translator.t("Zoom in"),
            onClick: function onClick(event) {
              return viewer2DActions.selectToolZoomIn();
            } },
          React.createElement(IconZoomPlus, null)
        ),
        React.createElement(
          ToolbarButton,
          { active: [MODE_2D_ZOOM_OUT].includes(mode), tooltip: translator.t("Zoom out"),
            onClick: function onClick(event) {
              return viewer2DActions.selectToolZoomOut();
            } },
          React.createElement(IconZoomMinus, null)
        ),
        React.createElement(
          ToolbarButton,
          { active: [MODE_2D_PAN].includes(mode), tooltip: translator.t("Pan"),
            onClick: function onClick(event) {
              return viewer2DActions.selectToolPan();
            } },
          React.createElement(IconPan, null)
        )
      )
    ),
    React.createElement(
      ToolbarButton,
      { active: false, tooltip: translator.t("Undo (CTRL-Z)"),
        onClick: function onClick(event) {
          return projectActions.undo();
        } },
      React.createElement(IconUndo, null)
    ),
    React.createElement(
      ToolbarButton,
      { active: [MODE_CONFIGURING_PROJECT].includes(mode), tooltip: translator.t("Configure project"),
        onClick: function onClick(event) {
          return projectActions.openProjectConfigurator();
        } },
      React.createElement(IconConfigure, null)
    ),
    React.createElement(
      If,
      { condition: [MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) },
      React.createElement(ToolBarScreenshotButton, { state: state })
    ),
    toolbarButtons.map(function (Component, index) {
      return React.createElement(Component, { mode: mode, key: index });
    })
  );
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};