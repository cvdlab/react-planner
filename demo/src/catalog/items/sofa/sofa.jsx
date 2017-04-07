import * as Three from 'three';
import {loadObjWithMaterial} from '../../utils/load-obj';
import path from 'path';
import convert from 'convert-units';

import React from 'react';

let cached3DSofa = null;

export default {
  name: "sofa",
  prototype: "items",

  info: {
    title: "sofa",
    tag: ['furnishings', 'leather'],
    group: "Items",
    description: "Leather sofa",
    image: require('./sofa.png')
  },

  properties: {},

  render2D: function (element, layer, scene) {
    let width = 180;
    let depth = 60;

    let angle = element.rotation + 90;
    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    let style = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};
    let arrow_style = {stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce"};

    return (
      <g transform={`translate(${-width / 2},${-depth / 2})`}>
        <rect key="1" x="0" y="0" width={width} height={depth} style={style}/>
        <line key="2" x1={width / 2} x2={width / 2} y1={depth} y2={1.5 * depth} style={arrow_style}/>
        <line key="3" x1={.35 * width} x2={width / 2} y1={1.2 * depth} y2={1.5 * depth}
              style={arrow_style}/>
        <line key="4" x1={width / 2} x2={.65 * width} y1={1.5 * depth} y2={1.2 * depth}
              style={arrow_style}/>
        <text key="5" x="0" y="0"
              transform={`translate(${width / 2}, ${depth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    );
  },

  render3D: function (element, layer, scene) {

    let width = {length: 180, unit: 'cm'};
    let depth = {length: 60, unit: 'cm'};
    let height = {length: 70, unit: 'cm'};

    let onLoadItem = (object) => {

      let newWidth = convert(width.length).from(width.unit).to(scene.unit);
      let newHeight = convert(height.length).from(height.unit).to(scene.unit);
      let newDepth = convert(depth.length).from(depth.unit).to(scene.unit);

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      // Normalize the origin of this item
      let boundingBox = new Three.Box3().setFromObject(object);

      let center = [
        (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
        (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
        (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];

      return object;
    };

    if (cached3DSofa) {
      return Promise.resolve(onLoadItem(cached3DSofa.clone()));
    }

    let mtl = require('./sofa.mtl');
    let obj = require('./sofa.obj');
    let img = require('./texture.jpg');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/')
      .then(object => {
        cached3DSofa = object;
        return onLoadItem(cached3DSofa.clone())
      })
  }
};
