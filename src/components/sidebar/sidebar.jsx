import React, {PropTypes} from 'react';
import PanelMousePosition from './panel-mouse-position.jsx';
import PanelPropertiesEditor from './panel-properties-editor.jsx';
import PanelCompositionEditor from './panel-composition-editor.jsx';
import PanelLayers from './panel-layers.jsx';

export default function Sidebar({width, height, state}) {
  return (
    <aside style={{backgroundColor: "#28292D", display:"block", width, height}}>
      <PanelMousePosition />
      <PanelPropertiesEditor scene={state.scene} mode={state.mode}/>
      <PanelCompositionEditor scene={state.scene} mode={state.mode}/>
      <PanelLayers scene={state.scene} mode={state.mode}/>
    </aside>
  );
}

Sidebar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};
