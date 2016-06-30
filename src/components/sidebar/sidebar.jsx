import React from 'react';
import PanelMousePosition from './panel-mouse-position.jsx';

export default function Sidebar({width, height}) {
  return (
    <aside style={{backgroundColor: "#28292D", display:"block", width, height}}>
      <PanelMousePosition />
    </aside>
  );
}
