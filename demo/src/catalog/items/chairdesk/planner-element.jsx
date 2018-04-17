import * as Three from 'three';
import React from 'react';

const WIDTH = 70;
const DEPTH = 70;
const HEIGHT = 100;

const grey      = new Three.MeshBasicMaterial({color : 0xD3D3D3});
const metalGrey = new Three.MeshBasicMaterial({color : 0x808080});
const white     = new Three.MeshBasicMaterial({color : 0x000000});
const black     = new Three.MeshBasicMaterial({color : 0x000000});


function makeBackrest(){

  let backrest = new Three.Object3D();
  let backrestGeometry1 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.18 , 32, 32 );
  let backrestGeometry2 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.04 , 32, 32 );
  let NodeGeometry = new Three.SphereGeometry( 0.01 , 32 , 32 );
  let backrest1 = new Three.Mesh( backrestGeometry1 , black );
  let backrest2 = new Three.Mesh( backrestGeometry2 , black );
  let backrest3 = new Three.Mesh( backrestGeometry1 , black );
  let backrest4 = new Three.Mesh( backrestGeometry2 , black );
  let node1 = new Three.Mesh( NodeGeometry , black );
  let node2 = new Three.Mesh( NodeGeometry , black );
  let backrestPillow = makeBackrestPillow();
  backrest1.rotation.z = Math.PI*(90 +6)/180;
  backrest1.position.z = 0.05;
  backrest1.position.x = 0.09;
  backrest2.rotation.z = -Math.PI*96/180;
  backrest2.position.x = 0.02*Math.cos(Math.PI*6/180);
  backrest3.rotation.z = Math.PI*(90 +6)/180;
  backrest3.position.z =-0.05;
  backrest3.position.x = 0.09;
  backrest4.rotation.z =-Math.PI*96/180;
  backrest4.position.x = 0.02*Math.cos(Math.PI*6/180);
  node1.position.y = 0.09;
  node2.position.y = 0.09;
  node1.add(backrest2);
  node2.add(backrest4);
  backrestPillow.rotation.y = Math.PI/2;
  backrestPillow.position.y = 0.25 +0.02;
  backrest1.add(node1);
  backrest.add(backrest1);
  backrest3.add(node2);
  backrest.add(backrest3);
  backrest.add(backrestPillow);

  return backrest;
}

function makeBackrestMinLOD(){

  let backrest = new Three.Object3D();
  let backrestGeometry1 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.18 , 8, 8 );
  let backrestGeometry2 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.04 , 8, 8 );
  let NodeGeometry = new Three.SphereGeometry( 0.01 , 32 , 32 );
  let backrest1 = new Three.Mesh( backrestGeometry1 , black );
  let backrest2 = new Three.Mesh( backrestGeometry2 , black );
  let backrest3 = new Three.Mesh( backrestGeometry1 , black );
  let backrest4 = new Three.Mesh( backrestGeometry2 , black );
  let node1 = new Three.Mesh( NodeGeometry , black );
  let node2 = new Three.Mesh( NodeGeometry , black );
  let backrestPillow = makeBackrestPillowMinLOD();
  backrest1.rotation.z = Math.PI*(90 +6)/180;
  backrest1.position.z = 0.05;
  backrest1.position.x = 0.09;
  backrest2.rotation.z = -Math.PI*96/180;
  backrest2.position.x = 0.02*Math.cos(Math.PI*6/180);
  backrest3.rotation.z = Math.PI*(90 +6)/180;
  backrest3.position.z =-0.05;
  backrest3.position.x = 0.09;
  backrest4.rotation.z =-Math.PI*96/180;
  backrest4.position.x = 0.02*Math.cos(Math.PI*6/180);
  node1.position.y = 0.09;
  node2.position.y = 0.09;
  node1.add(backrest2);
  node2.add(backrest4);
  backrestPillow.rotation.y = Math.PI/2;
  backrestPillow.position.y = 0.25 +0.02;
  backrest1.add(node1);
  backrest.add(backrest1);
  backrest3.add(node2);
  backrest.add(backrest3);
  backrest.add(backrestPillow);

  return backrest;
}


