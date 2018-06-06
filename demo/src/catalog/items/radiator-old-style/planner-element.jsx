import * as Three from 'three';
import React from 'react';

const DEPTH = 20;

//colors
const grey = new Three.MeshLambertMaterial( {color: 0xeae6ca} );

function makeObjectMaxLOD(WIDTH,HEIGHT) {

  let OldStyleRadiator = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=DEPTH;
  let height=HEIGHT;
  let radius=2.5;

  roundedRectShape.moveTo( x, y + radius );
  roundedRectShape.lineTo( x, y + height - radius );
  roundedRectShape.quadraticCurveTo( x, y + height, x + radius, y + height );
  roundedRectShape.lineTo( x + width - radius, y + height) ;
  roundedRectShape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  roundedRectShape.lineTo( x + width, y + radius );
  roundedRectShape.quadraticCurveTo( x + width, y, x + width - radius, y );
  roundedRectShape.lineTo( x + radius, y );
  roundedRectShape.quadraticCurveTo( x, y, x, y + radius );

  let holePath1 = new Three.Path();
  holePath1.moveTo( DEPTH/6, HEIGHT*.16 );
  holePath1.arc(0, HEIGHT*.07, DEPTH/8 ,0, Math.PI,false);
  holePath1.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath1 );

  let holePath4 = new Three.Path();
  holePath4.moveTo( DEPTH/6, HEIGHT*.16);
  holePath4.arc(0, HEIGHT*0.725, DEPTH/8 ,0, Math.PI,false);
  holePath4.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath4 );

  let holePath7 = new Three.Path();
  holePath7.moveTo( DEPTH/6, HEIGHT*.16 );
  holePath7.arc(0, HEIGHT*.4, DEPTH/8 ,0, Math.PI,false);
  holePath7.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath7 );

  ////////////////////////////////////////////////

  let holePath2 = new Three.Path();
  holePath2.moveTo( DEPTH/2, HEIGHT*.2 );
  holePath2.arc(0, HEIGHT*.07, DEPTH/8 ,0, Math.PI,false);
  holePath2.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath2 );

  let holePath5 = new Three.Path();
  holePath5.moveTo( DEPTH/2, HEIGHT*.5 );
  holePath5.arc(0, HEIGHT*.0725, DEPTH/8 ,0, Math.PI,false);
  holePath5.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath5 );

  let holePath8 = new Three.Path();
  holePath8.moveTo( DEPTH/2, HEIGHT*1.25);
  holePath8.arc(0, -HEIGHT*.4, DEPTH/8 ,0, Math.PI,false);
  holePath8.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath8 );

  ////////////////////////////////////////////

  let holePath3 = new Three.Path();
  holePath3.moveTo( 0.85*DEPTH, HEIGHT*.16  );
  holePath3.arc(0, HEIGHT*.07, DEPTH/8 ,0, Math.PI,false);
  holePath3.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath3 );

  let holePath6 = new Three.Path();
  holePath6.moveTo( 0.85*DEPTH, HEIGHT*.16 );
  holePath6.arc(0, HEIGHT*.4, DEPTH/8 ,0, Math.PI,false);
  holePath6.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath6 );

  let holePath9 = new Three.Path();
  holePath9.moveTo( 0.85*DEPTH, HEIGHT*.16 );
  holePath9.arc(0, HEIGHT*.725,DEPTH/8 ,0, Math.PI,false);
  holePath9.arc(DEPTH/8, -HEIGHT*.15, DEPTH/8 ,Math.PI,0,false);
  roundedRectShape.holes.push( holePath9 );


  let extrudeSettings = {
    steps: 1,
    depth: 4.5,
    bevelEnabled: false,
    bevelThickness: .4,
    bevelSize: .4,
    bevelSegments: 1
  };


  for(let i = 2.5; i<=WIDTH-5; i+=5){
    let geometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
    let mesh = new Three.Mesh( geometry, grey ) ;
    mesh.position.set(i,height/20,DEPTH);
    mesh.rotation.y += Math.PI/2;
    OldStyleRadiator.add(mesh);
  }

  for (let i = 10; i <= HEIGHT; i+=HEIGHT - 10) {

    let geometry1 = new Three.CylinderGeometry( DEPTH/12,DEPTH/12, WIDTH, 32 );
    let tube = new Three.Mesh(geometry1,grey);
    tube.rotation.x+=Math.PI/2;
    tube.rotation.z+=Math.PI/2;
    tube.position.set(WIDTH/2,i,DEPTH/2);
    OldStyleRadiator.add(tube);

    let geometry2 = new Three.CylinderGeometry( DEPTH/8, DEPTH/8, WIDTH-2.5, 6 );
    let tube2 = new Three.Mesh(geometry2,grey);
    tube2.rotation.x+=Math.PI/2;
    tube2.rotation.z+=Math.PI/2;
    tube2.position.set(WIDTH/2,i,DEPTH/2);
    OldStyleRadiator.add(tube2);

    let geometry3 = new Three.CylinderGeometry( DEPTH/7, DEPTH/7, WIDTH-5, 32 );
    let tube3 = new Three.Mesh(geometry3,grey);
    tube3.rotation.x+=Math.PI/2;
    tube3.rotation.z+=Math.PI/2;
    tube3.position.set(WIDTH/2,i,DEPTH/2);
    OldStyleRadiator.add(tube3);

  }

  return OldStyleRadiator
}

