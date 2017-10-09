import * as Three from 'three';
import React from 'react';

const  RADIUS = 20;

export default {
  name: "marker",
  prototype: "items",

  info: {
    tag: [],
    group: "Items",
    title: "marker",
    description: "marker",
    image: require('./marker.png')
  },
  properties: {
    name:{
      label: "nome user",
      type: "string",
      defaultValue: "marker"
    },
    patternColor: {
      label: "pattern colori",
      type: "color",
      defaultValue: "#f5f4f4"
    }
  },

  render2D: function (element, layer, scene) {

    let angle = element.rotation;

    if (angle > -180 && angle < 0)
      angle = 360;
    else
      angle = 0;

    let fillValue = element.selected ? "#99c3fb" : element.properties.get('patternColor');
    let circleStyle = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: fillValue};
    let circleStyle2 = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ffffff"};

    return (
      <g>
        <path   key="1" d="M -15 20 A 12 12, 0, 1, 0, 15 20 L 0 0 Z" style={circleStyle}/>
        <circle key="2" cx="0" cy="20" r={RADIUS/3} style={circleStyle2}/>
        <text   key="3" cx="0" cy="0" transform={`translate(0, ${2*RADIUS}) scale(1,-1) rotate(${angle / 2})`}
                style={{textAnchor: "middle", baseline: "middle", fontSize: "11px"}}>{element.properties.get('name')}
        </text>

      </g>
    )
  },


  render3D: function (element, layer, scene) {

    var marker = new Three.Object3D();
    return Promise.resolve(marker);
  }
}
