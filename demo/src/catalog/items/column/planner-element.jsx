import * as Three from 'three';
import React from 'react';

let textureLoader = new Three.TextureLoader();
let mat=textureLoader.load(require('./copper.jpg'));
let frameMaterial = new Three.MeshLambertMaterial({map:mat});

function makeObjectMaxLOD(RADIUS,HEIGHT) {

  let RADIUS_10 = RADIUS/10;
  let RADIUS_2_5 = RADIUS/2.5;

  let column = new Three.Mesh();
  let object = new Three.Mesh(new Three.CylinderGeometry(RADIUS, RADIUS, HEIGHT, 32), frameMaterial);

  let frame1 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 32), frameMaterial);
  let frame2 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 32), frameMaterial);
  let frame3 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 32), frameMaterial);
  let frame4 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 32), frameMaterial);

  frame1.position.x+=RADIUS_2_5;
  frame1.position.z+=RADIUS_2_5;
  frame2.position.x-=RADIUS_2_5;
  frame2.position.z-=RADIUS_2_5;
  frame3.position.x-=RADIUS_2_5;
  frame3.position.z+=RADIUS_2_5;
  frame4.position.x+=RADIUS_2_5;
  frame4.position.z-=RADIUS_2_5;
  column.add(frame1);
  column.add(frame2);
  column.add(frame3);
  column.add(frame4);
  column.add(object);

  return column
}

function makeObjectMinLOD(RADIUS,HEIGHT) {

  let RADIUS_10 = RADIUS/10;
  let RADIUS_2_5 = RADIUS/2.5;

  let column = new Three.Mesh();
  let object = new Three.Mesh(new Three.CylinderGeometry(RADIUS, RADIUS, HEIGHT, 6, 6), frameMaterial);

  let frame1 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 6), frameMaterial);
  let frame2 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 6), frameMaterial);
  let frame3 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 6), frameMaterial);
  let frame4 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT+HEIGHT/10, 6), frameMaterial);

  frame1.position.x+=RADIUS_2_5;
  frame1.position.z+=RADIUS_2_5;
  frame2.position.x-=RADIUS_2_5;
  frame2.position.z-=RADIUS_2_5;
  frame3.position.x-=RADIUS_2_5;
  frame3.position.z+=RADIUS_2_5;
  frame4.position.x+=RADIUS_2_5;
  frame4.position.z-=RADIUS_2_5;
  column.add(frame1);
  column.add(frame2);
  column.add(frame3);
  column.add(frame4);
  column.add(object);

  return column
}
export default {
  name: 'round column',
  prototype: 'items',

  info: {
    tag: ['structure'],
    title: 'round column',
    description: 'round column',
    image: require('./column.png')
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
    radius:{
      label: 'radius',
      type: 'length-measure',
      defaultValue: {
        length: 20,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {


    let RADIUS = element.properties.get('radius').get('length');
    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    let circleStyle = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce'};

    return (
      <g>
        <circle key='1' cx='0' cy='0' r={RADIUS} style={circleStyle}/>
        <text key='2' cx='0' cy='0'
              transform={`scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: 'middle', fontSize: '11px'}}>
          {element.type}
        </text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {

    let HEIGHT = element.properties.get('height').get('length');
    let RADIUS = element.properties.get('radius').get('length');
    let newAltitude = element.properties.get('altitude').get('length');


    /**************** LOD max ***********************/

    let columnMaxLOD = new Three.Object3D();
    let objectMaxLOD = makeObjectMaxLOD(RADIUS,HEIGHT);
    columnMaxLOD.add(objectMaxLOD.clone());
    columnMaxLOD.position.y += HEIGHT / 2 + newAltitude;

    /**************** LOD min ***********************/

    let columnMinLOD = new Three.Object3D();
    let objectMinLOD = makeObjectMinLOD(RADIUS,HEIGHT);
    columnMinLOD.add(objectMinLOD.clone());
    columnMinLOD.position.y += HEIGHT / 2 + newAltitude;

    /*** add all Level of Detail ***/

    let lod = new Three.LOD();

    lod.addLevel(columnMaxLOD, 1300);
    lod.addLevel(columnMinLOD, 2000);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    if (element.selected) {
      let bbox = new Three.BoxHelper(lod, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      lod.add(bbox);
    }

    return Promise.resolve(lod);
  }

};
