import React from 'react';
import {MODE_IDLE} from '../../constants';

export default function Area({layer, area, mode}, {editingActions, sceneComponents}) {

  let rendered = sceneComponents[area.type].render2D(area, layer);

  return (
    <g
      data-element-root
      data-prototype={area.prototype}
      data-id={area.id}
      data-selected={area.selected}
      data-layer={area.layer}
    >{rendered}</g>
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

