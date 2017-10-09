import * as Three from 'three';
import React from 'react';

const WIDTH = 140;
const DEPTH = 70;
const HEIGHT = 100;

const texture = new Three.TextureLoader().load(require('./wood.jpg'));
const materialTexture = new Three.MeshLambertMaterial({map: texture});
const green = new Three.MeshBasicMaterial({color: 0x669966});

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let teaching_post = new Three.Mesh();

  let teaching_postX = 1.9;
  let teaching_postY = 1.5;
  let teaching_postZ = 1.2;

  let p1 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p1.position.z += teaching_postZ / 2;
  p1.position.x += 0.05;
  p1.position.y += 0.05;

  let p2 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p2.position.z += teaching_postZ / 2;
  p2.position.x += teaching_postX - 0.05;
  p2.position.y += 0.05;

  let p3 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p3.position.z += teaching_postZ / 2;
  p3.position.x += teaching_postX - 0.05;
  p3.position.y += teaching_postY - 0.05;

  let p4 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p4.position.z += teaching_postZ / 2;
  p4.position.x += 0.05;
  p4.position.y += teaching_postY - 0.05;

  let boxMaterials = [materialTexture, materialTexture,materialTexture,materialTexture, green, materialTexture];

  let plane = new Three.Mesh(new Three.BoxGeometry(teaching_postX, teaching_postY, 0.04), boxMaterials);
  plane.position.x += teaching_postX / 2;
  plane.position.y += teaching_postY / 2;
  plane.position.z += teaching_postZ;

  let backPlane = new Three.Mesh(new Three.BoxGeometry(teaching_postX, (teaching_postY / 2) - 0.1, 0.04), materialTexture);
  backPlane.rotation.x += Math.PI / 2;
  backPlane.position.x += teaching_postX / 2;
  backPlane.position.z += teaching_postZ - teaching_postY / 4;

  let downPlane = new Three.Mesh(new Three.BoxGeometry(teaching_postX, (teaching_postY / 20), 0.04), materialTexture);
  downPlane.position.x += teaching_postX / 2;
  downPlane.position.y += teaching_postY / 2 + 0.4;
  downPlane.position.z += teaching_postZ - 0.6;

  let leftPlane = new Three.Mesh(new Three.BoxGeometry(teaching_postY, (teaching_postY / 2) - 0.1, 0.04), materialTexture);
  leftPlane.rotation.x += Math.PI / 2;
  leftPlane.rotation.y += Math.PI / 2;
  leftPlane.position.x += teaching_postX;
  leftPlane.position.y += teaching_postY / 2;
  leftPlane.position.z += teaching_postZ - teaching_postY / 4;

  let rightPlane = leftPlane.clone();
  rightPlane.position.x -= teaching_postX;

  let drawer = new Three.Mesh(new Three.BoxGeometry(teaching_postX / 4, teaching_postY, 0.4), materialTexture);
  drawer.position.x += teaching_postX / 4;
  drawer.position.y += teaching_postY / 2;
  drawer.position.z += teaching_postZ / 1.55;

  let geometry = new Three.BoxGeometry(0.1, 0.04, 0.02);
  let handle = new Three.Mesh(geometry, materialTexture);
  handle.position.y += teaching_postY / 2 + 0.02;

  let geometry2 = new Three.BoxGeometry(0.5, 0.04, 0.3);
  let p = new Three.Mesh(geometry2, green);
  p.position.y += teaching_postY / 2;

  drawer.add(handle);
  drawer.add(p);
  drawer.scale.set(1.5, 1, .7);

  let drawer2 = drawer.clone();
  drawer2.position.z += (teaching_postZ / 4.5);

  teaching_post.add(p1);
  teaching_post.add(p2);
  teaching_post.add(p3);
  teaching_post.add(p4);
  teaching_post.add(plane);
  teaching_post.add(drawer);
  teaching_post.add(drawer2);
  teaching_post.add(backPlane);
  teaching_post.add(leftPlane);
  teaching_post.add(rightPlane);
  teaching_post.add(downPlane);

  return teaching_post
}

