import * as Three from 'three';
import React from 'react';

const HEIGHT = 60;

const steel =  new Three.MeshLambertMaterial({color:0xffffff});
const grey = new Three.MeshLambertMaterial({color:0xAAAAAA});
const yellow = new Three.MeshLambertMaterial({color: 0xFF9933});
const blue = new Three.MeshLambertMaterial({color:0x0000ff});

function makeObjectMaxLOD(newWidth,newDepth) {

  let sink = new Three.Mesh();

  let rectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=newWidth;
  let height=newDepth;
  let newHeight= HEIGHT;
  let radius=newDepth/10;

  rectShape.moveTo( x, y + radius );
  rectShape.lineTo( x, y + height - radius );
  rectShape.quadraticCurveTo( x, y + height, x + radius, y + height );
  rectShape.lineTo( x + width - radius, y + height) ;
  rectShape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  rectShape.lineTo( x + width, y + radius );
  rectShape.quadraticCurveTo( x + width, y, x + width - radius, y );
  rectShape.lineTo( x + radius, y );
  rectShape.quadraticCurveTo( x, y, x, y + radius );


  let extrudeSettings = {
    steps: 2,
    depth: newHeight/40,
    bevelEnabled: false,
    bevelThickness: newHeight,
    bevelSize: newHeight,
    bevelSegments: 2
  };

  let geometry = new Three.ExtrudeGeometry( rectShape, extrudeSettings );
  let mesh = new Three.Mesh( geometry, steel ) ;
  mesh.rotation.x+=Math.PI/2;
  mesh.position.y=newHeight/4;
  sink.add(mesh);

  let rectShape2 = new Three.Shape();
  let hole = new Three.Path();

  rectShape2.moveTo( x, y + radius );
  rectShape2.lineTo( x, y + height - radius );
  rectShape2.quadraticCurveTo( x, y + height, x + radius, y + height );
  rectShape2.lineTo( x + width - radius, y + height) ;
  rectShape2.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  rectShape2.lineTo( x + width, y + radius );
  rectShape2.quadraticCurveTo( x + width, y, x + width - radius, y );
  rectShape2.lineTo( x + radius, y );
  rectShape2.quadraticCurveTo( x, y, x, y + radius );

  hole.moveTo(newWidth/20, newDepth/20);
  hole.lineTo(newWidth-newWidth/20, newDepth/20);
  hole.lineTo(newWidth-newWidth/20, newDepth-newDepth/20);
  hole.lineTo(newWidth/20, newDepth-newDepth/20);
  rectShape2.holes.push(hole);

  let extrudeSettings2 = {
    steps: 2,
    depth: newHeight/4,
    bevelEnabled: false,
    bevelThickness: newHeight,
    bevelSize: newHeight,
    bevelSegments: 2
  };

  let geometry2 = new Three.ExtrudeGeometry( rectShape2, extrudeSettings2 );
  let mesh2 = new Three.Mesh( geometry2, steel ) ;
  mesh2.rotation.x+=Math.PI/2;
  mesh2.position.y+=newHeight/2;
  sink.add(mesh2);

  //pipe
  let pipe_p1 = new Three.Mesh(new Three.TorusGeometry( 2.5, 2.5, 16, 16, Math.PI/2 ), yellow);
  pipe_p1.position.set(newWidth/2,newHeight/5.5,newDepth/2-2.5);
  pipe_p1.rotation.z=-Math.PI/2;
  pipe_p1.rotation.y-=Math.PI/2;
  sink.add(pipe_p1);

  let cylinderGeometry1 = new Three.CylinderGeometry(2.25,2.25,newDepth/2,80);
  let pipe_p2 = new Three.Mesh(cylinderGeometry1,yellow);
  pipe_p2.rotation.z=Math.PI/2;
  pipe_p2.rotation.y-=Math.PI/2;
  pipe_p2.position.set(newWidth/2,newHeight/7.5,newDepth/4.5);
  sink.add(pipe_p2);

  let cylinderGeometry2 = new Three.CylinderGeometry(2.5,2.5,newDepth/12,80);
  let pipe_p3 = new Three.Mesh(cylinderGeometry2,yellow);
  pipe_p3.rotation.y-=Math.PI/2;
  pipe_p3.position.set(newWidth/2,newHeight/4.85,newDepth/2);
  sink.add(pipe_p3);

  //tap
  let cylinderGeometry66 = new Three.CylinderGeometry(1.25,1.25,8,12);
  let tap_p1 = new Three.Mesh(cylinderGeometry66,grey);
  tap_p1.position.set(newWidth/2,newHeight/1.45,3);
  tap_p1.rotation.z-=Math.PI/2;
  tap_p1.rotation.y+=Math.PI/2;
  sink.add(tap_p1);

  let cylinderGeometry5 = new Three.CylinderGeometry(2.7,3,5,12);
  let tap_p2 = new Three.Mesh(cylinderGeometry5,grey);
  tap_p2.position.set(newWidth/2, newHeight/1.45,10);
  tap_p2.rotation.z-=Math.PI/2;
  tap_p2.rotation.y+=Math.PI/2;
  sink.add(tap_p2);

  let cylinderGeometry6 = new Three.CylinderGeometry(2,2,5.5,80);
  let tap_p3 = new Three.Mesh(cylinderGeometry6,blue);
  tap_p3.position.set(newWidth/2, newHeight/1.45,10);
  tap_p3.rotation.z-=Math.PI/2;
  tap_p3.rotation.y+=Math.PI/2;
  sink.add(tap_p3);

  let curve = new Three.CatmullRomCurve3( [
    new Three.Vector3( -12, -10, 0 ),
    new Three.Vector3( -12, -5, 0 ),
    new Three.Vector3( 0, 0, 0 ),
    new Three.Vector3( 6, 5, 0 ),
    new Three.Vector3( 6, 10, 0 )
  ] );

  let geometry7 = new Three.TubeGeometry(curve, 32, 1, 16, false);
  let mesh3 = new Three.Mesh(geometry7, grey);
  mesh3.position.set(newWidth/2, newHeight/1.7,11);
  mesh3.rotation.y+=Math.PI/2;
  mesh3.rotation.z-=Math.PI/8;
  sink.add(mesh3);

  //hole
  let cylinderGeometry7 = new Three.CylinderGeometry(newDepth/20,newDepth/20,newHeight/100,80);
  let blackMaterial = new Three.MeshLambertMaterial({color: 0x000000});
  let hole_p1 = new Three.Mesh(cylinderGeometry7,blackMaterial);
  hole_p1.position.set(newWidth/2,newHeight/4,newDepth/2);
  sink.add(hole_p1);

  let cylinderGeometry8 = new Three.CylinderGeometry(newDepth/10,newDepth/10,newHeight/200,80,80,false,0,Math.PI);
  let whiteMaterial = new Three.MeshLambertMaterial({color: 0xffffff});
  let hole_p2 = new Three.Mesh(cylinderGeometry8,whiteMaterial);
  hole_p2.scale.set(.25,.5,.5);
  hole_p2.rotation.z=Math.PI/2;
  hole_p2.position.set(newWidth/2,newHeight/4,newDepth/2);
  sink.add(hole_p2);

  let hole_p3 = new Three.Mesh(cylinderGeometry8,whiteMaterial);
  hole_p3.rotation.z=Math.PI/2;
  hole_p3.rotation.y=Math.PI/2;
  hole_p3.scale.set(.25,.5,.5);
  hole_p3.position.set(newWidth/2,newHeight/4,newDepth/2);
  sink.add(hole_p3);

  let hole_p4 = new Three.Mesh(cylinderGeometry8,whiteMaterial);
  hole_p4.rotation.z=Math.PI/2;
  hole_p4.rotation.y=Math.PI/4;
  hole_p4.position.set(newWidth/2,newHeight/4,newDepth/2);
  hole_p4.scale.set(.25,.5,.5);
  sink.add(hole_p4);

  let hole_p5 = new Three.Mesh(cylinderGeometry8,whiteMaterial);
  hole_p5.rotation.z=Math.PI/2;
  hole_p5.rotation.y=-Math.PI/4;
  hole_p5.position.set(newWidth/2,newHeight/4,newDepth/2);
  hole_p5.scale.set(.25,.5,.5);
  sink.add(hole_p5);

  return sink
}