function makeObjectMinLOD(WIDTH,HEIGHT) {

  let OldStyleRadiator = new Three.Mesh();
  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=DEPTH;
  let height=HEIGHT;
  let radius=2.5;

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
    steps: 1,
    depth: 4.5,
    bevelEnabled: false,
    bevelThickness: .4,
    bevelSize: .4,
    bevelSegments: 1
  };


  for(let i = 2.5; i<=WIDTH-5; i+=5){
    let geometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
    let mesh = new Three.Mesh( geometry, grey ) ;
    mesh.position.set(i,height/20,DEPTH);
    mesh.rotation.y += Math.PI/2;
    OldStyleRadiator.add(mesh);
  }

  for (let i = HEIGHT/10; i <= HEIGHT; i+=HEIGHT - 10) {

    let geometry1 = new Three.CylinderGeometry( DEPTH/12,DEPTH/12, WIDTH, 32 );
    let tube = new Three.Mesh(geometry1,grey);
    tube.rotation.x+=Math.PI/2;
    tube.rotation.z+=Math.PI/2;
    tube.position.set(WIDTH/2,i,DEPTH/2);
    OldStyleRadiator.add(tube);

    let geometry2 = new Three.CylinderGeometry( DEPTH/8, DEPTH/8, WIDTH-2.5, 6 );
    let tube2 = new Three.Mesh(geometry2,grey);
    tube2.rotation.x+=Math.PI/2;
    tube2.rotation.z+=Math.PI/2;
    tube2.position.set(WIDTH/2,i,DEPTH/2);
    OldStyleRadiator.add(tube2);

    let geometry3 = new Three.CylinderGeometry( DEPTH/7, DEPTH/7, WIDTH-5, 32 );
    let tube3 = new Three.Mesh(geometry3,grey);
    tube3.rotation.x+=Math.PI/2;
    tube3.rotation.z+=Math.PI/2;
    tube3.position.set(WIDTH/2,i,DEPTH/2);
    OldStyleRadiator.add(tube3);

  }
  return OldStyleRadiator
}


export default {
  name: "radiator-old-style",
  prototype: "items",

  info: {
    tag: ['furnishings', 'cast iron'],
    title: "cast iron radiator",
    description: "cast iron radiator",
    image: require('./OldStyleRadiator.png')
  },

  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 20,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let WIDTH = element.properties.get('width').get('length');
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

    let WIDTH = element.properties.get('width').get('length');
    let HEIGHT = element.properties.get('height').get('length');
    let newAltitude = element.properties.get('altitude').get('length');

    /********* lod max *************/

    let OldStyleRadiatorMaxLOD = new Three.Object3D();
    OldStyleRadiatorMaxLOD.add(makeObjectMaxLOD(WIDTH,HEIGHT).clone());

    let value = new Three.Box3().setFromObject(OldStyleRadiatorMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    OldStyleRadiatorMaxLOD.position.z-= DEPTH/2;
    OldStyleRadiatorMaxLOD.position.x-= WIDTH/2;
    OldStyleRadiatorMaxLOD.position.y+= -HEIGHT/20+newAltitude;
    OldStyleRadiatorMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /********* lod min *************/

    let OldStyleRadiatorMinLOD = new Three.Object3D();
    OldStyleRadiatorMinLOD.add(makeObjectMinLOD(WIDTH,HEIGHT).clone());
    OldStyleRadiatorMinLOD.position.z-= DEPTH/2;
    OldStyleRadiatorMinLOD.position.x-= WIDTH/2;
    OldStyleRadiatorMinLOD.position.y+= -HEIGHT/20+newAltitude;
    OldStyleRadiatorMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(OldStyleRadiatorMaxLOD, 400);
    lod.addLevel(OldStyleRadiatorMinLOD, 900);
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
