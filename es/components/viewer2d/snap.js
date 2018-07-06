import React from 'react';
import PropTypes from 'prop-types';
import * as Geometry from '../../utils/geometry';

var STYLE = {
  stroke: '#D32F2F',
  strokeWidth: "1px"
};

export default function ActiveDrawingHelper(_ref) {
  var snap = _ref.snap,
      width = _ref.width,
      height = _ref.height;

  switch (snap.type) {
    case 'point':
      return React.createElement(
        'g',
        { transform: 'translate(' + snap.x + ' ' + snap.y + ')' },
        React.createElement('line', { x1: '0', y1: '-70', x2: '0', y2: '70', style: STYLE }),
        React.createElement('line', { x1: '-70', y1: '0', x2: '70', y2: '0', style: STYLE })
      );

    case 'line':
      var h0 = Geometry.horizontalLine(0);
      var h1 = Geometry.horizontalLine(height);
      var pointH0 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, h0.a, h0.b, h0.c);
      var pointH1 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, h1.a, h1.b, h1.c);

      var v0 = Geometry.verticalLine(0);
      var v1 = Geometry.verticalLine(width);
      var pointV0 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, v0.a, v0.b, v0.c);
      var pointV1 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, v1.a, v1.b, v1.c);

      if (pointH0 && pointH1) return React.createElement('line', { x1: pointH0.x, y1: pointH0.y, x2: pointH1.x, y2: pointH1.y, style: STYLE });
      if (pointV0 && pointV1) return React.createElement('line', { x1: pointV0.x, y1: pointV0.y, x2: pointV1.x, y2: pointV1.y, style: STYLE });
      return null;

    case 'line-segment':
      return React.createElement('line', { x1: snap.x1, y1: snap.y1, x2: snap.x2, y2: snap.y2, style: STYLE });

    default:
      return null;
  }
}

ActiveDrawingHelper.propTypes = {
  snap: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};