function makeWheel(){

  let ArmrestGeometry = new Three.CylinderGeometry( 0.027 , 0.02 , 0.3 , 32, 32 );
  let SupportGeometry = new Three.CylinderGeometry( 0.02 , 0.01 , 0.02 , 32, 32 );
  let PivotGeometry = new Three.CylinderGeometry( 0.008 , 0.008 , 0.01 , 32, 32 );
  let SupportGeometryStart = new Three.SphereGeometry( 0.02 , 32 , 32 );
  let WheelGeometry = new Three.CylinderGeometry( 0.025 , 0.025 , 0.05 , 32, 32 );
  let InsideWheelGeometry = new Three.CylinderGeometry( 0.02 , 0.02 , 0.051 , 32, 32 );
  let WheelCoverGeometry = new Three.CylinderGeometry( 0.026 , 0.026 , 0.045 , 32, 32 );
  let armrest = new Three.Mesh( ArmrestGeometry , metalGrey );
  let support = new Three.Mesh( SupportGeometry , metalGrey );
  let pivot = new Three.Mesh( PivotGeometry , grey );
  let SupportStart = new Three.Mesh( SupportGeometryStart , metalGrey );
  let Wheel = new Three.Mesh( WheelGeometry , black );
  let WheelCover = new Three.Mesh( WheelCoverGeometry , metalGrey );
  let InsideWheel = new Three.Mesh( InsideWheelGeometry , metalGrey );
  let Armrest1 = new Three.Object3D();
  let Armrest2 = new Three.Object3D();
  armrest.rotation.z = Math.PI*80/180;
  armrest.position.x = 0.01 + 0.15;
  Armrest1.rotation.z =-Math.PI*80/180;
  Armrest1.position.y =-Math.sin(Math.PI*80/180)*0.15;
  support.position.y =-0.01;
  pivot.position.y =-0.01 - 0.005;
  Wheel.rotation.x = Math.PI/2;
  Wheel.position.y =-0.005 -0.02;
  WheelCover.position.z =-0.003;
  Wheel.add(InsideWheel);
  Wheel.add(WheelCover);
  pivot.add(Wheel);
  support.add(pivot);
  Armrest1.add(support);
  Armrest1.add(SupportStart);
  armrest.add(Armrest1);
  Armrest2.add(armrest);
  return Armrest2;
}

function makeWheelMinLOD(){

  let ArmrestGeometry = new Three.CylinderGeometry( 0.027 , 0.02 , 0.3 , 8, 8 );
  let SupportGeometry = new Three.CylinderGeometry( 0.02 , 0.01 , 0.02 , 8, 8 );
  let PivotGeometry = new Three.CylinderGeometry( 0.008 , 0.008 , 0.01 , 8, 8 );
  let SupportGeometryStart = new Three.SphereGeometry( 0.02 , 8 , 8 );
  let WheelGeometry = new Three.CylinderGeometry( 0.025 , 0.025 , 0.05 , 8, 8 );
  let InsideWheelGeometry = new Three.CylinderGeometry( 0.02 , 0.02 , 0.051 , 8, 8 );
  let armrest = new Three.Mesh( ArmrestGeometry , metalGrey );
  let support = new Three.Mesh( SupportGeometry , metalGrey );
  let pivot = new Three.Mesh( PivotGeometry , grey );
  let SupportStart = new Three.Mesh( SupportGeometryStart , metalGrey );
  let Wheel = new Three.Mesh( WheelGeometry , black );
  let InsideWheel = new Three.Mesh( InsideWheelGeometry , metalGrey );
  let Armrest1 = new Three.Object3D();
  let Armrest2 = new Three.Object3D();
  armrest.rotation.z = Math.PI*80/180;
  armrest.position.x = 0.01 + 0.15;
  Armrest1.rotation.z =-Math.PI*80/180;
  Armrest1.position.y =-Math.sin(Math.PI*80/180)*0.15;
  support.position.y =-0.01;
  pivot.position.y =-0.01 - 0.005;
  Wheel.rotation.x = Math.PI/2;
  Wheel.position.y =-0.005 -0.02;
  Wheel.add(InsideWheel);
  pivot.add(Wheel);
  support.add(pivot);
  Armrest1.add(support);
  Armrest1.add(SupportStart);
  armrest.add(Armrest1);
  Armrest2.add(armrest);
  return Armrest2;
}

