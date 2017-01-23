import * as Three from 'three';
import React from 'react';

const WIDTH = 100;
const DEPTH = 40;
const HEIGHT = 100;
const RADIUS = 10;

export default {
  name: "radiator",
  prototype: "items",

  info: {
    tag: ['Arredamento'],
    group: "Items",
    title: "Termosifone",
    description: "Termosifone",
    image: require('./radiator.png')
  },

  properties: {
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
        <line key="3" x1={.35*WIDTH} x2={WIDTH/2} y1={1.2*DEPTH} y2={1.5*DEPTH} style={arrow_style} />
        <line key="4" x1={WIDTH/2} x2={.65*WIDTH} y1={1.5*DEPTH} y2={1.2*DEPTH} style={arrow_style} />
        <text key="5" x="0" y="0" transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${angle/2})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {/**
   * Created by stepex on 07/12/16.
   */

  let newAltitude = element.properties.get('altitude').get('length');

    //colors
    var black = new Three.MeshLambertMaterial( {color: 0x000000} );
    var grey = new Three.MeshLambertMaterial( {color: 0xeae6ca} );

    var termosifone = new Three.Object3D();

    var roundedRectShape = new Three.Shape();

    let x=0;
    let y=0;
    let width=2;
    let height=8;
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

    var holePath1 = new Three.Path();
    holePath1.moveTo( 1.7, 1.6 );
    holePath1.arc(0, .7, .15 ,0, Math.PI,false);
    holePath1.arc(0.15, -1.9, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath1 );

    var holePath2 = new Three.Path();
    holePath2.moveTo( 1, 1.5 );
    holePath2.arc(0, .8, .15 ,0, Math.PI,false);
    holePath2.arc(0.15, -1.7, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath2 );

    var holePath3 = new Three.Path();
    holePath3.moveTo( .3, 1.6 );
    holePath3.arc(0, .7, .15 ,0, Math.PI,false);
    holePath3.arc(0.15, -1.9, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath3 );

    var holePath4 = new Three.Path();
    holePath4.moveTo( 1.7, 4.2 );
    holePath4.arc(0, .7, .15 ,0, Math.PI,false);
    holePath4.arc(0.15, -1.9, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath4 );

    var holePath5 = new Three.Path();
    holePath5.moveTo( 1, 4.2 );
    holePath5.arc(0, .7, .15 ,0, Math.PI,false);
    holePath5.arc(0.15, -1.9, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath5 );

    var holePath6 = new Three.Path();
    holePath6.moveTo( .3, 4.2 );
    holePath6.arc(0, .7, .15 ,0, Math.PI,false);
    holePath6.arc(0.15, -1.9, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath6 );

    var holePath7 = new Three.Path();
    holePath7.moveTo( 1.7, 6.8 );
    holePath7.arc(0, .7, .15 ,0, Math.PI,false);
    holePath7.arc(0.15, -1.9, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath7 );

    var holePath8 = new Three.Path();
    holePath8.moveTo( 1, 6.5 );
    holePath8.arc(0, .8, .15 ,0, Math.PI,false);
    holePath8.arc(0.15, -1.7, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath8 );

    var holePath9 = new Three.Path();
    holePath9.moveTo( .3, 6.8 );
    holePath9.arc(0, .7, .15 ,0, Math.PI,false);
    holePath9.arc(0.15, -1.9, .15 ,Math.PI,0,false);
    roundedRectShape.holes.push( holePath9 );


    var extrudeSettings = {
      steps: 1,
      amount: 0.2,
      bevelEnabled: false,
      bevelThickness: .4,
      bevelSize: .4,
      bevelSegments: 1
    };


    for (var i = 0; i < 5; i+=.5) {
      var geometry = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
      var mesh = new Three.Mesh( geometry, grey ) ;
      mesh.position.set(0,1.2,i);
      termosifone.add(mesh);

    }

    for (var j = 1.4; j < 15; j+=7.5) {

      var geometry2 = new Three.CylinderGeometry( 0.15, 0.15, 5, 32 );
      var tubo = new Three.Mesh(geometry2,grey);
      tubo.rotation.x+=Math.PI/2;
      tubo.position.set(1,j,2.35);
      termosifone.add(tubo);

      var geometry3 = new Three.CylinderGeometry( 0.1, 0.1, 5.2, 6 );
      var tubo2 = new Three.Mesh(geometry3,grey);
      tubo2.rotation.x+=Math.PI/2;
      tubo2.position.set(1,j,2.35);
      termosifone.add(tubo2);

      var geometry4 = new Three.CylinderGeometry( 0.3, 0.3, 4.5, 32 );
      var tubo3 = new Three.Mesh(geometry4,grey);
      tubo3.rotation.x+=Math.PI/2;
      tubo3.position.set(1,j,2.35);
      termosifone.add(tubo3);


    }

    let value = new Three.Box3().setFromObject(termosifone);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);


    if (element.selected) {
      let bbox = new Three.BoxHelper(termosifone, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      termosifone.add(bbox);
    }

    termosifone.rotation.y+= Math.PI/2;
    termosifone.position.x+= -DEPTH/1.4;
    termosifone.position.z+= WIDTH/5.5;
    termosifone.position.y+= -HEIGHT/7.5+newAltitude;
    termosifone.scale.set(DEPTH / deltaX, HEIGHT / deltaY, WIDTH / deltaZ);

    return Promise.resolve(termosifone);
  }

};
