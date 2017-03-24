var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PropTypes } from 'react';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelLayerElements from './panel-layer-elements';

var STYLE = {
  backgroundColor: "#28292D",
  display: "block",
  overflowY: "auto",
  overflowX: "hidden"
};

export default function Sidebar(_ref) {
  var _extends2;

  var state = _ref.state,
      width = _ref.width,
      height = _ref.height;


  return React.createElement(
    'aside',
    {
      style: _extends((_extends2 = { width: width }, _defineProperty(_extends2, 'width', width), _defineProperty(_extends2, 'height', height), _extends2), STYLE),
      onKeyDown: function onKeyDown(event) {
        return event.stopPropagation();
      },
      onKeyUp: function onKeyUp(event) {
        return event.stopPropagation();
      },
      className: 'sidebar'
    },
    React.createElement(
      'div',
      { className: 'layers' },
      React.createElement(PanelLayers, { state: state })
    ),
    React.createElement(
      'div',
      { className: 'layer-elements' },
      React.createElement(PanelLayerElements, { state: state })
    ),
    React.createElement(
      'div',
      { className: 'properties' },
      React.createElement(PanelElementEditor, { state: state })
    )
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};