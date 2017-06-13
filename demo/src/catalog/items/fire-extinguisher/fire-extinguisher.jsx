import * as Three from 'three';
import React from 'react';

const RADIUS = 15;
const HEIGHT = 60;

export default {
  name: "fire-extinguisher",
  prototype: "items",

  info: {
    tag: ['Security', 'Optional'],
    group: "Items",
    title: "Fire extinguisher",
    description: "Estintore",
    image: require('./fire-extinguisher.png')
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 100,
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
      <g transform={`translate(${-RADIUS / (RADIUS / 2)},${-(RADIUS + 5) / (RADIUS / 2) })`}>
        <ellipse key="1" cx="0" cy="0" rx={RADIUS + 5} ry={RADIUS}
                 style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ff0000"}}/>
        <line key="2" x1={0} x2={0} y1={RADIUS} y2={2 * RADIUS} style={arrow_style}/>
        <line key="3" x1={-RADIUS / 2 + .15 * RADIUS} x2={-RADIUS / 2 + RADIUS / 2} y1={1.2 * RADIUS} y2={2 * RADIUS}
              style={arrow_style}/>
        <line key="4" x1={0} x2={-RADIUS / 2 + .85 * RADIUS} y1={2 * RADIUS} y2={1.2 * RADIUS} style={arrow_style}/>
        <text key="5" cx={RADIUS} cy={RADIUS}
              transform={ `translate(${RADIUS / 8}, ${0}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    //colors
    let black = new Three.MeshLambertMaterial({color: 0x000000});
    let red = new Three.MeshLambertMaterial({color: 0xff0000});
    let grey = new Three.MeshLambertMaterial({color: 0xCCCCCC});
    let yellow = new Three.MeshLambertMaterial({color: 0xffff00});

    let fireExtinguisher = new Three.Object3D();

    let bodyGeometry = new Three.CylinderGeometry(0.1, 0.1, 0.5, 32);
    let body = new Three.Mesh(bodyGeometry, red);
    body.position.set(0, 1, 0);
    fireExtinguisher.add(body);

    let bodyGeometry2 = new Three.CylinderGeometry(0.11, 0.11, 0.03, 32);
    let lock = new Three.Mesh(bodyGeometry2, black);
    lock.position.set(0, -0.2, 0);
    body.add(lock);

    let geometrySphereUp = new Three.SphereGeometry(0.1, 32, 32);
    let sphereUp = new Three.Mesh(geometrySphereUp, red);
    sphereUp.position.set(0, 0.25, 0);
    body.add(sphereUp);

    let cylinderGeometry = new Three.CylinderGeometry(0.015, 0.025, 0.05, 32);
    let vent_p1 = new Three.Mesh(cylinderGeometry, black);
    vent_p1.position.z = -0.13;
    vent_p1.position.y = -0.23;
    body.add(vent_p1);

    let cylinderGeometry1 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
    let vent_p2 = new Three.Mesh(cylinderGeometry1, grey);
    vent_p2.position.z = -0.13;
    vent_p2.position.y = -0.2;
    body.add(vent_p2);

    let cylinderGeometry2 = new Three.CylinderGeometry(0.015, 0.02, 0.04, 32);
    let cylinder2 = new Three.Mesh(cylinderGeometry2, black);
    cylinder2.position.set(0, 0.35, 0);
    body.add(cylinder2);

    let cylinderGeometry3 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
    let cylinder3 = new Three.Mesh(cylinderGeometry3, grey);
    cylinder3.position.set(0, 0.38, 0);
    body.add(cylinder3);

    let cylinderGeometry4 = new Three.CylinderGeometry(0.005, 0.005, 0.02, 32);
    let cylinder4 = new Three.Mesh(cylinderGeometry4, grey);
    cylinder4.position.set(-0.01, 0.38, 0);
    cylinder4.rotation.z += Math.PI / 2;
    body.add(cylinder4);

    let cylinderGeometry5 = new Three.CylinderGeometry(0.02, 0.02, 0.01, 32);
    let cylinder5 = new Three.Mesh(cylinderGeometry5, grey);
    cylinder5.position.set(-0.02, 0.38, 0);
    cylinder5.rotation.z += Math.PI / 2;
    body.add(cylinder5);

    let textureLoader = new Three.TextureLoader();
    let gageImage = textureLoader.load(require('./gage-image.png'));

    let geometry2 = new Three.PlaneGeometry(0.04, 0.04);
    let material2 = new Three.MeshLambertMaterial({map: gageImage, transparent: true});
    let gage = new Three.Mesh(geometry2, material2);
    gage.position.set(-0.0255, 0.38, 0);
    gage.rotation.y = -Math.PI / 2;
    body.add(gage);

    let cylinderGeometry6 = new Three.CylinderGeometry(0.005, 0.005, 0.03, 32);
    let cylinder6 = new Three.Mesh(cylinderGeometry6, grey);
    cylinder6.position.set(0, 0.38, -0.01);
    cylinder6.rotation.z += Math.PI / 2;
    cylinder6.rotation.y += Math.PI / 2;
    body.add(cylinder6);

    let cylinderGeometry7 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
    let cylinder7 = new Three.Mesh(cylinderGeometry7, grey);
    cylinder7.position.set(0, 0.38, -0.03);
    cylinder7.rotation.z += Math.PI / 2;
    cylinder7.rotation.y += Math.PI / 2;
    body.add(cylinder7);

    let etichettaImage = textureLoader.load(require('./label-fire-extinguisher.png'));

    let points = [];

    points.push(new Three.Vector2(0.1, 0));
    points.push(new Three.Vector2(0.1, 0));
    points.push(new Three.Vector2(0.1, 0.3));
    points.push(new Three.Vector2(0.1, 0.3));

    let geometry = new Three.LatheGeometry(points, 200, 0, Math.PI);
    let material = new Three.MeshLambertMaterial({map: etichettaImage});
    let etichetta = new Three.Mesh(geometry, material);

    etichetta.rotation.y = 60;
    etichetta.position.y = -0.1;
    body.add(etichetta);

    let shape2 = new Three.Shape();
    shape2.moveTo(0.02, 0.06);
    shape2.lineTo(0.06, 0.07);
    shape2.lineTo(0.08, 0.1);
    shape2.lineTo(0.16, 0.1);
    shape2.lineTo(0.18, 0.09);
    shape2.lineTo(0.09, 0.08);
    shape2.lineTo(0.07, 0.05);
    shape2.lineTo(0.02, 0.04);

    let extrudeSettings = {
      steps: 2,
      amount: 0.02,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    let geometry4 = new Three.ExtrudeGeometry(shape2, extrudeSettings);
    let material4 = new Three.MeshLambertMaterial({color: 0xff0000});
    let valve_p1 = new Three.Mesh(geometry4, material4);
    valve_p1.rotation.y = -Math.PI / 2;
    valve_p1.position.set(0.01, 0.35, -0.035);
    body.add(valve_p1);

    let shape3 = new Three.Shape();
    shape3.moveTo(0.02, 0.06);
    shape3.lineTo(0.04, 0.06);
    shape3.lineTo(0.16, 0.05);
    shape3.lineTo(0.18, 0.03);
    shape3.lineTo(0.16, 0.04);
    shape3.lineTo(0.02, 0.04);

    let extrudeSettings2 = {
      steps: 2,
      amount: 0.016,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    let geometry5 = new Three.ExtrudeGeometry(shape3, extrudeSettings2);
    let valve_p2 = new Three.Mesh(geometry5, red);
    valve_p2.rotation.y = -Math.PI / 2;
    valve_p2.position.set(0.01, 0.34, -0.035);
    body.add(valve_p2);

    let geometry6 = new Three.TorusGeometry(0.0075, 0.00125, 16, 32, 1200);
    let safetyValve_p1 = new Three.Mesh(geometry6, yellow);
    safetyValve_p1.rotation.x = -Math.PI / 2;
    safetyValve_p1.position.set(-0.023, 0.41, 0.02);
    body.add(safetyValve_p1);

    let cylinderGeometry8 = new Three.CylinderGeometry(0.001, 0.001, 0.03, 32);
    let safetyValve_p2 = new Three.Mesh(cylinderGeometry8, yellow);
    safetyValve_p2.position.set(0, 0.41, 0.02);
    safetyValve_p2.rotation.z += Math.PI / 2;
    body.add(safetyValve_p2);

    let cylinderGeometry9 = new Three.CylinderGeometry(0.0025, 0.0025, 0.026, 32);
    let cylinder9 = new Three.Mesh(cylinderGeometry9, grey);
    cylinder9.position.set(0, 0.40, 0.0);
    cylinder9.rotation.z += Math.PI / 2;
    body.add(cylinder9);

    let curve = new Three.CatmullRomCurve3([
      new Three.Vector3(.5, 0, 0),
      new Three.Vector3(.5, 0, 0),
      new Three.Vector3(0, 0, 0),
      new Three.Vector3(-0.03, .1050, 0),
      new Three.Vector3(-0.03, .1050, 0)
    ]);

    let geometry7 = new Three.TubeGeometry(curve, 32, 0.008, 16, false);
    let mesh = new Three.Mesh(geometry7, black);
    mesh.position.set(0, 0.35, -0.13);
    mesh.rotation.y -= Math.PI / 2;
    mesh.rotation.z = (Math.PI / 2) + (4 * Math.PI);
    mesh.rotation.x += Math.PI;
    body.add(mesh);

    let value = new Three.Box3().setFromObject(fireExtinguisher);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    if (element.selected) {
      let bbox = new Three.BoxHelper(fireExtinguisher, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      fireExtinguisher.add(bbox);
    }

    fireExtinguisher.rotation.y += -Math.PI / 2;
    fireExtinguisher.position.y += -HEIGHT / 1.15 + newAltitude;
    fireExtinguisher.scale.set(RADIUS / deltaX, RADIUS / deltaX, HEIGHT / deltaY);

    return Promise.resolve(fireExtinguisher);
  }

};
