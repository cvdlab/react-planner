import * as Three from 'three';
import React from 'react';

const WIDTH = 40;
const DEPTH = 20;
const HEIGHT = 50;

const grey = new Three.MeshLambertMaterial({color:0xAAAAAA});
grey.side = Three.DoubleSide;
const red = new Three.MeshPhongMaterial({color:0xAA0000});
const blue = new Three.MeshPhongMaterial({color:0x0000AA} );
const black = new Three.MeshLambertMaterial({color:0x000000});
black.side=Three.DoubleSide;

const textureLoader = new Three.TextureLoader();
const quadro=textureLoader.load(require('./PanelTexture.png'));


const objectMaxLOD = makeObjectMaxLOD();
const objectMiddleLOD = makeObjectMiddleLOD();
const objectMinLOD = makeObjectMinLOD();



function makeObjectMaxLOD() {


  let threePhasePanel = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=0.79;
  let height=0.6;
  let radius=0.1;

  roundedRectShape.moveTo( x, y + radius );
  roundedRectShape.lineTo( x, y + height - radius );
  roundedRectShape.quadraticCurveTo( x, y + height, x + radius, y + height );
  roundedRectShape.lineTo( x + width - radius, y + height) ;
  roundedRectShape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  roundedRectShape.lineTo( x + width, y + radius );
  roundedRectShape.quadraticCurveTo( x + width, y, x + width - radius, y );
  roundedRectShape.lineTo( x + radius, y );
  roundedRectShape.quadraticCurveTo( x, y, x, y + radius );

  let extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let BackSideGeometry = new Three.BoxGeometry(1,1.4,0.1);
  let BackSide = new Three.Mesh( BackSideGeometry, grey );
  BackSide.position.set(0.5,1.5,0.05);
  threePhasePanel.add(BackSide);

  let PanelGeometry = new Three.PlaneGeometry(0.5,0.5);
  let meshPanel = new Three.Mesh( PanelGeometry, new Three.MeshPhongMaterial({map:quadro, transparent:true} ) );
  meshPanel.position.set(0.5,1.85,0.31);
  threePhasePanel.add(meshPanel);

  let geometry0 = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let mesh0 = new Three.Mesh( geometry0, grey ) ;
  mesh0.position.set(0.1,1.55,0.1);
  threePhasePanel.add(mesh0);

  let geometry1 = new Three.BoxGeometry(0.86,.38,0.2);
  let mesh1 = new Three.Mesh( geometry1, grey );
  mesh1.position.set(0.495,1.85,0.2);
  threePhasePanel.add(mesh1);

  let geometry00 = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let mesh00 = new Three.Mesh( geometry00, grey ) ;
  mesh00.position.set(0.1,.85,0.1);
  mesh00.scale.set(1,1.2,.6);
  threePhasePanel.add(mesh00);

  let geometry11 = new Three.BoxGeometry(0.86,.51,0.1);
  let mesh11 = new Three.Mesh( geometry11, grey  );
  mesh11.position.set(0.495,1.225,0.15);
  threePhasePanel.add(mesh11);

  let geometry1b = new Three.BoxGeometry(0.3,.5,0.1);
  let mesh1b = new Three.Mesh( geometry1b, grey);
  mesh1b.position.set(0.68,1.2,0.25);
  threePhasePanel.add(mesh1b);

  let mesh1c = new Three.Mesh( geometry1b, grey );
  mesh1c.position.set(0.32,1.2,0.25);
  threePhasePanel.add(mesh1c);

  let geometry1d = new Three.BoxGeometry(0.35,.6,0.1);
  let mesh1d = new Three.Mesh( geometry1d, grey);
  mesh1d.position.set(0.68,1.2,0.2);
  threePhasePanel.add(mesh1d);

  let mesh1e = new Three.Mesh( geometry1d, grey );
  mesh1e.position.set(0.32,1.2,0.2);
  threePhasePanel.add(mesh1e);

  let geometry1f = new Three.BoxGeometry(.15,.15,.01);
  let mesh1f = new Three.Mesh( geometry1f,  red);
  mesh1f.position.set(0.32,1.1,0.3);
  threePhasePanel.add(mesh1f);

  let mesh1g = new Three.Mesh( geometry1f, blue );
  mesh1g.position.set(0.68,1.1,0.3);
  threePhasePanel.add(mesh1g);

  let stopperGeometry1 = new Three.CylinderGeometry(0.05,0.05,0.05,16,16);
  let stopper_p1 = new Three.Mesh(stopperGeometry1, red);
  stopper_p1.position.set(0.32,1.1,0.3);
  stopper_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(stopper_p1);

  let stopperGeometry2 = new Three.SphereGeometry(0.07,16,16);
  let stopper_p2 = new Three.Mesh(stopperGeometry2, red);
  stopper_p2.position.set(0.32,1.1,0.35);
  stopper_p2.rotation.x=Math.PI/2;
  stopper_p2.scale.set(1,.5,1);
  threePhasePanel.add(stopper_p2);

  let stopperGeometry3 = new Three.CylinderGeometry(0.01,0.01,0.065,16,16);
  let stopper_p3 = new Three.Mesh(stopperGeometry3, red);
  stopper_p3.position.set(0.32,1.15,0.32);
  stopper_p3.rotation.x=Math.PI/2;
  stopper_p3.rotation.z=Math.PI/2;
  threePhasePanel.add(stopper_p3);

  let stopper2_p1 = new Three.Mesh(stopperGeometry1,blue);
  stopper2_p1.position.set(0.68,1.1,0.3);
  stopper2_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(stopper2_p1);

  let stopper2_p2 = new Three.Mesh(stopperGeometry2,blue);
  stopper2_p2.position.set(0.68,1.1,0.35);
  stopper2_p2.rotation.x=Math.PI/2;
  stopper2_p2.scale.set(1,.5,1);
  threePhasePanel.add(stopper2_p2);

  let stopper2_p3 = new Three.Mesh(stopperGeometry3,blue);
  stopper2_p3.position.set(0.68,1.15,0.32);
  stopper2_p3.rotation.x=Math.PI/2;
  stopper2_p3.rotation.z=Math.PI/2;
  threePhasePanel.add(stopper2_p3);

  let handleGeometry = new Three.CylinderGeometry(0.05,0.05,0.025,16,16);
  let handle_p1 = new Three.Mesh(handleGeometry,grey);
  handle_p1.position.set(0.32,1.3,0.3);
  handle_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(handle_p1);

  let handle2_p1 = new Three.Mesh(handleGeometry,grey);
  handle2_p1.position.set(0.68,1.3,0.3);
  handle2_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(handle2_p1);

  let cylinderGeometry2 = new Three.CylinderGeometry(0.051,0.051,0.05,16,16,true);
  let handle_p2 = new Three.Mesh(cylinderGeometry2,black);
  handle_p2.position.set(0.32,1.3,0.31);
  handle_p2.rotation.x=Math.PI/2;
  threePhasePanel.add(handle_p2);

  let handle2_p2 = new Three.Mesh(cylinderGeometry2,black);
  handle2_p2.position.set(0.68,1.3,0.31);
  handle2_p2.rotation.x=Math.PI/2;
  threePhasePanel.add(handle2_p2);

  let geometry2 = new Three.BoxGeometry(0.1,0.02,0.02);
  let handle_p3 = new Three.Mesh( geometry2,black );
  handle_p3.position.set(0.32,1.3,0.32);
  threePhasePanel.add(handle_p3);

  let handle2_p3 = new Three.Mesh( geometry2, black );
  handle2_p3.position.set(0.68,1.3,0.32);
  threePhasePanel.add(handle2_p3);

  let cylinderGeometry3 = new Three.CylinderGeometry(0.015,0.015,0.1,16,16);
  let pivot1 = new Three.Mesh(cylinderGeometry3,black);
  pivot1.rotation.x += Math.PI/2;
  pivot1.position.set(0.91,2.05,0.2);
  threePhasePanel.add(pivot1);

  let pivot2 = new Three.Mesh(cylinderGeometry3, black);
  pivot2.rotation.x += Math.PI/2;
  pivot2.position.set(0.91,1.65,0.2);
  threePhasePanel.add(pivot2);

  let pivot3 = new Three.Mesh(cylinderGeometry3,black);
  pivot3.rotation.x += Math.PI/2;
  pivot3.position.set(.08,2.05,0.2);
  threePhasePanel.add(pivot3);

  let pivot4 = new Three.Mesh(cylinderGeometry3,black);
  pivot4.rotation.x += Math.PI/2;
  pivot4.position.set(.08,1.65,0.2);
  threePhasePanel.add(pivot4);

  let cylinderGeometry4 = new Three.CylinderGeometry(0.018,0.018,0.22,16,16,true);
  let pivot11 = new Three.Mesh(cylinderGeometry4,grey);
  pivot11.rotation.x += Math.PI/2;
  pivot11.position.set(0.91,2.05,0.18);
  threePhasePanel.add(pivot11);

  let pivot22 = new Three.Mesh(cylinderGeometry4,grey);
  pivot22.rotation.x += Math.PI/2;
  pivot22.position.set(0.91,1.65,0.18);
  threePhasePanel.add(pivot22);

  let pivot33 = new Three.Mesh(cylinderGeometry4,grey);
  pivot33.rotation.x += Math.PI/2;
  pivot33.position.set(.08,2.05,0.18);
  threePhasePanel.add(pivot33);

  let pivot44 = new Three.Mesh(cylinderGeometry4,grey);
  pivot44.rotation.x += Math.PI/2;
  pivot44.position.set(.08,1.65,0.18);
  threePhasePanel.add(pivot44);

  let pivot1b = new Three.Mesh(cylinderGeometry3,black);
  pivot1b.rotation.x += Math.PI/2;
  pivot1b.position.set(0.91,1.5,0.16);
  threePhasePanel.add(pivot1b);

  let pivot2b = new Three.Mesh(cylinderGeometry3,black);
  pivot2b.rotation.x += Math.PI/2;
  pivot2b.position.set(0.91,.95,0.16);
  threePhasePanel.add(pivot2b);

  let pivot3b = new Three.Mesh(cylinderGeometry3,black);
  pivot3b.rotation.x += Math.PI/2;
  pivot3b.position.set(.08,1.5,0.16);
  threePhasePanel.add(pivot3b);

  let pivot4b = new Three.Mesh(cylinderGeometry3,black);
  pivot4b.rotation.x += Math.PI/2;
  pivot4b.position.set(.08,.95,0.16);
  threePhasePanel.add(pivot4b);

  let cylinderGeometry5 = new Three.CylinderGeometry(0.018,0.018,0.1,16,16,true);
  let pivot11b = new Three.Mesh(cylinderGeometry5,grey);
  pivot11b.rotation.x += Math.PI/2;
  pivot11b.position.set(0.91,1.5,0.16);
  threePhasePanel.add(pivot11b);

  let pivot22b = new Three.Mesh(cylinderGeometry5,grey);
  pivot22b.rotation.x += Math.PI/2;
  pivot22b.position.set(0.91,.95,0.16);
  threePhasePanel.add(pivot22b);

  let pivot33b = new Three.Mesh(cylinderGeometry5,grey);
  pivot33b.rotation.x += Math.PI/2;
  pivot33b.position.set(.08,1.5,0.16);
  threePhasePanel.add(pivot33b);

  let pivot44b = new Three.Mesh(cylinderGeometry5,grey);
  pivot44b.rotation.x += Math.PI/2;
  pivot44b.position.set(.08,.95,0.16);
  threePhasePanel.add(pivot44b);


  return threePhasePanel;
}

