import React from 'react';
import * as Three from 'three';
import {loadObjWithMaterial} from '../../utils/load-obj';
import path from 'path';

let cached3DWindow = null;

export default {
  name: "window",
  prototype: "holes",

  info: {
    title: "window",
    tag: ['window'],
    description: "Window",
    image: require('./window.png')
  },

  properties: {
    width: {
      label: "Width",
      type: "length-measure",
      defaultValue: {
        length: 90
      }
    },
    height: {
      label: "Height",
      type: "length-measure",
      defaultValue: {
        length: 100
      }
    },
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 90
      }
    },
    thickness: {
      label: "Thickness",
      type: "length-measure",
      defaultValue: {
        length: 10
      }
    }
  },

  render2D: function (element, layer, scene) {
    const STYLE_HOLE_BASE = {stroke: "#000", strokeWidth: "3px", fill: "#000"};
    const STYLE_HOLE_SELECTED = {stroke: "#0096fd", strokeWidth: "3px", fill: "#0096fd", cursor: "move"};
    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    let epsilon = 3;

    let holeWidth = element.properties.get('width').get('length');
    let holePath = `M${0} ${ -epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let length = element.properties.get('width').get('length');
    return (
      <g transform={`translate(${-length / 2}, 0)`}>
        <path key="1" d={holePath} style={holeStyle}/>
        <line key="2" x1={holeWidth / 2} y1={-10 - epsilon} x2={holeWidth / 2} y2={10 + epsilon} style={holeStyle}/>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let onLoadItem = (object) => {
      let boundingBox = new Three.Box3().setFromObject(object);

      let initialWidth = boundingBox.max.x - boundingBox.min.x;
      let initialHeight = boundingBox.max.y - boundingBox.min.y;
      let initialThickness = boundingBox.max.z - boundingBox.min.z;

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      let width = element.properties.get('width').get('length');
      let height = element.properties.get('height').get('length');
      let thickness = element.properties.get('thickness').get('length');

      object.scale.set(width / initialWidth, height / initialHeight,
        thickness / initialThickness);

      return object;
    };

    if(cached3DWindow) {
      return Promise.resolve(onLoadItem(cached3DWindow.clone()));
    }

    let mtl = require('./window.mtl');
    let obj = require('./window.obj');
    let img = require('./texture.png');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/')
      .then(object => {
        cached3DWindow = object;
        return onLoadItem(cached3DWindow.clone())
      })
  }
};
