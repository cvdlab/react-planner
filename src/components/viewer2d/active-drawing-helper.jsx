import React, {PropTypes} from 'react';
import * as Geometry from '../../utils/geometry';

const STYLE = {
  stroke: '#D32F2F',
  strokeWidth: "1px"
};

export default function ActiveDrawingHelper({helper, width, height}) {
  switch (helper.type) {
    case 'point':
      return (
        <g transform={`translate(${helper.x} ${helper.y})`}>
          <line x1="0" y1="-70" x2="0" y2="70" style={STYLE}/>
          <line x1="-70" y1="0" x2="70" y2="0" style={STYLE}/>
        </g>);

    case 'line':
      let h0 = Geometry.horizontalLine(0);
      let h1 = Geometry.horizontalLine(height);
      let pointH0 = Geometry.intersectionFromTwoLines(helper.a, helper.b, helper.c, h0.a, h0.b, h0.c);
      let pointH1 = Geometry.intersectionFromTwoLines(helper.a, helper.b, helper.c, h1.a, h1.b, h1.c);

      let v0 = Geometry.verticalLine(0);
      let v1 = Geometry.verticalLine(width);
      let pointV0 = Geometry.intersectionFromTwoLines(helper.a, helper.b, helper.c, v0.a, v0.b, v0.c);
      let pointV1 = Geometry.intersectionFromTwoLines(helper.a, helper.b, helper.c, v1.a, v1.b, v1.c);

      if (pointH0 && pointH1)
        return <line x1={pointH0.x} y1={pointH0.y} x2={pointH1.x} y2={pointH1.y} style={STYLE}/>;
      if (pointV0 && pointV1)
        return <line x1={pointV0.x} y1={pointV0.y} x2={pointV1.x} y2={pointV1.y} style={STYLE}/>;
      return null;

    case'line-segment':
      return <line x1={helper.x1} y1={helper.y1} x2={helper.x2} y2={helper.y2} style={STYLE}/>;

    default:
      return null;
  }
}

ActiveDrawingHelper.propTypes = {
  helper: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
