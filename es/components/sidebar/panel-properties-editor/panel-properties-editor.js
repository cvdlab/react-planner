import React, { PropTypes, Component } from 'react';
import Panel from '../panel';
import { Map, Seq, Iterable } from 'immutable';
import { MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON } from '../../../constants';
import PropertiesEditor from './properties-editor';

export default function PanelPropertiesEditor(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;
  var scene = state.scene,
      mode = state.mode;


  if (![MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON].includes(mode)) return null;

  var componentRenderer = function componentRenderer(element, layer) {
    return React.createElement(
      Panel,
      { key: element.id, name: translator.t("Properties: [{0}] {1}", element.type, element.id) },
      React.createElement(
        'div',
        { style: { padding: "5px 15px 5px 15px" } },
        React.createElement(PropertiesEditor, { element: element, layer: layer, state: state })
      )
    );
  };

  var layerRenderer = function layerRenderer(layer) {
    return Seq().concat(layer.lines).concat(layer.holes).concat(layer.areas).concat(layer.items).filter(function (element) {
      return element.selected;
    }).map(function (element) {
      return componentRenderer(element, layer);
    }).valueSeq();
  };

  return React.createElement(
    'div',
    null,
    scene.layers.valueSeq().map(layerRenderer)
  );
}

PanelPropertiesEditor.propTypes = {
  state: PropTypes.object.isRequired
};

PanelPropertiesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};