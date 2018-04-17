import * as Three from 'three';
import React from 'react';

const newWidth = 90;
const newDepth = 90;
const newHeight = 220;

const grey = new Three.MeshLambertMaterial({color: 0xa6a9ad});
const darkGrey = new Three.MeshLambertMaterial({color: 0x3f454f});
const red = new Three.MeshLambertMaterial({color: 0xff0000});

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();


function makeObjectMaxLOD() {

  let metalDetector = new Three.Mesh();

  let textureLoader = new Three.TextureLoader();
  let display1= textureLoader.load(require('./display1.png'));
  let display2= textureLoader.load(require('./display2.png'));

  let cubeGeometryBase = new Three.BoxGeometry(0.72,0.2,0.4);
  let up = new Three.Mesh(cubeGeometryBase,grey);
  up.position.set(0,2,0);
  metalDetector.add(up);

  for (let j = -0.2; j <= 0.2; j+=0.4) {

    let cubeGeometryBorderUp = new Three.BoxGeometry(0.72,0.03,0.03);
    let up_border_down = new Three.Mesh(cubeGeometryBorderUp,darkGrey);
    up_border_down.position.set(0,1.9,j);
    metalDetector.add(up_border_down);

    let up_border_top = new Three.Mesh(cubeGeometryBorderUp,darkGrey);
    up_border_top.position.set(0,2.1,j);
    metalDetector.add(up_border_top);

  }

  let cubeGeometrySide = new Three.BoxGeometry(0.08,2.3,0.6);
  let left = new Three.Mesh(cubeGeometrySide,grey);
  left.position.set(-0.4,1,0);
  metalDetector.add(left);

  let right = new Three.Mesh(cubeGeometrySide,grey);
  right.position.set(0.4,1,0);
  metalDetector.add(right);

  for (let k = -0.165; k <= 2.20; k+= 2.32 ) {

    let cubeGeometrySide2 = new Three.BoxGeometry(0.09,0.03,0.68);
    let left2 = new Three.Mesh(cubeGeometrySide2,darkGrey);
    left2.position.set(-0.4,k,0);
    metalDetector.add(left2);

    let right2 = new Three.Mesh(cubeGeometrySide2,darkGrey);
    right2.position.set(0.4,k,0);
    metalDetector.add(right2);

  }

  for (let i = -0.3; i <= 0.3 ; i+=0.6) {

    let cubeGeometryBorder = new Three.BoxGeometry(0.09,2.3,0.05);
    let left_border = new Three.Mesh(cubeGeometryBorder,darkGrey);
    left_border.position.set(-0.4,1,i);
    metalDetector.add(left_border);

    let right_border = new Three.Mesh(cubeGeometryBorder,darkGrey);
    right_border.position.set(0.4,1,i);
    metalDetector.add(right_border);

    let cubeGeometryBorderLed = new Three.BoxGeometry(0.02,2.3,0.02);
    let left_borderLed = new Three.Mesh(cubeGeometryBorderLed,red);
    let right_borderLed = new Three.Mesh(cubeGeometryBorderLed,red);

    if(i<0){

      left_borderLed.position.set(-0.4,1,i-.02);
      right_borderLed.position.set(0.4,1,i-.02);

    }
    else{

      left_borderLed.position.set(-0.4,1,i+.02);
      right_borderLed.position.set(0.4,1,i+.02);

    }

    metalDetector.add(left_borderLed);
    metalDetector.add(right_borderLed);

  }

  let planeDisplay1 = new Three.PlaneGeometry(0.15,0.15);
  let planeMaterial1 =  new Three.MeshLambertMaterial({map: display1, transparent:true});
  let plane1 = new Three.Mesh(planeDisplay1,planeMaterial1);
  plane1.position.set(-0.15,2,0.21);

  let planeDisplay2 = new Three.PlaneGeometry(0.25,0.15);
  let planeMaterial2 =  new Three.MeshLambertMaterial({map: display2, transparent:true});
  let plane2 = new Three.Mesh(planeDisplay2,planeMaterial2);
  plane2.position.set(0.15,2,0.21);

  metalDetector.add(plane1);
  metalDetector.add(plane2);

  return metalDetector
}

