import React, {PropTypes} from 'react';
import Panel from './panel';
import {MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON} from '../../constants';
import {Scrollbars} from 'react-custom-scrollbars';


export default function PanelLayerElement({state: {scene, mode}}, {editingActions, translator}) {

  if (![MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON].includes(mode)) return null;

  let layer = scene.layers.get(scene.selectedLayer);

  let renderTrackHorizontal = ({style, ...props}) => {
    return (<div {...props} style={{...style, backgroundColor: 'blue'}}></div>)
  };


  return (
    <Panel name={translator.t("Elements on layer {0}", layer.name)}>
      <div key={1} style={{background: "#3a3a3e", padding: "5px 15px 5px 15px"}}>
          <div style={{height: "100px", overflowY: "scroll"}} onWheel={e => e.stopPropagation()}>
            {layer.lines.entrySeq().map(([lineID, line]) => {
              return (
                <div key={lineID} style={{cursor: "pointer"}}
                     onClick={event => editingActions.selectLine(layer.id, line.id)}>
                  <input type="checkbox" checked={line.selected} readOnly/>
                  {line.type} {line.id}
                </div>
              )
            })}

            {layer.holes.entrySeq().map(([holeID, hole]) => {
              return (
                <div key={holeID} style={{cursor: "pointer"}}
                     onClick={event => editingActions.selectHole(layer.id, hole.id)}>
                  <input type="checkbox" checked={hole.selected} readOnly/>
                  {hole.type} {hole.id}
                </div>
              )
            })}

            {layer.items.entrySeq().map(([itemID, item]) => {
              return (
                <div key={itemID} style={{cursor: "pointer"}}
                     onClick={event => editingActions.selectItem(layer.id, item.id)}>
                  <input type="checkbox" checked={item.selected} readOnly/>
                  {item.type} {item.id}
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
