'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wall3d = require('./wall-3d.js');

var _wall3d2 = _interopRequireDefault(_wall3d);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _geometry = require('../../../utils/geometry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathSVG = _react2.default.createFactory('path');
var gSVG = _react2.default.createFactory('g');
var textSVG = _react2.default.createFactory('text');
var lineSVG = _react2.default.createFactory('line');

exports.default = {
  name: "wall",
  prototype: "lines",

  info: {
    tag: ['muro'],
    group: "Comunicazione orizzontale",
    description: "Muro in mattoni o pittura",
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
    },
    composition: {
      type: "composition",
      defaultValue: {}
    }
  },

  render2D: function render2D(element, layer, scene) {
    var STYLE_BASE = { stroke: "#8E9BA2", strokeWidth: "1px", fill: "#8E9BA2" };
    var STYLE_SELECTED = { stroke: "#99c3fb", strokeWidth: "5px", fill: "#000" };
    var STYLE_TEXT = { textAnchor: "middle" };
    var STYLE_LINE = { stroke: "#99c3fb" };

    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    var epsilon = 3;

    var _layer$vertices$get = layer.vertices.get(element.vertices.get(0));

    var x1 = _layer$vertices$get.x;
    var y1 = _layer$vertices$get.y;

    var _layer$vertices$get2 = layer.vertices.get(element.vertices.get(1));

    var x2 = _layer$vertices$get2.x;
    var y2 = _layer$vertices$get2.y;


    var length = (0, _geometry.distanceFromTwoPoints)(x1, y1, x2, y2);
    var path = 'M' + 0 + ' ' + -epsilon + '  L' + length + ' ' + -epsilon + '  L' + length + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';

    return element.selected ? gSVG({}, [pathSVG({ key: 3, d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE }), lineSVG({ key: 2, x1: length / 5, y1: -39, x2: length / 5, y2: 38, style: STYLE_LINE }), textSVG({ key: 1, x: length / 5, y: 50, style: STYLE_TEXT }, "A"), textSVG({ key: 4, x: length / 5, y: -40, style: STYLE_TEXT }, "B")]) : pathSVG({ key: 3, d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE });
  },

  render3D: _wall3d2.default

};