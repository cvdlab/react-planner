import React, {PropTypes} from 'react';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelLayerElements from './panel-layer-elements';

const STYLE = {
  backgroundColor: "#28292D",
  display: "block",
  overflowY: "auto",
  overflowX: "hidden",
  width: "100%"
};

export default function Sidebar({state}) {

  return (
    <aside
      style={STYLE}
      onKeyDown={event => event.stopPropagation()}
      onKeyUp={event => event.stopPropagation()}
      className="sidebar"
    >
      <div className="layers"><PanelLayers state={state}/></div>
      <div className="layer-elements"><PanelLayerElements state={state}/></div>
      <div className="properties"><PanelElementEditor state={state}/></div>
      {/*<div className="guides"><PanelGuides state={state}/></div>*/}
    </aside>
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired
};
