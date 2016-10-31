import React, {PropTypes} from 'react';

export default function GuideVerticalStreak({width, height, guide}) {
  let step = guide.properties.get('step');
  let colors;

  if (guide.properties.has('color')) {
    colors = [guide.properties.get('color')];
  } else {
    colors = guide.properties.get('colors');
  }

  let rendered = [];
  let i = 0;
  for (let x = 0; x <= height; x += step) {
    let color = colors[i % colors.length];
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

GuideVerticalStreak.contextTypes = {};
