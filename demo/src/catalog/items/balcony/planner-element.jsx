import * as Three from 'three';
import React from 'react';

let textureLoader = new Three.TextureLoader();
let mat=textureLoader.load(require('./painted.jpg'));
let mat2=textureLoader.load(require('./bricks.jpg'));
let mat3=textureLoader.load(require('./bricks2.jpg'));

function makeObject(newWidth,newHeight,newDepth) {

  let balcony = new Three.Mesh();
  //base
  let cubeGeometryBase = new Three.BoxGeometry(newWidth,newHeight/10,newDepth);
  let cubeMaterial = new Three.MeshLambertMaterial({map:mat});
  let cubeMaterial2 = new Three.MeshLambertMaterial({map:mat2});
  let cubeMaterial3 = new Three.MeshLambertMaterial({map:mat3});

  let p1 = new Three.Mesh(cubeGeometryBase,cubeMaterial);
  balcony.add(p1);

  let cubeGeometryBase2 = new Three.BoxGeometry(newWidth,newHeight/10,newDepth);

  let p2 = new Three.Mesh(cubeGeometryBase2,cubeMaterial3);
  p2.position.set(0,newHeight/2,newDepth/2);
  p2.rotation.x+=Math.PI/2;
  balcony.add(p2);

  let cubeGeometryBase3 = new Three.BoxGeometry(newDepth,newHeight/10,newDepth);
  let p3 = new Three.Mesh(cubeGeometryBase3,cubeMaterial2);
  p3.position.set(newWidth/2,newHeight/2,0);
  p3.rotation.z+=Math.PI/2;
  p3.rotation.x+=Math.PI/2;
  balcony.add(p3);

  let p4 = new Three.Mesh(cubeGeometryBase3,cubeMaterial2);
  p4.position.set(-newWidth/2,newHeight/2,0);
  p4.rotation.z+=Math.PI/2;
  p4.rotation.x+=Math.PI/2;
  balcony.add(p4);

  let cubeGeometryBase5 = new Three.BoxGeometry(newWidth+newHeight/5,newHeight/5,newDepth/10);

  let p5 = new Three.Mesh(cubeGeometryBase5,cubeMaterial);
  p5.position.set(0,newHeight+newHeight/32,newDepth/2);
  p5.rotation.x+=Math.PI/2;
  balcony.add(p5);

  let cubeGeometryBase6 = new Three.BoxGeometry(newDepth,newHeight/5,newDepth/10);
  let p6 = new Three.Mesh(cubeGeometryBase6,cubeMaterial);
  p6.position.set(newWidth/2,newHeight+newHeight/32,0);
  p6.rotation.z+=Math.PI/2;
  p6.rotation.x+=Math.PI/2;
  balcony.add(p6);

  let p7 = new Three.Mesh(cubeGeometryBase6,cubeMaterial);
  p7.position.set(-newWidth/2,newHeight+newHeight/32,0);
  p7.rotation.z+=Math.PI/2;
  p7.rotation.x+=Math.PI/2;
  balcony.add(p7);

  return balcony
}

export default {
  name: 'balcony',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'metal'],
    group: 'balcony',
    title: 'balcony',
    description: 'balcony',
    image: require('./balcony.png')
  },
  properties: {
    name:{
      label: 'name',
      type: 'string',
      defaultValue: 'balcony'
    },
    patternColor: {
      label: 'pattern color',
      type: 'color',
      defaultValue: '#f5f4f4'
    },
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 500,
        unit: 'cm'
      }
    },
    depth: {
      label: 'depth',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');
    let fillValue = element.selected ? '#99c3fb' : element.properties.get('patternColor');
    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
        <rect key='1' x='0' y='0' width={newWidth} height={newDepth}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: fillValue}}/>
        <text key='2' x='0' y='0'
              transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: 'middle', fontSize: '11px'}}>
          {element.properties.get('name')}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');
    let newHeight = element.properties.get('height').get('length');
    let newAltitude = element.properties.get('altitude').get('length');

    let balcony=new Three.Object3D();
    balcony.add(makeObject(newWidth,newHeight,newDepth).clone());


    if (element.selected) {
      let bbox = new Three.BoxHelper(balcony, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      balcony.add(bbox);
    }

    balcony.position.y+= newHeight/10 + newAltitude;
    return Promise.resolve(balcony);
  }

};

