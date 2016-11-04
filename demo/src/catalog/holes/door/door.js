import React from 'react';
import * as Three from 'three';
import {loadObjWithMaterial} from '../../../utils/load-obj';
import path from 'path';

let pathSVG = React.createFactory('path');
let lineSVG = React.createFactory('line');
let gSVG = React.createFactory('g');

export default {
  name: "door",
  prototype: "holes",

  info: {
    tag: ['door'],
    group: "Horizontal communication",
    description: "Wooden door",
    image: require('./door.png')
  },

  properties: {
    width: {
      type: "length-measure",
      defaultValue: {
        length: 80
      }
    },
    height: {
      type: "length-measure",
      defaultValue: {
        length: 215
      }
    },
    altitude: {
      type: "length-measure",
      defaultValue: {
        length: 0
      }
    },
    thickness: {
      type: "length-measure",
      defaultValue: {
        length: 30
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

    return gSVG({transform: `translate(${-element.properties.get('width').get('length') / 2}, 0)`}, [
      pathSVG({
        key: 1,
        d: holePath,
        style: holeStyle
      }),
      lineSVG({
        key: 2,
        x1: holeWidth / 2 - 5,
        y1: -10 - epsilon,
        x2: holeWidth / 2 - 5,
        y2: 10 + epsilon,
        style: holeStyle
      }),
      lineSVG({
        key: 3,
        x1: holeWidth / 2 + 5,
        y1: -10 - epsilon,
        x2: holeWidth / 2 + 5,
        y2: 10 + epsilon,
        style: holeStyle
      }),
    ]);
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

    let mtl = require('./door.mtl');
    let obj = require('./door.obj');
    let img = require('./texture.png');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/')
      .then(object => onLoadItem(object))

  }
};
