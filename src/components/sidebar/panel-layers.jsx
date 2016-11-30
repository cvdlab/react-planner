import React, {PropTypes} from 'react';
import Panel from './panel';
import IconVisible from 'react-icons/lib/fa/eye';
import IconHide from 'react-icons/lib/fa/eye-slash';
import IconAdd from 'react-icons/lib/ti/plus';
import IconEdit from 'react-icons/lib/fa/pencil';

const STYLE_LAYER_WRAPPER = {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  background: "#3A3A3E",
  borderBottom: "1px solid #000",
  height: "30px",
  padding: "5px 15px 5px 15px"
};

const STYLE_LAYER_ACTIVE = {
  ...STYLE_LAYER_WRAPPER,
  background: "#415375"
};

const STYLE_ICON = {
  width: "10%",
  fontSize: "18px",
};

const STYLE_NAME = {
  width: "90%",
  verticalAlign: "center",
  padding: "0 5px"
};

const STYLE_ADD_WRAPPER = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px"
};

const STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

const STYLE_EDIT_BUTTON = {
  cursor: "pointer",
  marginLeft: "5px",
  border: "0px",
  background: "none",
  color: "#fff",
  fontSize: "14px",
  outline: "0px"
};

export default function PanelLayers({state: {scene, mode}}, {sceneActions}) {

  let addClick = event => {
    let name = window.prompt("layer name");
    let altitude = window.prompt("layer altitude");
    sceneActions.addLayer(name, parseFloat(altitude));
    event.stopPropagation();
  };

  return (
    <Panel name="Layers">
      {scene.layers.entrySeq().map(([layerID, layer]) => {

        let isCurrentLayer = layerID === scene.selectedLayer;
        let style = isCurrentLayer ? STYLE_LAYER_ACTIVE : STYLE_LAYER_WRAPPER;
        let icon = layer.visible || layerID === scene.selectedLayer ? <IconVisible /> :
          <IconHide style={{color: "#a5a1a1"}}/>;

        let selectClick = event => sceneActions.selectLayer(layerID);
        let configureClick = event => sceneActions.openLayerConfigurator(layer.id);

        let swapVisibility = event => {
          sceneActions.setLayerProperties(layerID, {visible: !layer.visible});
          event.stopPropagation();
        };

        let iconRendered = isCurrentLayer ?
          <div style={STYLE_ICON}></div> : <div style={STYLE_ICON} onClick={swapVisibility}>{icon}</div>;


        return (
          <div style={style} key={layerID} onClick={selectClick}>
            {iconRendered}
            <div style={STYLE_NAME}>[{layer.id}] {layer.name}
              <button onClick={configureClick} style={STYLE_EDIT_BUTTON}><IconEdit /></button>
            </div>
          </div>
        )
      })}

      <a href="javascript:;" style={STYLE_ADD_WRAPPER} key="add" onClick={addClick}>
        <IconAdd />
        <span style={STYLE_ADD_LABEL}>New Layer</span>
      </a>
    </Panel>
  )

}

PanelLayers.propTypes = {
  state: PropTypes.object.isRequired,
};

PanelLayers.contextTypes = {
  sceneActions: PropTypes.object.isRequired
};
