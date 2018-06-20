import React from 'react';
import PropTypes from 'prop-types';
import * as Geometry from '../../utils/geometry';

const STYLE = {
  stroke: '#D32F2F',
  strokeWidth: "1px"
};

export default function ActiveDrawingHelper({snap, width, height}) {
  switch (snap.type) {
    case 'point':
      return (
        <g transform={`translate(${snap.x} ${snap.y})`}>
          <line x1="0" y1="-70" x2="0" y2="70" style={STYLE}/>
          <line x1="-70" y1="0" x2="70" y2="0" style={STYLE}/>
        </g>);

    case 'line':
      let h0 = Geometry.horizontalLine(0);
      let h1 = Geometry.horizontalLine(height);
      let pointH0 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, h0.a, h0.b, h0.c);
      let pointH1 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, h1.a, h1.b, h1.c);

      let v0 = Geometry.verticalLine(0);
      let v1 = Geometry.verticalLine(width);
      let pointV0 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, v0.a, v0.b, v0.c);
      let pointV1 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, v1.a, v1.b, v1.c);

      if (pointH0 && pointH1)
        return <line x1={pointH0.x} y1={pointH0.y} x2={pointH1.x} y2={pointH1.y} style={STYLE}/>;
      if (pointV0 && pointV1)
        return <line x1={pointV0.x} y1={pointV0.y} x2={pointV1.x} y2={pointV1.y} style={STYLE}/>;
      return null;

    case'line-segment':
      return <line x1={snap.x1} y1={snap.y1} x2={snap.x2} y2={snap.y2} style={STYLE}/>;

    default:
      return null;
  }
}

ActiveDrawingHelper.propTypes = {
  snap: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
