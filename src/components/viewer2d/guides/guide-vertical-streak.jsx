import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

export default function GuideVerticalStreak({width, height, guide}) {
  let step = guide.properties.get('step');
  let colors;

  if (guide.properties.has('color')) {
    colors = new List([guide.properties.get('color')]);
  } else {
    colors = guide.properties.get('colors');
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

GuideVerticalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  guide: PropTypes.object.isRequired
};
