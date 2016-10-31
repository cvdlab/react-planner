import React, {PropTypes} from 'react';

export default function GuideHorizontalStreak({width, height, guide}) {
  let step = guide.properties.get('step');
  let colors;

  if(guide.properties.has('color')) {
    colors = [guide.properties.get('color')];
  } else {
    colors = guide.properties.get('colors');
  }

  let rendered = [];
  let i = 0;
  for (let y = 0; y <= height; y += step) {
    let color = colors[i%colors.length];
    i++;
    rendered.push(<line key={y} x1="0" y1={y} x2={width} y2={y} strokeWidth="1" stroke={color}/>);
  }

  return (<g>{rendered}</g>);
}

GuideHorizontalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  guide: PropTypes.object.isRequired
};
