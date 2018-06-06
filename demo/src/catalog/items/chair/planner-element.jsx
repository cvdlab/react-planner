import * as Three from 'three';
import React from 'react';

const WIDTH = 55;
const DEPTH = 55;
const HEIGHT = 50;

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD(){

  let chair = new Three.Mesh();

  let LegGeometry = new Three.CylinderGeometry( 0.02, 0.02, 0.5, 32, 32 );
  let LegMaterial = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );

  let leg1 = new Three.Mesh( LegGeometry, LegMaterial );
  leg1.rotation.x += Math.PI/2;
  leg1.position.z += 0.5/2;

  let leg2 = new Three.Mesh( LegGeometry, LegMaterial );
  leg2.rotation.x += Math.PI/2;
  leg2.position.z += 0.5/2;
  leg2.position.y += 0.4;

  let leg3 = new Three.Mesh( LegGeometry, LegMaterial );
  leg3.rotation.x += Math.PI/2;
  leg3.position.z += 0.5/2;
  leg3.position.x += 0.4;

  let leg4 = new Three.Mesh( LegGeometry, LegMaterial );
  leg4.rotation.x += Math.PI/2;
  leg4.position.z += 0.5/2;
  leg4.position.y += 0.4;
  leg4.position.x += 0.4;

  let leg5 = new Three.Mesh( LegGeometry, LegMaterial );
  leg5.rotation.x += Math.PI/2;
  leg5.position.z += 0.5*3/2;

  let leg6 = new Three.Mesh( LegGeometry, LegMaterial );
  leg6.rotation.x += Math.PI/2;
  leg6.position.z += 0.5*3/2;
  leg6.position.x += 0.4;

  let WoodMaterial = new Three.MeshLambertMaterial( {color: 0x9b8c75} );

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=.5;
  let height=.48;
  let radius=0.05;

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
    depth: 0.03,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let PlaneGeometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let plane = new Three.Mesh( PlaneGeometry, WoodMaterial ) ;

  plane.position.x += -0.05;
  plane.position.y += -0.04;
  plane.position.z += 0.5;

  let roundedRectShape2 = new Three.Shape();

  let x1=0;
  let y1=0;
  let width1=.45;
  let height1=.25;
  let radius1=0.05;

  roundedRectShape2.moveTo( x1, y1 + radius1 );
  roundedRectShape2.lineTo( x1, y1 + height1 - radius1 );
  roundedRectShape2.quadraticCurveTo( x1, y1 + height1, x1 + radius1, y1 + height1 );
  roundedRectShape2.lineTo( x1 + width1 - radius1, y1 + height1) ;
  roundedRectShape2.quadraticCurveTo( x1 + width1, y1 + height1, x1 + width1, y1 + height1 - radius1 );
  roundedRectShape2.lineTo( x1 + width1, y1 + radius1 );
  roundedRectShape2.quadraticCurveTo( x1 + width1, y1, x1 + width1 - radius1, y1 );
  roundedRectShape2.lineTo( x1 + radius1, y1 );
  roundedRectShape2.quadraticCurveTo( x1, y1, x1, y1 + radius1 );

  let extrudeSettings2 = {
    steps: 2,
    depth: 0.03,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let backGeometry = new Three.ExtrudeGeometry( roundedRectShape2, extrudeSettings2 );
  let back = new Three.Mesh( backGeometry, WoodMaterial ) ;
  back.rotation.x += Math.PI/2;
  back.position.z += 0.5*12/8;
  back.position.y += 0.03;
  back.position.x += -0.025;

  chair.add(back);
  chair.add(plane);
  chair.add(leg1);
  chair.add(leg2);
  chair.add(leg3);
  chair.add(leg4);
  chair.add(leg5);
  chair.add(leg6);

  return chair
}

