import React, {PropTypes} from 'react';
import Ruler from './ruler.jsx';

export default function Item({item, pixelPerUnit, unit}) {

  let {width, height, x, y, rotation} = item;

  let renderedRuler = !item.selected ? null :
    (<g>
      <Ruler pixelPerUnit={pixelPerUnit} unit={unit} length={width} transform={`translate(${0}, ${height + 10})`}/>
      <Ruler pixelPerUnit={pixelPerUnit} unit={unit} length={height} transform={`translate(${width + 10}, ${height}) rotate(-90)`}/>
    </g>);

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) translate(${-width / 2},${-height / 2})`}>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        style={{stroke: "black"}}
      />
      {renderedRuler}
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
