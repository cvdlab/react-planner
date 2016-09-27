import render2D from './window-generic.2d.jsx';
import render3D from './window-generic.3d';

export default {
  name: "windowGeneric",
  prototype: "holes",

  info: {
    tag: ['window', 'door', 'opening'],
    group: "Comunicazione orizzontale",
    description: "Finestra generica",
  },

  properties: {
    width: {
      type: "number",
      defaultValue: 90,
      min: 0
    },
    height: {
      type: "number",
      defaultValue: 100,
      min: 0
    },
    altitude: {
      type: "number",
      defaultValue: 90,
      min: 0
    }
  },

  render2D,

  render3D,

};
