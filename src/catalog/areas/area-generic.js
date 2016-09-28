import render2D from './area-generic.2d.jsx';
import render3D from './area-generic.3d';

export default {
  name: "area",
  prototype: "areas",

  info: {
    tag: ['area'],
    group: "Chiusura orizzontale",
    description: "Stanza generica",
  },

  properties: {
    patternColor: {
      type: "color",
      defaultValue: "#f5f4f4"
    },
    texture: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'parquet': "Parquet",
        'tile1': "Tile 1",
      }
    }
  },

  render2D,

  render3D,

};
