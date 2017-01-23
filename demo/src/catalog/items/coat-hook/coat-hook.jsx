import * as Three from 'three';
import React from 'react';

const WIDTH = 200;
const DEPTH = 20;
const HEIGHT = 40;

export default {
  name: "coat-hook",
  prototype: "items",

  info: {
    tag: ['Furnishings', 'Optional'],
    group: "Items",
    title: "Coat hook",
    description: "Coat hook",
    image: require('./coat-hook.png')
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 120,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let angle = element.rotation + 90;
    //console.log(angle);

    if (angle>-180 && angle<0)
      angle =  360;
    else
      angle = 0;

    let rect_style = {stroke : element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};
    let arrow_style = {stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce"};

    return (

      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
        <line key="2" x1={WIDTH/2} x2={WIDTH/2} y1={DEPTH}  y2={1.5*DEPTH} style={arrow_style}/>
        <line key="3" x1={.45*WIDTH} x2={WIDTH/2} y1={1.2*DEPTH} y2={1.5*DEPTH} style={arrow_style} />
        <line key="4" x1={WIDTH/2} x2={.55*WIDTH} y1={1.5*DEPTH} y2={1.2*DEPTH} style={arrow_style} />
        <text key="5" x="0" y="0" transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${angle/2})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {


  let newAltitude = element.properties.get('altitude').get('length');

  var attaccapanni = new Three.Object3D();

    var newWidth = 2.15;
    var newDepth = .04;
    var newHeight = .1;
    var raggio = .0125;

    var texture = new Three.TextureLoader().load(require('./wood.jpg'));
    var materialTexture = new Three.MeshLambertMaterial( { map: texture} );


    var geometry = new Three.BoxGeometry( newWidth, 1.5*newHeight, newDepth );
    //var material = new Three.MeshLambertMaterial( {color: 0x9b8c75} );
    var plane = new Three.Mesh( geometry, materialTexture );
    plane.position.y = newHeight/2;
    attaccapanni.add(plane);

    var geometry_legs = new Three.CylinderGeometry( raggio, raggio, newHeight/1.7, 32 );
    var material_legs = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );
    var p1 = new Three.Mesh( geometry_legs, material_legs );
    p1.rotation.x+=Math.PI/2;
    p1.position.set(1,0.05,0.05);
    attaccapanni.add(p1);

    var p2 = new Three.Mesh( geometry_legs, material_legs );
    p2.rotation.x+=Math.PI/2;
    p2.position.set(-.95,0.05,0.05);
    attaccapanni.add(p2);

    var geometrySphereUp = new Three.SphereGeometry( 0.035, 32, 32 );
    var sphere = new Three.Mesh( geometrySphereUp, material_legs );
    sphere.position.set(1,0.05,0.08);
    sphere.scale.set(1,1,.5);
    attaccapanni.add(sphere);

    var sphere2 = new Three.Mesh( geometrySphereUp, material_legs );
    sphere2.position.set(-.95,0.05,0.08);
    sphere2.scale.set(1,1,.5);
    attaccapanni.add(sphere2);


    var newHeight2 = .2;

    var CustomSinCurve = Three.Curve.create(

      function ( scale ) { //custom curve constructor

        this.scale = ( scale === undefined ) ? 1 : scale;

      },

      function ( t ) { //getPoint: t is between 0-1

        var tx = t/6 ;
        var ty = Math.sin(Math.PI * t )/8;
        var tz = 0;

        return new Three.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

      }

    );

    var path = new CustomSinCurve( 1 );
    var geometry2 = new Three.TubeGeometry( path, 32, .0125, 8, false );
    var mesh = new Three.Mesh( geometry2, material_legs );
    mesh.position.set(-.95,-.14,.152);
    mesh.rotation.y-=Math.PI/2;
    mesh.rotation.x+=Math.PI+Math.PI/7.5;
    attaccapanni.add( mesh );



    for(var i=-0.95;i<=1.05;i+=0.15){

      var geometry_legs2 = new Three.CylinderGeometry( raggio, raggio, newHeight2, 32 );
      var p3 = new Three.Mesh( geometry_legs2, material_legs );
      p3.position.set(i,-0.05,0);
      attaccapanni.add(p3);

      var geometry3 = new Three.TubeGeometry( path, 32, .0125, 16, false );
      var mesh3 = new Three.Mesh( geometry3, material_legs );
      mesh3.position.set(i,-.14,.152);
      mesh3.rotation.y-=Math.PI/2;
      mesh3.rotation.x+=Math.PI+Math.PI/7.5;
      attaccapanni.add( mesh3 );

      var geometrySphere = new Three.SphereGeometry( 0.035, 32, 32 );
      var sphereTop = new Three.Mesh( geometrySphere, material_legs );
      sphereTop.position.set(i,-0.142,0.15);
      sphereTop.rotation.x+=Math.PI/2+Math.PI/3;
//      sphereTop.scale.set(1,.5,.5);
      attaccapanni.add(sphereTop);

    }


    let value = new Three.Box3().setFromObject(attaccapanni);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);


    if (element.selected) {
      let bbox = new Three.BoxHelper(attaccapanni, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      attaccapanni.add(bbox);
    }

    attaccapanni.rotation.y+= Math.PI;
    attaccapanni.position.y+= HEIGHT/1.5 +newAltitude;
    attaccapanni.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    return Promise.resolve(attaccapanni);
  }

};
