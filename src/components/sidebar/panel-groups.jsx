import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';
import IconVisible from 'react-icons/lib/fa/eye';
import {TiPlus, TiDelete} from 'react-icons/lib/ti';
import {FaPencil, FaTrash} from 'react-icons/lib/fa';

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
  marginLeft: '1px'
};

const iconColStyle = {width: '2em'};
const styleHoverColor = {color: SharedStyle.SECONDARY_COLOR.main};
const styleEditButtonHover = {...styleEditButton, ...styleHoverColor};
const styleAddLabel = {fontSize: '10px', marginLeft: '5px'};
const styleEyeVisible = {fontSize: '1.25em'};
const styleEyeHidden = {...styleEyeVisible, color: '#a5a1a1'};
const newLayerLableStyle = {fontSize: '1.3em', cursor: 'pointer', textAlign: 'center'};
const newLayerLableHoverStyle = {...newLayerLableStyle, ...styleHoverColor};

export default class PanelGroups extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      newEmptyHover: false,
      newSelectedHover: false,
      groupIdHover: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps( nextProps, nextContext ) {
  }

  render() {
    if (!VISIBILITY_MODE[this.props.state.mode]) return null;

    let groups = this.props.state.getIn(['scene', 'groups']);

    return (
      <Panel name={this.context.translator.t('Groups')} opened={groups.size > 0}>
        { groups.size ? <table style={tablegroupStyle}>
          <thead>
            <tr>
              <th colSpan="2"></th>
              <th>{this.context.translator.t('X')}</th>
              <th>{this.context.translator.t('Y')}</th>
              <th>{this.context.translator.t('Elements')}</th>
              <th>{this.context.translator.t('Name')}</th>
            </tr>
          </thead>
          <tbody>
            {
              groups.entrySeq().map(([ groupID, group ]) => {

                let selectClick = e => this.context.groupsActions.selectGroup(groupID);

                let swapVisibility = e => {
                  e.stopPropagation();
                  this.context.sceneActions.setgroupProperties(groupID, {visible: !group.get('visible')});
                };

                let isCurrentgroup = group.get('selected');
                let isHoverd = groupID === this.state.groupIdHover;
                let shouldHighlight = isCurrentgroup || isHoverd;
                let rowStyle = !shouldHighlight ? null : styleHoverColor;

                return (
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
                );
              })
            }
          </tbody>
        </table> : null }

        <table style={{width:'100%'}}>
          <tbody>
            <tr>
              <td
                style={ !this.state.newEmptyHover ? newLayerLableStyle : newLayerLableHoverStyle }
                onMouseOver={ () => this.setState({newEmptyHover: true}) }
                onMouseOut={ () => this.setState({newEmptyHover: false}) }
                onClick={ e => this.context.groupsActions.addGroup() }
              >
                <TiPlus />
                <b style={styleAddLabel}>New empty Group</b>
              </td>
              <td
                style={ !this.state.newSelectedHover ? newLayerLableStyle : newLayerLableHoverStyle }
                onMouseOver={ () => this.setState({newSelectedHover: true}) }
                onMouseOut={ () => this.setState({newSelectedHover: false}) }
                onClick={ (e) => this.addLayer(e) }
              >
                <TiPlus />
                <b style={styleAddLabel}>New Group from selected</b>
              </td>
            </tr>
          </tbody>
        </table>

        {/*<div style={{padding: '5px 15px'}}>
          <div style={{cursor:'pointer', fontSize:'2em'}} title="Add Group" onClick={
            e => this.context.groupsActions.addGroup()
          }>++++++</div>
          {
            groups.size ? groups.entrySeq().map( ([ groupID, group ]) =>
              <div
                key={groupID}
                onClick={e => this.context.groupsActions.selectGroup(groupID)}
                style={ group.get('selected') ? elementSelectedStyle : elementStyle }
                title={ group.get('elements').size ? group.get('name') : 'Empty Group' }
              >
                <div style={{ color: ( group.get('elements').size ? 'auto' : 'red' ) }}>{group.get('name')}</div>
              </div>
            ) : null
          }
        </div>*/}
      </Panel>
    )
  }

}

PanelGroups.propTypes = {
  state: PropTypes.object.isRequired
};

PanelGroups.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
