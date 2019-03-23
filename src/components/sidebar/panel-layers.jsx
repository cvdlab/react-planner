import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import Panel from './panel';
import {TiPlus, TiDelete} from 'react-icons/ti';
import {FaPencilAlt, FaTrash, FaEye} from 'react-icons/fa';
import {
  FormTextInput,
  FormNumberInput,
  FormSubmitButton,
  FormSlider,
  CancelButton
} from '../style/export';

import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../constants';
import * as SharedStyle from '../../shared-style';

const VISIBILITY_MODE = {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN,
  MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE,
  MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE
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

const tableLayerStyle = {
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
const firstTdStyle = {width: '6em'};
const newLayerLableStyle = {margin: '0.5em 0', fontSize: '1.3em', cursor: 'pointer', textAlign: 'center'};
const newLayerLableHoverStyle = {...newLayerLableStyle, ...styleHoverColor};
const layerInputTableStyle = {width: '100%', borderSpacing: '2px 0', padding: '5px 15px'};
const inputTableButtonStyle = {float: 'right', marginTop: '0.5em', borderSpacing: '0'};

export default class PanelLayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headHovered: false,
      layerAddUIVisible: false,
      editingLayer: new Map()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(
      this.props.state.scene.layers.size !== nextProps.state.scene.layers.size ||
      nextState.layerAddUIVisible != this.state.layerAddUIVisible ||
      this.state.editingLayer.hashCode() !== nextState.editingLayer.hashCode() ||
      this.props.state.sceneHistory.hashCode() !== nextProps.state.sceneHistory.hashCode()
    ) return true;

    return false;
  }

  addLayer(e) {
    e.stopPropagation();
    if (!this.state.layerAddUIVisible) {
      this.context.sceneActions.addLayer('', 0);
      this.setState({layerAddUIVisible: false});
    }
    else this.setState({layerAddUIVisible: !this.state.layerAddUIVisible});
  }

  resetLayerMod(e) {
    e.stopPropagation();
    this.setState({layerAddUIVisible: false, editingLayer: new Map()});
  }

  updateLayer(e, layerData) {
    e.stopPropagation();
    let {id, name, opacity, altitude, order} = layerData.toJS();

    altitude = parseInt(altitude);

    this.context.sceneActions.setLayerProperties(id, {name, opacity, altitude, order});
    this.setState({layerAddUIVisible: false, editingLayer: new Map()});
  }

  delLayer(e, layerID) {
    e.stopPropagation();
    this.context.sceneActions.removeLayer(layerID);
    this.setState({layerAddUIVisible: false, editingLayer: new Map()});
  }

  render() {
    if (!VISIBILITY_MODE[this.props.state.mode]) return null;

    let scene = this.props.state.scene;
    let isLastLayer = scene.layers.size === 1;

    return (
      <Panel name={this.context.translator.t('Layers')}>
        <table style={tableLayerStyle}>
          <thead>
            <tr>
              <th colSpan='3'></th>
              <th>{this.context.translator.t('Altitude')}</th>
              <th>{this.context.translator.t('Name')}</th>
            </tr>
          </thead>
          <tbody>
            {
              scene.layers.entrySeq().map(([layerID, layer]) => {

                let selectClick = e => this.context.sceneActions.selectLayer(layerID);
                let configureClick = e => this.setState({editingLayer: layer, layerAddUIVisible: true});

                let swapVisibility = e => {
                  e.stopPropagation();
                  this.context.sceneActions.setLayerProperties(layerID, {visible: !layer.visible});
                };

                let isCurrentLayer = layerID === scene.selectedLayer;

                return (
                  <tr
                    key={layerID}
                    onClick={selectClick}
                    onDoubleClick={configureClick}
                    style={!isCurrentLayer ? null : styleHoverColor}
                  >
                    <td style={iconColStyle}>
                      {
                        !isCurrentLayer ?
                          <FaEye
                            onClick={swapVisibility}
                            style={!layer.visible ? styleEyeHidden : styleEyeVisible}
                          />
                          : null
                      }
                    </td>
                    <td style={iconColStyle}>
                      <FaPencilAlt
                        onClick={configureClick}
                        style={!isCurrentLayer ? styleEditButton : styleEditButtonHover}
                        title={this.context.translator.t('Configure layer')}
                      />
                    </td>
                    <td style={iconColStyle}>
                      {
                        !isLastLayer ?
                          <FaTrash
                            onClick={ e => this.delLayer(e, layerID) }
                            style={!isCurrentLayer ? styleEditButton : styleEditButtonHover}
                            title={this.context.translator.t('Delete layer')}
                          />
                          : null
                      }
                    </td>
                    <td style={{width: '6em', textAlign: 'center'}}>
                      [ h : {layer.altitude} ]
                    </td>
                    <td>
                      {layer.name}
                    </td>
                  </tr>
                );

              })
            }
          </tbody>
        </table>
        <p
          style={ !this.state.headHovered ? newLayerLableStyle : newLayerLableHoverStyle }
          onMouseOver={ () => this.setState({headHovered: true}) }
          onMouseOut={ () => this.setState({headHovered: false}) }
          onClick={ (e) => this.addLayer(e) }
        >
          { !this.state.layerAddUIVisible ? <TiPlus /> : <TiDelete /> }
          <b style={styleAddLabel}>{this.context.translator.t('New layer')}</b>
        </p>

        {
          this.state.layerAddUIVisible && this.state.editingLayer ?
            <table style={layerInputTableStyle}>
              <tbody>
                <tr style={{marginTop: '1em'}}>
                  <td style={firstTdStyle}>{this.context.translator.t('Name')}:</td>
                  <td>
                    <FormTextInput
                      value={this.state.editingLayer.get('name')}
                      onChange={e => this.setState({editingLayer: this.state.editingLayer.merge({name: e.target.value})})}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={firstTdStyle}>{this.context.translator.t('opacity')}:</td>
                  <td>
                    <FormSlider
                      min={0}
                      max={100}
                      value={Math.round(this.state.editingLayer.get('opacity') * 100)}
                      onChange={e => this.setState({editingLayer: this.state.editingLayer.merge({opacity: (e.target.value / 100)})})}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={firstTdStyle}>{this.context.translator.t('altitude')}:</td>
                  <td>
                    <FormNumberInput
                      value={this.state.editingLayer.get('altitude')}
                      onChange={e => this.setState({editingLayer: this.state.editingLayer.merge({altitude: e.target.value})})}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={firstTdStyle}>{this.context.translator.t('order')}:</td>
                  <td>
                    <FormNumberInput
                      value={this.state.editingLayer.get('order')}
                      onChange={e => this.setState({editingLayer: this.state.editingLayer.merge({order: e.target.value})})}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <table style={inputTableButtonStyle}>
                      <tbody>
                        <tr>
                          <td><CancelButton size="small" onClick={ e => {
                            this.resetLayerMod(e);
                          } }>{this.context.translator.t('Reset')}</CancelButton></td>
                          <td><FormSubmitButton size="small" onClick={ e => {
                            this.updateLayer(e, this.state.editingLayer);
                          } }>{this.context.translator.t('Save')}</FormSubmitButton></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            : null
        }

      </Panel>
    )
  }

}

PanelLayers.propTypes = {
  state: PropTypes.object.isRequired,
};

PanelLayers.contextTypes = {
  sceneActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
