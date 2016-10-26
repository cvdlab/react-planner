import React, {PropTypes} from 'react';
import {Range} from 'immutable';

export default function GuideHorizontalStreak({width, height, guide}) {
  let step = guide.properties.get('step');
  let color = guide.properties.get('color');

  return (
    <g>
      {Range(0, height + 1, step).map(
        y => <line key={y} x1="0" y1={y} x2={width} y2={y} strokeWidth="1" stroke={color}/>
      )}
    </g>
  );
}

GuideHorizontalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  guide: PropTypes.object.isRequired
};
