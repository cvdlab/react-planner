import * as Three from 'three';
import React from 'react';

const WIDTH=90;
const DEPTH=40;
const HEIGHT=30;

const grey = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );
grey.side = Three.DoubleSide;
const darkGrey = new Three.MeshLambertMaterial( {color: 0x808287} );
darkGrey.side = Three.DoubleSide;
const black = new Three.MeshLambertMaterial({color:0x000000});
black.side = Three.DoubleSide;

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();


function makeObjectMaxLOD() {

  let air_conditioner = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=.15;
  let height=.6;
  let radius=0.15;

  roundedRectShape.moveTo( x, y );
  roundedRectShape.lineTo( x + width, y);
  roundedRectShape.lineTo( x + width + radius, y + radius);
  roundedRectShape.quadraticCurveTo( x + width + radius, y + height, x + width/2, y + height );
  roundedRectShape.lineTo( x + width/2, y+height );
  roundedRectShape.lineTo( x, y + height) ;


  let extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let bodyGeometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let body = new Three.Mesh( bodyGeometry, grey );

  body.position.set(-.11,1.2,0);
  body.rotation.z+=Math.PI;
  air_conditioner.add(body);

  let j=1.18;

  for (let i = -.30; i > -.36; i-=.005) {

    let gridHorizontalGeometry = new Three.BoxGeometry(.001, .025, .705);
    let gridHorizontal = new Three.Mesh(gridHorizontalGeometry, darkGrey);
    gridHorizontal.position.set(i,j,.5);
    gridHorizontal.rotation.z+=Math.PI/4;
    air_conditioner.add(gridHorizontal);
    j-=.005
  }

  for (let k = .15; k < .87; k+=.05) {
    let gridVerticalGeometry = new Three.BoxGeometry(.079, .025, .005);
    let gridVertical = new Three.Mesh(gridVerticalGeometry, darkGrey);
    gridVertical.position.set(-.324,1.148,k);
    gridVertical.rotation.z+=Math.PI/4;
    air_conditioner.add(gridVertical);
  }


  let roundedRectShape2 = new Three.Shape();

  let x2=0;
  let y2=0;
  let width2=.2;
  let height2=.4;
  let radius2=0.15;

  roundedRectShape2.moveTo( x2, y2 );
  roundedRectShape2.lineTo( x2 + width2, y2);
  roundedRectShape2.quadraticCurveTo( x2 + width2 + radius2, y2 + height2, x2 + width2/2, y2 + height2 );
  roundedRectShape2.lineTo( x2 + width2/2, y2+height2 );
  roundedRectShape2.quadraticCurveTo( x2 + width2 + radius2, y2 + height2/4, x2 , y2 );


  let extrudeSettings2 = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let frontCoverGeometry = new Three.ExtrudeGeometry( roundedRectShape2, extrudeSettings2 );
  let frontCover = new Three.Mesh( frontCoverGeometry, grey) ;

  frontCover.position.set(-.2,1.1,0);
  frontCover.rotation.z+=Math.PI;
  air_conditioner.add(frontCover);

  let roundedRectShape3 = new Three.Shape();

  let x3=0;
  let y3=0;
  let width3=.1;
  let height3=.1;
  let radius3=0.15;

  roundedRectShape3.moveTo( x3, y3 );
  roundedRectShape3.quadraticCurveTo( x3 - width3/2 + radius3/2, y3 - height3, x3 + width3, y3);
  roundedRectShape3.lineTo( x3 + width3, y3);
  roundedRectShape3.quadraticCurveTo( x3 + width3/2 + radius3/2, y3 + 2 * height3, x3 + width3/2, y3 + height3 );
  roundedRectShape3.lineTo( x3 + width3/2, y3 + height3 );
  roundedRectShape3.quadraticCurveTo( x3 + width3/4, y3 + height3/6, x3 , y3 );

  let extrudeSettings3 = {
    steps: 2,
    depth: .1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let flapSupportGeometry = new Three.ExtrudeGeometry( roundedRectShape3, extrudeSettings3 );
  let flapLeft = new Three.Mesh( flapSupportGeometry, darkGrey ) ;

  flapLeft.position.set(-.27,.62,0.1);
  flapLeft.rotation.y+=Math.PI;
  flapLeft.rotation.z-=Math.PI/9;
  air_conditioner.add(flapLeft);

  let flapRight = new Three.Mesh( flapSupportGeometry, darkGrey ) ;

  flapRight.position.set(-.27,.62,1);
  flapRight.rotation.y+=Math.PI;
  flapRight.rotation.z-=Math.PI/9;
  air_conditioner.add(flapRight);

  let points2 = [];

  points2.push( new Three.Vector3(.5, 0));
  points2.push( new Three.Vector3(.5, 0));
  points2.push( new Three.Vector3(.5, .8));
  points2.push( new Three.Vector3(.5, .8));

  let flapGeometry = new Three.LatheGeometry( points2, 200, Math.PI/2, Math.PI/16 );
  let flap1 = new Three.Mesh( flapGeometry, darkGrey );

  flap1.position.set(-.4,.18,.9);
  flap1.rotation.z+=Math.PI/2;
  flap1.rotation.y+=-Math.PI/2;

  air_conditioner.add(flap1);

  let flap2 = new Three.Mesh( flapGeometry, darkGrey );

  flap2.position.set(-.4,.15,.9);
  flap2.rotation.z+=Math.PI/2;
  flap2.rotation.y+=-Math.PI/2;

  air_conditioner.add(flap2);

  return air_conditioner
}

function makeObjectMinLOD() {

  let air_conditioner = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=.15;
  let height=.6;
  let radius=0.15;

  roundedRectShape.moveTo( x, y );
  roundedRectShape.lineTo( x + width, y);
  roundedRectShape.lineTo( x + width + radius, y + radius);
  roundedRectShape.quadraticCurveTo( x + width + radius, y + height, x + width/2, y + height );
  roundedRectShape.lineTo( x + width/2, y+height );
  roundedRectShape.lineTo( x, y + height) ;


  let extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let bodyGeometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let body = new Three.Mesh( bodyGeometry, grey );

  body.position.set(-.11,1.2,0);
  body.rotation.z+=Math.PI;
  air_conditioner.add(body);

  let roundedRectShape2 = new Three.Shape();

  let x2=0;
  let y2=0;
  let width2=.2;
  let height2=.4;
  let radius2=0.15;

  roundedRectShape2.moveTo( x2, y2 );
  roundedRectShape2.lineTo( x2 + width2, y2);
  roundedRectShape2.quadraticCurveTo( x2 + width2 + radius2, y2 + height2, x2 + width2/2, y2 + height2 );
  roundedRectShape2.lineTo( x2 + width2/2, y2+height2 );
  roundedRectShape2.quadraticCurveTo( x2 + width2 + radius2, y2 + height2/4, x2 , y2 );

  let extrudeSettings2 = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let frontCoverGeometry = new Three.ExtrudeGeometry( roundedRectShape2, extrudeSettings2 );
  let frontCover = new Three.Mesh( frontCoverGeometry, grey) ;

  frontCover.position.set(-.2,1.1,0);
  frontCover.rotation.z+=Math.PI;
  air_conditioner.add(frontCover);

  return air_conditioner
}

export default {
  name: 'conditioner',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'metal'],
    title: 'air conditioner',
    description: 'air conditioner',
    image: require('./air_conditioner.png')
  },
  properties: {
    altitude: {
      label: 'quota',
      type: 'length-measure',
      defaultValue: {
        length: 220,
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
        <rect key='1' x='0' y='0' width={WIDTH} height={DEPTH}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce'}}/>
        <text key='2' x='0' y='0'
              transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: 'middle', fontSize: '11px'}}>
          {element.type}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /*************** lod max *******************/

    let air_conditionerMaxLOD = new Three.Object3D();
    air_conditionerMaxLOD.add(objectMaxLOD.clone());

    let value = new Three.Box3().setFromObject(air_conditionerMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    air_conditionerMaxLOD.position.x+= WIDTH/2.2;
    air_conditionerMaxLOD.position.z+= DEPTH/1.2;
    air_conditionerMaxLOD.position.y+= newAltitude;
    air_conditionerMaxLOD.rotation.y+= -Math.PI/2;
    air_conditionerMaxLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX/1.4);


    /*************** lod min *******************/

    let air_conditionerMinLOD = new Three.Object3D();
    air_conditionerMinLOD.add(objectMinLOD.clone());
    air_conditionerMinLOD.position.x+= WIDTH/2.2;
    air_conditionerMinLOD.position.z+= DEPTH/1.2;
    air_conditionerMinLOD.position.y+= newAltitude;
    air_conditionerMinLOD.rotation.y+= -Math.PI/2;
    air_conditionerMinLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX/1.4);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(air_conditionerMaxLOD, 200);
    lod.addLevel(air_conditionerMinLOD, 900);
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

