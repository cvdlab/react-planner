import * as Three from 'three';
import React from 'react';

const white = new Three.MeshLambertMaterial( {color: 0xFFFFFF} );
const grey  = new Three.MeshLambertMaterial( {color: 0xCCCCCC} );

function makeObjectMaxLOD(newWidth,newHeight,newDepth){

  let projector = new Three.Mesh();
  let radius=0.5;

  let geometry = new Three.CylinderGeometry(radius,radius,newWidth,32,32,false,0,Math.PI);
  let mesh = new Three.Mesh( geometry, grey ) ;
  mesh.position.set(newWidth/2,newHeight/2.75,0);
  mesh.rotation.z+=Math.PI/2;
  mesh.rotation.x+=Math.PI;
  projector.add(mesh);

  let g1 = new Three.PlaneGeometry(2*radius,newWidth);
  let m1 = new Three.Mesh(g1,grey);
  m1.rotation.z+=Math.PI/2;
  m1.rotation.x-=Math.PI/2;
  m1.position.set(newWidth/2,newHeight/2.75,0);
  projector.add(m1);

  let geometry2 = new Three.BoxGeometry(newWidth-newWidth/20,newHeight-newHeight/8,newDepth/20);
  let mesh2 = new Three.Mesh( geometry2, white ) ;
  mesh2.position.set(newWidth/2,0.8*newHeight,0);
  projector.add(mesh2);

  let geometry3 = new Three.BoxGeometry(newWidth,newHeight/50,newDepth/20);
  let mesh3 = new Three.Mesh( geometry3, grey ) ;
  mesh3.position.set(newWidth/2,newHeight+newHeight/4,0);
  projector.add(mesh3);

  let geometry4 = new Three.BoxGeometry(newWidth,newDepth/20,newHeight/20);
  let mesh4 = new Three.Mesh( geometry4, grey ) ;
  mesh4.rotation.x+=Math.PI/2;
  mesh4.position.set(newWidth/2,newHeight+newHeight/4.25,newDepth/20);
  projector.add(mesh4);

  let mesh5 = new Three.Mesh( geometry4, grey ) ;
  mesh5.rotation.x+=Math.PI/2;
  mesh5.position.set(newWidth/2,newHeight+newHeight/4.25,-newDepth/20);
  projector.add(mesh5);

  return projector

}

function makeObjectMinLOD(newWidth,newHeight,newDepth){

  let projector = new Three.Mesh();

  let radius=0.5;

  let geometry = new Three.CylinderGeometry(radius,radius,newWidth,32,32,false,0,Math.PI);
  let mesh = new Three.Mesh( geometry, grey ) ;
  mesh.position.set(newWidth/2,newHeight/2.75,0);
  mesh.rotation.z+=Math.PI/2;
  mesh.rotation.x+=Math.PI;
  projector.add(mesh);

  let g1 = new Three.PlaneGeometry(2*radius,newWidth);
  let m1 = new Three.Mesh(g1,grey);
  m1.rotation.z+=Math.PI/2;
  m1.rotation.x-=Math.PI/2;
  m1.position.set(newWidth/2,newHeight/2.75,0);
  projector.add(m1);

  let geometry2 = new Three.BoxGeometry(newWidth-newWidth/20,newHeight-newHeight/8,newDepth/20);
  let mesh2 = new Three.Mesh( geometry2, white ) ;
  mesh2.position.set(newWidth/2,0.8*newHeight,0);
  projector.add(mesh2);

  let geometry3 = new Three.BoxGeometry(newWidth,newHeight/50,newDepth/20);
  let mesh3 = new Three.Mesh( geometry3, grey ) ;
  mesh3.position.set(newWidth/2,newHeight+newHeight/4,0);
  projector.add(mesh3);

  let geometry4 = new Three.BoxGeometry(newWidth,newDepth/20,newHeight/20);
  let mesh4 = new Three.Mesh( geometry4, grey ) ;
  mesh4.rotation.x+=Math.PI/2;
  mesh4.position.set(newWidth/2,newHeight+newHeight/4.25,newDepth/20);
  projector.add(mesh4);

  let mesh5 = new Three.Mesh( geometry4, grey ) ;
  mesh5.rotation.x+=Math.PI/2;
  mesh5.position.set(newWidth/2,newHeight+newHeight/4.25,-newDepth/20);
  projector.add(mesh5);

  return projector

}


export default {
  name: "projector",
  prototype: "items",

  info: {
    tag: ['furnishings', 'wood', 'metal'],
    title: "projector",
    description: "projector",
    image: require('./projector.png')
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 150,
        unit: 'cm'
      }
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 10,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let newWidth    = element.properties.get('width').get('length');
    let newDepth    = element.properties.get('depth').get('length');

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    let rect_style = {stroke : element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};

    return (

      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
        <rect key="1" x="0" y="0" width={newWidth} height={newDepth} style={rect_style}/>
        <text key="2" x="0" y="0" transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');
    let newWidth    = element.properties.get('width').get('length');
    let newHeight   = element.properties.get('height').get('length');
    let newDepth    = element.properties.get('depth').get('length');

    /*********** lod max ***************/

    let projectorMaxLOD = new Three.Object3D();
    projectorMaxLOD.add(makeObjectMaxLOD(newWidth,newHeight,newDepth).clone());

    let value = new Three.Box3().setFromObject(projectorMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    projectorMaxLOD.rotation.y+=Math.PI;
    projectorMaxLOD.position.y+=-newHeight/3.2 + newAltitude;
    projectorMaxLOD.position.x+=newWidth/2;
    projectorMaxLOD.position.z+=newDepth/4;
    projectorMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /*********** lod min *****************/

    let projectorMinLOD = new Three.Object3D();
    projectorMinLOD.add(makeObjectMinLOD(newWidth,newHeight,newDepth).clone());
    projectorMinLOD.rotation.y+=Math.PI;
    projectorMinLOD.position.y+=-newHeight/3.2 + newAltitude;
    projectorMinLOD.position.x+=newWidth/2;
    projectorMinLOD.position.z+=newDepth/4;
    projectorMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(projectorMaxLOD, 200);
    lod.addLevel(projectorMinLOD, 900);
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
