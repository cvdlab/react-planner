import * as Three from 'three';
import React from 'react';

const PI_2 = Math.PI / 2;
const paintedtexture = require('./painted.jpg');
const brickTexture = require('./bricks.jpg');
const scale = 100;

let textureLoader = new Three.TextureLoader();
textureLoader.setPath('./');
let mat = textureLoader.load(paintedtexture);
let mat2 = textureLoader.load(brickTexture);

function makeObject(newWidth, newHeight, newDepth) {

  let mat3 = textureLoader.load( brickTexture, ( texture ) => {
    texture.wrapS = texture.wrapT = Three.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( ~~( newWidth / scale ), ~~( newHeight / scale ) );
  });

  let balcony = new Three.Mesh();
  //base
  let cubeGeometryBase = new Three.BoxGeometry(newWidth, newHeight / 10, newDepth);
  let cubeMaterial = new Three.MeshLambertMaterial({ map: mat });
  let cubeMaterial2 = new Three.MeshLambertMaterial({ map: mat2 });
  let cubeMaterial3 = new Three.MeshLambertMaterial({ map: mat3 });

  let p1 = new Three.Mesh(cubeGeometryBase, cubeMaterial);

  let cubeGeometryBase2 = new Three.BoxGeometry(newWidth, newHeight / 10, newDepth);

  let p2 = new Three.Mesh(cubeGeometryBase2, cubeMaterial3);
  p2.position.set(0, newHeight / 2, newDepth / 2);
  p2.rotation.x += PI_2;

  let cubeGeometryBase3 = new Three.BoxGeometry(newDepth, newHeight / 10, newDepth);
  let p3 = new Three.Mesh(cubeGeometryBase3, cubeMaterial2);
  p3.position.set(newWidth / 2, newHeight / 2, 0);
  p3.rotation.z += PI_2;
  p3.rotation.x += PI_2;

  let p4 = new Three.Mesh(cubeGeometryBase3, cubeMaterial2);
  p4.position.set(-newWidth / 2, newHeight / 2, 0);
  p4.rotation.z += PI_2;
  p4.rotation.x += PI_2;

  let cubeGeometryBase5 = new Three.BoxGeometry(newWidth + newHeight / 5, newHeight / 5, newDepth / 10);

  let p5 = new Three.Mesh(cubeGeometryBase5, cubeMaterial);
  p5.position.set(0, newHeight + newHeight / 32, newDepth / 2);
  p5.rotation.x += PI_2;

  let cubeGeometryBase6 = new Three.BoxGeometry(newDepth, newHeight / 5, newDepth / 10);
  let p6 = new Three.Mesh(cubeGeometryBase6, cubeMaterial);
  p6.position.set(newWidth / 2, newHeight + newHeight / 32, 0);
  p6.rotation.z += PI_2;
  p6.rotation.x += PI_2;

  let p7 = new Three.Mesh(cubeGeometryBase6, cubeMaterial);
  p7.position.set(-newWidth / 2, newHeight + newHeight / 32, 0);
  p7.rotation.z += PI_2;
  p7.rotation.x += PI_2;

  return balcony.add(p1,p2,p3,p4,p5,p6,p7);
}

export default {
  name: 'balcony',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'metal'],
    title: 'balcony',
    description: 'balcony',
    image: require('./balcony.png')
  },
  properties: {
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
    },
    patternColor: {
      label: '2D color',
      type: 'color',
      defaultValue: '#f5f4f4'
    }
  },

  render2D: function (element, layer, scene) {

    let newWidth = element.properties.getIn(['width', 'length']);
    let newDepth = element.properties.getIn(['depth', 'length']);
    let fillValue = element.selected ? '#99c3fb' : element.properties.get('patternColor');
    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
        <rect key='1' x='0' y='0' width={newWidth} height={newDepth}
          style={{ stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: fillValue }} />
        <text key='2' x='0' y='0'
          transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
          style={{ textAnchor: 'middle', fontSize: '11px' }}>
          {element.name}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newWidth = element.properties.getIn(['width', 'length']);
    let newDepth = element.properties.getIn(['depth', 'length']);
    let newHeight = element.properties.getIn(['height', 'length']);
    let newAltitude = element.properties.getIn(['altitude', 'length']);

    let balcony = new Three.Object3D();
    balcony.add(makeObject(newWidth, newHeight, newDepth));

    if (element.selected) {
      let bbox = new Three.BoxHelper(balcony, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      balcony.add(bbox);
    }

    balcony.position.y += newHeight / 10 + newAltitude;
    return Promise.resolve(balcony);
  }

};

