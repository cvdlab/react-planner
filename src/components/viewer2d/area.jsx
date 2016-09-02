import React from 'react';


export default function Area({layer, area}, {editingActions, sceneComponents}) {

  let onClick = event => {
    editingActions.selectArea(layer.id, area.id);
    event.stopPropagation();
  };

  let rendered = sceneComponents[area.type].render2D(area, layer);

  return (
    <g onClick={onClick}> {rendered} </g>
  )

}

Area.propTypes = {
  area: React.PropTypes.object.isRequired,
  layer: React.PropTypes.object.isRequired
};

Area.contextTypes = {
  editingActions: React.PropTypes.object,
  sceneComponents: React.PropTypes.object
};

