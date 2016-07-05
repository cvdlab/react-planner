import React, {PropTypes} from 'react';
import Panel from './panel.jsx';
import PropertiesEditor from '../properties-editor/properties-editor.jsx';

export default function PanelPropertiesEditor({scene}) {

  if (!scene.layers.has('layer-floor-1')) return null;

  let layer = scene.layers.get('layer-floor-1');


  let componentRenderer = line =>
    <Panel key={line.id} name={`Properties: [${line.type}] ${line.id}`}>
      <PropertiesEditor element={line}/>
    </Panel>;

  return (
    <div>
      {layer.lines.filter(line => line.selected).map(componentRenderer).valueSeq()}
      {layer.holes.filter(line => line.selected).map(componentRenderer).valueSeq()}
      {layer.areas.filter(line => line.selected).map(componentRenderer).valueSeq()}
    </div>
  )
}

PanelPropertiesEditor.propTypes = {
  scene: PropTypes.object.isRequired
};
