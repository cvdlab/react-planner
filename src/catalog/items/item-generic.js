import render2D from './item-generic.2d.jsx';
import render3D from './item-generic.3d.js';

export default {
  name: "itemGeneric",
  prototype: "items",

  info: {
    tag: [],
    group: "Items",
    description: "Item",
  },

  properties: {},

  render2D,
  render3D

};
