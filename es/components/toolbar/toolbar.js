var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import IconNewFile from 'react-icons/lib/fa/file-o';
import IconPointer from 'react-icons/lib/fa/mouse-pointer';
import IconZoomPlus from 'react-icons/lib/ti/zoom-in';
import IconZoomMinus from 'react-icons/lib/ti/zoom-out';
import IconPan from 'react-icons/lib/fa/hand-paper-o';
import Icon3DFirstPerson from 'react-icons/lib/md/directions-run';
import IconCatalog from 'react-icons/lib/fa/plus';
import IconUndo from 'react-icons/lib/md/undo';
import IconConfigure from 'react-icons/lib/md/settings';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import If from "../../utils/react-if";
import { MODE_IDLE, MODE_2D_PAN, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT } from '../../constants';

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

var ASIDE_STYLE = {
  backgroundColor: '#28292D',
  padding: '10px',
  overflowY: 'hidden'
};

export default function Toolbar(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      toolbarButtons = _ref.toolbarButtons,
      allowProjectFileSupport = _ref.allowProjectFileSupport;
  var projectActions = _ref2.projectActions,
      viewer2DActions = _ref2.viewer2DActions,
      viewer3DActions = _ref2.viewer3DActions,
      linesActions = _ref2.linesActions,
      holesActions = _ref2.holesActions,
      itemsActions = _ref2.itemsActions,
      translator = _ref2.translator;


  var mode = state.get('mode');

  var mode3DCondition = ![MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode);

  var sorter = [{
    index: 0, condition: allowProjectFileSupport, dom: React.createElement(
      ToolbarButton,
      {
        active: false,
        tooltip: translator.t("New project"),
        onClick: function onClick(event) {
          return projectActions.newProject();
        } },
      React.createElement(IconNewFile, null)
    )
  }, {
    index: 1, condition: allowProjectFileSupport,
    dom: React.createElement(ToolbarSaveButton, { state: state })
  }, {
    index: 2, condition: allowProjectFileSupport,
    dom: React.createElement(ToolbarLoadButton, { state: state })
  }, {
    index: 3, condition: true,
    dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_VIEWING_CATALOG].includes(mode),
        tooltip: translator.t("Open catalog"),
        onClick: function onClick(event) {
          return projectActions.openCatalog();
        } },
      React.createElement(IconCatalog, null)
    )
  }, {
    index: 4, condition: true, dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_3D_VIEW].includes(mode),
        tooltip: translator.t("3D View"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DView();
        } },
      React.createElement(Icon3D, null)
    )
  }, {
    index: 5, condition: true, dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_IDLE].includes(mode),
        tooltip: translator.t("2D View"),
        onClick: function onClick(event) {
          return projectActions.rollback();
        } },
      [MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? React.createElement(Icon2D, null) : React.createElement(IconPointer, null)
    )
  }, {
    index: 6, condition: true, dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_3D_FIRST_PERSON].includes(mode),
        tooltip: translator.t("3D First Person"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DFirstPerson();
        } },
      React.createElement(Icon3DFirstPerson, null)
    )
  }, {
    index: 7, condition: mode3DCondition, dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_2D_ZOOM_IN].includes(mode),
        tooltip: translator.t("Zoom in"),
        onClick: function onClick(event) {
          return viewer2DActions.selectToolZoomIn();
        } },
      React.createElement(IconZoomPlus, null)
    )
  }, {
    index: 8, condition: mode3DCondition, dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_2D_ZOOM_OUT].includes(mode),
        tooltip: translator.t("Zoom out"),
        onClick: function onClick(event) {
          return viewer2DActions.selectToolZoomOut();
        } },
      React.createElement(IconZoomMinus, null)
    )
  }, {
    index: 9, condition: mode3DCondition, dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_2D_PAN].includes(mode),
        tooltip: translator.t("Pan"),
        onClick: function onClick(event) {
          return viewer2DActions.selectToolPan();
        } },
      React.createElement(IconPan, null)
    )
  }, {
    index: 10, condition: true, dom: React.createElement(
      ToolbarButton,
      {
        active: false,
        tooltip: translator.t("Undo (CTRL-Z)"),
        onClick: function onClick(event) {
          return projectActions.undo();
        } },
      React.createElement(IconUndo, null)
    )
  }, {
    index: 11, condition: true, dom: React.createElement(
      ToolbarButton,
      {
        active: [MODE_CONFIGURING_PROJECT].includes(mode),
        tooltip: translator.t("Configure project"),
        onClick: function onClick(event) {
          return projectActions.openProjectConfigurator();
        } },
      React.createElement(IconConfigure, null)
    )
  }];

  sorter = sorter.concat(toolbarButtons.map(function (Component, index) {
    return {
      condition: true,
      dom: React.createElement(Component, { mode: mode, state: state, key: index })
    };
  }));

  sorter.sort(function (a, b) {
    if (a.index === undefined || a.index === null) {
      a.index = Number.MAX_SAFE_INTEGER;
    }

    if (b.index === undefined || b.index === null) {
      b.index = Number.MAX_SAFE_INTEGER;
    }

    return a.index - b.index;
  });

  return React.createElement(
    'aside',
    { style: _extends({}, ASIDE_STYLE, { maxWidth: width, maxHeight: height }), className: 'toolbar' },
    sorter.map(function (el, ind) {
      return React.createElement(
        If,
        { key: ind, condition: el.condition },
        el.dom
      );
    })
  );
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};