import React, {PropTypes} from 'react';
import {MODE_IDLE} from '../../constants';

export default function Area({layer, area, mode, pixelPerUnit, unit}, {editingActions, sceneComponents}) {

  let rendered = sceneComponents[area.type].render2D(area, layer);

  return (
    <g
      data-element-root
      data-prototype={area.prototype}
      data-id={area.id}
      data-selected={area.selected}
      data-layer={layer.id}
    >{rendered}</g>
  )

}

Area.propTypes = {
  area: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  pixelPerUnit: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
};

Area.contextTypes = {
  editingActions: PropTypes.object,
  sceneComponents: PropTypes.object
};