function makeObjectMinLOD() {

  let metalDetector = new Three.Mesh();

  let cubeGeometryBase = new Three.BoxGeometry(0.72,0.2,0.4);
  let up = new Three.Mesh(cubeGeometryBase,grey);
  up.position.set(0,2,0);
  metalDetector.add(up);

  for (let j = -0.2; j <= 0.2; j+=0.4) {

    let cubeGeometryBorderUp = new Three.BoxGeometry(0.72,0.03,0.03);
    let up_border_down = new Three.Mesh(cubeGeometryBorderUp,darkGrey);
    up_border_down.position.set(0,1.9,j);
    metalDetector.add(up_border_down);

    let up_border_top = new Three.Mesh(cubeGeometryBorderUp,darkGrey);
    up_border_top.position.set(0,2.1,j);
    metalDetector.add(up_border_top);

  }

  let cubeGeometrySide = new Three.BoxGeometry(0.08,2.3,0.6);
  let left = new Three.Mesh(cubeGeometrySide,grey);
  left.position.set(-0.4,1,0);
  metalDetector.add(left);

  let right = new Three.Mesh(cubeGeometrySide,grey);
  right.position.set(0.4,1,0);
  metalDetector.add(right);

  for (let k = -0.165; k <= 2.20; k+= 2.32 ) {

    let cubeGeometrySide2 = new Three.BoxGeometry(0.09,0.03,0.68);
    let left2 = new Three.Mesh(cubeGeometrySide2,darkGrey);
    left2.position.set(-0.4,k,0);
    metalDetector.add(left2);

    let right2 = new Three.Mesh(cubeGeometrySide2,darkGrey);
    right2.position.set(0.4,k,0);
    metalDetector.add(right2);

  }

  for (let i = -0.3; i <= 0.3 ; i+=0.6) {

    let cubeGeometryBorder = new Three.BoxGeometry(0.09, 2.3, 0.05);
    let left_border = new Three.Mesh(cubeGeometryBorder, darkGrey);
    left_border.position.set(-0.4, 1, i);
    metalDetector.add(left_border);

    let right_border = new Three.Mesh(cubeGeometryBorder, darkGrey);
    right_border.position.set(0.4, 1, i);
    metalDetector.add(right_border);

  }

  return metalDetector
}

export default {
  name: "metal_detector",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "metal detector",
    description: "metal detector",
    image: require('./metalDetector.png')
  },
  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
        <rect key="1" x="0" y="0" width={newWidth} height={newDepth}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#101010"}}/>
        <circle key="2" cx="0" cy="0" r="45" stroke="black" style={{stroke: "black", strokeWidth:"2px", fill:"white"}} transform={'translate(45,45)'}/>
        <text key="3" x="0" y="0" transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {


    let newAltitude = element.properties.get('altitude').get('length');

    let metalDetectorMaxLOD = new Three.Object3D();
    metalDetectorMaxLOD.add(objectMaxLOD.clone());

    let value = new Three.Box3().setFromObject(metalDetectorMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    metalDetectorMaxLOD.position.y+= newHeight/11.5 + newAltitude;
    metalDetectorMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    let metalDetectorMinLOD = new Three.Object3D();
    metalDetectorMinLOD.add(objectMinLOD.clone());
    metalDetectorMinLOD.position.y+= newHeight/11.5 + newAltitude;
    metalDetectorMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /*** add all Level of Detail ***/

    let lod = new Three.LOD();

    lod.addLevel(metalDetectorMaxLOD, 700);
    lod.addLevel(metalDetectorMinLOD, 1200);
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
