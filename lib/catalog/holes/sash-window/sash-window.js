'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _loadObj = require('../../../utils/load-obj');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathSVG = _react2.default.createFactory('path');
var lineSVG = _react2.default.createFactory('line');
var gSVG = _react2.default.createFactory('g');

exports.default = {
  name: "sash window",
  prototype: "holes",

  info: {
    tag: ['finestra'],
    group: "Comunicazione orizzontale",
    description: "Finestra con grate",
    image: require('./window.png')
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
    },
    thickness: {
      type: "number",
      defaultValue: 10,
      min: 0
    }
  },

  render2D: function render2D(element, layer, scene) {
    var STYLE_HOLE_BASE = { stroke: "#000", strokeWidth: "3px", fill: "#000" };
    var STYLE_HOLE_SELECTED = { stroke: "orange", strokeWidth: "3px", fill: "orange" };
    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    var epsilon = 3;

    var holeWidth = element.properties.get('width');
    var holePath = 'M' + 0 + ' ' + -epsilon + '  L' + holeWidth + ' ' + -epsilon + '  L' + holeWidth + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;

    return gSVG({}, [pathSVG({
      key: 1,
      d: holePath,
      style: holeStyle
    }), lineSVG({
      key: 2,
      x1: holeWidth / 2,
      y1: -10 - epsilon,
      x2: holeWidth / 2,
      y2: 10 + epsilon,
      style: holeStyle
    })]);
  },

  render3D: function render3D(element, layer, scene) {
    var onLoadItem = function onLoadItem(object) {
      var boundingBox = new _three2.default.Box3().setFromObject(object);

      var initialWidth = boundingBox.max.x - boundingBox.min.x;
      var initialHeight = boundingBox.max.y - boundingBox.min.y;
      var initialThickness = boundingBox.max.z - boundingBox.min.z;

      if (element.selected) {
        var box = new _three2.default.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        object.add(box);
      }

      object.scale.set(element.properties.get('width') / initialWidth, element.properties.get('height') / initialHeight, element.properties.get('thickness') / initialThickness);

      return object;
    };

    var mtl = require('./sash-window.mtl');
    var obj = require('./sash-window.obj');
    var img = require('./texture.png');

    return (0, _loadObj.loadObjWithMaterial)(mtl, obj, _path2.default.dirname(img) + '/').then(function (object) {
      return onLoadItem(object);
    });
  }
};