function makeBackrestPillow(){

  let pillow = new Three.Object3D();
  let CenterGeometry = new Three.BoxGeometry( 0.3 , 0.5 , 0.04 );
  let ShortEdgeGeometry = new Three.CylinderGeometry( 0.02 , 0.02 , 0.3 , 32, 32 );
  let LongEdgeGeometry = new Three.CylinderGeometry( 0.02 , 0.02 , 0.5 , 32, 32 );
  let AngleGeometry = new Three.SphereGeometry( 0.02 , 32 , 32 );
  let edgeShort1 = new Three.Mesh( ShortEdgeGeometry , white );
  let edgeShort2 = new Three.Mesh( ShortEdgeGeometry , white );
  let edgeLong1 = new Three.Mesh( LongEdgeGeometry , white );
  let edgeLong2 = new Three.Mesh( LongEdgeGeometry , white );
  let angle1c = new Three.Mesh( AngleGeometry , white);
  let angle2c = new Three.Mesh( AngleGeometry , white);
  let angle1l = new Three.Mesh( AngleGeometry , white);
  let angle2l = new Three.Mesh( AngleGeometry , white);
  let center = new Three.Mesh( CenterGeometry , white );
  edgeShort1.rotation.z = Math.PI/2;
  edgeShort1.position.y = 0.25;
  angle1c.position.y = 0.15;
  edgeShort2.rotation.z = Math.PI/2;
  edgeShort2.position.y =-0.25;
  angle2c.position.y =-0.15;
  edgeLong1.position.x = 0.15;
  angle1l.position.y = 0.25;
  edgeLong2.position.x =-0.15;
  angle2l.position.y =-0.25;
  edgeLong2.add(angle2l);
  pillow.add(edgeLong2);
  edgeLong1.add(angle1l);
  pillow.add(edgeLong1);
  edgeShort2.add(angle2c);
  pillow.add(edgeShort2);
  edgeShort1.add(angle1c);
  pillow.add(edgeShort1);
  pillow.add(center);
  return pillow;
}

function makeBackrestPillowMinLOD(){

  let pillow = new Three.Object3D();
  let CenterGeometry = new Three.BoxGeometry( 0.3 , 0.5 , 0.04 );
  let ShortEdgeGeometry = new Three.CylinderGeometry( 0.02 , 0.02 , 0.3 , 8, 8 );
  let LongEdgeGeometry = new Three.CylinderGeometry( 0.02 , 0.02 , 0.5 ,  8, 8 );
  let AngleGeometry = new Three.SphereGeometry( 0.02 , 32 , 32 );
  let edgeShort1 = new Three.Mesh( ShortEdgeGeometry , white );
  let edgeShort2 = new Three.Mesh( ShortEdgeGeometry , white );
  let edgeLong1 = new Three.Mesh( LongEdgeGeometry , white );
  let edgeLong2 = new Three.Mesh( LongEdgeGeometry , white );
  let angle1c = new Three.Mesh( AngleGeometry , white);
  let angle2c = new Three.Mesh( AngleGeometry , white);
  let angle1l = new Three.Mesh( AngleGeometry , white);
  let angle2l = new Three.Mesh( AngleGeometry , white);
  let center = new Three.Mesh( CenterGeometry , white );
  edgeShort1.rotation.z = Math.PI/2;
  edgeShort1.position.y = 0.25;
  angle1c.position.y = 0.15;
  edgeShort2.rotation.z = Math.PI/2;
  edgeShort2.position.y =-0.25;
  angle2c.position.y =-0.15;
  edgeLong1.position.x = 0.15;
  angle1l.position.y = 0.25;
  edgeLong2.position.x =-0.15;
  angle2l.position.y =-0.25;
  edgeLong2.add(angle2l);
  pillow.add(edgeLong2);
  edgeLong1.add(angle1l);
  pillow.add(edgeLong1);
  edgeShort2.add(angle2c);
  pillow.add(edgeShort2);
  edgeShort1.add(angle1c);
  pillow.add(edgeShort1);
  pillow.add(center);
  return pillow;
}

