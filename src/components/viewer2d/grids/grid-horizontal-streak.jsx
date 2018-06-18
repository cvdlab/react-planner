import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

export default function GridHorizontalStreak({width, height, grid}) {
  let step = grid.properties.get('step');
  let colors;

  if (grid.properties.has('color')) {
    colors = new List([grid.properties.get('color')]);
  } else {
    colors = grid.properties.get('colors');
  }

  let rendered = [];
  let i = 0;
  for (let y = 0; y <= height; y += step) {
    let color = colors.get(i % colors.size);
    i++;
    rendered.push(<line key={y} x1="0" y1={y} x2={width} y2={y} strokeWidth="1" stroke={color}/>);
  }

  return (<g>{rendered}</g>);
}

GridHorizontalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  grid: PropTypes.object.isRequired
};
