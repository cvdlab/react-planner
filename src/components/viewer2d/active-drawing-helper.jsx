import React, {PropTypes} from 'react';

export default function ActiveDrawingHelper({helper}) {
  console.log(helper.type, helper.x, helper.y);

  switch (helper.type) {
    case 'point':
      return (
        <g transform={`translate(${helper.x} ${helper.y})`}>
          <line x1="0" y1="-70" x2="0" y2="70" stroke="#ff0000"/>
          <line x1="-70" y1="0" x2="70" y2="0" stroke="#ff0000"/>
        </g>);

    default:
      return null;
  }
}

ActiveDrawingHelper.propTypes = {
  helper: PropTypes.object.isRequired
};
