import React, {PropTypes} from 'react';
import Panel from './panel.jsx';
import PropertiesEditor from '../properties-editor/properties-editor.jsx';
import {Seq} from 'immutable';
import {MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON} from '../../constants';

export default function PanelPropertiesEditor({scene, mode}) {

  if (![MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON].includes(mode)) return null;

  let componentRenderer = (element, layer) =>
    <Panel key={element.id} name={`Properties: [${element.type}] ${element.id}`}>
      <div style={{padding: "5px 15px 5px 15px"}}>
        <PropertiesEditor element={element} layer={layer}/>
      </div>
    </Panel>;

  let layerRenderer = layer => Seq()
    .concat(layer.lines)
    .concat(layer.holes)
    .concat(layer.areas)
    .filter(element => element.selected)
    .map(element => componentRenderer(element, layer))
    .valueSeq();

  return <div>{scene.layers.valueSeq().map(layerRenderer)}</div>

}

PanelPropertiesEditor.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
