import * as Three from 'three';
import React from 'react';

const WIDTH  = 50;
const DEPTH  = 50;
const HEIGHT = 50;

const textureLoader = new Three.TextureLoader();
const power    = textureLoader.load(require("./power.jpg" ));
const black    = textureLoader.load(require("./black.jpg" ));
const white    = textureLoader.load(require("./white.jpg" ));
const keyboard = textureLoader.load(require("./keyboard.jpg" ));
const blackMaterial = new Three.MeshLambertMaterial( { map:black} );

const objectMaxLOD    = makeObjectMaxLOD();
const objectMinLOD    = makeObjectMinLOD();


function makeObjectMaxLOD() {

  let monitorPC = new Three.Mesh();

  let cubeGeometryBase = new Three.BoxGeometry(0.04,0.42,0.06);
  let whiteMaterial = new Three.MeshLambertMaterial({map:white});
  let edge_p0 = new Three.Mesh(cubeGeometryBase,whiteMaterial);
  edge_p0.position.set(0,0.79,0);
  edge_p0.rotation.x=Math.PI/2;
  monitorPC.add(edge_p0);

  let cubeGeometryBase2 = new Three.BoxGeometry(0.04,0.42,0.06);
  let edge_p1 = new Three.Mesh(cubeGeometryBase2,whiteMaterial);
  edge_p1.position.set(0,0.43,0);
  edge_p1.rotation.x=Math.PI/2;
  monitorPC.add(edge_p1);

  let cubeGeometryBase3 = new Three.BoxGeometry(0.04,0.42,0.04);
  let edge_p3 = new Three.Mesh(cubeGeometryBase3,whiteMaterial);
  edge_p3.position.set(0,0.61,0.21);
  monitorPC.add(edge_p3);

  let cubeGeometryBase4 = new Three.BoxGeometry(0.04,0.42,0.04);
  let edge_p4 = new Three.Mesh(cubeGeometryBase4,whiteMaterial);
  edge_p4.position.set(0,0.61,-0.21);
  monitorPC.add(edge_p4);

  let cubeGeometryBase5 = new Three.BoxGeometry(0.4,0.40,0.05);
  let back = new Three.Mesh(cubeGeometryBase5,blackMaterial);
  back.position.set(-0.02,0.61,0);
  back.rotation.y=Math.PI/2;
  monitorPC.add(back);

  let powerGeometry = new Three.BoxGeometry(0.01,0.02,0.02);
  let powerMaterial = new Three.MeshLambertMaterial({map:power});
  let powerButton   = new Three.Mesh(powerGeometry,powerMaterial);
  powerButton.position.set(0.0155,0.43,0);
  monitorPC.add(powerButton);

  let cylinderGeometry1 = new Three.CylinderGeometry(0.02,0.02,0.06,32,32);
  let base_p1 = new Three.Mesh(cylinderGeometry1,blackMaterial);
  base_p1.position.set(0,0.38,0);
  monitorPC.add(base_p1);

  let geometry = new Three.CylinderGeometry(0.1,0.1,0.02,32,32);
  let material = new Three.MeshLambertMaterial( { map:black} );
  let base_p2 = new Three.Mesh( geometry, material );
  base_p2.scale.set(0.8,1,1);
  base_p2.position.set(0,0.36,0);
  monitorPC.add(base_p2);

  //keyboard
  let cubeGeometryBase8 = new Three.BoxGeometry(0.4,0.02,0.2);

  let boxMaterials = [
    new Three.MeshBasicMaterial({color:0x000000}),
    new Three.MeshBasicMaterial({color:0x000000}),
    new Three.MeshLambertMaterial({map:keyboard}),
    new Three.MeshBasicMaterial({color:0x000000}),
    new Three.MeshBasicMaterial({color:0x000000}),
    new Three.MeshBasicMaterial({color:0x000000})
  ];


  let keyboardMesh = new Three.Mesh(cubeGeometryBase8,boxMaterials);
  keyboardMesh.position.set(0.3,0.36,0);
  keyboardMesh.rotation.y=Math.PI/2;
  monitorPC.add(keyboardMesh);

  return monitorPC;
}

