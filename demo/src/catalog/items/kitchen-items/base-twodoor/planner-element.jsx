import React from 'react';
import * as Three from 'three';
import {loadObjWithMaterial} from '../../../utils/load-obj';
import path from 'path';

let cached3DDoor = null;

const STYLE_HOLE_BASE = {stroke: '#000', strokeWidth: '3px', fill: '#000'};
const STYLE_HOLE_SELECTED = {stroke: '#0096fd', strokeWidth: '4px', fill: '#0096fd', cursor: 'move'};
const STYLE_ARC_BASE = {stroke: '#000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none'};
const STYLE_ARC_SELECTED = {stroke: '#0096fd', strokeWidth: '4px', strokeDasharray: '5,5', fill: 'none', cursor: 'move'};
const EPSILON = 3;

export default {
  name: 'base-cabinet',
  prototype: 'items',

  info: {
    title: 'base',
    tag: ['kitchen', 'cabinet', 'base'],
    description: 'base cabinet',
    image: require('./basecabinet2.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 88,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 60,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 60,
        unit: 'cm'
      }
    },
    flip_orizzontal: {
      label: 'flip orizzontale',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes':  true
      }
    }
  },

  render2D: function (element, layer, scene) {
    let flip = element.properties.get('flip_orizzontal');
    let holeWidth = element.properties.get('width').get('length');
    let holePath = `M${0} ${ -EPSILON}  L${holeWidth} ${-EPSILON}  L${holeWidth} ${EPSILON}  L${0} ${EPSILON}  z`;
    let arcPath = `M${0},${0}  A${holeWidth},${holeWidth} 0 0,1 ${holeWidth},${holeWidth}`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    let length = element.properties.get('width').get('length');

    if(flip == false) {
      return (
        <g transform={`translate(${-length / 2}, 0)`}>
          <path d={arcPath} style={arcStyle} transform={`translate(${0},${holeWidth}) scale(${1},${-1}) rotate(${0})`}/>
          <line x1={0} y1={holeWidth - EPSILON} x2={0} y2={0 - EPSILON} style={holeStyle} transform={`scale(${-1},${1})`}/>
          <path d={holePath} style={holeStyle}/>
        </g>
      )
    }
    else{
      return (
        <g transform={`translate(${-length / 2}, 0)`}>
          <path d={arcPath} style={arcStyle} transform={`translate(${0},${-holeWidth}) scale(${1},${1}) rotate(${0})`}/>
          <line x1={0} y1={-holeWidth - EPSILON} x2={0} y2={0 - EPSILON} style={holeStyle} transform={`scale(${-1},${1})`}/>
          <path d={holePath} style={holeStyle}/>
        </g>
      )
    }
  },

  render3D: function (element, layer, scene) {
    let onLoadItem = (object) => {
      let box = new Three.Box3();
      let boundingBox = box.setFromObject(object);

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

      object.position.x += -boundingBox.min.x;
      object.position.z += -boundingBox.min.z;
      return object;
    };

    if(cached3DDoor) {
      return Promise.resolve(onLoadItem(cached3DDoor.clone()));
    }

    let mtl = require('./basecabinet2.mtl');
    let obj = require('./basecabinet2.obj');
    let img = require('./basecabinet2.jpg');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/')
      .then(object => {
        cached3DDoor = object;
        return onLoadItem(cached3DDoor.clone())
      })

  }
};
