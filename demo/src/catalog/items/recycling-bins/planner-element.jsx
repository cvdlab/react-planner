import * as Three from 'three';
import React from 'react';

const WIDTH = 40;
const DEPTH = 40;
const HEIGHT = 70;

export default {
  name: "recycling-bins",
  prototype: "items",

  info: {
    tag: ['furnishings'],
    title: "recycling bins",
    description: "Recycling-bins",
    image: require('./recycling-bins.png')
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

    let rect_style = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};
    let arrow_style = {stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce"};

    return (

      <g transform={`translate(${-WIDTH * 3},${-DEPTH / 2})`}>
        <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
        <rect key="2" x="50" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
        <rect key="3" x="100" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
        <rect key="4" x="150" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
        <rect key="5" x="200" y="0" width={WIDTH} height={DEPTH} style={rect_style}/>
        <line key="7" x1={3*WIDTH} x2={3*WIDTH} y1={DEPTH}  y2={1.5*DEPTH} style={arrow_style}/>
        <line key="8" x1={2.75*WIDTH} x2={3*WIDTH} y1={1.2*DEPTH} y2={1.5*DEPTH} style={arrow_style} />
        <line key="9" x1={3*WIDTH} x2={3.25*WIDTH} y1={1.5*DEPTH} y2={1.2*DEPTH} style={arrow_style} />
        <text key="10" x="0" y="0" transform={`translate(${WIDTH * 3}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {this.info.description}
        </text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {


    let makeBin = (color) => {
      var cestino_carta = new Three.Object3D();

      var newWidth = 1;
      var newDepth = 1;
      var newHeight = 1.5;

      var grey = new Three.MeshLambertMaterial({color: 0xd9d7d7});

      let coloredMaterial = new Three.MeshLambertMaterial({color: color});

      var geometry = new Three.BoxGeometry(newWidth, newHeight, newDepth);
      var plane1 = new Three.Mesh(geometry, coloredMaterial);
      plane1.position.y = newHeight / 2;
      cestino_carta.add(plane1);

      var geometry_legs = new Three.CylinderGeometry(newWidth / 2, newWidth / 2, newWidth, 32);
      var p1 = new Three.Mesh(geometry_legs, coloredMaterial);
      p1.rotation.x += Math.PI / 2;
      p1.position.set(0, .75, 0);
      plane1.add(p1);

      var points = [];

      points.push(new Three.Vector2(0.4, -0.3));
      points.push(new Three.Vector2(0.4, -0.3));
      points.push(new Three.Vector2(0.4, 0.3));
      points.push(new Three.Vector2(0.4, 0.3));

      var geometry = new Three.LatheGeometry(points, 200, 0, Math.PI / 2);
      var etichetta = new Three.Mesh(geometry, grey);
      etichetta.rotation.y += Math.PI;
      etichetta.rotation.x += Math.PI / 2;
      etichetta.position.set(-.1, .8, 0);
      plane1.add(etichetta);

      var texture = new Three.TextureLoader().load(require('./recycle.png'));

      var planeGeometry2 = new Three.PlaneGeometry(.5, .5);
      var planeMaterial2 = new Three.MeshLambertMaterial({map: texture, transparent: true});
      var plane2 = new Three.Mesh(planeGeometry2, planeMaterial2);
      plane2.rotation.y += -Math.PI / 2;
      plane2.position.set(-.51, .3, 0);

      plane1.add(plane2);

      let value = new Three.Box3().setFromObject(cestino_carta);

      let deltaX = Math.abs(value.max.x - value.min.x);
      let deltaY = Math.abs(value.max.y - value.min.y);
      let deltaZ = Math.abs(value.max.z - value.min.z);


      let newAltitude = element.properties.get('altitude').get('length');

      cestino_carta.position.y += newAltitude;
      cestino_carta.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

      cestino_carta.rotation.y -= Math.PI/2;

      return cestino_carta;

    };

    let bins = new Three.Object3D();

    // I create all trash bins

    let metalBin = makeBin(0x0000ff);
    let yellowBin = makeBin(0xffff00);
    let brownBin = makeBin(0xeacb9d);
    let paperBin = makeBin(0xffffff);
    let glassBin = makeBin(0x00ff00);

    yellowBin.position.x += 50;
    brownBin.position.x += 100;
    paperBin.position.x += 150;
    glassBin.position.x += 200;

    bins.add(metalBin);
    bins.add(yellowBin);
    bins.add(brownBin);
    bins.add(paperBin);
    bins.add(glassBin);


    if (element.selected) {
      let bbox = new Three.BoxHelper(bins, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      bins.add(bbox);
    }

    bins.position.x -= 100;

    return Promise.resolve(bins);
  }

};

