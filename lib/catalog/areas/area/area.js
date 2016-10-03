'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _area3d = require('./area-3d');

var _area3d2 = _interopRequireDefault(_area3d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathSVG = _react2.default.createFactory('path');
exports.default = {
  name: "area",
  prototype: "areas",

  info: {
    tag: ['area'],
    group: "Chiusura orizzontale",
    description: "Stanza generica",
    image: ""
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
        'tile1': "Tile 1"
      }
    },
    composition: {
      type: "composition",
      defaultValue: {}
    }
  },

  render2D: function render2D(element, layer, scene) {
    var path = "";
    var first = true;

    element.vertices.valueSeq().map(function (vertexID) {
      return layer.vertices.get(vertexID);
    }).forEach(function (vertex, vertexID) {
      path += (first ? 'M' : 'L') + ' ' + vertex.x + ' ' + vertex.y + ' ';
      first = false;
    });

    var fill = element.selected ? "#99c3fb" : element.properties.get('patternColor');

    return pathSVG({ d: path, fill: fill });
  },

  render3D: _area3d2.default

};