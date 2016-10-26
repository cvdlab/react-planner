import React, {PropTypes} from 'react';
import Panel from './panel';
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

export default function PanelGuides({scene, mode}) {
  return (
    <Panel name="Guides">
      <div style={{padding: "5px 15px 5px 15px"}}>
        {scene.guides.entrySeq().map(([guideID, guide]) => {
          return (
            <div key={guideID}>
              <input type="checkbox" checked="true" readOnly/>
              {guide.type}
              {guide.properties.entrySeq().map(([key, value]) => <span key={key}> [{key}:{value}] </span>)}
            </div>
          )
        })}
      </div>
    </Panel>
  )

}

PanelGuides.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

PanelGuides.contextTypes = {};
