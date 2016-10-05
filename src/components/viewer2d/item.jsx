import React, {PropTypes} from 'react';
import Ruler from './ruler.jsx';

export default function Item({layer, item, pixelPerUnit, unit}, {catalog}) {

  let {x, y, rotation} = item;

  let renderedItem = catalog.getElement(item.type).render2D(item, layer);

  return (
    <g
      data-element-root
      data-prototype={item.prototype}
      data-id={item.id}
      data-selected={item.selected}
      data-layer={layer.id}
      style={item.selected ? {cursor: "move"} : {}}
      transform={`translate(${x},${y}) rotate(${rotation})`}>
      {renderedItem}
    </g>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  pixelPerUnit: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};


Item.contextTypes = {
  editingActions: PropTypes.object,
  catalog: React.PropTypes.object
};
