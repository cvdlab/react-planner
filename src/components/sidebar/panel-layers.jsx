import React, { useState, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import Panel from './panel';
import ReactPlannerContext from '../../utils/react-planner-context';
import { TiPlus, TiDelete } from 'react-icons/ti';
import { FaPencilAlt, FaTrash, FaEye } from 'react-icons/fa';
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
} from '../../utils/constants';
import * as SharedStyle from '../../styles/shared-style';

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

const iconColStyle = { width: '2em' };
const styleHoverColor = { color: SharedStyle.SECONDARY_COLOR.main };
const styleEditButtonHover = { ...styleEditButton, ...styleHoverColor };
const styleAddLabel = { fontSize: '10px', marginLeft: '5px' };
const styleEyeVisible = { fontSize: '1.25em' };
const styleEyeHidden = { ...styleEyeVisible, color: '#a5a1a1' };
const firstTdStyle = { width: '6em' };
const newLayerLableStyle = { margin: '0.5em 0', fontSize: '1.3em', cursor: 'pointer', textAlign: 'center' };
const newLayerLableHoverStyle = { ...newLayerLableStyle, ...styleHoverColor };
const layerInputTableStyle = { width: '100%', borderSpacing: '2px 0', padding: '5px 15px' };
const inputTableButtonStyle = { float: 'right', marginTop: '0.5em', borderSpacing: '0' };

const PanelLayers = ({ state }) => {
  const { sceneActions, translator } = useContext(ReactPlannerContext);
  const [headHovered, setHeadHovered] = useState(false);
  const [layerAddUIVisible, setLayerAddUIVisible] = useState(false);
  const [editingLayer, setEditingLayer] = useState(new Map());

  const addLayer = (e) => {
    e.stopPropagation();
    if (!layerAddUIVisible) {
      sceneActions.addLayer('', 0);
      setLayerAddUIVisible(false);
    }
    else setLayerAddUIVisible(!layerAddUIVisible);
  };

  const resetLayerMod = (e) => {
    e.stopPropagation();
    setLayerAddUIVisible(false);
    setEditingLayer(new Map());
  };

  const updateLayer = (e, layerData) => {
    e.stopPropagation();
    let { id, name, opacity, altitude, order } = layerData.toJS();

    altitude = parseInt(altitude);

    sceneActions.setLayerProperties(id, { name, opacity, altitude, order });
    setLayerAddUIVisible(false);
    setEditingLayer(new Map());
  };

  const delLayer = (e, layerID) => {
    e.stopPropagation();
    sceneActions.removeLayer(layerID);
    setLayerAddUIVisible(false);
    setEditingLayer(new Map());
  };

  if (!VISIBILITY_MODE[state.mode]) return null;

  let scene = state.scene;
  let isLastLayer = scene.layers.size === 1;

  return (
    <Panel name={translator.t('Layers')}>
      <table style={tableLayerStyle}>
        <thead>
          <tr>
            <th colSpan='3'></th>
            <th>{translator.t('Altitude')}</th>
            <th>{translator.t('Name')}</th>
          </tr>
        </thead>
        <tbody>
          {
            scene.layers.entrySeq().map(([layerID, layer]) => {

              let selectClick = e => sceneActions.selectLayer(layerID);
              let configureClick = (e) => { 
                setEditingLayer(layer); 
                setLayerAddUIVisible(true);
              }

              let swapVisibility = e => {
                e.stopPropagation();
                sceneActions.setLayerProperties(layerID, { visible: !layer.visible });
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
                      title={translator.t('Configure layer')}
                    />
                  </td>
                  <td style={iconColStyle}>
                    {
                      !isLastLayer ?
                        <FaTrash
                          onClick={e => delLayer(e, layerID)}
                          style={!isCurrentLayer ? styleEditButton : styleEditButtonHover}
                          title={translator.t('Delete layer')}
                        />
                        : null
                    }
                  </td>
                  <td style={{ width: '6em', textAlign: 'center' }}>
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
        style={!headHovered ? newLayerLableStyle : newLayerLableHoverStyle}
        onMouseOver={() => setHeadHovered(true)}
        onMouseOut={() => setHeadHovered(false)}
        onClick={(e) => addLayer(e)}
      >
        {!layerAddUIVisible ? <TiPlus /> : <TiDelete />}
        <b style={styleAddLabel}>{translator.t('New layer')}</b>
      </p>

      {
        layerAddUIVisible && editingLayer ?
          <table style={layerInputTableStyle}>
            <tbody>
              <tr style={{ marginTop: '1em' }}>
                <td style={firstTdStyle}>{translator.t('Name')}:</td>
                <td>
                  <FormTextInput
                    value={editingLayer.get('name')}
                    onChange={e => {
                      setEditingLayer(editingLayer.merge({ name: e.target.value }))
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={firstTdStyle}>{translator.t('opacity')}:</td>
                <td>
                  {/* TODO(pg): Replace back with FormSlider when fixed */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(editingLayer.get('opacity') * 100)}
                    onChange={e => setEditingLayer(editingLayer.merge({ opacity: (e.target.value / 100) }))}
                  />
                </td>
              </tr>
              <tr>
                <td style={firstTdStyle}>{translator.t('altitude')}:</td>
                <td>
                  <FormNumberInput
                    value={editingLayer.get('altitude')}
                    onChange={e => setEditingLayer(editingLayer.merge({ altitude: e.target.value }))}
                  />
                </td>
              </tr>
              <tr>
                <td style={firstTdStyle}>{translator.t('order')}:</td>
                <td>
                  <FormNumberInput
                    value={editingLayer.get('order')}
                    onChange={e => setEditingLayer(editingLayer.merge({ order: e.target.value }))}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <table style={inputTableButtonStyle}>
                    <tbody>
                      <tr>
                        <td>
                          <CancelButton size="small" onClick={e => { resetLayerMod(e); }}>
                            {translator.t('Reset')}
                          </CancelButton></td>
                        <td>
                          <FormSubmitButton size="small" onClick={e => { updateLayer(e, editingLayer); }}>
                            {translator.t('Save')}
                          </FormSubmitButton>
                        </td>
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

PanelLayers.propTypes = {
  state: PropTypes.object.isRequired,
};

export default memo(PanelLayers, (prevProps, nextProps) => {
  return (
    prevProps.state.scene.layers.size === nextProps.state.scene.layers.size &&
    prevProps.state.sceneHistory.hashCode() === nextProps.state.sceneHistory.hashCode()
  );
});

