import * as Three from 'three';
import React from 'react';

const WIDTH = 200;
const DEPTH = 20;
const HEIGHT = 40;

let brownMaterial = new Three.MeshLambertMaterial( {color: 0x9b8c75} );
let greyMaterial  = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let coathook = new Three.Mesh();

  let newWidth = 2.15;
  let newDepth = .04;
  let newHeight = .1;
  let radius = .0125;

  let geometry = new Three.BoxGeometry( newWidth, 1.5*newHeight, newDepth );
  let plane = new Three.Mesh( geometry, brownMaterial );
  plane.position.y = newHeight/2;
  coathook.add(plane);

  let geometry_legs = new Three.CylinderGeometry( radius, radius, newHeight/1.7, 32, 32 );
  let p1 = new Three.Mesh( geometry_legs, greyMaterial );
  p1.rotation.x+=Math.PI/2;
  p1.position.set(1,0.05,0.05);
  coathook.add(p1);

  let p2 = new Three.Mesh( geometry_legs, greyMaterial );
  p2.rotation.x+=Math.PI/2;
  p2.position.set(-.95,0.05,0.05);
  coathook.add(p2);

  let geometrySphereUp = new Three.SphereGeometry( 0.035, 32, 32 );
  let sphere = new Three.Mesh( geometrySphereUp, greyMaterial );
  sphere.position.set(1,0.05,0.08);
  sphere.scale.set(1,1,.5);
  coathook.add(sphere);

  let sphere2 = new Three.Mesh( geometrySphereUp, greyMaterial );
  sphere2.position.set(-.95,0.05,0.08);
  sphere2.scale.set(1,1,.5);
  coathook.add(sphere2);

  let newHeight2 = .2;

  let curve = new Three.CatmullRomCurve3( [
    new Three.Vector3( .05, 0.125, 0 ),
    new Three.Vector3( .125, .025, 0 ),
    new Three.Vector3( -.05, -.075, 0 ),
  ] );

  for(let i=-0.95;i<=1.05;i+=0.15){

    let geometry_legs2 = new Three.CylinderGeometry( radius, radius, newHeight2, 32, 32 );
    let p3 = new Three.Mesh( geometry_legs2, greyMaterial );
    p3.position.set(i,-0.05,0);
    coathook.add(p3);

    let geometry3 = new Three.TubeGeometry( curve, 32, .015, 16, false );
    let mesh3 = new Three.Mesh( geometry3, greyMaterial );
    mesh3.position.set(i,-.05,.045);
    mesh3.rotation.y-=Math.PI/2;
    mesh3.rotation.x+=Math.PI+Math.PI/7.5;
    mesh3.rotation.z+=Math.PI/2;
    coathook.add( mesh3 );

    let geometrySphere = new Three.SphereGeometry( 0.035, 32, 32 );
    let sphereTop = new Three.Mesh( geometrySphere, greyMaterial );
    sphereTop.position.set(i,-0.142,0.15);
    sphereTop.rotation.x+=Math.PI/2+Math.PI/3;
    coathook.add(sphereTop);

  }

  return coathook;
}

function makeObjectMinLOD() {

  let coathook = new Three.Mesh();

  let newWidth = 2.15;
  let newDepth = .04;
  let newHeight = .1;
  let radius = .0125;

  let geometry = new Three.BoxGeometry( newWidth, 1.5*newHeight, newDepth );
  let plane = new Three.Mesh( geometry, brownMaterial );
  plane.position.y = newHeight/2;
  coathook.add(plane);

  let geometry_legs = new Three.CylinderGeometry( radius, radius, newHeight/1.7, 8, 8 );
  let p1 = new Three.Mesh( geometry_legs, greyMaterial );
  p1.rotation.x+=Math.PI/2;
  p1.position.set(1,0.05,0.05);
  coathook.add(p1);

  let p2 = new Three.Mesh( geometry_legs, greyMaterial );
  p2.rotation.x+=Math.PI/2;
  p2.position.set(-.95,0.05,0.05);
  coathook.add(p2);

  let geometrySphereUp = new Three.SphereGeometry( 0.035, 8, 8 );
  let sphere = new Three.Mesh( geometrySphereUp, greyMaterial );
  sphere.position.set(1,0.05,0.08);
  sphere.scale.set(1,1,.5);
  coathook.add(sphere);

  let sphere2 = new Three.Mesh( geometrySphereUp, greyMaterial );
  sphere2.position.set(-.95,0.05,0.08);
  sphere2.scale.set(1,1,.5);
  coathook.add(sphere2);


  let newHeight2 = .2;


  let curve = new Three.CatmullRomCurve3( [
    new Three.Vector3( .05, 0.125, 0 ),
    new Three.Vector3( .125, .025, 0 ),
    new Three.Vector3( -.05, -.075, 0 ),
  ] );

  for(let i=-0.95;i<=1.05;i+=0.15){

    let geometry_legs2 = new Three.CylinderGeometry( radius, radius, newHeight2, 8, 8 );
    let p3 = new Three.Mesh( geometry_legs2, greyMaterial );
    p3.position.set(i,-0.05,0);
    coathook.add(p3);

    let geometry3 = new Three.TubeGeometry( curve, 32, .015, 16, false );
    let mesh3 = new Three.Mesh( geometry3, greyMaterial );
    mesh3.position.set(i,-.05,.045);
    mesh3.rotation.y-=Math.PI/2;
    mesh3.rotation.x+=Math.PI+Math.PI/7.5;
    mesh3.rotation.z+=Math.PI/2;
    coathook.add( mesh3 );

    let geometrySphere = new Three.SphereGeometry( 0.035, 8, 8 );
    let sphereTop = new Three.Mesh( geometrySphere, greyMaterial );
    sphereTop.position.set(i,-0.142,0.15);
    sphereTop.rotation.x+=Math.PI/2+Math.PI/3;
    coathook.add(sphereTop);

  }

  return coathook;
}

export default {
  name: "coathook",
  prototype: "items",

  info: {
    tag: ['arredamento', 'wood', 'metal'],
    group: "Items",
    title: "coathook",
    description: "accattapanni",
    image: require('./coathook.png')
  },

  properties: {
    altitude: {
      label: "quota",
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

    let rect_style = {stroke : element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};

    return (

      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
    <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
      <text key="2" x="0" y="0" transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
    style={{textAnchor: "middle", fontSize: "11px"}}>
    {element.type}
    </text>
    </g>
    )
  },


  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /************* lod max ********************/

    let coathookMaxLOD = new Three.Object3D();
    coathookMaxLOD.add(objectMaxLOD.clone());

    let value = new Three.Box3().setFromObject(coathookMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    coathookMaxLOD.position.y+= HEIGHT/1.5 +newAltitude;
    coathookMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /************* lod min ********************/

    let coathookMinLOD = new Three.Object3D();
    coathookMinLOD.add(objectMinLOD.clone());

    coathookMinLOD.position.y+= HEIGHT/1.5 +newAltitude;
    coathookMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(coathookMaxLOD, 200);
    lod.addLevel(coathookMinLOD, 900);
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