function makeObjectMinLOD() {

  let teaching_post = new Three.Mesh();

  let teaching_postX = 1.9;
  let teaching_postY = 1.5;
  let teaching_postZ = 1.2;

  let p1 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p1.position.z += teaching_postZ / 2;
  p1.position.x += 0.05;
  p1.position.y += 0.05;

  let p2 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p2.position.z += teaching_postZ / 2;
  p2.position.x += teaching_postX - 0.05;
  p2.position.y += 0.05;

  let p3 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p3.position.z += teaching_postZ / 2;
  p3.position.x += teaching_postX - 0.05;
  p3.position.y += teaching_postY - 0.05;

  let p4 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, teaching_postZ), materialTexture);
  p4.position.z += teaching_postZ / 2;
  p4.position.x += 0.05;
  p4.position.y += teaching_postY - 0.05;

  let boxMaterials = [materialTexture, materialTexture,materialTexture,materialTexture, green, materialTexture];

  let plane = new Three.Mesh(new Three.BoxGeometry(teaching_postX, teaching_postY, 0.04), boxMaterials);
  plane.position.x += teaching_postX / 2;
  plane.position.y += teaching_postY / 2;
  plane.position.z += teaching_postZ;

  let backPlane = new Three.Mesh(new Three.BoxGeometry(teaching_postX, (teaching_postY / 2) - 0.1, 0.04), materialTexture);
  backPlane.rotation.x += Math.PI / 2;
  backPlane.position.x += teaching_postX / 2;
  backPlane.position.z += teaching_postZ - teaching_postY / 4;

  let downPlane = new Three.Mesh(new Three.BoxGeometry(teaching_postX, (teaching_postY / 20), 0.04), materialTexture);
  downPlane.position.x += teaching_postX / 2;
  downPlane.position.y += teaching_postY / 2 + 0.4;
  downPlane.position.z += teaching_postZ - 0.6;

  let leftPlane = new Three.Mesh(new Three.BoxGeometry(teaching_postY, (teaching_postY / 2) - 0.1, 0.04), materialTexture);
  leftPlane.rotation.x += Math.PI / 2;
  leftPlane.rotation.y += Math.PI / 2;
  leftPlane.position.x += teaching_postX;
  leftPlane.position.y += teaching_postY / 2;
  leftPlane.position.z += teaching_postZ - teaching_postY / 4;

  let rightPlane = leftPlane.clone();
  rightPlane.position.x -= teaching_postX;

  let drawer = new Three.Mesh(new Three.BoxGeometry(teaching_postX / 4, teaching_postY, 0.4), materialTexture);
  drawer.position.x += teaching_postX / 4;
  drawer.position.y += teaching_postY / 2;
  drawer.position.z += teaching_postZ / 1.55;

  let geometry2 = new Three.BoxGeometry(0.5, 0.04, 0.3);
  let p = new Three.Mesh(geometry2, green);
  p.position.y += teaching_postY / 2;

  drawer.add(p);
  drawer.scale.set(1.5, 1, .7);

  let drawer2 = drawer.clone();
  drawer2.position.z += (teaching_postZ / 4.5);

  teaching_post.add(p1);
  teaching_post.add(p2);
  teaching_post.add(p3);
  teaching_post.add(p4);
  teaching_post.add(plane);
  teaching_post.add(drawer);
  teaching_post.add(drawer2);
  teaching_post.add(backPlane);
  teaching_post.add(leftPlane);
  teaching_post.add(rightPlane);
  teaching_post.add(downPlane);

  return teaching_post
}

export default {
  name: "teachingpost",
  prototype: "items",

  info: {
    tag: ['arredamento', 'wood'],
    group: "Items",
    title: "teachingpost",
    description: "teachingpost",
    image: require('./teaching_post.png')
  },

  properties: {
    altitude: {
      label: "quota",
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

    let teaching_postMaxLOD = new Three.Object3D();
    teaching_postMaxLOD.add(objectMaxLOD.clone());

    let valueObject = new Three.Box3().setFromObject(teaching_postMaxLOD);

    let deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
    let deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
    let deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

    teaching_postMaxLOD.rotation.x+=-Math.PI/2;
    teaching_postMaxLOD.position.y+= newAltitude;
    teaching_postMaxLOD.position.x+= -WIDTH/2;
    teaching_postMaxLOD.position.z+= DEPTH/1.5;
    teaching_postMaxLOD.scale.set(WIDTH / deltaX, DEPTH / deltaZ, HEIGHT / deltaY);

    /*************** lod min *******************/

    let teaching_postMinLOD = new Three.Object3D();
    teaching_postMinLOD.add(objectMinLOD.clone());
    teaching_postMinLOD.rotation.x+=-Math.PI/2;
    teaching_postMinLOD.position.y+= newAltitude;
    teaching_postMinLOD.position.x+= -WIDTH/2;
    teaching_postMinLOD.position.z+= DEPTH/1.5;
    teaching_postMinLOD.scale.set(WIDTH / deltaX, DEPTH / deltaZ, HEIGHT / deltaY);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(teaching_postMaxLOD, 200);
    lod.addLevel(teaching_postMinLOD, 900);
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