function makeObjectMinLOD() {

  let monitorPC = new Three.Mesh();

  let cubeGeometryBase = new Three.BoxGeometry(0.04,0.42,0.06);
  let whiteMaterial = new Three.MeshLambertMaterial({map:white});
  let edge_p0 = new Three.Mesh(cubeGeometryBase,whiteMaterial);
  edge_p0.position.set(0,0.79,0);
  edge_p0.rotation.x=Math.PI/2;
  monitorPC.add(edge_p0);

  let cubeGeometryBase2 = new Three.BoxGeometry(0.04,0.42,0.06);
  let edge_p1 = new Three.Mesh(cubeGeometryBase2,whiteMaterial);
  edge_p1.position.set(0,0.43,0);
  edge_p1.rotation.x=Math.PI/2;
  monitorPC.add(edge_p1);

  let cubeGeometryBase3 = new Three.BoxGeometry(0.04,0.42,0.04);
  let edge_p3 = new Three.Mesh(cubeGeometryBase3,whiteMaterial);
  edge_p3.position.set(0,0.61,0.21);
  monitorPC.add(edge_p3);

  let cubeGeometryBase4 = new Three.BoxGeometry(0.04,0.42,0.04);
  let edge_p4 = new Three.Mesh(cubeGeometryBase4,whiteMaterial);
  edge_p4.position.set(0,0.61,-0.21);
  monitorPC.add(edge_p4);

  let cubeGeometryBase5 = new Three.BoxGeometry(0.4,0.40,0.05);
  let blackMaterial = new Three.MeshLambertMaterial( { map:black} );
  let back = new Three.Mesh(cubeGeometryBase5,blackMaterial);
  back.position.set(-0.02,0.61,0);
  back.rotation.y=Math.PI/2;
  monitorPC.add(back);

  let cylinderGeometry1 = new Three.CylinderGeometry(0.02,0.02,0.06,8,8);
  let base_p1 = new Three.Mesh(cylinderGeometry1,blackMaterial);
  base_p1.position.set(0,0.38,0);
  monitorPC.add(base_p1);

  let geometry = new Three.CylinderGeometry(0.1,0.1,0.02,8,8);
  let base_p2 = new Three.Mesh( geometry, blackMaterial );
  base_p2.scale.set(0.8,1,1);
  base_p2.position.set(0,0.36,0);
  monitorPC.add(base_p2);

  //keyboard
  let cubeGeometryBase8 = new Three.BoxGeometry(0.4,0.02,0.2);
  let keyboardMesh = new Three.Mesh(cubeGeometryBase8,blackMaterial);
  keyboardMesh.position.set(0.3,0.36,0);
  keyboardMesh.rotation.y=Math.PI/2;
  monitorPC.add(keyboardMesh);

  return monitorPC;
}

export default {
  name: "monitor_pc",
  prototype: "items",

  info: {
    tag: ['furnishings'],
    title: "pc monitor",
    description: "pc monitor",
    image: require('./monitorPC.png')
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 100,
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
      <g transform={`translate(${-WIDTH / 2},${-DEPTH})`}>
      <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
      <text key="2" x="0" y="0"
        transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
        style= {{textAnchor: "middle", fontSize: "10px"}}>
            {element.type}
            </text>
        </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    let monitorPC_MaxLOD=new Three.Object3D();
    monitorPC_MaxLOD.add(objectMaxLOD.clone());

    let aa = new Three.Box3().setFromObject(monitorPC_MaxLOD);

    let deltaX = Math.abs(aa.max.x - aa.min.x);
    let deltaY = Math.abs(aa.max.y - aa.min.y);
    let deltaZ = Math.abs(aa.max.z - aa.min.z);

    monitorPC_MaxLOD.rotation.y+=-Math.PI/2;
    monitorPC_MaxLOD.position.y+= -HEIGHT * .75 + newAltitude;
    monitorPC_MaxLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX);

    /**************** LOD min ***********************/

    let monitorPC_MinLOD=new Three.Object3D();

    monitorPC_MinLOD.add(objectMinLOD.clone());

    monitorPC_MinLOD.rotation.y+=-Math.PI/2;
    monitorPC_MinLOD.position.y+= -HEIGHT * .75 + newAltitude;
    monitorPC_MinLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX);

    /*** add all Level of Detail ***/

    let lod = new Three.LOD();

    lod.addLevel(monitorPC_MaxLOD, 300);
    lod.addLevel(monitorPC_MinLOD, 700);
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