function makeObjectMiddleLOD() {

  let threePhasePanel = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=0.79;
  let height=0.6;
  let radius=0.1;

  roundedRectShape.moveTo( x, y + radius );
  roundedRectShape.lineTo( x, y + height - radius );
  roundedRectShape.quadraticCurveTo( x, y + height, x + radius, y + height );
  roundedRectShape.lineTo( x + width - radius, y + height) ;
  roundedRectShape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  roundedRectShape.lineTo( x + width, y + radius );
  roundedRectShape.quadraticCurveTo( x + width, y, x + width - radius, y );
  roundedRectShape.lineTo( x + radius, y );
  roundedRectShape.quadraticCurveTo( x, y, x, y + radius );

  let extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let backSideGeometry = new Three.BoxGeometry(1,1.4,0.1);
  let backSide = new Three.Mesh( backSideGeometry, grey );
  backSide.position.set(0.5,1.5,0.05);
  threePhasePanel.add(backSide);

  let PanelGeometry = new Three.PlaneGeometry(0.5,0.5);
  let Panel = new Three.Mesh( PanelGeometry, new Three.MeshPhongMaterial({map:quadro, transparent:true} ) );
  Panel.position.set(0.5,1.85,0.31);
  threePhasePanel.add(Panel);

  let geometry0 = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let mesh0 = new Three.Mesh( geometry0, grey ) ;
  mesh0.position.set(0.1,1.55,0.1);
  threePhasePanel.add(mesh0);

  let geometry1 = new Three.BoxGeometry(0.86,.38,0.2);
  let mesh1 = new Three.Mesh( geometry1, grey );
  mesh1.position.set(0.495,1.85,0.2);
  threePhasePanel.add(mesh1);

  let geometry00 = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let mesh00 = new Three.Mesh( geometry00, grey ) ;
  mesh00.position.set(0.1,.85,0.1);
  mesh00.scale.set(1,1.2,.6);
  threePhasePanel.add(mesh00);

  let geometry11 = new Three.BoxGeometry(0.86,.51,0.1);
  let mesh11 = new Three.Mesh( geometry11, grey  );
  mesh11.position.set(0.495,1.225,0.15);
  threePhasePanel.add(mesh11);

  let geometry1b = new Three.BoxGeometry(0.3,.5,0.1);
  let mesh1b = new Three.Mesh( geometry1b, grey);
  mesh1b.position.set(0.68,1.2,0.25);
  threePhasePanel.add(mesh1b);

  let mesh1c = new Three.Mesh( geometry1b, grey );
  mesh1c.position.set(0.32,1.2,0.25);
  threePhasePanel.add(mesh1c);

  let geometry1d = new Three.BoxGeometry(0.35,.6,0.1);
  let mesh1d = new Three.Mesh( geometry1d, grey);
  mesh1d.position.set(0.68,1.2,0.2);
  threePhasePanel.add(mesh1d);

  let mesh1e = new Three.Mesh( geometry1d, grey );
  mesh1e.position.set(0.32,1.2,0.2);
  threePhasePanel.add(mesh1e);

  let geometry1f = new Three.BoxGeometry(.15,.15,.01);
  let mesh1f = new Three.Mesh( geometry1f,  red);
  mesh1f.position.set(0.32,1.1,0.3);
  threePhasePanel.add(mesh1f);

  let mesh1g = new Three.Mesh( geometry1f, blue );
  mesh1g.position.set(0.68,1.1,0.3);
  threePhasePanel.add(mesh1g);

  let stopperGeometry1 = new Three.CylinderGeometry(0.05,0.05,0.05,16,16);
  let stopper_p1 = new Three.Mesh(stopperGeometry1, red);
  stopper_p1.position.set(0.32,1.1,0.3);
  stopper_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(stopper_p1);

  let stopperGeometry2 = new Three.SphereGeometry(0.07,16,16);
  let stopper_p2 = new Three.Mesh(stopperGeometry2, red);
  stopper_p2.position.set(0.32,1.1,0.35);
  stopper_p2.rotation.x=Math.PI/2;
  stopper_p2.scale.set(1,.5,1);
  threePhasePanel.add(stopper_p2);

  let stopperGeometry3 = new Three.CylinderGeometry(0.01,0.01,0.065,16,16);
  let stopper_p3 = new Three.Mesh(stopperGeometry3, red);
  stopper_p3.position.set(0.32,1.15,0.32);
  stopper_p3.rotation.x=Math.PI/2;
  stopper_p3.rotation.z=Math.PI/2;
  threePhasePanel.add(stopper_p3);

  let stopper2_p1 = new Three.Mesh(stopperGeometry1,blue);
  stopper2_p1.position.set(0.68,1.1,0.3);
  stopper2_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(stopper2_p1);

  let stopper2_p2 = new Three.Mesh(stopperGeometry2,blue);
  stopper2_p2.position.set(0.68,1.1,0.35);
  stopper2_p2.rotation.x=Math.PI/2;
  stopper2_p2.scale.set(1,.5,1);
  threePhasePanel.add(stopper2_p2);

  let stopper2_p3 = new Three.Mesh(stopperGeometry3,blue);
  stopper2_p3.position.set(0.68,1.15,0.32);
  stopper2_p3.rotation.x=Math.PI/2;
  stopper2_p3.rotation.z=Math.PI/2;
  threePhasePanel.add(stopper2_p3);

  let handleGeometry = new Three.CylinderGeometry(0.05,0.05,0.025,16,16);
  let handle_p1 = new Three.Mesh(handleGeometry,grey);
  handle_p1.position.set(0.32,1.3,0.3);
  handle_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(handle_p1);

  let handle2_p1 = new Three.Mesh(handleGeometry,grey);
  handle2_p1.position.set(0.68,1.3,0.3);
  handle2_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(handle2_p1);

  let cylinderGeometry2 = new Three.CylinderGeometry(0.051,0.051,0.05,16,16,true);
  let handle_p2 = new Three.Mesh(cylinderGeometry2,black);
  handle_p2.position.set(0.32,1.3,0.31);
  handle_p2.rotation.x=Math.PI/2;
  threePhasePanel.add(handle_p2);

  let handle2_p2 = new Three.Mesh(cylinderGeometry2,black);
  handle2_p2.position.set(0.68,1.3,0.31);
  handle2_p2.rotation.x=Math.PI/2;
  threePhasePanel.add(handle2_p2);

  let geometry2 = new Three.BoxGeometry(0.1,0.02,0.02);
  let handle_p3 = new Three.Mesh( geometry2,black );
  handle_p3.position.set(0.32,1.3,0.32);
  threePhasePanel.add(handle_p3);

  let handle2_p3 = new Three.Mesh( geometry2, black );
  handle2_p3.position.set(0.68,1.3,0.32);
  threePhasePanel.add(handle2_p3);

  return threePhasePanel;
}

