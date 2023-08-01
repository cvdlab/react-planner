import React from 'react';
import * as Three from 'three';

const grey = new Three.MeshLambertMaterial({color: 0x3f3f3f});
const white = new Three.MeshLambertMaterial({color: 0xffffff, transparent:true, opacity:0.5});
const black = new Three.MeshLambertMaterial({color: 0x000000});

function makeDoor(handleSide) {

  let slidingDoor = new Three.Mesh();

  let doorShape = new Three.Shape();
  doorShape.moveTo( 1, 2 );
  doorShape.lineTo( 0, 2);
  doorShape.lineTo( 0, 0);
  doorShape.lineTo( 1, 0);

  let doorHole = new Three.Path();
  doorHole.moveTo(.65, 1.75 );
  doorHole.lineTo(.35, 1.75);
  doorHole.lineTo(.35, 1.25);
  doorHole.lineTo(.65, 1.25);
  doorShape.holes.push( doorHole );

  let extrudeSettings = {
    steps: 2,
    depth: 0.05,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let geometry = new Three.ExtrudeGeometry( doorShape, extrudeSettings );
  let door = new Three.Mesh( geometry, grey ) ;
  if(handleSide === 'right')
    door.position.set(-1,0,0);
  else
    door.position.set(0,0,0);
  slidingDoor.add(door);

  let doorGeometry = new Three.BoxGeometry(1,2,0.05);
  let door2 = new Three.Mesh(doorGeometry,grey);
  if (handleSide === 'right')
    door2.position.set(1.5,1,0.065);
  else
    door2.position.set(-.5,1,0.065);
  door.add(door2);

  let barGeometry = new Three.BoxGeometry(2,0.1,0.1);
  let doorBar = new Three.Mesh(barGeometry,grey);
  doorBar.position.set(-0,2.07,0.05);
  slidingDoor.add(doorBar);

  let glassGeometry = new Three.BoxGeometry(0.3,0.5,0.05);
  let glass = new Three.Mesh(glassGeometry,white);
  glass.position.set(0.5,1.5,0.025);
  door.add(glass);

  let HandleGeometry1 = new Three.CylinderGeometry(0.051,0.051,0.0625,80,80,true);
  black.side=Three.DoubleSide;
  let handle_p1 = new Three.Mesh(HandleGeometry1,black);
  handle_p1.position.set(0.2,1,0.025);
  handle_p1.rotation.x=Math.PI/2;
  door.add(handle_p1);

  let HandleGeometry2 = new Three.BoxGeometry(0.1,0.02,0.0625);
  let handle_p2 = new Three.Mesh( HandleGeometry2,black  );
  handle_p2.position.set(0.2,1,0.025);
  door.add(handle_p2);

  if (handleSide === 'left'){
    handle_p1.position.x=0.8;
    handle_p2.position.x=0.8;
  }

  return slidingDoor
}

export default {
  name: 'sliding door',
  prototype: 'holes',

  info: {
    tag: ['door'],
    title: 'sliding door',
    description: 'Sliding Door',
    image: require('./slidingDoor.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 200
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 215
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 30
      }
    },
    flip_horizontal: {
      label: 'Horizontal Flip',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    },
    flip_vertical: {
      label: 'Vertical Flip',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    },
  },

  render2D: function (element, layer, scene) {

    const STYLE_HOLE_BASE1 = {stroke: '#000', strokeWidth: '14px', fill: '#000'};
    const STYLE_HOLE_BASE2 = {stroke: '#000', strokeWidth: '16px', fill: '#000'};
    const STYLE_HOLE_SELECTED = {stroke: '#0096fd', strokeWidth: '14px', fill: '#0096fd', cursor: 'move'};
    const EPSILON = 3;

    let hFlip = element.properties.get('flip_horizontal');
    let vFlip = element.properties.get('flip_vertical');
    let length = element.properties.get('width').get('length');
    let holeStyle1 = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE1;
    let holeStyle2 = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE2;

    let scaleX, scaleY;
    let pX1, pX2;

    if(hFlip) {
      scaleX = 1;
      if (vFlip) {
        pX1 = 0;
        pX2 = length/2;
        scaleY = -1;
      }
      else {
        pX1 = length/2;
        pX2 = length;
        scaleY = -1;
      }
    }
    else {
      scaleX = 1;
      if (vFlip) {
        pX1 = 0;
        pX2 = length/2;
        scaleY = 1;
      }
      else {
        pX1 = length/2;
        pX2 = length;
        scaleY = 1;
      }

    }
      return (
        <g transform={`translate(${-length / 2}, 0)`}>
          <line x1='0' y1={0 - EPSILON} x2={length} y2={0 - EPSILON} style={holeStyle1} transform={`scale(${scaleX},${scaleY})`}/>
          <line x1={pX1} y1={5 - EPSILON} x2={pX2} y2={5 - EPSILON} style={holeStyle2} transform={`scale(${scaleX},${scaleY})`}/>
          <line x1={length} y1={0 - EPSILON} x2={length} y2={15 + EPSILON} style={holeStyle2} transform={`scale(${scaleX},${scaleY})`}/>
          <line x1='0' y1={0 - EPSILON} x2='0' y2={15 + EPSILON} style={holeStyle2} transform={`scale(${scaleX},${scaleY})`}/>
        </g>
      )
  },

  render3D: function (element, layer, scene) {

    let flip = element.properties.get('flip_horizontal');
    let handleSide = element.properties.get('flip_vertical');
    let width = element.properties.get('width').get('length');
    let height = element.properties.get('height').get('length');
    let thickness = element.properties.get('thickness').get('length');
    let newAltitude = element.properties.get('altitude').get('length');

    flip ? flip = 'yes' : flip = 'none';
    handleSide ? handleSide = 'right' : handleSide = 'left';

    let slidingDoor = new Three.Object3D();
    slidingDoor.add(makeDoor(handleSide).clone());

    let valuePosition = new Three.Box3().setFromObject(slidingDoor);

    let deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    let deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    let deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    if (element.selected) {
      let boundingBox = new Three.BoxHelper(slidingDoor, 0x99c3fb);
      boundingBox.material.linewidth = 5;
      boundingBox.renderOrder = 1000;
      boundingBox.material.depthTest = false;
      slidingDoor.add(boundingBox);
    }

    if(flip === 'yes')
      slidingDoor.rotation.y += Math.PI;

    slidingDoor.position.y+= newAltitude;
    slidingDoor.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

    return Promise.resolve(slidingDoor);
  }
};
