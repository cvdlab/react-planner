import * as Three from 'three';
import {loadObjWithMaterial} from '../../utils/load-obj';

import React from 'react';
import convert from 'convert-units';

let cached3DTV = null;

export default {
  name: "tv",
  prototype: "items",

  info: {
    title: "tv",
    tag: ['furnishing', 'electronics'],
    group: "Items",
    description: "LCD TV",
    image: require('./tv.png')
  },

  properties: {
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 0
      }
    }
  },

  render2D: function (element, layer, scene) {
    let width = {length: 1.60, unit: 'ft'};
    let depth = {length: 0.59, unit: 'ft'};

    let newWidth = convert(width.length).from(width.unit).to(scene.unit);
    let newDepth = convert(depth.length).from(depth.unit).to(scene.unit);

    let style = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"};

    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
        <rect key="1" x="0" y="0" width={newWidth} height={newDepth} style={style}/>
        <text key="2" x="0" y="0" transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1)`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.type}
        </text>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let width = {length: 1.60, unit: 'ft'};
    let depth = {length: 0.59, unit: 'ft'};
    let height = {length: 1.05, unit: 'ft'};

    let onLoadItem = (object) => {

      let newWidth = convert(width.length).from(width.unit).to(scene.unit);
      let newHeight = convert(height.length).from(height.unit).to(scene.unit);
      let newDepth = convert(depth.length).from(depth.unit).to(scene.unit);

      let newAltitude = element.properties.get('altitude').get('length');

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      // Normalize the origin of the object
      let boundingBox = new Three.Box3().setFromObject(object);

      let center = [
        (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
        (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
        (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];

      object.position.y += newAltitude;

      return object;
    };


    if(cached3DTV) {
      return Promise.resolve(onLoadItem(cached3DTV.clone()));
    }

    let mtl = require('./tv.mtl');
    let obj = require('./tv.obj');

    return loadObjWithMaterial(mtl, obj, '')
      .then(object => {
        cached3DTV = object;
        return onLoadItem(cached3DTV.clone())
      })
  }

};