function makeObjectMinLOD() {

  let threePhasePanel = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=0.79;
  let height=0.6;
  let radius=0.1;

  roundedRectShape.moveTo( x, y + radius );
  roundedRectShape.lineTo( x, y + height - radius );
  roundedRectShape.quadraticCurveTo( x, y + height, x + radius, y + height );
  roundedRectShape.lineTo( x + width - radius, y + height) ;
  roundedRectShape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  roundedRectShape.lineTo( x + width, y + radius );
  roundedRectShape.quadraticCurveTo( x + width, y, x + width - radius, y );
  roundedRectShape.lineTo( x + radius, y );
  roundedRectShape.quadraticCurveTo( x, y, x, y + radius );

  let extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let backSideGeometry = new Three.BoxGeometry(1,1.4,0.1);
  let backSide = new Three.Mesh( backSideGeometry, grey );
  backSide.position.set(0.5,1.5,0.05);
  threePhasePanel.add(backSide);

  let geometry0 = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let mesh0 = new Three.Mesh( geometry0, grey ) ;
  mesh0.position.set(0.1,1.55,0.1);
  threePhasePanel.add(mesh0);

  let geometry1 = new Three.BoxGeometry(0.86,.38,0.2);
  let mesh1 = new Three.Mesh( geometry1, grey );
  mesh1.position.set(0.495,1.85,0.2);
  threePhasePanel.add(mesh1);

  let geometry00 = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let mesh00 = new Three.Mesh( geometry00, grey ) ;
  mesh00.position.set(0.1,.85,0.1);
  mesh00.scale.set(1,1.2,.6);
  threePhasePanel.add(mesh00);

  let geometry11 = new Three.BoxGeometry(0.86,.51,0.1);
  let mesh11 = new Three.Mesh( geometry11, grey  );
  mesh11.position.set(0.495,1.225,0.15);
  threePhasePanel.add(mesh11);

  let geometry1b = new Three.BoxGeometry(0.3,.5,0.1);
  let mesh1b = new Three.Mesh( geometry1b, grey);
  mesh1b.position.set(0.68,1.2,0.25);
  threePhasePanel.add(mesh1b);

  let mesh1c = new Three.Mesh( geometry1b, grey );
  mesh1c.position.set(0.32,1.2,0.25);
  threePhasePanel.add(mesh1c);

  let geometry1d = new Three.BoxGeometry(0.35,.6,0.1);
  let mesh1d = new Three.Mesh( geometry1d, grey);
  mesh1d.position.set(0.68,1.2,0.2);
  threePhasePanel.add(mesh1d);

  let mesh1e = new Three.Mesh( geometry1d, grey );
  mesh1e.position.set(0.32,1.2,0.2);
  threePhasePanel.add(mesh1e);

  let geometry1f = new Three.BoxGeometry(.15,.15,.01);
  let mesh1f = new Three.Mesh( geometry1f,  red);
  mesh1f.position.set(0.32,1.1,0.3);
  threePhasePanel.add(mesh1f);

  let mesh1g = new Three.Mesh( geometry1f, blue );
  mesh1g.position.set(0.68,1.1,0.3);
  threePhasePanel.add(mesh1g);

  let handleGeometry = new Three.CylinderGeometry(0.05,0.05,0.025,8,8);
  let handle_p1 = new Three.Mesh(handleGeometry,grey);
  handle_p1.position.set(0.32,1.3,0.3);
  handle_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(handle_p1);

  let handle2_p1 = new Three.Mesh(handleGeometry,grey);
  handle2_p1.position.set(0.68,1.3,0.3);
  handle2_p1.rotation.x=Math.PI/2;
  threePhasePanel.add(handle2_p1);

  let cylinderGeometry2 = new Three.CylinderGeometry(0.051,0.051,0.05,8,8,true);
  let handle_p2 = new Three.Mesh(cylinderGeometry2,black);
  handle_p2.position.set(0.32,1.3,0.31);
  handle_p2.rotation.x=Math.PI/2;
  threePhasePanel.add(handle_p2);

  let handle2_p2 = new Three.Mesh(cylinderGeometry2,black);
  handle2_p2.position.set(0.68,1.3,0.31);
  handle2_p2.rotation.x=Math.PI/2;
  threePhasePanel.add(handle2_p2);

  let geometry2 = new Three.BoxGeometry(0.1,0.02,0.02);
  let handle_p3 = new Three.Mesh( geometry2,black );
  handle_p3.position.set(0.32,1.3,0.32);
  threePhasePanel.add(handle_p3);

  let handle2_p3 = new Three.Mesh( geometry2, black );
  handle2_p3.position.set(0.68,1.3,0.32);
  threePhasePanel.add(handle2_p3);

  return threePhasePanel;
}

