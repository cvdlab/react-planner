import React from 'react';

export default function (element, layer, scene) {
  return (
    <g>
      <rect
        x="0"
        y="0"
        width={element.width}
        height={element.height}
        style={{stroke: "black", strokeWidth: "2px", fill: "none"}}
      />
      <text x="0" y="0" transform={`translate(${element.width / 2}, ${element.height / 2}) scale(1,-1)`}
            style={{textAnchor: "middle", fontSize: "11px"}}>itemGeneric
      </text>
    </g>
  );
}
