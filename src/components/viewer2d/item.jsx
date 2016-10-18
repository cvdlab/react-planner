import React, {PropTypes} from 'react';
import If from '../../utils/react-if';

const STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd"
};

const STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "all-scroll"
};

const STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "all-scroll"
};

export default function Item({layer, item, scene}, {catalog}) {

  let {x, y, rotation} = item;

  let renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

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
      <If condition={item.selected}>
        <g data-element-root
           data-prototype={item.prototype}
           data-id={item.id}
           data-selected={item.selected}
           data-layer={layer.id}
           data-part="rotation-anchor"
        >
          <circle cx="0" cy="150" r="5" style={STYLE_CIRCLE}/>
          <circle cx="0" cy="0" r="150" style={STYLE_CIRCLE2}/>
        </g>
      </If>
    </g>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  scene: PropTypes.object.isRequired,
};


Item.contextTypes = {
  editingActions: PropTypes.object,
  catalog: React.PropTypes.object
};