function makeObjectMinLOD(){
  let chair = new Three.Mesh();

  let LegGeometry = new Three.CylinderGeometry( 0.02, 0.02, 0.5, 8, 8 );
  let LegMaterial = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );

  let leg1 = new Three.Mesh( LegGeometry, LegMaterial );
  leg1.rotation.x += Math.PI/2;
  leg1.position.z += 0.5/2;

  let leg2 = new Three.Mesh( LegGeometry, LegMaterial );
  leg2.rotation.x += Math.PI/2;
  leg2.position.z += 0.5/2;
  leg2.position.y += 0.4;

  let leg3 = new Three.Mesh( LegGeometry, LegMaterial );
  leg3.rotation.x += Math.PI/2;
  leg3.position.z += 0.5/2;
  leg3.position.x += 0.4;

  let leg4 = new Three.Mesh( LegGeometry, LegMaterial );
  leg4.rotation.x += Math.PI/2;
  leg4.position.z += 0.5/2;
  leg4.position.y += 0.4;
  leg4.position.x += 0.4;

  let leg5 = new Three.Mesh( LegGeometry, LegMaterial );
  leg5.rotation.x += Math.PI/2;
  leg5.position.z += 0.5*3/2;

  let leg6 = new Three.Mesh( LegGeometry, LegMaterial );
  leg6.rotation.x += Math.PI/2;
  leg6.position.z += 0.5*3/2;
  leg6.position.x += 0.4;

  let WoodMaterial = new Three.MeshLambertMaterial( {color: 0x9b8c75} );

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=.5;
  let height=.48;
  let radius=0.025;

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
    depth: 0.03,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let PlaneGeometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
  let plane = new Three.Mesh( PlaneGeometry, WoodMaterial ) ;

  plane.position.x += -0.05;
  plane.position.y += -0.04;
  plane.position.z += 0.5;

  let roundedRectShape2 = new Three.Shape();

  let x1=0;
  let y1=0;
  let width1=.45;
  let height1=.25;
  let radius1=0.025;

  roundedRectShape2.moveTo( x1, y1 + radius1 );
  roundedRectShape2.lineTo( x1, y1 + height1 - radius1 );
  roundedRectShape2.quadraticCurveTo( x1, y1 + height1, x1 + radius1, y1 + height1 );
  roundedRectShape2.lineTo( x1 + width1 - radius1, y1 + height1) ;
  roundedRectShape2.quadraticCurveTo( x1 + width1, y1 + height1, x1 + width1, y1 + height1 - radius1 );
  roundedRectShape2.lineTo( x1 + width1, y1 + radius1 );
  roundedRectShape2.quadraticCurveTo( x1 + width1, y1, x1 + width1 - radius1, y1 );
  roundedRectShape2.lineTo( x1 + radius1, y1 );
  roundedRectShape2.quadraticCurveTo( x1, y1, x1, y1 + radius1 );

  let extrudeSettings2 = {
    steps: 2,
    depth: 0.03,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  let backGeometry = new Three.ExtrudeGeometry( roundedRectShape2, extrudeSettings2 );
  let back = new Three.Mesh( backGeometry, WoodMaterial ) ;
  back.rotation.x += Math.PI/2;
  back.position.z += 0.5*12/8;
  back.position.y += 0.03;
  back.position.x += -0.025;

  chair.add(back);
  chair.add(plane);
  chair.add(leg1);
  chair.add(leg2);
  chair.add(leg3);
  chair.add(leg4);
  chair.add(leg5);
  chair.add(leg6);

  return chair
}

export default {
  name: "sedia",
  prototype: "items",

  info: {
    tag: ['furnishings', 'wood'],
    title: "chair",
    description: "chair",
    image: require('./chair.png')
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
    )
  },


  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /************** lod max *********************/

    let chair1 = new Three.Object3D();
    chair1.add(objectMaxLOD.clone());

    let aa = new Three.Box3().setFromObject(chair1);

    let deltaX = Math.abs(aa.max.x - aa.min.x);
    let deltaY = Math.abs(aa.max.y - aa.min.y);
    let deltaZ = Math.abs(aa.max.z - aa.min.z);

    chair1.rotation.x+= -Math.PI/2;
    chair1.position.y+= newAltitude;
    chair1.position.x+= -WIDTH/3.5;
    chair1.position.z+= DEPTH/4;
    chair1.scale.set( 1.5*WIDTH / deltaZ,DEPTH/1.5 / deltaX, HEIGHT / deltaY);

    /************** lod min *********************/

    let chair0 = new Three.Object3D();
    chair0.add(objectMinLOD.clone());
    chair0.rotation.x+= -Math.PI/2;
    chair0.position.y+= newAltitude;
    chair0.position.x+= -WIDTH/3.5;
    chair0.position.z+= DEPTH/4;
    chair0.scale.set( 1.5*WIDTH / deltaZ,DEPTH/1.5 / deltaX, HEIGHT / deltaY);


    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(chair1, 200);
    lod.addLevel(chair0, 900);
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
