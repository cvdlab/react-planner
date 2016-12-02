import {BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper} from 'three';

import React from 'react';

export default {
  name: "cube",
  prototype: "items",

  info: {
    tag: ['demo'],
    group: "Items",
    description: "Demo item",
    image: require('./cube.png')
  },

  properties: {
    color: {
      label: "Color",
      type: "color",
      defaultValue: "#f48342"
    },
  },

  render2D: (element, layer, scene) => {
    let style = {
      stroke: "#000",
      strokeWidth: element.selected ? "2px" : "0px",
      fill: element.properties.get('color')
    };

    return (
      <g transform="translate(-50, -50)">
        <rect x="0" y="0" width="100" height="100" style={style}/>
      </g>
    );
  },

  render3D: (element, layer, scene) => {
    let geometry = new BoxGeometry(100, 100, 100);
    let material = new MeshBasicMaterial({
      color: element.properties.get('color')
    });

    let mesh = new Mesh(geometry, material);

    if (element.selected) {
      let box = new BoxHelper(mesh, '#000000');
      box.material.linewidth = 1;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      mesh.add(box);
    }

    mesh.position.y = +50;

    return Promise.resolve(mesh);
  }

};
