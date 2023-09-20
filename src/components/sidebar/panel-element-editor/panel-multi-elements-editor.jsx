import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Panel from '../panel';
import { Seq } from 'immutable';
import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../../utils/constants';
import { FormSelect } from '../../../components/style/export';
import { Group } from '../../../class/export';
import ReactPlannerContext from '../../../utils/react-planner-context';

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '6em' };

const PanelMultiElementsEditor = ({ state }) => {
  const [selectedGroupID, setSelectedGroupID] = useState('');
  const { groupsActions } = useContext(ReactPlannerContext);

  const { mode } = state;

  if (![MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN,
    MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
    MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM,
    MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE,
    MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE].includes(mode)) return null;

  let groups = state.getIn(['scene', 'groups']);

  //TODO change in multi-layer check
  let selectedLayer = state.getIn(['scene', 'selectedLayer']);
  let selecteds = state.getIn(['scene', 'layers', selectedLayer, 'selected']);

  const addSelectToGroup = (state, groupID, layerID, selecteds) => {
    if (!groupID || groupID === '' || !selecteds || !selecteds.size) return;

    console.log('TODO: need to be added to group', groupID, 'elements', selecteds);

    /*let selectedJs = selecteds.toJS();

    for( let lineID in selectedJs.lines ) Group.addElement( state, groupID, layerID, 'lines', lineID );*/

  }

  return (
    <Panel name={'Multiselected'} opened={true}>
      <div style={{ padding: '5px 15px' }}>
        <p>Multiselection tab</p>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={firstTdStyle}>Add to Group</td>
              <td>
                <FormSelect value={selectedGroupID} onChange={e => setSelectedGroupID(e.target.value)}>
                  <option key={0} value={''}></option>
                  {
                    groups.entrySeq().map(([groupID, group]) => <option key={groupID} value={groupID}>{group.get('name')}</option>)
                  }
                </FormSelect>
              </td>
              <td style={{ cursor: 'pointer', padding: '0.5em 0', textAlign: 'center' }} onClick={e => {
                if (!selectedGroupID || selectedGroupID === '' || !selecteds || !selecteds.size) return;

                let selectedJs = selecteds.toJS();

                for (let x = 0; x < selectedJs.lines.length; x++)
                  groupsActions.addToGroup(selectedGroupID, selectedLayer, 'lines', selectedJs.lines[x]);

              }}>+</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

PanelMultiElementsEditor.propTypes = {
  state: PropTypes.object.isRequired,
};

export default PanelMultiElementsEditor;