import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelLayerElements from './panel-layer-elements';

const STYLE = {
  backgroundColor: "#28292D",
  display: "block",
  overflowY: "auto",
  overflowX: "hidden"
};

export default function Sidebar({state, width, height, sidebarComponents}) {

  return (
    <aside
      style={{width, height, ...STYLE}}
      onKeyDown={event => event.stopPropagation()}
      onKeyUp={event => event.stopPropagation()}
      className="sidebar"
    >
      <div className="layers"><PanelLayers state={state}/></div>
      <div className="layer-elements"><PanelLayerElements state={state}/></div>
      <div className="properties"><PanelElementEditor state={state}/></div>
      {/*<div className="guides"><PanelGuides state={state}/></div>*/}
      {sidebarComponents.map((Component, index) => <Component mode={state.mode} key={index}/>)}
    </aside>
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
