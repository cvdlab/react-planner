import React from 'react';
import {MODE_IDLE} from '../../constants';

export default function Area({layer, area, mode}, {editingActions, sceneComponents}) {

  let onClick = event => {
    switch (mode) {
      case MODE_IDLE:
        editingActions.selectArea(layer.id, area.id);
        event.stopPropagation();
        break;
    }
  };

  let rendered = sceneComponents[area.type].render2D(area, layer);

  return (
    <g onClick={onClick}> {rendered} </g>
  )

}

Area.propTypes = {
  area: React.PropTypes.object.isRequired,
  layer: React.PropTypes.object.isRequired,
  mode: React.PropTypes.string.isRequired
};

Area.contextTypes = {
  editingActions: React.PropTypes.object,
  sceneComponents: React.PropTypes.object
};

