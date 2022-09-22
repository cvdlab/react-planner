import React from 'react';
import {Render2D, Render3D} from '../helper';

export default {
  name: '*base-36',
  prototype: 'items',

  info: {
    title: 'kitchen base cabinet 36" ',
    tag: ['kitchen', 'cabinet', 'base'],
    description: 'kitchen base cabinet 36 inch',
    image: require('./base.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 92,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 92,
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
        length: 66,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {
    return Render2D(element);
  },

  render3D: function (element, layer, scene) {
    return Render3D(element, "base-36inch/base");
  }
};
