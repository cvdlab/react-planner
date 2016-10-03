'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateVolumes;

var _immutable = require('immutable');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateVolumes(scene) {
  var pixelPerUnit = scene.pixelPerUnit;


  return new _immutable.List().withMutations(function (list) {
    scene.layers.forEach(function (layer) {
      var vertices = layer.vertices;
      var lines = layer.lines;


      layer.lines.forEach(function (_ref) {
        var id = _ref.id;
        var type = _ref.type;
        var width = _ref.width;
        var height = _ref.height;
        var thickness = _ref.thickness;
        var verticesIDs = _ref.vertices;

        var _vertices$get = vertices.get(verticesIDs.get(0));

        var x1 = _vertices$get.x;
        var y1 = _vertices$get.y;

        var _vertices$get2 = vertices.get(verticesIDs.get(1));

        var x2 = _vertices$get2.x;
        var y2 = _vertices$get2.y;

        var length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        list.push(new _models.ElementVolume({
          id: _shortid2.default.generate(),
          elementID: id,
          layerID: layer.id,
          type: type,
          prototype: "lines",
          volume: height * thickness * length / Math.pow(pixelPerUnit, 3),
          composition: "cemento"
        }));
      });

      layer.holes.forEach(function (_ref2) {
        var id = _ref2.id;
        var type = _ref2.type;
        var width = _ref2.width;
        var height = _ref2.height;
        var thickness = _ref2.thickness;
        var lineID = _ref2.line;


        var line = lines.get(lineID);
        list.push(new _models.ElementVolume({
          id: _shortid2.default.generate(),
          elementID: id,
          layerID: layer.id,
          type: type,
          prototype: "holes",
          volume: width * height * line.thickness / Math.pow(pixelPerUnit, 3),
          composition: "vetro"
        }));
      });
    });
  });
}