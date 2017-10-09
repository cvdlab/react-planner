import * as Three from 'three';
import React from 'react';

const WIDTH = 70;
const DEPTH = 100;
const HEIGHT = 100;
const RADIUS = 10;

export default {
  name: "sedia_banco",
  prototype: "items",

  info: {
    tag: ['arredamento', 'wood', 'metal'],
    group: "Items",
    title: "chair con desk",
    description: "chair con desk",
    image: require('./chairDesk.png')
  },

  properties: {
    altitude: {
      label: "quota",
      type: "length-measure",
      defaultValue: {
        length: 20,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let angle = element.rotation;
    //console.log(angle);

    if (angle>-180 && angle<0)
      angle =  360;
    else
      angle = 0;

    let rect_style = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};

    return (

      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
        <text key="2" x="0" y="0" transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${angle/2})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {


    let newAltitude = element.properties.get('altitude').get('length');

    var chairdesk = new Three.Object3D();

    var roundedRectShape = new Three.Shape();

    let x=0;
    let y=0;
    let width=1;
    let height=1.2;
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


    var geometry0 = new Three.ShapeGeometry( roundedRectShape );
    var mesh = new Three.Mesh( geometry0, new Three.MeshPhongMaterial({color: 0xaaaaaa} ) );


    var extrudeSettings = {
      steps: 2,
      amount: 0.1,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    var geometry24 = new Three.ExtrudeGeometry( roundedRectShape, extrudeSettings );
    var material2 = new Three.MeshPhongMaterial({color: 0xff0000} );
    var mesh = new Three.Mesh( geometry24, material2 ) ;

    mesh.position.set(0,1.2,0);
    mesh.rotation.x+=Math.PI/2;
    chairdesk.add(mesh);

    var geometry = new Three.CylinderGeometry( 0.08, 0.08, 1, 32 );
    var geometry2 = new Three.CylinderGeometry( 0.08, 0.08, .8, 32 );
    var geometry3 = new Three.CylinderGeometry( 0.08, 0.08, .6, 32 );
    var geometry4 = new Three.CylinderGeometry( 0.08, 0.08, .2, 32 );
    var geometry5 = new Three.CylinderGeometry( 0.06, 0.06, .025, 32 );
    var geometry6 = new Three.CylinderGeometry( 0.08, 0.08, .02, 32 );

    var grey = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );
    var red = new Three.MeshPhongMaterial({color: 0xff0000} );
    var black = new Three.MeshPhongMaterial({color: 0x000000} );

    var p1 = new Three.Mesh( geometry, grey );
    p1.rotation.x += Math.PI/2;
    p1.position.set(0.5,0.6,0.6);
    mesh.add(p1);

    var p2 = new Three.Mesh( geometry, grey );
    p2.position.set(0.5,0.6,1.1);
    mesh.add(p2);

    var p3 = new Three.Mesh( geometry, grey );
    p3.rotation.z += Math.PI/2;
    p3.position.set(0,0.6,1.1);
    mesh.add(p3);

    var p4 = new Three.Mesh( geometry3, grey );
    p4.rotation.x += Math.PI/2;
    p4.position.set(-0.5,0.6,0.8);
    mesh.add(p4);

    var p5 = new Three.Mesh( geometry4, grey );
    p5.position.set(-0.5,0.6,1.1);
    mesh.add(p5);

    var p6 = new Three.Mesh( geometry5, black );
    p6.position.set(0.5,0.2,1.18);
    p6.rotation.x+=Math.PI/2;
    mesh.add(p6);

    var p7 = new Three.Mesh( geometry5, black );
    p7.position.set(0.5,1,1.18);
    p7.rotation.x+=Math.PI/2;
    mesh.add(p7);

    var p8 = new Three.Mesh( geometry5, black );
    p8.position.set(-.9,0,1.18);
    p8.rotation.x+=Math.PI/2;
    mesh.add(p8);

    var p9 = new Three.Mesh( geometry5, black );
    p9.position.set(-.9,1.2,1.18);
    p9.rotation.x+=Math.PI/2;
    mesh.add(p9);

    var p10 = new Three.Mesh( geometry6, grey );
    p10.position.set(-1,0,1.1);
    p10.rotation.z+=Math.PI/2;
    mesh.add(p10);

    var p11 = new Three.Mesh( geometry6, grey );
    p11.position.set(-1,1.2,1.1);
    p11.rotation.z+=Math.PI/2;
    mesh.add(p11);

    var CustomSinCurve = Three.Curve.create(

      function ( scale ) { //custom curve constructor

        this.scale = ( scale === undefined ) ? 1 : scale;

      },

      function ( t ) { //getPoint: t is between 0-1

        var tx = t/3 ;
        var ty = Math.sin(Math.PI * t )/8;
        var tz = 0;

        return new Three.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

      }

    );

    var path = new CustomSinCurve( 1.8 );
    var geometry20 = new Three.TubeGeometry( path, 32, .03, 32, false );
    var mesh11 = new Three.Mesh( geometry20, grey );
    mesh11.position.set(-1.1,.35,.15);
    mesh11.rotation.x+=Math.PI/2;
    mesh11.rotation.z+=Math.PI/4;
    mesh.add( mesh11 );

    var mesh12 = new Three.Mesh( geometry20, grey );
    mesh12.position.set(-1.1,.85,.15);
    mesh12.rotation.x+=Math.PI/2;
    mesh12.rotation.z+=Math.PI/4;
    mesh.add( mesh12 );

    var geometry40 = new Three.CylinderGeometry( 0.03, 0.03, .01, 32 );
    var tappo01 = new Three.Mesh( geometry40, grey );
    tappo01.position.set(-1.1,.35,.15);
    tappo01.rotation.x+=Math.PI/2;
    mesh.add(tappo01);

    var tappo02 = new Three.Mesh( geometry40, grey );
    tappo02.position.set(-1.1,.85,.15);
    tappo02.rotation.x+=Math.PI/2;
    mesh.add(tappo02);

    var tappo03 = new Three.Mesh( geometry40, grey );
    tappo03.position.set(-.675,.35,.575);
    tappo03.rotation.z+=Math.PI/2;
    mesh.add(tappo03);

    var tappo04 = new Three.Mesh( geometry40, grey );
    tappo04.position.set(-.675,.85,.575);
    tappo04.rotation.z+=Math.PI/2;
    mesh.add(tappo04);


    var geometry21 = new Three.TorusGeometry( .5, .08, 32, 32, Math.PI/2 );
    var torus = new Three.Mesh( geometry21, grey );
    torus.position.set(-1,.70,1.1);
    mesh.add( torus );

    var torus2 = new Three.Mesh( geometry21, grey );
    torus2.rotation.x+=Math.PI;
    torus2.position.set(-1,.50,1.1);
    mesh.add( torus2 );

    var roundedRectShape2 = new Three.Shape();

    let x1=0;
    let y1=0;
    let width1=.8;
    let height1=.8;
    let radius1=0.25;

    roundedRectShape2.moveTo( x1, y1 + radius1 );
    roundedRectShape2.lineTo( x1, y1 + height1 - radius1 );
    roundedRectShape2.quadraticCurveTo( x1, y1 + height1, x1 + radius1, y1 + height1 );
    roundedRectShape2.lineTo( x1 + width1 - radius1, y1 + height1) ;
    roundedRectShape2.quadraticCurveTo( x1 + width1, y1 + height1, x1 + width1, y1 + height1 - radius1 );
    roundedRectShape2.lineTo( x1 + width1, y1 + radius1 );
    roundedRectShape2.quadraticCurveTo( x1 + width1, y1, x1 + width1 - radius1, y1 );
    roundedRectShape2.lineTo( x1 + radius1, y1 );
    roundedRectShape2.quadraticCurveTo( x1, y1, x1, y1 + radius1 );

    var extrudeSettings2 = {
      steps: 2,
      amount: 0.1,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    var geometry22 = new Three.ExtrudeGeometry( roundedRectShape2, extrudeSettings2 );
    var mesh2 = new Three.Mesh( geometry22, red ) ;

    mesh2.position.set(-.9,.2,.45);
    mesh.add(mesh2);

    var roundedRectShape3 = new Three.Shape();

    let x2=0;
    let y2=0;
    let width2=.8;
    let height2=.8;
    let radius2=0.25;

    roundedRectShape3.moveTo( x2, y2 + radius2 );
    roundedRectShape3.lineTo( x2, y2 + height2 - radius2 );
    roundedRectShape3.quadraticCurveTo( x2, y2 + height2, x2 + radius2, y2 + height2 );
    roundedRectShape3.lineTo( x2 + width2 - radius2, y2 + height2) ;
    roundedRectShape3.quadraticCurveTo( x2 + width2, y2 + height2, x2 + width2, y2 + height2 - radius2 );
    roundedRectShape3.lineTo( x2 + width2, y2 + radius2 );
    roundedRectShape3.quadraticCurveTo( x2 + width2, y2, x2 + width2 - radius2, y2 );
    roundedRectShape3.lineTo( x2 + radius2, y2 );
    roundedRectShape3.quadraticCurveTo( x2, y2, x2, y2 + radius2 );

    var holePath = new Three.Path();
    holePath.moveTo( 3.5, 3.5 );
    holePath.absellipse( .65, .4, .035, .125, .125, Math.PI*2, false );
    roundedRectShape3.holes.push( holePath );

    var geometry30 = new Three.ExtrudeGeometry( roundedRectShape3, extrudeSettings2 );
    var mesh3 = new Three.Mesh( geometry30, red ) ;
    mesh3.position.set(-1.08,.2,.45);
    mesh3.rotation.y+=Math.PI/2;
    mesh.add(mesh3);



    let value = new Three.Box3().setFromObject(chairdesk);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);


    if (element.selected) {
      let bbox = new Three.BoxHelper(chairdesk, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      chairdesk.add(bbox);
    }

    chairdesk.rotation.y += Math.PI / 2;
    chairdesk.position.x += -DEPTH / 2.75;
    //chairdesk.position.z += WIDTH / 5.5;
    //chairdesk.position.y += -HEIGHT / 7.5 + newAltitude;
    chairdesk.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, 1.25*DEPTH / deltaX);

    return Promise.resolve(chairdesk);
  }

};
