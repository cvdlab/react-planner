import * as Three from 'three';
import React from 'react';

const WIDTH = 70;
const DEPTH = 50;
const HEIGHT = 90;

const brown = new Three.MeshLambertMaterial( {color: 0x9b8c75} );
const grey  = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );
const green = new Three.MeshBasicMaterial({color:0x669966});

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let desk = new Three.Mesh();

  let newDepth = .5;
  let newWidth = .9;
  let newHeight = 1;
  let radius = .03;

  let geometry = new Three.BoxGeometry( newWidth+newWidth/6, newHeight/20, newDepth+newDepth/4 );

  let boxMaterials = [ brown, brown, green, brown, brown, brown];

  let plane = new Three.Mesh( geometry, boxMaterials);
  plane.position.y = newHeight;
  desk.add(plane);

  let geometry_legs = new Three.CylinderGeometry( radius, radius, newHeight, 32, 32 );

  let geometry2 = new Three.BoxGeometry( newWidth, newHeight/20, newDepth );
  let plane2 = new Three.Mesh( geometry2, brown );
  plane2.position.y = newHeight/2+newHeight/4;
  desk.add(plane2);

  let geometry3 = new Three.BoxGeometry( newWidth, newHeight/10, newDepth/20 );
  let plane3 = new Three.Mesh( geometry3, brown );
  plane3.position.y = newHeight/2+newHeight/4+newHeight/16;
  plane3.position.z = newDepth/3+newDepth/5;
  desk.add(plane3);

  let leg1 = new Three.Mesh( geometry_legs, grey );
  leg1.position.x = newWidth/2;
  leg1.position.z = newDepth/2;
  leg1.position.y = newHeight/2;
  desk.add(leg1);

  let leg2 = new Three.Mesh( geometry_legs, grey );
  leg2.position.x = newWidth/2;
  leg2.position.z = -newDepth/2;
  leg2.position.y = newHeight/2;
  desk.add(leg2);

  let leg3 = new Three.Mesh( geometry_legs, grey );
  leg3.position.x = -newWidth/2;
  leg3.position.z = newDepth/2;
  leg3.position.y = newHeight/2;
  desk.add(leg3);

  let leg4 = new Three.Mesh( geometry_legs, grey );
  leg4.position.x = -newWidth/2;
  leg4.position.z = -newDepth/2;
  leg4.position.y = newHeight/2;
  desk.add(leg4);

  return desk
}

function makeObjectMinLOD() {

  let desk = new Three.Mesh();

  let newDepth = .5;
  let newWidth = .9;
  let newHeight = 1;
  let radius = .03;

  let geometry = new Three.BoxGeometry( newWidth+newWidth/6, newHeight/20, newDepth+newDepth/4 );

  let boxMaterials = [ brown, brown, green, brown, brown, brown];

  let plane = new Three.Mesh( geometry, boxMaterials);
  plane.position.y = newHeight;
  desk.add(plane);

  let geometry_legs = new Three.CylinderGeometry( radius, radius, newHeight, 32, 32 );

  let geometry2 = new Three.BoxGeometry( newWidth, newHeight/20, newDepth );
  let plane2 = new Three.Mesh( geometry2, brown );
  plane2.position.y = newHeight/2+newHeight/4;
  desk.add(plane2);

  let geometry3 = new Three.BoxGeometry( newWidth, newHeight/10, newDepth/20 );
  let plane3 = new Three.Mesh( geometry3, brown );
  plane3.position.y = newHeight/2+newHeight/4+newHeight/16;
  plane3.position.z = newDepth/3+newDepth/5;
  desk.add(plane3);

  let leg1 = new Three.Mesh( geometry_legs, grey );
  leg1.position.x = newWidth/2;
  leg1.position.z = newDepth/2;
  leg1.position.y = newHeight/2;
  desk.add(leg1);

  let leg2 = new Three.Mesh( geometry_legs, grey );
  leg2.position.x = newWidth/2;
  leg2.position.z = -newDepth/2;
  leg2.position.y = newHeight/2;
  desk.add(leg2);

  let leg3 = new Three.Mesh( geometry_legs, grey );
  leg3.position.x = -newWidth/2;
  leg3.position.z = newDepth/2;
  leg3.position.y = newHeight/2;
  desk.add(leg3);

  let leg4 = new Three.Mesh( geometry_legs, grey );
  leg4.position.x = -newWidth/2;
  leg4.position.z = -newDepth/2;
  leg4.position.y = newHeight/2;
  desk.add(leg4);

  return desk
}

export default {
  name: 'school desk',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood'],
    title: 'school desk',
    description: 'school desk',
    image: require('./desk.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
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

    /************* lod max ******************/

    let deskMaxLOD = new Three.Object3D();
    deskMaxLOD.add(objectMaxLOD.clone());

    let valueObject = new Three.Box3().setFromObject(deskMaxLOD);

    let deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
    let deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
    let deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

    deskMaxLOD.rotation.y+=Math.PI;
    deskMaxLOD.position.y+= newAltitude;
    deskMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ );

    /************* lod min ******************/

    let deskMinLOD = new Three.Object3D();
    deskMinLOD.add(objectMinLOD.clone());
    deskMinLOD.rotation.y+=Math.PI;
    deskMinLOD.position.y+= newAltitude;
    deskMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ );


    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(deskMaxLOD, 200);
    lod.addLevel(deskMinLOD, 900);
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

