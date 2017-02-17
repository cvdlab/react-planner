import React, {PropTypes} from 'react';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelLayerElements from './panel-layer-elements';

export default function Sidebar({width, height, state}) {

  return (
    <aside
      style={{backgroundColor: "#28292D", display: "block", overflowY: "scroll", width, height}}
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};
