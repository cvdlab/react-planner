import React from 'react';
import Line from './line.jsx';
import Area from './area.jsx';
import {Range} from 'immutable';

export default function Grid({scene}) {

  let {pixelPerUnit, unit, width, height} = scene;

  let patternID = 'grid-pattern';

  let verticalLines = Range(0, width + 1, pixelPerUnit / 5);
  let horizontalLines = Range(0, height + 1, pixelPerUnit / 5);

  let color = coord => coord % pixelPerUnit === 0 ? '#b9b9b9' : '#efefef';

  let vLine = x => <line key={x} x1={x} y1="0" x2={x} y2={height} strokeWidth="1" stroke={color(x)}/>;
  let hLine = y => <line key={y} x1="0" y1={y} x2={width} y2={y} strokeWidth="1" stroke={color(y)}/>;

  return (
    <g>
      {verticalLines.map(vLine)}
      {horizontalLines.map(hLine)}
    </g>
  );

}

Grid.propTypes = {
  scene: React.PropTypes.object.isRequired
};
