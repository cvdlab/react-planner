import * as Three from 'three';
import React from 'react';

const WIDTH = 70;
const DEPTH = 50;
const HEIGHT = 90;

const CHAIR_WIDTH = 55;
const CHAIR_DEPTH = 55;
const CHAIR_HEIGHT = 50;

const CHAIR_TRANSLATION = 30;

const TOTAL_DEPTH = DEPTH + CHAIR_DEPTH / 2 - (CHAIR_TRANSLATION - CHAIR_DEPTH / 2);

export default {
  name: "school-desk",
  prototype: "items",

  info: {
    tag: ['furnishings'],
    title: "School desk",
    description: "School desk",
    image: require('./school-desk.png')
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

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    let arrow_style = {stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce"};

    return (
      <g transform={`translate(${-WIDTH / 2},${-TOTAL_DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={TOTAL_DEPTH}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
        <line key="2" x1={WIDTH / 2} x2={WIDTH / 2} y1={DEPTH + DEPTH / 2} y2={1.5 * DEPTH + DEPTH / 2}
              style={arrow_style}/>
        <line key="3" x1={.25 * WIDTH} x2={WIDTH / 2} y1={1.2 * DEPTH + DEPTH / 2} y2={1.5 * DEPTH + DEPTH / 2}
              style={arrow_style}/>
        <line key="4" x1={WIDTH / 2} x2={.75 * WIDTH} y1={1.5 * DEPTH + DEPTH / 2} y2={1.2 * DEPTH + DEPTH / 2}
              style={arrow_style}/>
        <text key="5" x="0" y="0"
              transform={`translate(${WIDTH / 2}, ${TOTAL_DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let makeChair = (altitude) => {

      let WIDTH = CHAIR_WIDTH;
      let DEPTH = CHAIR_DEPTH;
      let HEIGHT = CHAIR_HEIGHT;

      let chair = new Three.Object3D();

      let geometry = new Three.CylinderGeometry(0.02, 0.02, 0.5, 32);
      let material = new Three.MeshLambertMaterial({color: 0xd9d7d7});

      let p1 = new Three.Mesh(geometry, material);
      p1.rotation.x += Math.PI / 2;
      p1.position.z += 0.5 / 2;

      let p2 = new Three.Mesh(geometry, material);
      p2.rotation.x += Math.PI / 2;
      p2.position.z += 0.5 / 2;
      p2.position.y += 0.4;

      let p3 = new Three.Mesh(geometry, material);
      p3.rotation.x += Math.PI / 2;
      p3.position.z += 0.5 / 2;
      p3.position.x += 0.4;

      let p4 = new Three.Mesh(geometry, material);
      p4.rotation.x += Math.PI / 2;
      p4.position.z += 0.5 / 2;
      p4.position.y += 0.4;
      p4.position.x += 0.4;

      let p5 = new Three.Mesh(geometry, material);
      p5.rotation.x += Math.PI / 2;
      p5.position.z += 0.5 * 3 / 2;

      let p6 = new Three.Mesh(geometry, material);
      p6.rotation.x += Math.PI / 2;
      p6.position.z += 0.5 * 3 / 2;
      p6.position.x += 0.4;

      // material = new Three.MeshLambertMaterial({color: 0x9b8c75});
      let texture = new Three.TextureLoader().load(require('./wood.jpg'));
      let materialTexture = new Three.MeshLambertMaterial({map: texture});


      let roundedRectShape = new Three.Shape();

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

      let extrudeSettings = {
        steps: 2,
        depth: 0.03,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      };

      let geometry50 = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
      let plane = new Three.Mesh(geometry50, materialTexture);


      plane.position.x += -0.05;
      plane.position.y += -0.04;
      plane.position.z += 0.5;

      let roundedRectShape2 = new Three.Shape();

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

      let extrudeSettings2 = {
        steps: 2,
        depth: 0.03,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      };

      let geometry22 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
      let back = new Three.Mesh(geometry22, materialTexture);


      //geometry = new Three.BoxGeometry( 0.38, 0.02, 0.15);
      //let back = new Three.Mesh( geometry, material );
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

    let brown = new Three.MeshLambertMaterial({color: 0x9b8c75});
    let grey = new Three.MeshLambertMaterial({color: 0xd9d7d7});
    let black = new Three.MeshLambertMaterial({color: 0x000000});

    let texture = new Three.TextureLoader().load(require('./wood.jpg'));
    let materialTexture = new Three.MeshLambertMaterial({map: texture});


    let newDepth = .5;
    let newWidth = .9;
    let newHeight = 1;
    let raggio = .03;

    let banco = new Three.Object3D();

    let geometry = new Three.BoxGeometry(newWidth + newWidth / 6, newHeight / 20, newDepth + newDepth / 4);

    let boxMaterials = [
      new Three.MeshBasicMaterial({map: texture}),
      new Three.MeshBasicMaterial({map: texture}),
      new Three.MeshBasicMaterial({color: 0x669966}), //top
      new Three.MeshBasicMaterial({map: texture}),
      new Three.MeshBasicMaterial({map: texture}),
      new Three.MeshBasicMaterial({map: texture})
    ];

    let tMaterial = new Three.MultiMaterial(boxMaterials);

    let plane = new Three.Mesh(geometry, tMaterial);
    plane.position.y = newHeight;
    banco.add(plane);

    let geometry_legs = new Three.CylinderGeometry(raggio, raggio, newHeight, 32);

    let geometry2 = new Three.BoxGeometry(newWidth, newHeight / 20, newDepth);
    let plane2 = new Three.Mesh(geometry2, materialTexture);
    plane2.position.y = newHeight / 2 + newHeight / 4;
    banco.add(plane2);

    let geometry3 = new Three.BoxGeometry(newWidth, newHeight / 10, newDepth / 20);
    let plane3 = new Three.Mesh(geometry3, materialTexture);
    plane3.position.y = newHeight / 2 + newHeight / 4 + newHeight / 16;
    plane3.position.z = newDepth / 3 + newDepth / 5;
    banco.add(plane3);

    let p1 = new Three.Mesh(geometry_legs, grey);
    p1.position.x = newWidth / 2;
    p1.position.z = newDepth / 2;
    p1.position.y = newHeight / 2;
    banco.add(p1);

    let p2 = new Three.Mesh(geometry_legs, grey);
    p2.position.x = newWidth / 2;
    p2.position.z = -newDepth / 2;
    p2.position.y = newHeight / 2;
    banco.add(p2);

    let p3 = new Three.Mesh(geometry_legs, grey);
    p3.position.x = -newWidth / 2;
    p3.position.z = newDepth / 2;
    p3.position.y = newHeight / 2;
    banco.add(p3);

    let p4 = new Three.Mesh(geometry_legs, grey);
    p4.position.x = -newWidth / 2;
    p4.position.z = -newDepth / 2;
    p4.position.y = newHeight / 2;
    banco.add(p4);


    let valueObject = new Three.Box3().setFromObject(banco);

    let deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
    let deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
    let deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);


    // if (element.selected) {
    //   let bbox = new Three.BoxHelper(banco, 0x99c3fb);
    //   bbox.material.linewidth = 5;
    //   bbox.renderOrder = 1000;
    //   bbox.material.depthTest = false;
    //   banco.add(bbox);
    // }

    banco.rotation.y += Math.PI;
    banco.position.y += newAltitude;
    banco.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    let chair = makeChair(newAltitude);
    chair.position.z += CHAIR_TRANSLATION;

    let deskAndChair = new Three.Object3D();
    deskAndChair.add(banco);
    deskAndChair.add(chair);

    if (element.selected) {
      let bbox = new Three.BoxHelper(deskAndChair, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      deskAndChair.add(bbox);
    }

    deskAndChair.position.z -= (CHAIR_DEPTH / 2 - (CHAIR_TRANSLATION - CHAIR_DEPTH / 2)) / 2;

    let boundingBoxDeskAndChair = new Three.Box3().setFromObject(deskAndChair);

    let deltaZDeskAndChair = Math.abs(boundingBoxDeskAndChair.max.z - boundingBoxDeskAndChair.min.z);

    deskAndChair.scale.set(1, 1, TOTAL_DEPTH / deltaZDeskAndChair); //Fix Depth problem with the chair

    return Promise.resolve(deskAndChair);
  }

};
