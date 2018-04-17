import * as Three from 'three';
import React from 'react';

const WIDTH = 80;
const DEPTH = 80;
const HEIGHT = 180;

const textureLoader = new Three.TextureLoader();
const logoTexture = textureLoader.load(require('./logo.jpg'));
const steelTexture = textureLoader.load(require('./steel.jpg'));
const logoMaterial =  new Three.MeshLambertMaterial({map:logoTexture});
const steel =  new Three.MeshLambertMaterial({map:steelTexture});

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let fridge = new Three.Mesh();

  //base
  let base = new Three.Mesh(new Three.BoxGeometry(1,0.05,1), steel);
  base.position.set(0,0.15,0);
  fridge.add(base);

  //foot
  for(let gx=-0.45;gx<=0.45;gx+=0.9){
    for(let gz=-0.45;gz<=0.45;gz+=0.9){
      let foot = new Three.Mesh(new Three.CylinderGeometry(0.05, 0.05, 0.05, 4), steel);
      foot.position.set(gx,-0.05,gz);
      foot.rotation.y=0.25*Math.PI;
      base.add(foot)
    }
  }

  //back
  let back = new Three.Mesh(new Three.BoxGeometry(0.05,1.8,1), steel);
  back.position.set(0.475,0.925,0);
  base.add(back);

  //side
  let side1 = new Three.Mesh(new Three.BoxGeometry(1,1.8,0.05), steel);
  side1.position.set(0,0.925,0.475);
  base.add(side1);

  let side2 = new Three.Mesh(new Three.BoxGeometry(1,1.8,0.05), steel);
  side2.position.set(0,0.925,-0.475);
  base.add(side2);

  //top
  let top = new Three.Mesh(new Three.BoxGeometry(1,0.20,1), steel);
  top.position.set(0,1.85,0);
  base.add(top);

  //logo
  let logo = new Three.Mesh(new Three.PlaneGeometry(0.2,0.1),logoMaterial);
  logo.position.set(-0.51,1.85,0);
  logo.rotation.y=-0.5*Math.PI;
  base.add(logo);

  //up door
  let door1 = new Three.Mesh(new Three.BoxGeometry(0.05,0.9,0.95), steel);
  door1.position.set(-0.5,1.30,0);
  base.add(door1);

  //down door
  let door2 = new Three.Mesh(new Three.BoxGeometry(0.05,0.8,0.95), steel);
  door2.position.set(-0.5,0.425,0);
  base.add(door2);

  //middle plane
  let middlePlane = new Three.Mesh(new Three.BoxGeometry(1,0.05,1), steel);
  middlePlane.position.set(0,0.845,0);
  base.add(middlePlane);

  //handle
  let handle1_p1 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.8),steel);
  handle1_p1.position.set(-0.56,1.30,-0.4);
  base.add(handle1_p1);

  let handle1_p2 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle1_p2.position.set(-0.53,1.60,-0.4);
  handle1_p2.rotation.z=0.5*Math.PI;
  base.add(handle1_p2);

  let handle1_p3 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle1_p3.position.set(-0.53,1,-0.4);
  handle1_p3.rotation.z=0.5*Math.PI;
  base.add(handle1_p3);

  //handle
  let handle2_p1 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.7),steel);
  handle2_p1.position.set(-0.56,0.425,-0.4);
  base.add(handle2_p1);

  let handle2_p2 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle2_p2.position.set(-0.53,0.7,-0.4);
  handle2_p2.rotation.z=0.5*Math.PI;
  base.add(handle2_p2);

  let handle2_p3 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle2_p3.position.set(-0.53,0.15,-0.4);
  handle2_p3.rotation.z=0.5*Math.PI;
  base.add(handle2_p3);

  return fridge
}

