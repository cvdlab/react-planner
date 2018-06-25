import * as Three from 'three';
import React from 'react';

const WIDTH = 140;
const DEPTH = 70;
const HEIGHT = 100;

const CHAIR_WIDTH = 55;
const CHAIR_DEPTH = 55;
const CHAIR_HEIGHT = 50;

const CHAIR_TRANSLATION = 30;

const TOTAL_DEPTH = DEPTH + CHAIR_DEPTH / 2 - (CHAIR_TRANSLATION - CHAIR_DEPTH / 2);

export default {
  name: "teaching-post",
  prototype: "items",

  info: {
    tag: ['furnishings'],
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

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    let arrow_style = {stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce"};

    return (
      <g transform={`translate(${-WIDTH / 2},${-TOTAL_DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={TOTAL_DEPTH}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
        <line key="2" x1={WIDTH / 2} x2={WIDTH / 2} y1={TOTAL_DEPTH} y2={1.5 * TOTAL_DEPTH} style={arrow_style}/>
        <line key="3" x1={.25 * WIDTH} x2={WIDTH / 2} y1={1.2 * TOTAL_DEPTH} y2={1.5 * TOTAL_DEPTH}
              style={arrow_style}/>
        <line key="4" x1={WIDTH / 2} x2={.75 * WIDTH} y1={1.5 * TOTAL_DEPTH} y2={1.2 * TOTAL_DEPTH}
              style={arrow_style}/>
        <text key="5" x="0" y="0"
              transform={`translate(${WIDTH / 2}, ${(TOTAL_DEPTH) / 2}) scale(1,-1) rotate(${textRotation})`}
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

      chair.rotation.x += -Math.PI / 2;
      chair.position.y += altitude;
      chair.position.x += -WIDTH / 3.5;
      chair.position.z += DEPTH / 4;
      chair.scale.set(1.5 * WIDTH / deltaZ, DEPTH / 1.5 / deltaX, HEIGHT / deltaY);

      return chair;
    };

    let newAltitude = element.properties.get('altitude').get('length');

    let texture = new Three.TextureLoader().load(require('./wood.jpg'));
    let materialTexture = new Three.MeshLambertMaterial({map: texture});
    let green = new Three.MeshBasicMaterial({color: 0x669966});


    let cattedra = new Three.Object3D();

    let cattedraX = 1.9;
    let cattedraY = 1.5;
    let cattedraZ = 1.2;


    let p1 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, cattedraZ), materialTexture);
    p1.position.z += cattedraZ / 2;
    p1.position.x += 0.05;
    p1.position.y += 0.05;

    let p2 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, cattedraZ), materialTexture);
    p2.position.z += cattedraZ / 2;
    p2.position.x += cattedraX - 0.05;
    p2.position.y += 0.05;

    let p3 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, cattedraZ), materialTexture);
    p3.position.z += cattedraZ / 2;
    p3.position.x += cattedraX - 0.05;
    p3.position.y += cattedraY - 0.05;

    let p4 = new Three.Mesh(new Three.BoxGeometry(0.06, 0.06, cattedraZ), materialTexture);
    p4.position.z += cattedraZ / 2;
    p4.position.x += 0.05;
    p4.position.y += cattedraY - 0.05;

    let boxMaterials = [materialTexture, materialTexture,materialTexture,materialTexture, green, materialTexture];

    let plane = new Three.Mesh(new Three.BoxGeometry(cattedraX, cattedraY, 0.04), boxMaterials);
    plane.position.x += cattedraX / 2;
    plane.position.y += cattedraY / 2;
    plane.position.z += cattedraZ;


    let backPlane = new Three.Mesh(new Three.BoxGeometry(cattedraX, (cattedraY / 2) - 0.1, 0.04), materialTexture);
    backPlane.rotation.x += Math.PI / 2;
    backPlane.position.x += cattedraX / 2;
    backPlane.position.z += cattedraZ - cattedraY / 4;


    let downPlane = new Three.Mesh(new Three.BoxGeometry(cattedraX, (cattedraY / 20), 0.04), materialTexture);
    downPlane.position.x += cattedraX / 2;
    downPlane.position.y += cattedraY / 2 + 0.4;
    downPlane.position.z += cattedraZ - 0.6;


    let leftPlane = new Three.Mesh(new Three.BoxGeometry(cattedraY, (cattedraY / 2) - 0.1, 0.04), materialTexture);
    leftPlane.rotation.x += Math.PI / 2;
    leftPlane.rotation.y += Math.PI / 2;
    leftPlane.position.x += cattedraX;
    leftPlane.position.y += cattedraY / 2;
    leftPlane.position.z += cattedraZ - cattedraY / 4;


    let rightPlane = leftPlane.clone();
    rightPlane.position.x -= cattedraX;


    let drawer = new Three.Mesh(new Three.BoxGeometry(cattedraX / 4, cattedraY, 0.4), materialTexture);
    drawer.position.x += cattedraX / 4;
    drawer.position.y += cattedraY / 2;
    drawer.position.z += cattedraZ / 1.55;


    let geometry = new Three.BoxGeometry(0.1, 0.04, 0.02);
    let handle = new Three.Mesh(geometry, materialTexture);
    handle.position.y += cattedraY / 2 + 0.02;

    let geometry2 = new Three.BoxGeometry(0.5, 0.04, 0.3);
    let p = new Three.Mesh(geometry2, green);
    p.position.y += cattedraY / 2;


    drawer.add(handle);
    drawer.add(p);
    drawer.scale.set(1.5, 1, .7);

    let drawer2 = drawer.clone();
    drawer2.position.z += (cattedraZ / 4.5);


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

    cattedra.rotation.x += -Math.PI / 2;
    cattedra.position.y += newAltitude;
    cattedra.position.x += -WIDTH / 2;
    cattedra.position.z += DEPTH / 1.5;
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

    deskAndChair.rotation.y += Math.PI;

    deskAndChair.position.z -= (CHAIR_DEPTH / 2 - (CHAIR_TRANSLATION - CHAIR_DEPTH / 2)) / 2;

    let boundingBoxDeskAndChair = new Three.Box3().setFromObject(deskAndChair);

    let deltaZDeskAndChair = Math.abs(boundingBoxDeskAndChair.max.z - boundingBoxDeskAndChair.min.z);

    deskAndChair.scale.set(1, 1, TOTAL_DEPTH / deltaZDeskAndChair); //Fix Depth problem with the chair


    return Promise.resolve(deskAndChair);
  }

};