function makeBody() {

  let body = new Three.Object3D();
  let SupportPillowGeometry1 = new Three.BoxGeometry( 0.28 , 0.06 , 0.07 );
  let SupportPillowGeometry2 = new Three.BoxGeometry( 0.3 , 0.04 , 0.09 );
  let ShortHandleGeometry = new Three.CylinderGeometry( 0.0045 , 0.0045 , 0.07 , 32, 32 );
  let LongHandleGeometry = new Three.CylinderGeometry( 0.0045 , 0.0045 , 0.09 , 32, 32 );
  let HandleGeometry = new Three.CylinderGeometry( 0.007 , 0.005 , 0.06 , 32 );
  let ArmrestSupportGeometry = new Three.CylinderGeometry( 0.01 , 0.01 , 0.2 , 32, 32 );
  let SupportPillow1 = new Three.Mesh( SupportPillowGeometry1 , metalGrey );
  let SupportPillow2 = new Three.Mesh( SupportPillowGeometry2 , metalGrey );
  let LongHandle = new Three.Mesh( LongHandleGeometry , white );
  let ShortHandle = new Three.Mesh( ShortHandleGeometry , white );
  let Handle1 = new Three.Mesh( HandleGeometry , black );
  let Handle2 = new Three.Mesh( HandleGeometry , black );
  let ArmrestBase1 = new Three.Mesh( ArmrestSupportGeometry , metalGrey );
  let ArmrestBase2 = new Three.Mesh( ArmrestSupportGeometry , metalGrey );
  let Pillow = makePillow();
  let armrest1 = makeArmrest();
  let armrest2 = makeArmrest();
  SupportPillow1.position.y = 0.03;
  SupportPillow2.rotation.z = Math.PI*6/180;
  SupportPillow2.position.y = 0.06 ;
  LongHandle.rotation.x = Math.PI*80/180;
  LongHandle.position.z = 0.035 + 0.045;
  LongHandle.position.x = 0.1;
  ShortHandle.rotation.x =-Math.PI*80/180;
  ShortHandle.position.z =-0.035 - 0.035;
  ShortHandle.position.x = 0.08;
  Handle2.position.y = 0.035 + 0.03;
  Handle1.position.y  = 0.045 + 0.03;
  Pillow.position.y = 0.02 + 0.02;
  ArmrestBase1.rotation.x = Math.PI/2;
  ArmrestBase1.rotation.y = -Math.PI*6/180;
  ArmrestBase2.rotation.x = Math.PI/2;
  ArmrestBase2.rotation.y = -Math.PI*6/180;
  ArmrestBase1.position.z = 0.045 + 0.1;
  ArmrestBase2.position.z =-0.045 - 0.1;
  armrest1.position.y = 0.1;
  armrest2.position.y = -0.1;
  SupportPillow2.add(Pillow);
  ArmrestBase1.add(armrest1);
  ArmrestBase2.add(armrest2);
  SupportPillow2.add(ArmrestBase1);
  SupportPillow2.add(ArmrestBase2);
  LongHandle.add(Handle1);
  ShortHandle.add(Handle2);
  SupportPillow1.add(LongHandle);
  SupportPillow1.add(ShortHandle);
  body.add(SupportPillow2);
  body.add(SupportPillow1);
  return body;
}

