import React, { PropTypes, Component } from 'react';
import Panel from '../panel';
import { Seq } from 'immutable';
import { MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT, MODE_CONFIGURING_LAYER } from '../../../constants';
import ElementEditor from './element-editor';

export default function PanelElementEditor(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;
  var scene = state.scene,
      mode = state.mode;


  if ([MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT, MODE_CONFIGURING_LAYER].includes(mode)) return null;

  var componentRenderer = function componentRenderer(element, layer) {
    return React.createElement(
      Panel,
      { key: element.id, name: translator.t("Properties: [{0}] {1}", element.type, element.id) },
      React.createElement(
        'div',
        { style: { padding: "5px 15px" } },
        React.createElement(ElementEditor, { element: element, layer: layer, state: state })
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

PanelElementEditor.propTypes = {
  state: PropTypes.object.isRequired
};

PanelElementEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};