function makeObjectMinLOD(newWidth,newDepth) {

  let sink = new Three.Mesh();

  let rectShape = new Three.Shape();

  let x=0;
  let y=0;
  let width=newWidth;
  let height=newDepth;
  let newHeight= HEIGHT;
  let radius=newDepth/10;

  rectShape.moveTo( x, y + radius );
  rectShape.lineTo( x, y + height - radius );
  rectShape.quadraticCurveTo( x, y + height, x + radius, y + height );
  rectShape.lineTo( x + width - radius, y + height) ;
  rectShape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  rectShape.lineTo( x + width, y + radius );
  rectShape.quadraticCurveTo( x + width, y, x + width - radius, y );
  rectShape.lineTo( x + radius, y );
  rectShape.quadraticCurveTo( x, y, x, y + radius );


  let extrudeSettings = {
    steps: 2,
    depth: newHeight/40,
    bevelEnabled: false,
    bevelThickness: newHeight,
    bevelSize: newHeight,
    bevelSegments: 2
  };

  let geometry = new Three.ExtrudeGeometry( rectShape, extrudeSettings );
  let mesh = new Three.Mesh( geometry, steel ) ;
  mesh.rotation.x+=Math.PI/2;
  mesh.position.y=newHeight/4;
  sink.add(mesh);

  let rectShape2 = new Three.Shape();
  let hole = new Three.Path();

  rectShape2.moveTo( x, y + radius );
  rectShape2.lineTo( x, y + height - radius );
  rectShape2.quadraticCurveTo( x, y + height, x + radius, y + height );
  rectShape2.lineTo( x + width - radius, y + height) ;
  rectShape2.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  rectShape2.lineTo( x + width, y + radius );
  rectShape2.quadraticCurveTo( x + width, y, x + width - radius, y );
  rectShape2.lineTo( x + radius, y );
  rectShape2.quadraticCurveTo( x, y, x, y + radius );

  hole.moveTo(newWidth/20, newDepth/20);
  hole.lineTo(newWidth-newWidth/20, newDepth/20);
  hole.lineTo(newWidth-newWidth/20, newDepth-newDepth/20);
  hole.lineTo(newWidth/20, newDepth-newDepth/20);
  rectShape2.holes.push(hole);

  let extrudeSettings2 = {
    steps: 2,
    depth: newHeight/4,
    bevelEnabled: false,
    bevelThickness: newHeight,
    bevelSize: newHeight,
    bevelSegments: 2
  };

  let geometry2 = new Three.ExtrudeGeometry( rectShape2, extrudeSettings2 );
  let mesh2 = new Three.Mesh( geometry2, steel ) ;
  mesh2.rotation.x+=Math.PI/2;
  mesh2.position.y+=newHeight/2;
  sink.add(mesh2);

  //tap
  let cylinderGeometry66 = new Three.CylinderGeometry(1.25,1.25,8,12);
  let tap_p1 = new Three.Mesh(cylinderGeometry66,grey);
  tap_p1.position.set(newWidth/2,newHeight/1.45,3);
  tap_p1.rotation.z-=Math.PI/2;
  tap_p1.rotation.y+=Math.PI/2;
  sink.add(tap_p1);

  let cylinderGeometry5 = new Three.CylinderGeometry(2.7,3,5,12);
  let tap_p2 = new Three.Mesh(cylinderGeometry5,grey);
  tap_p2.position.set(newWidth/2, newHeight/1.45,10);
  tap_p2.rotation.z-=Math.PI/2;
  tap_p2.rotation.y+=Math.PI/2;
  sink.add(tap_p2);

  let cylinderGeometry6 = new Three.CylinderGeometry(2,2,5.5,80);
  let tap_p3 = new Three.Mesh(cylinderGeometry6,blue);
  tap_p3.position.set(newWidth/2, newHeight/1.45,10);
  tap_p3.rotation.z-=Math.PI/2;
  tap_p3.rotation.y+=Math.PI/2;
  sink.add(tap_p3);

  let curve = new Three.CatmullRomCurve3( [
    new Three.Vector3( -12, -10, 0 ),
    new Three.Vector3( -12, -5, 0 ),
    new Three.Vector3( 0, 0, 0 ),
    new Three.Vector3( 6, 5, 0 ),
    new Three.Vector3( 6, 10, 0 )
  ] );

  let geometry7 = new Three.TubeGeometry(curve, 32, 1, 16, false);
  let mesh3 = new Three.Mesh(geometry7, grey);
  mesh3.position.set(newWidth/2, newHeight/1.7,11);
  mesh3.rotation.y+=Math.PI/2;
  mesh3.rotation.z-=Math.PI/8;
  sink.add(mesh3);

  return sink
}

