import * as Three from 'three';
import React from 'react';

const WIDTH = 60;
const DEPTH = 60;
const HEIGHT = 220;

const blue = new Three.MeshLambertMaterial({color: 0x0000CC});
const grey = new Three.MeshLambertMaterial({color: 0xC0C0C0});
const black = new Three.MeshLambertMaterial({color: 0x000000});

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();


function makeObjectMaxLOD() {

  let wardrobe = new Three.Mesh();

  //base
  let bottomSide = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  wardrobe.add(bottomSide);

  //side
  let side1 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side1.position.set(0, 1.025, 0.475);
  wardrobe.add(side1);

  let side2 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side2.position.set(0, 1.025, -0.475);
  wardrobe.add(side2);

  //backside
  let backside = new Three.Mesh(new Three.BoxGeometry(0.05, 2, 1), grey);
  backside.position.set(0.475, 1.025, 0);
  wardrobe.add(backside);

  // top
  let topside = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  topside.position.set(0, 2.05, 0);
  wardrobe.add(topside);

  //central axis
  let centralAxis = new Three.Mesh(new Three.BoxGeometry(0.9, 0.4, 0.05), grey);
  centralAxis.position.set(0, 1.025, 0);
  wardrobe.add(centralAxis);

  //lower shelve
  let lowShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  lowShelve.position.set(0, 0.8, 0.225);
  wardrobe.add(lowShelve);

  //upper shelve
  let upShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  upShelve.position.set(0, 1.25, -0.225);
  wardrobe.add(upShelve);

  //up door
  let upDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  upDoor_p1.position.set(-0.475, 1.64, 0);
  wardrobe.add(upDoor_p1);

  let upDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  upDoor_p2.position.set(-0.475, 1.035, 0.23);
  wardrobe.add(upDoor_p2);

  //low door
  let lowDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  lowDoor_p1.position.set(-0.475, 0.41, 0);
  wardrobe.add(lowDoor_p1);

  let lowDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  lowDoor_p2.position.set(-0.475, 1.015, -0.23);
  wardrobe.add(lowDoor_p2);

  let fz;

  for (let fy = 1.64; fy >= 0.4; fy -= 1.14) {
    fy === 1.64 ? fz = -0.35 : fz = 0.35;

    //lock
    let lock_p1 = new Three.Mesh(new Three.CylinderGeometry(0.025, 0.03, 0.02, 32, 32), black);
    lock_p1.rotation.x = 0.5 * Math.PI;
    lock_p1.rotation.z = 0.5 * Math.PI;
    lock_p1.position.set(-0.5, fy, fz);
    wardrobe.add(lock_p1);

    let lock_p2 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.022, 0.015, 32, 32), grey);
    lock_p2.rotation.x = 0.5 * Math.PI;
    lock_p2.rotation.z = 0.5 * Math.PI;
    lock_p2.position.set(-0.515, fy, fz);
    wardrobe.add(lock_p2);

    let lock_p3 = new Three.Mesh(new Three.BoxGeometry(0.01, 0.015, 0.005, 32, 32), black);
    lock_p3.position.set(-0.518, fy, fz);
    wardrobe.add(lock_p3);

  }

  for (let fx = -0.47; fx <= 0.47; fx += 0.94) {
    for (let fz = 0.47; fz >= -0.47; fz -= 0.94) {
      //foot
      let foot = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.04, 0.1, 4), grey);
      foot.position.set(fx, -0.05, fz);
      foot.rotation.y = 0.25 * Math.PI;
      foot.rotation.z = Math.PI;
      wardrobe.add(foot);
    }
  }

  return wardrobe
}

function makeObjectMinLOD() {

  let wardrobe = new Three.Mesh();

  //base
  let bottomSide = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  wardrobe.add(bottomSide);

  //side
  let side1 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side1.position.set(0, 1.025, 0.475);
  wardrobe.add(side1);

  let side2 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side2.position.set(0, 1.025, -0.475);
  wardrobe.add(side2);

  //backside
  let backside = new Three.Mesh(new Three.BoxGeometry(0.05, 2, 1), grey);
  backside.position.set(0.475, 1.025, 0);
  wardrobe.add(backside);

  // top
  let topside = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  topside.position.set(0, 2.05, 0);
  wardrobe.add(topside);

  //central axis
  let centralAxis = new Three.Mesh(new Three.BoxGeometry(0.9, 0.4, 0.05), grey);
  centralAxis.position.set(0, 1.025, 0);
  wardrobe.add(centralAxis);

  //lower shelve
  let lowShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  lowShelve.position.set(0, 0.8, 0.225);
  wardrobe.add(lowShelve);

  //upper shelve
  let upShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  upShelve.position.set(0, 1.25, -0.225);
  wardrobe.add(upShelve);

  //up door
  let upDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  upDoor_p1.position.set(-0.475, 1.64, 0);
  wardrobe.add(upDoor_p1);

  let upDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  upDoor_p2.position.set(-0.475, 1.035, 0.23);
  wardrobe.add(upDoor_p2);

  //low door
  let lowDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  lowDoor_p1.position.set(-0.475, 0.41, 0);
  wardrobe.add(lowDoor_p1);

  let lowDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  lowDoor_p2.position.set(-0.475, 1.015, -0.23);
  wardrobe.add(lowDoor_p2);


  for (let fx = -0.47; fx <= 0.47; fx += 0.94) {
    for (let fz = 0.47; fz >= -0.47; fz -= 0.94) {
      //foot
      let foot = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.04, 0.1, 4), grey);
      foot.position.set(fx, -0.05, fz);
      foot.rotation.y = 0.25 * Math.PI;
      foot.rotation.z = Math.PI;
      wardrobe.add(foot);
    }
  }

  return wardrobe
}

export default {
  name: "wardrobe",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "wardrobe",
    description: "wardrobe",
    image: require('./wardrobe.png')
  },
  properties: {
    altitude: {
      label: "altitudine",
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

    /*************** lod max *******************/

    let wardrobeMaxLOD=new Three.Object3D();
    wardrobeMaxLOD.add(objectMaxLOD.clone());

    let value = new Three.Box3().setFromObject(wardrobeMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    wardrobeMaxLOD.position.z+= -DEPTH/6;
    wardrobeMaxLOD.position.y+= HEIGHT/24 +newAltitude;
    wardrobeMaxLOD.rotation.y+= -Math.PI/2;
    wardrobeMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /************** lod min ********************/

    let wardrobeMinLOD=new Three.Object3D();
    wardrobeMinLOD.add(objectMinLOD.clone());
    wardrobeMinLOD.position.z+= -DEPTH/6;
    wardrobeMinLOD.position.y+= HEIGHT/24 +newAltitude;
    wardrobeMinLOD.rotation.y+= -Math.PI/2;
    wardrobeMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(wardrobeMaxLOD, 200);
    lod.addLevel(wardrobeMinLOD, 900);
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
