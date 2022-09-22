import React from 'react';
import {Render2D, Render3D} from '../helper';

export default {
  name: '*table',
  prototype: 'items',

  info: {
    title: 'kitchen table" ',
    tag: ['kitchen', 'table'],
    description: 'kitchen table',
    image: require('./desk.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 150,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 90,
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
        length: 120,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {
    return Render2D(element);
  },

  render3D: function (element, layer, scene) {
    return Render3D(element, "table/desk");
  }
};