function makeBodyMinLOD() {

  let body = new Three.Object3D();
  let SupportPillowGeometry1 = new Three.BoxGeometry( 0.28 , 0.06 , 0.07 );
  let SupportPillowGeometry2 = new Three.BoxGeometry( 0.3 , 0.04 , 0.09 );
  let ArmrestSupportGeometry = new Three.CylinderGeometry( 0.01 , 0.01 , 0.2 , 8, 8 );
  let SupportPillow1 = new Three.Mesh( SupportPillowGeometry1 , metalGrey );
  let SupportPillow2 = new Three.Mesh( SupportPillowGeometry2 , metalGrey );
  let ArmrestBase1 = new Three.Mesh( ArmrestSupportGeometry , metalGrey );
  let ArmrestBase2 = new Three.Mesh( ArmrestSupportGeometry , metalGrey );
  let Pillow = makePillow();
  let armrest1 = makeArmrestMinLOD();
  let armrest2 = makeArmrestMinLOD();
  SupportPillow1.position.y = 0.03;
  SupportPillow2.rotation.z = Math.PI*6/180;
  SupportPillow2.position.y = 0.06 ;
  Pillow.position.y = 0.02 + 0.02;
  ArmrestBase1.rotation.x = Math.PI/2;
  ArmrestBase1.rotation.y = -Math.PI*6/180;
  ArmrestBase2.rotation.x = Math.PI/2;
  ArmrestBase2.rotation.y = -Math.PI*6/180;
  ArmrestBase1.position.z = 0.045 + 0.1;
  ArmrestBase2.position.z =-0.045 - 0.1;
  armrest1.position.y = 0.1;
  armrest2.position.y = -0.1;
  SupportPillow2.add(Pillow);
  ArmrestBase1.add(armrest1);
  ArmrestBase2.add(armrest2);
  SupportPillow2.add(ArmrestBase1);
  SupportPillow2.add(ArmrestBase2);
  body.add(SupportPillow2);
  body.add(SupportPillow1);
  return body;
}

function makeArmrest(){

  let armrest = new Three.Object3D();
  let NodeGeometry = new Three.SphereGeometry( 0.01 , 32 , 32 );
  let GeometryP1 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.24 , 32, 32 );
  let GeometryP2 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.04 , 32, 32 );
  let GeometryP3 = new Three.CylinderGeometry( 0.02 , 0.025 , 0.2 , 32, 32 );
  let node1 = new Three.Mesh( NodeGeometry , metalGrey );
  let node2 = new Three.Mesh( NodeGeometry , metalGrey );
  let P1 = new Three.Mesh( GeometryP1 , metalGrey );
  let P2 = new Three.Mesh( GeometryP2 , metalGrey );
  let P3 = new Three.Mesh( GeometryP3 , white );
  P1.rotation.x = Math.PI/2;
  P1.rotation.z = -Math.PI*25/180;
  P1.position.set(  0.12*Math.sin(P1.rotation.z) , 0 , -0.12*Math.cos(P1.rotation.z) );
  P2.rotation.z = Math.PI*100/180;
  P2.position.x = 0.02;
  P2.position.y = 0.0035;
  node2.position.y =-0.12;
  P3.position.y =-0.1 -0.02;
  P2.add(P3);
  node2.add(P2);
  P1.add(node2);
  node1.add(P1);
  armrest.add(node1);
  return armrest;
}

function makeArmrestMinLOD(){

  let armrest = new Three.Object3D();
  let NodeGeometry = new Three.SphereGeometry( 0.01 , 8 , 8 );
  let GeometryP1 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.24 , 8, 8 );
  let GeometryP2 = new Three.CylinderGeometry( 0.01 , 0.01 , 0.04 , 8, 8 );
  let GeometryP3 = new Three.CylinderGeometry( 0.02 , 0.025 , 0.2 , 8, 8 );
  let node1 = new Three.Mesh( NodeGeometry , metalGrey );
  let node2 = new Three.Mesh( NodeGeometry , metalGrey );
  let P1 = new Three.Mesh( GeometryP1 , metalGrey );
  let P2 = new Three.Mesh( GeometryP2 , metalGrey );
  let P3 = new Three.Mesh( GeometryP3 , white );
  P1.rotation.x = Math.PI/2;
  P1.rotation.z = -Math.PI*25/180;
  P1.position.set(  0.12*Math.sin(P1.rotation.z) , 0 , -0.12*Math.cos(P1.rotation.z) );
  P2.rotation.z = Math.PI*100/180;
  P2.position.x = 0.02;
  P2.position.y = 0.0035;
  node2.position.y =-0.12;
  P3.position.y =-0.1 -0.02;
  P2.add(P3);
  node2.add(P2);
  P1.add(node2);
  node1.add(P1);
  armrest.add(node1);
  return armrest;
}

