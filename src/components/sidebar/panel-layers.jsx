import React, {PropTypes} from 'react';
import Panel from './panel.jsx';
import IconVisible from 'react-icons/lib/fa/eye';
import IconHide from 'react-icons/lib/fa/eye-slash';
import IconAdd from 'react-icons/lib/ti/plus';

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
  fontSize: "15px",
  marginLeft: "15px"
};

const STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

export default function PanelLayers({scene, mode}, {sceneActions}) {

  let addClick = event => {
    let name = window.prompt("layer name");
    let altitude = window.prompt("layer altitude");
    sceneActions.addLayer(name, parseFloat(altitude));
    event.stopPropagation();
  }

  return (
    <Panel name="Layers">
      {scene.layers.entrySeq().map(([layerID, layer]) => {

        let style = layerID === scene.selectedLayer ? STYLE_LAYER_ACTIVE : STYLE_LAYER_WRAPPER;
        let icon = layer.visible || layerID === scene.selectedLayer ? <IconVisible /> : <IconHide style={{color:"#a5a1a1"}} />;

        let selectClick = event => sceneActions.selectLayer(layerID);

        let swapVisibility = event => {
          sceneActions.setLayerProperties(layerID, {visible: !layer.visible});
          event.stopPropagation();
        };

        return (
          <div style={style} key={layerID} onClick={selectClick}>
            <div style={STYLE_ICON} onClick={swapVisibility}>{icon}</div>
            <div style={STYLE_NAME}>[{layer.id}] {layer.name}</div>
          </div>
        )
      })}

      <div style={STYLE_ADD_WRAPPER} key="add" onClick={addClick}>
        <IconAdd />
        <span style={STYLE_ADD_LABEL}>New Layer</span>
      </div>
    </Panel>
  )

}

PanelLayers.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

PanelLayers.contextTypes = {
  sceneActions: PropTypes.object.isRequired
};