export default {
  name: "sink",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "sink",
    description: "sink",
    image: require('./sink.png')
  },
  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 40,
        unit: 'cm'
      }
    },
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 80,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');
    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    let rect_style = {stroke : element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};


    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
        <rect key="1" x="0" y="0" width={newWidth} height={newDepth} style={rect_style}/>
        <text key="2" x="0" y="0"
              transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');
    let newHeight = HEIGHT;
    let newAltitude = element.properties.get('altitude').get('length');

    /**************** lod max ********************/

    let sinkMaxLOD=new Three.Object3D();
    sinkMaxLOD.add(makeObjectMaxLOD(newWidth,newDepth).clone());

    let value = new Three.Box3().setFromObject(sinkMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    sinkMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);
    sinkMaxLOD.position.y+= -newHeight/5 + newAltitude;
    sinkMaxLOD.position.z-= newDepth/4;
    sinkMaxLOD.position.x-= newWidth/2;

    /**************** lod min ********************/

    let sinkMinLOD=new Three.Object3D();
    sinkMinLOD.add(makeObjectMinLOD(newWidth,newDepth).clone());
    sinkMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);
    sinkMinLOD.position.y+= -newHeight/5 + newAltitude;
    sinkMinLOD.position.z-= newDepth/4;
    sinkMinLOD.position.x-= newWidth/2;

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(sinkMaxLOD, 200);
    lod.addLevel(sinkMinLOD, 900);
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
