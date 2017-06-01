import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../constants';

const typeId = { display: 'inline-block', top: '-.3em', position: 'relative', paddingLeft: '.25em' };

export default function PanelLayerElement({state: {scene, mode}}, {editingActions, translator}) {

  if (![MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN,
      MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
      MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM,
      MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE,
      MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE].includes(mode)) return null;

  let layer = scene.layers.get(scene.selectedLayer);

  let renderTrackHorizontal = ({style, ...props}) => {
    return (<div {...props} style={{...style, backgroundColor: 'blue'}}></div>)
  };

  return (
    <Panel name={translator.t("Elements on layer {0}", layer.name)}>
      <div key={1} style={{background: "#3a3a3e"}}>
        <div style={{height: "100px", overflowY: "auto", padding: '0.25em 1.15em', cursor: 'pointer'}} onWheel={e => e.stopPropagation()}>
          {layer.lines.entrySeq().map(([lineID, line]) => {
            return (
              <div key={lineID} onClick={e => editingActions.selectLine(layer.id, line.id)}>
                <input type="checkbox" checked={line.selected} readOnly/>
                <div style={typeId}>{line.type} {line.id}</div>
              </div>
            )
          })}

          {layer.holes.entrySeq().map(([holeID, hole]) => {
            return (
              <div key={holeID} onClick={e => editingActions.selectHole(layer.id, hole.id)}>
                <input type="checkbox" checked={hole.selected} readOnly/>
                <div style={typeId}>{hole.type} {hole.id}</div>
              </div>
            )
          })}

          {layer.items.entrySeq().map(([itemID, item]) => {
            return (
              <div key={itemID} onClick={e => editingActions.selectItem(layer.id, item.id)}>
                <input type="checkbox" checked={item.selected} readOnly/>
                <div style={typeId}>{item.type} {item.id}</div>
              </div>
            )
          })}
        </div>

      </div>
    </Panel>
  )

}

PanelLayerElement.propTypes = {
  state: PropTypes.object.isRequired,
};

PanelLayerElement.contextTypes = {
  sceneActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
