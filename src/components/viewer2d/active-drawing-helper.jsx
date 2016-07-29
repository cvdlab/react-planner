import React, {PropTypes} from 'react';

export default function ActiveDrawingHelper({helper}) {
  console.log(helper.type, helper.x, helper.y);

  switch(helper.type){
    case 'point':
      return <circle cx={helper.x} cy={helper.y} r={helper.radius} fill="#000"/>

    default:
      return null;
  }
}

ActiveDrawingHelper.propTypes = {
  helper: PropTypes.object.isRequired
};
