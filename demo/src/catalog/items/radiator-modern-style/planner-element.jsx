import * as Three from 'three';
import React from 'react';

const DEPTH = 10;

const grey  = new Three.MeshLambertMaterial( {color: 0xeae6ca} );

function makeObjectMaxLOD(newWidth,newHeight,newDepth){

  let ModernRadiator = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=9.5;
  let height=newHeight-25;
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
    depth: 2.5,
    bevelEnabled: false,
    bevelThickness: .4,
    bevelSize: .4,
    bevelSegments: 1
  };


  for(let i = 5; i<=newWidth-7.5; i+=10){
    let geometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
    let mesh = new Three.Mesh( geometry, grey ) ;
    mesh.position.set(i,0,2.5);
    ModernRadiator.add(mesh);

    let mesh2 = new Three.Mesh( geometry, grey ) ;
    mesh2.position.set(i,5,0);
    mesh2.scale.set(1,1,1);
    ModernRadiator.add(mesh2);

    let mesh3 = new Three.Mesh( geometry, grey ) ;
    mesh3.position.set(i,5,-2.5);
    mesh3.scale.set(1,1.05,1);
    ModernRadiator.add(mesh3);

    let mesh4 = new Three.Mesh( geometry, grey ) ;
    mesh4.position.set(i,6,-4);
    mesh4.scale.set(1,1.2,1);
    ModernRadiator.add(mesh4);

    let mesh5 = new Three.Mesh( geometry, grey ) ;
    mesh5.position.set(i+6,newHeight-25,-2.5);
    mesh5.rotation.y-=Math.PI/2;
    mesh5.scale.set(.8,.18,.8);
    ModernRadiator.add(mesh5);

    let mesh6 = new Three.Mesh( geometry, grey ) ;
    mesh6.position.set(i,newHeight-5,5.5);
    mesh6.rotation.x-=Math.PI/2;
    mesh6.scale.set(1,.13,.8);
    ModernRadiator.add(mesh6);

    let mesh7 = new Three.Mesh( geometry, grey ) ;
    mesh7.position.set(i,newHeight - 17.5,-2);
    mesh7.rotation.x+=Math.PI/4;
    mesh7.scale.set(1,.14,.4);
    ModernRadiator.add(mesh7);

    let mesh8 = new Three.Mesh( geometry, grey ) ;
    mesh8.position.set(i,newHeight-11,5);
    mesh8.scale.set(1,.1,.4);
    ModernRadiator.add(mesh8);

  }


  for (let i = 5; i <= newHeight; i+=newHeight - 12.5) {

    let geometry1 = new Three.CylinderGeometry( newDepth/6,newDepth/6, newWidth, 32 );
    let tube = new Three.Mesh(geometry1,grey);
    tube.rotation.x+=Math.PI/2;
    tube.rotation.z+=Math.PI/2;
    tube.position.set(newWidth/2,i,newDepth/6);
    ModernRadiator.add(tube);

    let geometry2 = new Three.CylinderGeometry( newDepth/4, newDepth/4, newWidth-2.5, 6 );
    let tube2 = new Three.Mesh(geometry2,grey);
    tube2.rotation.x+=Math.PI/2;
    tube2.rotation.z+=Math.PI/2;
    tube2.position.set(newWidth/2,i,newDepth/6);
    ModernRadiator.add(tube2);

    let geometry3 = new Three.CylinderGeometry( newDepth/3.5, newDepth/3.5, newWidth-5, 32 );
    let tube3 = new Three.Mesh(geometry3,grey);
    tube3.rotation.x+=Math.PI/2;
    tube3.rotation.z+=Math.PI/2;
    tube3.position.set(newWidth/2,i,newDepth/6);
    ModernRadiator.add(tube3);

  }

  return ModernRadiator
}

