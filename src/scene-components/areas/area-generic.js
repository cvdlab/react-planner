import render2D from './area-generic.2d.jsx';

export const AreaGeneric = {
  name: "areaGeneric",
  prototype: "areas",

  info: {
    tag: ['area'],
    group: "Chiusura orizzontale",
    description: "Stanza generica",
  },

  properties: {
    patternColor: {
      type: "color",
      defaultValue: "#cccccc"
    },
    patternDirection: {
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 359
    },
    texture: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'parquet': "Parquet"
      }
    }
  },

  render2D,

  render3D: function (element, layer) {
  },

  calculateVolume: function (element, layer) {
  }

};
