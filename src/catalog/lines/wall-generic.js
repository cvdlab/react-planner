import render2D from './wall-generic.2d.jsx';
import render3D from './wall-generic.3d.js';

export const WallGeneric = {
  name: "wallGeneric",
  prototype: "lines",
  tag: ['wall'],
  group: "Comunicazione orizzontale",
  description: "Finestra generica",

  properties: {
    height: {
      type: "number",
      defaultValue: 300
    },
    thickness: {
      type: "number",
      defaultValue: 20
    },
    textureA: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'bricks': "Mattoni",
        'painted': "Pittura"
      }
    },
    textureB: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'bricks': "Mattoni",
        'painted': "Pittura"
      }
    }
  },

  render2D,

  render3D,

  calculateVolume: function (options) {
  }

};
