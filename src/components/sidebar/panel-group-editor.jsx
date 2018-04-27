import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';
import IconVisible from 'react-icons/lib/fa/eye';
import {TiPlus, TiDelete} from 'react-icons/lib/ti';
import {FaPencil, FaTrash} from 'react-icons/lib/fa';
import { FormNumberInput, FormTextInput } from '../style/export';
import { Group } from '../../class/export';
import { Map } from 'immutable';

import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../constants';

const VISIBILITY_MODE = {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
};

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '6em' };
const inputStyle = { textAlign: 'left' };
const styleEditButton = {
  cursor: 'pointer',
  marginLeft: '5px',
  border: '0px',
  background: 'none',
  color: SharedStyle.COLORS.white,
  fontSize: '14px',
  outline: '0px'
};

const tablegroupStyle = {
  width: '100%',
  cursor: 'pointer',
  overflowY: 'auto',
  maxHeight: '20em',
  display: 'block',
  padding: '0 1em',
  marginLeft: '1px',
  marginTop:'1em'
};

const iconColStyle = {width: '2em'};
const styleHoverColor = {color: SharedStyle.SECONDARY_COLOR.main};
const styleEditButtonHover = {...styleEditButton, ...styleHoverColor};
const styleEyeVisible = {fontSize: '1.25em'};
const styleEyeHidden = {...styleEyeVisible, color: '#a5a1a1'};

export default class PanelGroupEditor extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps( nextProps, nextContext ) {
  }

  render() {
    if (!this.props.groupID || !VISIBILITY_MODE[this.props.state.mode]) return null;

    let group = this.props.state.getIn(['scene', 'groups', this.props.groupID]);
    let elements = group.get('elements');

    return (
      <Panel name={this.context.translator.t('Group [{0}]', group.get('name'))} opened={true}>
        <div style={{padding: '5px 15px'}}>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={firstTdStyle}>{this.context.translator.t('Name')}</td>
                <td>
                  <FormTextInput
                    value={group.get('name')}
                    onChange={event => this.context.groupsActions.setGroupProperties( this.props.groupID, new Map({ 'name': event.target.value }) ) }
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={firstTdStyle}>X</td>
                <td>
                  <FormNumberInput
                    value={group.get('x')}
                    onChange={event => this.context.groupsActions.setGroupProperties( this.props.groupID, new Map({ 'x': event.target.value }) ) }
                    style={inputStyle}
                    state={this.props.state}
                    precision={2}
                  />
                </td>
              </tr>
              <tr>
                <td style={firstTdStyle}>Y</td>
                <td>
                  <FormNumberInput
                    value={group.get('y')}
                    onChange={event => this.context.groupsActions.setGroupProperties( this.props.groupID, new Map({ 'y': event.target.value }) ) }
                    style={inputStyle}
                    state={this.props.state}
                    precision={2}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          { elements.size ?
            <table style={tablegroupStyle}>
              <thead>
                <tr>
                  <th></th>
                  <th>{this.context.translator.t('Layer')}</th>
                  <th>{this.context.translator.t('Prototype')}</th>
                  <th>{this.context.translator.t('Name')}</th>
                </tr>
              </thead>
              <tbody>
                {
                  elements.entrySeq().map(([ layerID, layerElements ]) => {



                    return layerElements.get('lines').size ? layerElements.get('lines').toJS().map( lineID => {

                      let element = this.props.state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

                      return <tr
                        key={lineID}
                      >
                        <td style={iconColStyle}>
                          <FaTrash
                            onClick={ e => console.log('TODO') }
                            style={styleEditButton}
                            title={this.context.translator.t('Delete')}
                          />
                        </td>
                        <td style={{width:'3em', textAlign:'center'}}>
                          {layerID}
                        </td>
                        <td style={{width:'3em', textAlign:'center'}}>
                          {'lines'}
                        </td>
                        <td style={{width:'0em', textAlign:'center'}}>
                          {element.name}
                        </td>
                      </tr>
                    }) : null;

                    /*return (
                      <tr
                        key={groupID}
                        style={rowStyle}
                        onMouseOver={ () => this.setState({groupIdHover: groupID}) }
                        onMouseOut={ () => this.setState({groupIdHover: groupID}) }
                      >
                        <td style={iconColStyle}>
                          <IconVisible
                            onClick={swapVisibility}
                            style={!group.get('visible') ? styleEyeHidden : styleEyeVisible}
                          />
                        </td>
                        <td style={iconColStyle}>
                          <FaTrash
                            onClick={ e => this.delgroup(e, groupID) }
                            style={!shouldHighlight ? styleEditButton : styleEditButtonHover}
                            title={this.context.translator.t('Delete group')}
                          />
                        </td>
                        <td onClick={selectClick} style={{width:'3em', textAlign:'center'}}>
                          {parseFloat(group.get('x')).toFixed(2)}
                        </td>
                        <td onClick={selectClick} style={{width:'3em', textAlign:'center'}}>
                          {parseFloat(group.get('y')).toFixed(2)}
                        </td>
                        <td onClick={selectClick} style={{width:'0em', textAlign:'center'}}>
                          0
                        </td>
                        <td onClick={selectClick}>
                          {group.get('name')}
                        </td>
                      </tr>
                    );*/
                  })
                }
              </tbody>
            </table> : null }
        </div>
      </Panel>
    );
  }

}

PanelGroupEditor.propTypes = {
  state: PropTypes.object.isRequired,
  groupID: PropTypes.string
};

PanelGroupEditor.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
