import React, {PropTypes} from 'react';

export default function Image({layer, image, mode}) {

  let vertex0 = layer.vertices.get(image.vertices.get(0));
  let vertex1 = layer.vertices.get(image.vertices.get(1));

  let x1, y1, x2, y2;
  if (vertex0.x <= vertex1.x) {
    ({x: x1, y: y1} = vertex0);
    ({x: x2, y: y2} = vertex1);
  } else {
    ({x: x1, y: y1} = vertex1);
    ({x: x2, y: y2} = vertex0);
  }

  let width = x2 - x1, height = y2 - y1;

  return (
    <g transform={`translate(${x1}, ${y1})`}>
      <g transform={`translate(0, ${height}) scale(1, -1)`}>
        <image x={0} y={0} width={width} height={height} xlinkHref={image.uri}/>
      </g>
    </g>
  );

}

Image.propTypes = {
  layer: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

Image.contextTypes = {};