export default {
  name: "three- phase panel",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "three-phase panel",
    description: "electric panel",
    image: require('./threePhasePanel.png')
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

    let newWidth = WIDTH;
    let newDepth = DEPTH;
    let angle = element.rotation + 90;
    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
        <rect key="1" x="0" y="0" width={newWidth} height={newDepth}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ff0000"}}/>
        <text key="2" x="0" y="0"
              transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newWidth = WIDTH;
    let newDepth = DEPTH;
    let newHeight = HEIGHT;
    let newAltitude = element.properties.get('altitude').get('length');


    /**************** LOD max ***********************/

    let threePhasePanelMaxLOD=new Three.Object3D();
    threePhasePanelMaxLOD.add(objectMaxLOD.clone());

    let value = new Three.Box3().setFromObject(threePhasePanelMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    threePhasePanelMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);
    threePhasePanelMaxLOD.position.y+= -newHeight/2 + newAltitude;
    threePhasePanelMaxLOD.position.x+= -newWidth/2;
    threePhasePanelMaxLOD.position.z+= -newDepth/2;

    /**************** LOD middle ***********************/

    let threePhasePanelMiddleLOD=new Three.Object3D();
    threePhasePanelMiddleLOD.add(objectMiddleLOD.clone());

    threePhasePanelMiddleLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);
    threePhasePanelMiddleLOD.position.y+= -newHeight/2 + newAltitude;
    threePhasePanelMiddleLOD.position.x+= -newWidth/2;
    threePhasePanelMiddleLOD.position.z+= -newDepth/2;


    /**************** LOD min ***********************/

    let threePhasePanelMinLOD=new Three.Object3D();
    threePhasePanelMinLOD.add(objectMinLOD.clone());

    threePhasePanelMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);
    threePhasePanelMinLOD.position.y+= -newHeight/2 + newAltitude;
    threePhasePanelMinLOD.position.x+= -newWidth/2;
    threePhasePanelMinLOD.position.z+= -newDepth/2;

    /*** add all Level of Detail ***/

    let lod = new Three.LOD();

    lod.addLevel(threePhasePanelMaxLOD, 100);
    lod.addLevel(threePhasePanelMiddleLOD, 300);
    lod.addLevel(threePhasePanelMinLOD, 700);
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


