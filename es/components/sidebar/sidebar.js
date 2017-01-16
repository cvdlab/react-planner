import React, { PropTypes } from 'react';
import PanelPropertiesEditor from './panel-properties-editor/panel-properties-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelLayerElements from './panel-layer-elements';

export default function Sidebar(_ref) {
  var width = _ref.width,
      height = _ref.height,
      state = _ref.state;

  return React.createElement(
    'aside',
    {
      style: { backgroundColor: "#28292D", display: "block", overflow: "scroll", width: width, height: height },
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
      { className: 'layer-elements' },
      React.createElement(PanelLayerElements, { state: state })
    ),
    React.createElement(
      'div',
      { className: 'properties' },
      React.createElement(PanelPropertiesEditor, { state: state })
    ),
    React.createElement(
      'div',
      { className: 'layers' },
      React.createElement(PanelLayers, { state: state })
    )
  );
}

Sidebar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};