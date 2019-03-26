import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';
import { FormNumberInput, FormTextInput } from '../style/export';
import { Map } from 'immutable';

import {FaUnlink} from 'react-icons/fa';

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
  maxHeight: '20em',
  marginLeft: '1px',
  marginTop: '1em'
};

const iconColStyle = {width: '2em'};

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
                    onChange={e => this.context.groupsActions.setGroupAttributes( this.props.groupID, new Map({ 'name': e.target.value }) ) }
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={firstTdStyle}>X</td>
                <td>
                  <FormNumberInput
                    value={group.get('x')}
                    onChange={e => this.context.groupsActions.groupTranslate( this.props.groupID, e.target.value, group.get('y') ) }
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
                    onChange={e => this.context.groupsActions.groupTranslate( this.props.groupID, group.get('x'), e.target.value ) }
                    style={inputStyle}
                    state={this.props.state}
                    precision={2}
                  />
                </td>
              </tr>
              <tr>
                <td style={firstTdStyle}>{this.context.translator.t('Rotation')}</td>
                <td>
                  <FormNumberInput
                    value={group.get('rotation')}
                    onChange={e => this.context.groupsActions.groupRotate( this.props.groupID, e.target.value ) }
                    style={inputStyle}
                    state={this.props.state}
                    precision={2}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {
            elements.size ?
              <div>
                <p style={{textAlign:'center', borderBottom:SharedStyle.PRIMARY_COLOR.border , paddingBottom:'1em'}}>{this.context.translator.t('Group\'s Elements')}</p>
                <table style={tablegroupStyle}>
                  <thead>
                    <tr>
                      <th style={iconColStyle}></th>
                      <th>{this.context.translator.t('Layer')}</th>
                      <th>{this.context.translator.t('Prototype')}</th>
                      <th>{this.context.translator.t('Name')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      elements.entrySeq().map(([ layerID, layerElements ]) => {

                        return layerElements.entrySeq().map(([elementPrototype, ElementList]) => {

                          return ElementList.valueSeq().map( elementID => {
                            let element = this.props.state.getIn(['scene', 'layers', layerID, elementPrototype, elementID]);

                            return <tr
                              key={elementID}
                            >
                              <td style={iconColStyle} title={this.context.translator.t('Un-chain Element from Group')}>
                                <FaUnlink
                                  onClick={ e => this.context.groupsActions.removeFromGroup( this.props.groupID, layerID, elementPrototype, elementID ) }
                                  style={styleEditButton}
                                />
                              </td>
                              <td style={{textAlign:'center'}}>
                                {layerID}
                              </td>
                              <td style={{textAlign:'center', textTransform:'capitalize'}}>
                                {elementPrototype}
                              </td>
                              <td style={{textAlign:'center'}}>
                                {element.name}
                              </td>
                            </tr>;
                          });
                        });
                      })
                    }
                  </tbody>
                </table>
              </div> :
              null
          }
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
