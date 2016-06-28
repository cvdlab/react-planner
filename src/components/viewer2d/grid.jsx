import React from 'react';
import Line from './line.jsx';
import Area from './area.jsx';
import {Range} from 'immutable';

export default function Grid(props) {

  let {pixelPerUnit, unit, width, height} = props.scene;

  let patternID = 'grid-pattern';

  let verticalsLines = Range(0, width + 1, pixelPerUnit / 2);
  let horizontalsLines = Range(0, height + 1, pixelPerUnit / 2);

  return (
    <g>
      <g>{
        verticalsLines.map(i => <line
          key={i}
          x1={i}
          y1="0"
          x2={i}
          y2={height}
          strokeWidth={i % pixelPerUnit ? 3 : 1}
          stroke="#efefef"
        />) }</g>

      <g>{
        horizontalsLines.map(i => <line
          key={i}
          x1="0"
          y1={i}
          x2={width}
          y2={i}
          strokeWidth={i % pixelPerUnit ? 3 : 1}
          stroke="#efefef"
        />) }</g>
    </g>
  );

}

Grid.propTypes = {
  scene: React.PropTypes.object.isRequired
};
