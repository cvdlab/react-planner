import * as Three from 'three';
import React from 'react';

const RADIUS =  15;
const HEIGHT =  60;

export default {
  name: "fire-extinguisher",
  prototype: "items",

  info: {
    tag: ['Sicurezza', 'Opzionale'],
    group: "Items",
    title: "Fire extinguisher",
    description: "Estintore",
    image: require('./fire-extinguisher.png')
  },

  properties: {
    altitude: {
      label: "quota",
      type: "length-measure",
      defaultValue: {
        length: 100,
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
    <g transform={`translate(${-RADIUS / (RADIUS/2)},${-(RADIUS+5) /(RADIUS/2) })`}>
      <ellipse key="1" cx="0" cy="0" rx={RADIUS+5} ry={RADIUS}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ff0000"}}/>
      <line key="2" x1={0} x2={0} y1={RADIUS}  y2={2*RADIUS} style={arrow_style}/>
      <line key="3" x1={-RADIUS/2+.15*RADIUS} x2={-RADIUS/2+RADIUS/2} y1={1.2*RADIUS} y2={2*RADIUS} style={arrow_style} />
      <line key="4" x1={0} x2={-RADIUS/2+.85*RADIUS} y1={2*RADIUS} y2={1.2*RADIUS} style={arrow_style} />
      <text key="5" cx={RADIUS} cy={RADIUS}
        transform={ `translate(${RADIUS/8}, ${0}) scale(1,-1) rotate(${angle/2})`}
        style={{textAnchor: "middle", fontSize: "11px"}}>
    {element.type}
      </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

      //colors
      var black = new Three.MeshLambertMaterial({color: 0x000000});
      var red = new Three.MeshLambertMaterial({color: 0xff0000});
      var grey = new Three.MeshLambertMaterial({color: 0xCCCCCC});
      var yellow = new Three.MeshLambertMaterial({color: 0xffff00});

      var fireExtinguisher = new Three.Object3D();

      var bodyGeometry = new Three.CylinderGeometry(0.1, 0.1, 0.5, 32);
      var body = new Three.Mesh(bodyGeometry, red);
      body.position.set(0, 1, 0);
      fireExtinguisher.add(body);

      var bodyGeometry2 = new Three.CylinderGeometry(0.11, 0.11, 0.03, 32);
      var fermo = new Three.Mesh(bodyGeometry2, black);
      fermo.position.set(0, -0.2, 0);
      body.add(fermo);

      var geometrySphereUp = new Three.SphereGeometry(0.1, 32, 32);
      var sphereUp = new Three.Mesh(geometrySphereUp, red);
      sphereUp.position.set(0, 0.25, 0);
      body.add(sphereUp);

      var cylinderGeometry = new Three.CylinderGeometry(0.015, 0.025, 0.05, 32);
      var bocchetta_p1 = new Three.Mesh(cylinderGeometry, black);
      bocchetta_p1.position.z = -0.13;
      bocchetta_p1.position.y = -0.23;
      body.add(bocchetta_p1);

      var cylinderGeometry1 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
      var bocchetta_p2 = new Three.Mesh(cylinderGeometry1, grey);
      bocchetta_p2.position.z = -0.13;
      bocchetta_p2.position.y = -0.2;
      body.add(bocchetta_p2);

      var cylinderGeometry2 = new Three.CylinderGeometry(0.015, 0.02, 0.04, 32);
      var cylinder2 = new Three.Mesh(cylinderGeometry2, black);
      cylinder2.position.set(0, 0.35, 0);
      body.add(cylinder2);

      var cylinderGeometry3 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
      var cylinder3 = new Three.Mesh(cylinderGeometry3, grey);
      cylinder3.position.set(0, 0.38, 0);
      body.add(cylinder3);

      var cylinderGeometry4 = new Three.CylinderGeometry(0.005, 0.005, 0.02, 32);
      var cylinder4 = new Three.Mesh(cylinderGeometry4, grey);
      cylinder4.position.set(-0.01, 0.38, 0);
      cylinder4.rotation.z += Math.PI / 2;
      body.add(cylinder4);

      var cylinderGeometry5 = new Three.CylinderGeometry(0.02, 0.02, 0.01, 32);
      var cylinder5 = new Three.Mesh(cylinderGeometry5, grey);
      cylinder5.position.set(-0.02, 0.38, 0);
      cylinder5.rotation.z += Math.PI / 2;
      body.add(cylinder5);

      var textureLoader = new Three.TextureLoader();
      var indicatoreImage = textureLoader.load(require('./estintoreIndicatore.png'));

      var geometry2 = new Three.PlaneGeometry(0.04, 0.04);
      var material2 = new Three.MeshLambertMaterial({map: indicatoreImage, transparent: true});
      var indicatore = new Three.Mesh(geometry2, material2);
      indicatore.position.set(-0.0255, 0.38, 0);
      indicatore.rotation.y = -Math.PI / 2;
      body.add(indicatore);

      var cylinderGeometry6 = new Three.CylinderGeometry(0.005, 0.005, 0.03, 32);
      var cylinder6 = new Three.Mesh(cylinderGeometry6, grey);
      cylinder6.position.set(0, 0.38, -0.01);
      cylinder6.rotation.z += Math.PI / 2;
      cylinder6.rotation.y += Math.PI / 2;
      body.add(cylinder6);

      var cylinderGeometry7 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
      var cylinder7 = new Three.Mesh(cylinderGeometry7, grey);
      cylinder7.position.set(0, 0.38, -0.03);
      cylinder7.rotation.z += Math.PI / 2;
      cylinder7.rotation.y += Math.PI / 2;
      body.add(cylinder7);

      var etichettaImage = textureLoader.load(require('./etichettaEstintore.png'));

      var points = [];

      points.push(new Three.Vector2(0.1, 0));
      points.push(new Three.Vector2(0.1, 0));
      points.push(new Three.Vector2(0.1, 0.3));
      points.push(new Three.Vector2(0.1, 0.3));

      var geometry = new Three.LatheGeometry(points, 200, 0, Math.PI);
      var material = new Three.MeshLambertMaterial({map: etichettaImage});
      var etichetta = new Three.Mesh(geometry, material);

      etichetta.rotation.y = 60;
      etichetta.position.y = -0.1;
      body.add(etichetta);

      var shape2 = new Three.Shape();
      shape2.moveTo(0.02, 0.06);
      shape2.lineTo(0.06, 0.07);
      shape2.lineTo(0.08, 0.1);
      shape2.lineTo(0.16, 0.1);
      shape2.lineTo(0.18, 0.09);
      shape2.lineTo(0.09, 0.08);
      shape2.lineTo(0.07, 0.05);
      shape2.lineTo(0.02, 0.04);

      var extrudeSettings = {
        steps: 2,
        amount: 0.02,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      };

      var geometry4 = new Three.ExtrudeGeometry(shape2, extrudeSettings);
      var material4 = new Three.MeshLambertMaterial({color: 0xff0000});
      var valvola_p1 = new Three.Mesh(geometry4, material4);
      valvola_p1.rotation.y = -Math.PI / 2;
      valvola_p1.position.set(0.01, 0.35, -0.035);
      body.add(valvola_p1);

      var shape3 = new Three.Shape();
      shape3.moveTo(0.02, 0.06);
      shape3.lineTo(0.04, 0.06);
      shape3.lineTo(0.16, 0.05);
      shape3.lineTo(0.18, 0.03);
      shape3.lineTo(0.16, 0.04);
      shape3.lineTo(0.02, 0.04);

      var extrudeSettings2 = {
        steps: 2,
        amount: 0.016,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      };

      var geometry5 = new Three.ExtrudeGeometry(shape3, extrudeSettings2);
      var valvola_p2 = new Three.Mesh(geometry5, red);
      valvola_p2.rotation.y = -Math.PI / 2;
      valvola_p2.position.set(0.01, 0.34, -0.035);
      body.add(valvola_p2);

      var geometry6 = new Three.TorusGeometry(0.0075, 0.00125, 16, 32, 1200);
      var sicura_p1 = new Three.Mesh(geometry6, yellow);
      sicura_p1.rotation.x = -Math.PI / 2;
      sicura_p1.position.set(-0.023, 0.41, 0.02);
      body.add(sicura_p1);

      var cylinderGeometry8 = new Three.CylinderGeometry(0.001, 0.001, 0.03, 32);
      var sicura_p2 = new Three.Mesh(cylinderGeometry8, yellow);
      sicura_p2.position.set(0, 0.41, 0.02);
      sicura_p2.rotation.z += Math.PI / 2;
      body.add(sicura_p2);

      var cylinderGeometry9 = new Three.CylinderGeometry(0.0025, 0.0025, 0.026, 32);
      var cylinder9 = new Three.Mesh(cylinderGeometry9, grey);
      cylinder9.position.set(0, 0.40, 0.0);
      cylinder9.rotation.z += Math.PI / 2;
      body.add(cylinder9);

      var CustomCurve = Three.Curve.create(
        function (scale) { //custom curve constructor

          this.scale = ( scale === undefined ) ? 1 : scale;

        },

        function (t) { //getPoint: t is between 0-1

          var tx = t * 5.1 - 15.5;
          var ty = Math.cos(2.1 * Math.PI * t / 8);
          var tz = 0;

          return new Three.Vector3(tx, ty, tz).multiplyScalar(this.scale);

        }
      );

      var path = new CustomCurve(0.1);
      var geometry7 = new Three.TubeGeometry(path, 32, 0.008, 16, false);
      var mesh = new Three.Mesh(geometry7, black);
      mesh.position.set(0, 1.35, -0.23);
      mesh.rotation.y += Math.PI / 2;
      mesh.rotation.z = (Math.PI / 2) + (4 * Math.PI);
      body.add(mesh);

      var CustomCurve2 = Three.Curve.create(
        function (scale) { //custom curve constructor

          this.scale = ( scale === undefined ) ? 1 : scale;

        },

        function (t) { //getPoint: t is between 0-1

          var tx = t * 1.5 - 5.5;
          var ty = Math.sin(3 * Math.PI / 4 * t);
          var tz = 0;

          return new Three.Vector3(tx, ty, tz).multiplyScalar(this.scale);

        }
      );

      var path2 = new CustomCurve2(0.1);
      var geometry8 = new Three.TubeGeometry(path2, 32, 0.008, 16, false);
      var mesh2 = new Three.Mesh(geometry8, black);
      mesh2.position.set(0, -0.065, -0.3375);
      mesh2.rotation.y += Math.PI / 2;
      mesh2.rotation.z = (-Math.PI / 2 + Math.PI / 5);
      body.add(mesh2);

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

    fireExtinguisher.rotation.y+= -Math.PI/2;
    fireExtinguisher.position.y+=-HEIGHT/1.15+newAltitude;
    fireExtinguisher.scale.set( RADIUS / deltaX, RADIUS / deltaX, HEIGHT / deltaY );

    return Promise.resolve(fireExtinguisher);
  }

};
