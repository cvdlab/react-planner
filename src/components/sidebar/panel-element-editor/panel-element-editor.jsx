import React, {PropTypes, Component} from 'react';
import Panel from '../panel';
import {Map, Seq, Iterable} from 'immutable';
import {MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON} from '../../../constants';
import ElementEditor from './element-editor';

export default function PanelElementEditor({state}, {translator}) {

  let {scene, mode} = state;

  if (![MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON].includes(mode)) return null;

  let componentRenderer = (element, layer) =>
    <Panel key={element.id} name={translator.t("Properties: [{0}] {1}", element.type, element.id)}>
      <div style={{padding: "5px 15px"}}>
        <ElementEditor element={element} layer={layer} state={state}/>
      </div>
    </Panel>;

  let layerRenderer = layer => Seq()
    .concat(layer.lines)
    .concat(layer.holes)
    .concat(layer.areas)
    .concat(layer.items)
    .filter(element => element.selected)
    .map(element => componentRenderer(element, layer))
    .valueSeq();

  return <div>{scene.layers.valueSeq().map(layerRenderer)}</div>

}

PanelElementEditor.propTypes = {
  state: PropTypes.object.isRequired,
};

PanelElementEditor.contextTypes= {
  translator: PropTypes.object.isRequired
};
