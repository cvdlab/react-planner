import React from 'react';
import * as Three from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';

let cached3DDoor = null;

export default {
  name: 'door',
  prototype: 'holes',

  info: {
    title: 'door',
    tag: ['door'],
    description: 'Door',
    image: require('./door.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 100
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 215
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
        length: 30
      }
    },
    flip_horizontal: {
      label: 'Horizontal Flip',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    },
    flip_vertical: {
      label: 'Vertical Flip',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    },
  },

  render2D: function (element, layer, scene) {
    const STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '3px', fill: '#000' };
    const STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '4px', fill: '#0096fd', cursor: 'move' };
    const STYLE_ARC_BASE = { stroke: '#000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none' };
    const STYLE_ARC_SELECTED = { stroke: '#0096fd', strokeWidth: '4px', strokeDasharray: '5,5', fill: 'none', cursor: 'move' };
    const EPSILON = 3;
    
    let hFlip = element.properties.get('flip_horizontal');
    let vFlip = element.properties.get('flip_vertical');
    let length = element.properties.get('width').get('length');
    let holePath = `M${0} ${-EPSILON}  L${length} ${-EPSILON}  L${length} ${EPSILON}  L${0} ${EPSILON}  z`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let arcPath = `M${0},${0}  A${length},${length} 0 0,1 ${length},${length}`;
    let arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;

    let scaleX, scaleY;
    let rotateAngle;
    let tX, tY;
    let pX1, pX2, pY1, pY2;

    if (hFlip) {
      scaleX = 1;
      if (vFlip) {
        tX = length;
        tY = -length;
        pX1 = -length;
        pY1 = 0;
        pX2 = -length;
        pY2 = length;
        rotateAngle = 180;
        scaleY = -1;
      }
      else {
        tX = 0;
        tY = -length;
        pX1 = 0;
        pY1 = 0;
        pX2 = 0;
        pY2 = -length;
        scaleY = 1;
        rotateAngle = 0;
      }
    }
    else {
      scaleX = -1;
      if (vFlip) {
        tX = 0;
        tY = 0;
        pX1 = length;
        pY1 = 0;
        pX2 = length;
        pY2 = length;
        rotateAngle = 90;
        scaleY = 1;
      }
      else {
        tX = length;
        tY = 0;
        pX1 = 0;
        pY1 = 0;
        pX2 = 0;
        pY2 = -length;
        rotateAngle = -90;
        scaleY = -1;
      }
    }

    return (
      <g transform={`translate(${-length / 2}, 0)`}>
        <path d={arcPath} style={arcStyle} transform={`translate(${tX},${tY}) scale(${scaleX},${scaleY}) rotate(${rotateAngle})`} />
        <line x1={pX1} y1={pY1 - EPSILON} x2={pX2} y2={pY2 - EPSILON} style={holeStyle} transform={`scale(${-scaleX},${scaleY})`} />
        <path d={holePath} style={holeStyle} />
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

    if (cached3DDoor) {
      return Promise.resolve(onLoadItem(cached3DDoor.clone()));
    }

    let mtl = require('./door.mtl');
    let obj = require('./door.obj');
    let img = require('./texture.jpg');

    return loadObjWithMaterial(mtl, obj, img)
      .then(object => {
        cached3DDoor = object;
        return onLoadItem(cached3DDoor.clone())
      })
  }
};
