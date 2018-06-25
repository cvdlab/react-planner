import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

export default function GridVerticalStreak({width, height, grid}) {
  let step = grid.properties.get('step');
  let colors;

  if (grid.properties.has('color')) {
    colors = new List([grid.properties.get('color')]);
  } else {
    colors = grid.properties.get('colors');
  }

  let rendered = [];
  let i = 0;
  for (let x = 0; x <= width; x += step) {
    let color = colors.get(i % colors.size);
    i++;
    rendered.push(<line key={x} x1={x} y1="0" x2={x} y2={height} strokeWidth="1" stroke={color}/>);
  }

  return (<g>{rendered}</g>);
}

GridVerticalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  grid: PropTypes.object.isRequired
};
