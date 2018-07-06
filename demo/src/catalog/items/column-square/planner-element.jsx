import * as Three from 'three';
import React from 'react';

const material = new Three.MeshLambertMaterial({color: 0xf5f4f4});

export default {
  name: 'square column',
  prototype: 'items',

  info: {
    tag: ['structure'],
    title: 'square column',
    description: 'column',
    image: require('./square_column.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    height:{
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    width:{
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    depth:{
      label: 'depth',
      type: 'length-measure',
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    let circleStyle = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce'};

    return (
      <g transform={`translate(${-width / 2},${-depth / 2})`}>
        <rect key='1' x='0' y='0' width={width} height={depth} style={circleStyle}/>
        <text key='2' x='0' y='0' transform={`translate(${width / 2}, ${depth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: 'middle', fontSize: '11px'}}>
          {element.type}
        </text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {

    let HEIGHT = element.properties.get('height').get('length');
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    let newAltitude = element.properties.get('altitude').get('length');

    let column = new Three.Object3D();

    let object = new Three.Mesh(new Three.BoxGeometry(width,HEIGHT,depth, 32), material);

    column.add(object);

    if (element.selected) {
      let bbox = new Three.BoxHelper(column, 0x99c3fb);
      bbox.material.linewidth = 10;
      bbox.renderOrder = 5000;
      bbox.material.depthTest = false;
      column.add(bbox);
    }

    column.position.y += HEIGHT / 2 + newAltitude;
    column.position.x += width / 2;


    return Promise.resolve(column);

  }
};