function makePillow() {

  let pillow = new  Three.Object3D();
  let CenterGeometry = new Three.BoxGeometry( 0.4 , 0.04 , 0.4 );
  let CenterPillow = new Three.Mesh( CenterGeometry , white );
  let edge1 = makeEdge();
  let edge2 = makeEdge();
  let edge3 = makeEdge();
  let edge4 = makeEdge();
  edge1.rotation.x = Math.PI/2;
  edge1.position.x = 0.2;
  edge2.rotation.x =-Math.PI/2;
  edge2.position.x =-0.2;
  edge3.rotation.z =-Math.PI/2;
  edge3.position.z =-0.2;
  edge4.rotation.z = Math.PI/2;
  edge4.position.z = 0.2;
  CenterPillow.add(edge1);
  CenterPillow.add(edge2);
  CenterPillow.add(edge3);
  CenterPillow.add(edge4);
  pillow.add(CenterPillow);
  return pillow;
}

function makeEdge(){
  let EdgeGeometry = new Three.CylinderGeometry( 0.02 , 0.02 , 0.4 , 32 , 32, true );
  let AngleGeometry = new Three.SphereGeometry( 0.02 , 32 , 32 );
  let angle = new Three.Mesh( AngleGeometry , white );
  let edge = new  Three.Mesh( EdgeGeometry , white );
  edge.openEnded = 1;
  angle.position.y = 0.2;
  edge.add(angle);
  return edge;
}

function makeBase(){

  let base = new Three.Object3D();
  let CylinderGeometry1 = new Three.CylinderGeometry( 0.027 , 0.027 , 0.05 , 32, 32 );
  let CylinderGeometry2 = new Three.CylinderGeometry( 0.03 , 0.03 , 0.2 , 32, 32 );
  let CylinderGeometry3 = new Three.CylinderGeometry( 0.04 , 0.04 , 0.06 , 32, 32 );
  let CylinderCoverGeometryCylinder2 = new Three.TorusGeometry( 0.04 , 0.025 , 32 , 100 );
  let CylinderGeometry4 = new Three.CylinderGeometry( 0.02 , 0.02 , 0.14 , 32, 32 );
  let Cylinder1 = new Three.Mesh( CylinderGeometry1 , metalGrey );
  let Cylinder2 = new Three.Mesh( CylinderGeometry2 , metalGrey );
  let CoverCylinder1 = new Three.Mesh( CylinderGeometry3 , metalGrey );
  let CoverCylinder2 = new Three.Mesh( CylinderCoverGeometryCylinder2 , metalGrey );
  let Cylinder3 = new Three.Mesh( CylinderGeometry4 , metalGrey );
  let Wheel = makeWheels();
  Cylinder1.position.y =-0.1 - 0.025;
  Cylinder3.position.y = 0.1 + 0.07;
  Wheel.position.y =-0.07;
  CoverCylinder1.position.y =-0.05;
  CoverCylinder2.rotation.x = Math.PI/2;
  CoverCylinder2.position.y =-0.05;
  Cylinder2.add(CoverCylinder1);
  Cylinder2.add(CoverCylinder2);
  Cylinder2.add(Wheel);
  Cylinder2.add(Cylinder1);
  Cylinder2.add(Cylinder3);
  base.add(Cylinder2);
  return base;
}

function makeBaseMinLOD(){

  let base = new Three.Object3D();
  let CylinderGeometry1 = new Three.CylinderGeometry( 0.027 , 0.027 , 0.05 , 8, 8 );
  let CylinderGeometry2 = new Three.CylinderGeometry( 0.03 , 0.03 , 0.2 , 8, 8 );
  let CylinderGeometry3 = new Three.CylinderGeometry( 0.04 , 0.04 , 0.06 , 8, 8 );
  let CylinderCoverGeometryCylinder2 = new Three.TorusGeometry( 0.04 , 0.025 , 8 , 100 );
  let CylinderGeometry4 = new Three.CylinderGeometry( 0.02 , 0.02 , 0.14 , 8, 8 );
  let Cylinder1 = new Three.Mesh( CylinderGeometry1 , metalGrey );
  let Cylinder2 = new Three.Mesh( CylinderGeometry2 , metalGrey );
  let CoverCylinder1 = new Three.Mesh( CylinderGeometry3 , metalGrey );
  let CoverCylinder2 = new Three.Mesh( CylinderCoverGeometryCylinder2 , metalGrey );
  let Cylinder3 = new Three.Mesh( CylinderGeometry4 , metalGrey );
  let Wheel = makeWheelsMinLOD();
  Cylinder1.position.y =-0.1 - 0.025;
  Cylinder3.position.y = 0.1 + 0.07;
  Wheel.position.y =-0.07;
  CoverCylinder1.position.y =-0.05;
  CoverCylinder2.rotation.x = Math.PI/2;
  CoverCylinder2.position.y =-0.05;
  Cylinder2.add(CoverCylinder1);
  Cylinder2.add(CoverCylinder2);
  Cylinder2.add(Wheel);
  Cylinder2.add(Cylinder1);
  Cylinder2.add(Cylinder3);
  base.add(Cylinder2);
  return base;
}