function makeObjectMinLOD(newWidth,newHeight,newDepth){

  let ModernRadiator = new Three.Mesh();

  let roundedRectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=9.5;
  let height=newHeight-25;
  let radius=0.25;

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
    depth: 2.5,
    bevelEnabled: false,
    bevelThickness: .4,
    bevelSize: .4,
    bevelSegments: 1
  };


  for(let i = 5; i<=newWidth-7.5; i+=10){

    let geometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
    let mesh = new Three.Mesh( geometry, grey ) ;
    mesh.position.set(i,0,2.5);
    ModernRadiator.add(mesh);

    let mesh3 = new Three.Mesh( geometry, grey ) ;
    mesh3.position.set(i,5,-2.5);
    mesh3.scale.set(1,1.05,1);
    ModernRadiator.add(mesh3);

    let mesh4 = new Three.Mesh( geometry, grey ) ;
    mesh4.position.set(i,6,-4);
    mesh4.scale.set(1,1.2,1);
    ModernRadiator.add(mesh4);

    let mesh6 = new Three.Mesh( geometry, grey ) ;
    mesh6.position.set(i,newHeight-5,5.5);
    mesh6.rotation.x-=Math.PI/2;
    mesh6.scale.set(1,.13,.8);
    ModernRadiator.add(mesh6);

    let mesh7 = new Three.Mesh( geometry, grey ) ;
    mesh7.position.set(i,newHeight - 17.5,-2);
    mesh7.rotation.x+=Math.PI/4;
    mesh7.scale.set(1,.14,.4);
    ModernRadiator.add(mesh7);

    let mesh8 = new Three.Mesh( geometry, grey ) ;
    mesh8.position.set(i,newHeight-11,5);
    mesh8.scale.set(1,.1,.4);
    ModernRadiator.add(mesh8);

  }


  for (let i = newDepth/6; i <= newHeight; i+=newHeight - 10) {

    let geometry1 = new Three.CylinderGeometry( newDepth/6,newDepth/6, newWidth, 8 );
    let tube = new Three.Mesh(geometry1,grey);
    tube.rotation.x+=Math.PI/2;
    tube.rotation.z+=Math.PI/2;
    tube.position.set(newWidth/2,i,newDepth/6);
    ModernRadiator.add(tube);

  }

  return ModernRadiator
}


export default {
  name: "termosifone_alluminio",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "aluminum radiator",
    description: "aluminum radiator",
    image: require('./ModernStyleRadiator.png')
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

    let newWidth = element.properties.get('width').get('length');
    let newDepth = DEPTH;
    let newHeight = element.properties.get('height').get('length');
    let newAltitude = element.properties.get('altitude').get('length');

    /************ lod max **************/

    let ModernRadiatorMaxLOD = new Three.Object3D();
    ModernRadiatorMaxLOD.add(makeObjectMaxLOD(newWidth,newHeight,newDepth).clone());

    let value = new Three.Box3().setFromObject(ModernRadiatorMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    ModernRadiatorMaxLOD.position.x-= newWidth/2;
    ModernRadiatorMaxLOD.position.y+= 5 + newAltitude;
    ModernRadiatorMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    // let bigger = new Three.Object3D();
    //
    // bigger.add(ModernRadiator);
    //
    // let pivot = new Three.Mesh(new Three.SphereGeometry(10), new Three.MeshBasicMaterial({color:0xff0000}));
    // bigger.add(pivot);

    /************ lod min **************/

    let ModernRadiatorMinLOD = new Three.Object3D();
    ModernRadiatorMinLOD.add(makeObjectMinLOD(newWidth,newHeight,newDepth).clone());
    ModernRadiatorMinLOD.position.x-= newWidth/2;
    ModernRadiatorMinLOD.position.y+= 5 + newAltitude;
    ModernRadiatorMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(ModernRadiatorMaxLOD, 200);
    lod.addLevel(ModernRadiatorMinLOD, 900);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    if (element.selected) {
      let bbox = new Three.BoxHelper(lod, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      lod.add(bbox);
    }

    return Promise.resolve(lod);  }

};
