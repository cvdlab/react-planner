import React, {PropTypes} from 'react';
import Panel from './panel.jsx';
import PropertiesEditor from '../properties-editor/properties-editor.jsx';
import {Seq} from 'immutable';

export default function PanelPropertiesEditor({scene}) {

  let componentRenderer = (element, layer) =>
    <Panel key={element.id} name={`Properties: [${element.type}] ${element.id}`}>
      <PropertiesEditor element={element} layer={layer}/>
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
  scene: PropTypes.object.isRequired
};