function makeWheels(){
  let wheels = new Three.Object3D();
  for (let i = 0; i < 5; i++) {
    let wheel = makeWheel();
    wheel.rotation.y = 2*Math.PI*i*72/360;
    wheels.add(wheel);
  }
  return wheels;
}

function makeWheelsMinLOD(){
  let wheels = new Three.Object3D();
  for (let i = 0; i < 5; i++) {
    let wheel = makeWheelMinLOD();
    wheel.rotation.y = 2*Math.PI*i*72/360;
    wheels.add(wheel);
  }
  return wheels;
}

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let chairDesk = new Three.Mesh();
  let baseChair = makeBase();
  let bodyChair = makeBody();
  let backrestChair = makeBackrest();
  baseChair.position.y = 0.1 +0.07;
  bodyChair.position.y = 0.1 +0.14;
  backrestChair.position.y = 0.06;
  backrestChair.position.x =-0.25;
  bodyChair.add(backrestChair);
  baseChair.add(bodyChair);
  chairDesk.add(baseChair);
  chairDesk.rotation.y= -0.5*Math.PI;
  chairDesk.position.z-= 0.02;

  return chairDesk
}

function makeObjectMinLOD() {

  let chairDesk = new Three.Mesh();
  let baseChair = makeBaseMinLOD();
  let bodyChair = makeBodyMinLOD();
  let backrestChair = makeBackrestMinLOD();
  baseChair.position.y = 0.1 +0.07;
  bodyChair.position.y = 0.1 +0.14;
  backrestChair.position.y = 0.06;
  backrestChair.position.x =-0.25;
  bodyChair.add(backrestChair);
  baseChair.add(bodyChair);
  chairDesk.add(baseChair);
  chairDesk.rotation.y= -0.5*Math.PI;
  chairDesk.position.z-= 0.02;

  return chairDesk
}

export default {
  name: "chairdesk",
  prototype: "items",

  info: {
    tag: ['furnishings', 'wood'],
    title: "chairdesk",
    description: "office chair",
    image: require('./chairdesk.png')
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
      <g transform={ `translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
        <text key="2" x="0" y="0"
              transform={ `translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
              style={ {textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>

    );

  },


  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    let chairDeskMaxLOD = new Three.Object3D();
    chairDeskMaxLOD.add(objectMaxLOD.clone());

    let aa = new Three.Box3().setFromObject(chairDeskMaxLOD);

    let deltaX = Math.abs(aa.max.x - aa.min.x);
    let deltaY = Math.abs(aa.max.y - aa.min.y);
    let deltaZ = Math.abs(aa.max.z - aa.min.z);

    chairDeskMaxLOD.position.y+= newAltitude;
    chairDeskMaxLOD.position.x+= -WIDTH/8;
    chairDeskMaxLOD.position.z+= DEPTH/4;
    chairDeskMaxLOD.scale.set( WIDTH / deltaX,DEPTH / deltaZ, HEIGHT / deltaY);

    let chairDeskMinLOD = new Three.Object3D();
    chairDeskMinLOD.add(objectMinLOD.clone());
    chairDeskMinLOD.position.y+= newAltitude;
    chairDeskMinLOD.position.x+= -WIDTH/8;
    chairDeskMinLOD.position.z+= DEPTH/4;
    chairDeskMinLOD.scale.set( WIDTH / deltaX,DEPTH / deltaZ, HEIGHT / deltaY);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(chairDeskMaxLOD, 200);
    lod.addLevel(chairDeskMinLOD, 900);
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
