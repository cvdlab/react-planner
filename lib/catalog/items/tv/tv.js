'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _loadObj = require('../../../utils/load-obj');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rectSVG = _react2.default.createFactory('rect');
var gSVG = _react2.default.createFactory('g');
var textSVG = _react2.default.createFactory('text');

exports.default = {
  name: "tv",
  prototype: "items",

  info: {
    tag: ['arredamento', 'elettronica'],
    group: "Items",
    description: "Televisore LCD",
    image: require('./tv.png')
  },

  properties: {
    composition: {
      type: "composition",
      defaultValue: {}
    }
  },

  render2D: function render2D(element, layer, scene) {
    return gSVG({}, [rectSVG({
      key: 1,
      x: 0,
      y: 0,
      width: element.width,
      height: element.height,
      style: { stroke: "black", strokeWidth: "2px", fill: "#84e1ce" }
    }), textSVG({
      key: 2,
      x: 0,
      y: 0,
      transform: 'translate(' + element.width / 2 + ', ' + element.height / 2 + ') scale(1,-1)',
      style: { textAnchor: "middle", fontSize: "11px" }
    }, element.type)]);
  },

  render3D: function render3D(element, layer, scene) {

    var onLoadItem = function onLoadItem(object) {

      var boundingBox = new _three2.default.Box3().setFromObject(object);

      var initialWidth = boundingBox.max.x - boundingBox.min.x;
      var initialHeight = boundingBox.max.y - boundingBox.min.y;
      var initialThickness = boundingBox.max.z - boundingBox.min.z;

      var scaleY = Math.min(element.width / initialWidth, element.height / initialThickness);

      if (element.selected) {
        var box = new _three2.default.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        object.add(box);
      }

      object.scale.set(element.width / initialWidth, scaleY, element.height / initialThickness);

      return object;
    };

    var mtl = require('./tv.mtl');
    var obj = require('./tv.obj');

    return (0, _loadObj.loadObjWithMaterial)(mtl, obj, '').then(function (object) {
      return onLoadItem(object);
    });
  }

};