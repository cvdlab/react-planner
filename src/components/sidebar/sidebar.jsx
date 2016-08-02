import React, {PropTypes} from 'react';
import PanelMousePosition from './panel-mouse-position.jsx';
import PanelPropertiesEditor from './panel-properties-editor.jsx';

export default function Sidebar({width, height, state}) {
  return (
    <aside style={{backgroundColor: "#28292D", display:"block", width, height}}>
      <PanelMousePosition />
      <PanelPropertiesEditor scene={state.scene} mode={state.mode}/>
    </aside>
  );
}

Sidebar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};