function makeObjectMinLOD() {

  let fridge = new Three.Mesh();
  //base
  let base = new Three.Mesh(new Three.BoxGeometry(1,0.05,1), steel);
  base.position.set(0,0.15,0);
  fridge.add(base);

  //foot
  for(let gx=-0.45;gx<=0.45;gx+=0.9){
    for(let gz=-0.45;gz<=0.45;gz+=0.9){
      let foot = new Three.Mesh(new Three.CylinderGeometry(0.05, 0.05, 0.05, 4), steel);
      foot.position.set(gx,-0.05,gz);
      foot.rotation.y=0.25*Math.PI;
      base.add(foot)
    }
  }

  //back
  let back = new Three.Mesh(new Three.BoxGeometry(0.05,1.8,1), steel);
  back.position.set(0.475,0.925,0);
  base.add(back);

  //side
  let side1 = new Three.Mesh(new Three.BoxGeometry(1,1.8,0.05), steel);
  side1.position.set(0,0.925,0.475);
  base.add(side1);

  let side2 = new Three.Mesh(new Three.BoxGeometry(1,1.8,0.05), steel);
  side2.position.set(0,0.925,-0.475);
  base.add(side2);

  //top
  let top = new Three.Mesh(new Three.BoxGeometry(1,0.20,1), steel);
  top.position.set(0,1.85,0);
  base.add(top);

  //logo
  let logo = new Three.Mesh(new Three.PlaneGeometry(0.2,0.1),logoMaterial);
  logo.position.set(-0.51,1.85,0);
  logo.rotation.y=-0.5*Math.PI;
  base.add(logo);

  //up door
  let door1 = new Three.Mesh(new Three.BoxGeometry(0.05,0.9,0.95), steel);
  door1.position.set(-0.5,1.30,0);
  base.add(door1);

  //down door
  let door2 = new Three.Mesh(new Three.BoxGeometry(0.05,0.8,0.95), steel);
  door2.position.set(-0.5,0.425,0);
  base.add(door2);

  //middle plane
  let middlePlane = new Three.Mesh(new Three.BoxGeometry(1,0.05,1), steel);
  middlePlane.position.set(0,0.845,0);
  base.add(middlePlane);

  //handle
  let handle1_p1 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.8),steel);
  handle1_p1.position.set(-0.56,1.30,-0.4);
  base.add(handle1_p1);

  let handle1_p2 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle1_p2.position.set(-0.53,1.60,-0.4);
  handle1_p2.rotation.z=0.5*Math.PI;
  base.add(handle1_p2);

  let handle1_p3 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle1_p3.position.set(-0.53,1,-0.4);
  handle1_p3.rotation.z=0.5*Math.PI;
  base.add(handle1_p3);

  //handle
  let handle2_p1 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.7),steel);
  handle2_p1.position.set(-0.56,0.425,-0.4);
  base.add(handle2_p1);

  let handle2_p2 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle2_p2.position.set(-0.53,0.7,-0.4);
  handle2_p2.rotation.z=0.5*Math.PI;
  base.add(handle2_p2);

  let handle2_p3 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),steel);
  handle2_p3.position.set(-0.53,0.15,-0.4);
  handle2_p3.rotation.z=0.5*Math.PI;
  base.add(handle2_p3);

  return fridge
}
export default {
  name: "fridge",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "fridge",
    description: "fridge",
    image: require('./fridge.png')
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
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
      <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
      <text key="2" x="0" y="0"
            transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
            {element.type}
            </text>
        </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /**************** lod max *******************/

    let fridgeMaxLOD = new Three.Object3D();
    fridgeMaxLOD.add(objectMaxLOD.clone());

    let valuePosition = new Three.Box3().setFromObject(fridgeMaxLOD);

    let deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    let deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    let deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    fridgeMaxLOD.position.y += newAltitude;
    fridgeMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**************** lod min *******************/

    let fridgeMinLOD = new Three.Object3D();
    fridgeMinLOD.add(objectMinLOD.clone());
    fridgeMinLOD.position.y += newAltitude;
    fridgeMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(fridgeMaxLOD, 200);
    lod.addLevel(fridgeMinLOD, 900);
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
