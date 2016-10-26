import React, {PropTypes} from 'react';
import {Range} from 'immutable';

export default function GuideVerticalStreak({width, height, guide}) {
  let step = guide.properties.get('step');
  let color = guide.properties.get('color');

  return (
    <g>
      {Range(0, width + 1, step).map(
        x => <line key={x} x1={x} y1="0" x2={x} y2={height} strokeWidth="1" stroke={color}/>
      )}
    </g>
  );
}

GuideVerticalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  guide: PropTypes.object.isRequired
};

GuideVerticalStreak.contextTypes = {};
