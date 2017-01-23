import * as Three from 'three';
import React from 'react';

const WIDTH = 120;
const DEPTH = 50;
const HEIGHT = 90;

export default {
  name: "school-desk-double",
  prototype: "items",

  info: {
    tag: ['Arredamento'],
    group: "Items",
    title: "School desk double",
    description: "school desk double",
    image: require('./school-desk-double.png')
  },

  properties: {
    altitude: {
      label: "quota",
      type: "length-measure",
      defaultValue: {
        length: 0,
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

    let arrow_style = {stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce"};

    return (
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH + DEPTH/2}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
        <line key="2" x1={WIDTH/2} x2={WIDTH/2} y1={DEPTH + DEPTH/2}  y2={1.5*DEPTH +DEPTH/2} style={arrow_style}/>
        <line key="3" x1={.25*WIDTH} x2={WIDTH/2} y1={1.2*DEPTH+DEPTH/2} y2={1.5*DEPTH+DEPTH/2} style={arrow_style} />
        <line key="4" x1={WIDTH/2} x2={.75*WIDTH} y1={1.5*DEPTH+DEPTH/2} y2={1.2*DEPTH+DEPTH/2} style={arrow_style} />
        <text key="5" x="0" y="0"
              transform={`translate(${WIDTH / 2}, ${(DEPTH+DEPTH/2) / 2}) scale(1,-1) rotate(${angle/2})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let makeChair = (altitude) => {

      let WIDTH = 55;
      let DEPTH = 55;
      let HEIGHT = 50;

      var chair = new Three.Object3D();

      var geometry = new Three.CylinderGeometry(0.02, 0.02, 0.5, 32);
      var material = new Three.MeshLambertMaterial({color: 0xd9d7d7});

      var p1 = new Three.Mesh(geometry, material);
      p1.rotation.x += Math.PI / 2;
      p1.position.z += 0.5 / 2;

      var p2 = new Three.Mesh(geometry, material);
      p2.rotation.x += Math.PI / 2;
      p2.position.z += 0.5 / 2;
      p2.position.y += 0.4;

      var p3 = new Three.Mesh(geometry, material);
      p3.rotation.x += Math.PI / 2;
      p3.position.z += 0.5 / 2;
      p3.position.x += 0.4;

      var p4 = new Three.Mesh(geometry, material);
      p4.rotation.x += Math.PI / 2;
      p4.position.z += 0.5 / 2;
      p4.position.y += 0.4;
      p4.position.x += 0.4;

      var p5 = new Three.Mesh(geometry, material);
      p5.rotation.x += Math.PI / 2;
      p5.position.z += 0.5 * 3 / 2;

      var p6 = new Three.Mesh(geometry, material);
      p6.rotation.x += Math.PI / 2;
      p6.position.z += 0.5 * 3 / 2;
      p6.position.x += 0.4;

//      material = new Three.MeshLambertMaterial({color: 0x9b8c75});
      var texture = new Three.TextureLoader().load(require('./wood.jpg'));
      var materialTexture = new Three.MeshLambertMaterial( { map: texture} );


      var roundedRectShape = new Three.Shape();

      let x = 0;
      let y = 0;
      let width = .5;
      let height = .48;
      let radius = 0.05;

      roundedRectShape.moveTo(x, y + radius);
      roundedRectShape.lineTo(x, y + height - radius);
      roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
      roundedRectShape.lineTo(x + width - radius, y + height);
      roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
      roundedRectShape.lineTo(x + width, y + radius);
      roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
      roundedRectShape.lineTo(x + radius, y);
      roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

      var extrudeSettings = {
        steps: 2,
        amount: 0.03,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      };

      var geometry50 = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
      var plane = new Three.Mesh(geometry50, materialTexture);


      plane.position.x += -0.05;
      plane.position.y += -0.04;
      plane.position.z += 0.5;

      var roundedRectShape2 = new Three.Shape();

      let x1 = 0;
      let y1 = 0;
      let width1 = .45;
      let height1 = .25;
      let radius1 = 0.05;

      roundedRectShape2.moveTo(x1, y1 + radius1);
      roundedRectShape2.lineTo(x1, y1 + height1 - radius1);
      roundedRectShape2.quadraticCurveTo(x1, y1 + height1, x1 + radius1, y1 + height1);
      roundedRectShape2.lineTo(x1 + width1 - radius1, y1 + height1);
      roundedRectShape2.quadraticCurveTo(x1 + width1, y1 + height1, x1 + width1, y1 + height1 - radius1);
      roundedRectShape2.lineTo(x1 + width1, y1 + radius1);
      roundedRectShape2.quadraticCurveTo(x1 + width1, y1, x1 + width1 - radius1, y1);
      roundedRectShape2.lineTo(x1 + radius1, y1);
      roundedRectShape2.quadraticCurveTo(x1, y1, x1, y1 + radius1);

      var extrudeSettings2 = {
        steps: 2,
        amount: 0.03,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      };

      var geometry22 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
      var back = new Three.Mesh(geometry22, materialTexture);


      //geometry = new Three.BoxGeometry( 0.38, 0.02, 0.15);
      //var back = new Three.Mesh( geometry, material );
      back.rotation.x += Math.PI / 2;
      back.position.z += 0.5 * 12 / 8;
      back.position.y += 0.03;
      back.position.x += -0.025;

      chair.add(back);
      chair.add(plane);
      chair.add(p1);
      chair.add(p2);
      chair.add(p3);
      chair.add(p4);
      chair.add(p5);
      chair.add(p6);


      let aa = new Three.Box3().setFromObject(chair);

      let deltaX = Math.abs(aa.max.x - aa.min.x);
      let deltaY = Math.abs(aa.max.y - aa.min.y);
      let deltaZ = Math.abs(aa.max.z - aa.min.z);

      // if (element.selected) {
      //   let bbox = new Three.BoxHelper(chair, 0x99c3fb);
      //   bbox.material.linewidth = 5;
      //   bbox.renderOrder = 1000;
      //   bbox.material.depthTest = false;
      //   chair.add(bbox);
      // }

      chair.rotation.x += -Math.PI / 2;
      chair.position.y += altitude;
      chair.position.x += -WIDTH / 3.5;
      chair.position.z += DEPTH / 4;
      chair.scale.set(1.5 * WIDTH / deltaZ, DEPTH / 1.5 / deltaX, HEIGHT / deltaY);

      return chair;
    };

    let newAltitude = element.properties.get('altitude').get('length');

    var brown = new Three.MeshLambertMaterial( {color: 0x9b8c75} );
    var grey = new Three.MeshLambertMaterial( {color: 0xd9d7d7} );

    var texture = new Three.TextureLoader().load(require('./wood.jpg'));
    var materialTexture = new Three.MeshLambertMaterial( { map: texture} );


    var newDepth = .5;
    var newWidth = .9;
    var newHeight = 1;
    var raggio = .03;

    var bancoDouble = new Three.Object3D();

    var geometry = new Three.BoxGeometry( newWidth+newWidth/6, newHeight/20, newDepth+newDepth/4 );

    var boxMaterials = [
      new Three.MeshBasicMaterial( { map: texture} ),
      new Three.MeshBasicMaterial( { map: texture} ),
      new Three.MeshBasicMaterial( {color:0x669966}), //top
      new Three.MeshBasicMaterial( { map: texture} ),
      new Three.MeshBasicMaterial( { map: texture} ),
      new Three.MeshBasicMaterial( { map: texture} )
    ];

    var tMaterial = new Three.MeshFaceMaterial(boxMaterials);

    var plane = new Three.Mesh( geometry, tMaterial);
    plane.position.y = newHeight;
    bancoDouble.add(plane);

    var geometry_legs = new Three.CylinderGeometry( raggio, raggio, newHeight, 32 );

    var geometry2 = new Three.BoxGeometry( newWidth, newHeight/20, newDepth );
    var plane2 = new Three.Mesh( geometry2, materialTexture );
    plane2.position.y = newHeight/2+newHeight/4;
    bancoDouble.add(plane2);

    var geometry3 = new Three.BoxGeometry( newWidth, newHeight/10, newDepth/20 );
    var plane3 = new Three.Mesh( geometry3, materialTexture );
    plane3.position.y = newHeight/2+newHeight/4+newHeight/16;
    plane3.position.z = newDepth/3+newDepth/5;
    bancoDouble.add(plane3);

    var p1 = new Three.Mesh( geometry_legs, grey );
    p1.position.x = newWidth/2;
    p1.position.z = newDepth/2;
    p1.position.y = newHeight/2;
    p1.scale.set(.5,1,.75);
    bancoDouble.add(p1);

    var p2 = new Three.Mesh( geometry_legs, grey );
    p2.position.x = newWidth/2;
    p2.position.z = -newDepth/2;
    p2.position.y = newHeight/2;
    p2.scale.set(.5,1,.75);
    bancoDouble.add(p2);

    var p3 = new Three.Mesh( geometry_legs, grey );
    p3.position.x = -newWidth/2;
    p3.position.z = newDepth/2;
    p3.position.y = newHeight/2;
    p3.scale.set(.5,1,.75);
    bancoDouble.add(p3);

    var p4 = new Three.Mesh( geometry_legs, grey );
    p4.position.x = -newWidth/2;
    p4.position.z = -newDepth/2;
    p4.position.y = newHeight/2;
    p4.scale.set(.5,1,.75);
    bancoDouble.add(p4);


    let valueObject = new Three.Box3().setFromObject(bancoDouble);

    let deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
    let deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
    let deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);


    // if (element.selected) {
    //   let bbox = new Three.BoxHelper(bancoDouble, 0x99c3fb);
    //   bbox.material.linewidth = 5;
    //   bbox.renderOrder = 1000;
    //   bbox.material.depthTest = false;
    //   bancoDouble.add(bbox);
    // }

    bancoDouble.rotation.y+=Math.PI;
    bancoDouble.position.y+= newAltitude;
    bancoDouble.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ );

    let chair = makeChair(newAltitude);
    chair.position.z += 30;
    chair.position.x += 25;

    let chair2 = makeChair(newAltitude);
    chair2.position.z += 30;
    chair2.position.x -= 25;

    let deskAndChairDouble = new Three.Object3D();
    deskAndChairDouble.add(bancoDouble);
    deskAndChairDouble.add(chair);
    deskAndChairDouble.add(chair2);

    if (element.selected) {
      let bbox = new Three.BoxHelper(deskAndChairDouble, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      deskAndChairDouble.add(bbox);
    }

    deskAndChairDouble.position.z-=DEPTH/4;

    return Promise.resolve(deskAndChairDouble);
  }

};

