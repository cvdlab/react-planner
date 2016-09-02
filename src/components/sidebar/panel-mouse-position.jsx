import React from 'react';
import Panel from './panel.jsx';

const STYLE = {
  display: "inline-block",
  width: "100px"
};

export default function PanelMousePosition(props) {
  return (
    <Panel name="Mouse Position">
      <div style={{padding: "5px 15px 5px 15px"}}>
        <div style={STYLE}>x: 0</div>
        <div style={STYLE}>y: 0</div>
      </div>
    </Panel>
  )
}
