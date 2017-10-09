import * as Three from 'three';
import React from 'react';

const textureLoader = new Three.TextureLoader();
const mat=textureLoader.load(require('./copper.jpg'));
const ferroMaterial = new Three.MeshLambertMaterial({map:mat});
const material = new Three.MeshLambertMaterial({color: 0xf5f4f4});

export default {
  name: "column_square",
  prototype: "items",

  info: {
    tag: [],
    group: "Items",
    title: "colonna quadrata",
    description: "colonna",
    image: require('./square_column.png')
  },

  properties: {
    altitude: {
      label: "quota",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    height:{
      label: "altezza",
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    width:{
      label: "larghezza",
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    depth:{
      label: "profondità",
      type: "length-measure",
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

    let circleStyle = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};

    return (
      <g transform={`translate(${-width / 2},${-depth / 2})`}>
        <rect key="1" x="0" y="0" width={width} height={depth} style={circleStyle}/>
        <text key="2" x="0" y="0" transform={`translate(${width / 2}, ${depth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
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

    // let ferro1 = new Three.Mesh(new Three.CylinderGeometry(RADIUS/10, RADIUS/10, HEIGHT+HEIGHT/10, 32), ferroMaterial);
    // let ferro2 = new Three.Mesh(new Three.CylinderGeometry(RADIUS/10, RADIUS/10, HEIGHT+HEIGHT/10, 32), ferroMaterial);
    // let ferro3 = new Three.Mesh(new Three.CylinderGeometry(RADIUS/10, RADIUS/10, HEIGHT+HEIGHT/10, 32), ferroMaterial);
    // let ferro4 = new Three.Mesh(new Three.CylinderGeometry(RADIUS/10, RADIUS/10, HEIGHT+HEIGHT/10, 32), ferroMaterial);
    //
    // ferro1.position.x+=RADIUS/2.5;
    // ferro1.position.z+=RADIUS/2.5;
    // ferro2.position.x-=RADIUS/2.5;
    // ferro2.position.z-=RADIUS/2.5;
    // ferro3.position.x-=RADIUS/2.5;
    // ferro3.position.z+=RADIUS/2.5;
    // ferro4.position.x+=RADIUS/2.5;
    // ferro4.position.z-=RADIUS/2.5;
    // column.add(ferro1);
    // column.add(ferro2);
    // column.add(ferro3);
    // column.add(ferro4);

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
