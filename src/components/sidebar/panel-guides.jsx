import React, {PropTypes} from 'react';
import Panel from './panel';
import IconAdd from 'react-icons/lib/ti/plus';


const STYLE_ADD_WRAPPER = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px",
  borderTop: "1px solid black"
};

const STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

export default function PanelGuides({scene, mode}) {
  return (
    <Panel name="Guides">
      <div key={1} style={{background: "#3a3a3e", padding: "5px 15px 5px 15px"}}>
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

      <a href="javascript:;" style={STYLE_ADD_WRAPPER} key="add" onClick={() => alert('Sorry, but this feature is not supported yet')}>
        <IconAdd />
        <span style={STYLE_ADD_LABEL}>New Guide</span>
      </a>
    </Panel>
  )

}

PanelGuides.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

PanelGuides.contextTypes = {};
