import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../panel';
import {Seq} from 'immutable';
import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../../constants';
import ElementEditor from './element-editor';

export default function PanelElementEditor({state}, {projectActions, translator}) {

  let {scene, mode} = state;

  if (![MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN,
      MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
      MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM,
      MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE,
      MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE].includes(mode)) return null;

  let componentRenderer = (element, layer) =>
    <Panel key={element.id} name={translator.t('Properties: [{0}] {1}', element.type, element.id)} opened={true}>
      <div style={{padding: '5px 15px'}}>
        <ElementEditor element={element} layer={layer} state={state}/>
      </div>
    </Panel>;

  let layerRenderer = layer => Seq()
    .concat(layer.lines, layer.holes, layer.areas, layer.items)
    .filter(element => element.selected)
    .map(element => componentRenderer(element, layer))
    .valueSeq();

  return <div>{scene.layers.valueSeq().map(layerRenderer)}</div>

}

PanelElementEditor.propTypes = {
  state: PropTypes.object.isRequired,
};

PanelElementEditor.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};
