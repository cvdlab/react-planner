import * as Three from 'three';
import React from 'react';

const WIDTH = 140;
const DEPTH = 70;
const HEIGHT = 100;

export default {
  name: "teaching-post",
  prototype: "items",

  info: {
    tag: ['Furnishings'],
    group: "teaching post",
    title: "Teaching post",
    description: "Teaching post",
    image: require('./teaching-post.png')
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
    //console.log(angle);

    if (angle>-180 && angle<0)
      angle =  360;
    else
      angle = 0;

    let arrow_style = {stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce"};

    return (
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH + DEPTH/4}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
        <line key="2" x1={WIDTH/2} x2={WIDTH/2} y1={DEPTH+DEPTH/4}  y2={1.5*DEPTH+DEPTH/4} style={arrow_style}/>
        <line key="3" x1={.25*WIDTH} x2={WIDTH/2} y1={1.2*DEPTH+DEPTH/4} y2={1.5*DEPTH+DEPTH/4} style={arrow_style} />
        <line key="4" x1={WIDTH/2} x2={.75*WIDTH} y1={1.5*DEPTH+DEPTH/4} y2={1.2*DEPTH+DEPTH/4} style={arrow_style} />
        <text key="5" x="0" y="0"
              transform={`translate(${WIDTH / 2}, ${(DEPTH + DEPTH/4) / 2}) scale(1,-1) rotate(${angle/2})`}
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

    var texture = new Three.TextureLoader().load(require('./wood.jpg'));
    var materialTexture = new Three.MeshLambertMaterial( { map: texture} );
    var green = new Three.MeshBasicMaterial({color:0x669966});



    var cattedra = new Three.Object3D();

    var cattedraX = 1.9;
    var cattedraY = 1.5;
    var cattedraZ = 1.2;



    var p1 = new Three.Mesh(new Three.BoxGeometry( 0.06, 0.06, cattedraZ), materialTexture);
    p1.position.z += cattedraZ/2;
    p1.position.x += 0.05;
    p1.position.y += 0.05;

    var p2 = new Three.Mesh(new Three.BoxGeometry( 0.06, 0.06, cattedraZ), materialTexture);
    p2.position.z += cattedraZ/2;
    p2.position.x += cattedraX - 0.05;
    p2.position.y += 0.05;

    var p3 = new Three.Mesh(new Three.BoxGeometry( 0.06, 0.06, cattedraZ), materialTexture);
    p3.position.z += cattedraZ/2;
    p3.position.x += cattedraX - 0.05;
    p3.position.y += cattedraY - 0.05;

    var p4 = new Three.Mesh(new Three.BoxGeometry( 0.06, 0.06, cattedraZ), materialTexture);
    p4.position.z += cattedraZ/2;
    p4.position.x += 0.05;
    p4.position.y += cattedraY - 0.05;



    var boxMaterials = [
      new Three.MeshLambertMaterial( { map: texture} ),
      new Three.MeshLambertMaterial( { map: texture} ),
      new Three.MeshLambertMaterial( { map: texture} ),
      new Three.MeshLambertMaterial( { map: texture} ),
      new Three.MeshBasicMaterial({color:0x669966}), //top
      new Three.MeshLambertMaterial( { map: texture} )
    ];

    var tMaterial = new Three.MeshFaceMaterial(boxMaterials);
    var plane = new Three.Mesh (new Three.BoxGeometry( cattedraX, cattedraY, 0.04 ), tMaterial);
    plane.position.x += cattedraX/2;
    plane.position.y += cattedraY/2;
    plane.position.z += cattedraZ;


    var backPlane = new Three.Mesh (new Three.BoxGeometry( cattedraX, (cattedraY/2)-0.1, 0.04 ), materialTexture);
    backPlane.rotation.x += Math.PI/2;
    backPlane.position.x += cattedraX/2;
    backPlane.position.z += cattedraZ-cattedraY/4;


    var downPlane = new Three.Mesh (new Three.BoxGeometry( cattedraX, (cattedraY/20), 0.04 ), materialTexture);
    downPlane.position.x += cattedraX/2;
    downPlane.position.y += cattedraY/2+0.4;
    downPlane.position.z += cattedraZ-0.6;


    var leftPlane = new Three.Mesh (new Three.BoxGeometry( cattedraY, (cattedraY/2)-0.1, 0.04 ), materialTexture);
    leftPlane.rotation.x += Math.PI/2;
    leftPlane.rotation.y += Math.PI/2;
    leftPlane.position.x += cattedraX;
    leftPlane.position.y += cattedraY/2;
    leftPlane.position.z += cattedraZ-cattedraY/4;


    var rightPlane = leftPlane.clone();
    rightPlane.position.x -= cattedraX;


    var drawer = new Three.Mesh (new Three.BoxGeometry( cattedraX/4, cattedraY, 0.4 ), materialTexture);
    drawer.position.x += cattedraX/4;
    drawer.position.y += cattedraY/2;
    drawer.position.z += cattedraZ/1.55;


    var geometry = new Three.BoxGeometry( 0.1, 0.04, 0.02 );
    var handle = new Three.Mesh( geometry, materialTexture );
    handle.position.y += cattedraY/2+0.02;

    var geometry2 = new Three.BoxGeometry( 0.5, 0.04, 0.3 );
    var p = new Three.Mesh( geometry2, green );
    p.position.y += cattedraY/2;


    drawer.add(handle);
    drawer.add(p);
    drawer.scale.set(1.5,1,.7);

    var drawer2 = drawer.clone();
    drawer2.position.z += (cattedraZ/4.5);



    cattedra.add(p1);
    cattedra.add(p2);
    cattedra.add(p3);
    cattedra.add(p4);
    cattedra.add(plane);
    cattedra.add(drawer);
    cattedra.add(drawer2);
    cattedra.add(backPlane);
    cattedra.add(leftPlane);
    cattedra.add(rightPlane);
    cattedra.add(downPlane);



    let valueObject = new Three.Box3().setFromObject(cattedra);

    let deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
    let deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
    let deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);


    // if (element.selected) {
    //   let bbox = new Three.BoxHelper(cattedra, 0x99c3fb);
    //   bbox.material.linewidth = 5;
    //   bbox.renderOrder = 1000;
    //   bbox.material.depthTest = false;
    //   cattedra.add(bbox);
    // }


    cattedra.rotation.x+=-Math.PI/2;
    cattedra.position.y+= newAltitude;
    cattedra.position.x+= -WIDTH/2;
    cattedra.position.z+= DEPTH/1.5;
    cattedra.scale.set(WIDTH / deltaX, DEPTH / deltaZ, HEIGHT / deltaY);

    let chair = makeChair(newAltitude);
    chair.rotation.z += Math.PI;
    chair.position.z -= 70;
    chair.position.x += 60;

    let deskAndChair = new Three.Object3D();
    deskAndChair.add(cattedra);
    deskAndChair.add(chair);

    if (element.selected) {
      let bbox = new Three.BoxHelper(deskAndChair, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      deskAndChair.add(bbox);
    }

    deskAndChair.position.z += DEPTH/4;
    deskAndChair.rotation.y += Math.PI;

    return Promise.resolve(deskAndChair);
  }

};

