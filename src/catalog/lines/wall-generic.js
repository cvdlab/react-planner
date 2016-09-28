import render2D from './wall-generic.2d.jsx';
import render3D from './wall-generic.3d.js';

export default {
  name: "wallGeneric",
  prototype: "lines",

  info: {
    tag: ['wall'],
    group: "Comunicazione orizzontale",
    description: "Finestra generica",
    image: require('./wall.png')
  },

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

};
