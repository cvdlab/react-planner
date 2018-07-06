import React from 'react';
import * as Three from 'three';
import path from 'path';

export default {
  name: 'gate',
  prototype: 'holes',

  info: {
    tag: ['gate'],
    title: 'gate',
    description: 'hole in the wall',
    image: require('./gate.jpg')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 80
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 215
      }
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
    thickness: {
      label: 'thickness',
      type: 'length-measure',
      defaultValue: {
        length: 30
      }
    }
  },

  render2D: function (element, layer, scene) {
    const STYLE_HOLE_BASE = {stroke: '#000', strokeWidth: '3px', fill: '#000'};
    const STYLE_HOLE_SELECTED = {stroke: '#0096fd', strokeWidth: '4px', fill: '#0096fd', cursor: 'move'};
    const STYLE_ARC_BASE = {stroke: '#000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none'};
    const STYLE_ARC_SELECTED = {
      stroke: '#0096fd',
      strokeWidth: '4px',
      strokeDasharray: '5,5',
      fill: 'none',
      cursor: 'move'
    };

    let epsilon = 3;

    let holeWidth = element.properties.get('width').get('length');
    let holePath = `M${0} ${ -epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
    let arcPath = `M${0},${0}  A${0},${0} 0 0,1 ${holeWidth},${0}`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    let length = element.properties.get('width').get('length');


    return (
      <g transform={`translate(${-length / 2}, 0)`}>
        <line key='1' x1={0} y1={holeWidth/6 - epsilon} x2={0} y2={-holeWidth/6 + epsilon} style={holeStyle}
              transform={`scale(${-1},${1})`}/>
        <line key='2' x1={-holeWidth} y1={holeWidth/6 - epsilon} x2={-holeWidth} y2={-holeWidth/6 + epsilon} style={holeStyle}
              transform={`scale(${-1},${1})`}/>
        <path key='3' d={arcPath} style={arcStyle}/>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let object = new Three.Object3D();
    return Promise.resolve(object);

  }

}

