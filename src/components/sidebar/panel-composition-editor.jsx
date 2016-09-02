import React, {PropTypes} from 'react';
import Panel from './panel.jsx';
import {MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON} from '../../constants';
import CompositionForm from '../composition-editor/composition-form.jsx';
import CompositionDetails from '../composition-editor/composition-details.jsx';
import CompositionAddButton from '../composition-editor/composition-add-button.jsx';

const STYLE_WRAPPER_BUTTONS = {marginTop: "5px", textAlign: "right"};
const STYLE_BUTTON_RESET = {backgroundColor: "gray", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_SAVE = {backgroundColor: "green", border: 0, color: "white", margin: "3px"};

export default function PanelCompositionEditor({scene, mode}) {

  if (![MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON].includes(mode)) return null;

  return (
    <Panel name="Composition">

      <div style={{padding: "5px 15px 5px 15px"}}>

        <CompositionDetails/>
        <CompositionDetails/>

        <CompositionForm/>
        <CompositionAddButton/>

        <div style={STYLE_WRAPPER_BUTTONS}>
          <button style={STYLE_BUTTON_RESET}>Reset</button>
          <button style={STYLE_BUTTON_SAVE}>Save</button>
        </div>
      </div>
    </Panel>)

}

PanelCompositionEditor.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
