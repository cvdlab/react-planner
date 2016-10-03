'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, layer, scene) {
  var vertices = [];

  element.vertices.forEach(function (vertexID) {
    vertices.push(layer.vertices.get(vertexID));
  });

  return createArea(vertices, parseInt(element.properties.get('patternColor').substring(1), 16), element.properties.get('texture'), element.selected, element.interactFunction);
};

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createArea(vertices, color, textureName, isSelected, interactFunction) {

  var shape = new _three2.default.Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (var i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  if (isSelected) {
    color = 0x99c3fb;
  } else if (textureName && textureName !== 'none') {
    color = 0xffffff;
  }

  var areaMaterial1 = new _three2.default.MeshPhongMaterial({
    side: _three2.default.FrontSide,
    color: color
  });

  var areaMaterial2 = new _three2.default.MeshPhongMaterial({
    side: _three2.default.BackSide,
    color: color
  });

  var shapeGeometry = new _three2.default.ShapeGeometry(shape);
  assignUVs(shapeGeometry);

  var boundingBox = new _three2.default.Box3().setFromObject(new _three2.default.Mesh(shapeGeometry, new _three2.default.MeshBasicMaterial()));

  var width = boundingBox.max.x - boundingBox.min.x;
  var height = boundingBox.max.y - boundingBox.min.y;

  var loader = new _three2.default.TextureLoader();

  switch (textureName) {
    case 'parquet':
      areaMaterial1.map = loader.load(require('./textures/parquet.jpg'));
      areaMaterial1.needsUpdate = true;
      areaMaterial1.map.wrapS = _three2.default.RepeatWrapping;
      areaMaterial1.map.wrapT = _three2.default.RepeatWrapping;
      areaMaterial1.map.repeat.set(width / 250, height / 250);

      areaMaterial2.map = loader.load(require('./textures/parquet.jpg'));
      areaMaterial2.needsUpdate = true;
      areaMaterial2.map.wrapS = _three2.default.RepeatWrapping;
      areaMaterial2.map.wrapT = _three2.default.RepeatWrapping;
      areaMaterial2.map.repeat.set(width / 250, height / 250);

      break;
    case 'tile1':
      areaMaterial1.map = loader.load(require('./textures/tile1.jpg'));
      areaMaterial1.needsUpdate = true;
      areaMaterial1.map.wrapS = _three2.default.RepeatWrapping;
      areaMaterial1.map.wrapT = _three2.default.RepeatWrapping;
      areaMaterial1.map.repeat.set(width / 100, height / 100);

      areaMaterial2.map = loader.load(require('./textures/tile1.jpg'));
      areaMaterial2.needsUpdate = true;
      areaMaterial2.map.wrapS = _three2.default.RepeatWrapping;
      areaMaterial2.map.wrapT = _three2.default.RepeatWrapping;
      areaMaterial2.map.repeat.set(width / 100, height / 100);

      break;
    case 'none':
    default:
  }

  var area = new _three2.default.Object3D();

  var areaFace1 = new _three2.default.Mesh(shapeGeometry, areaMaterial1);
  var areaFace2 = new _three2.default.Mesh(shapeGeometry, areaMaterial2);

  areaFace1.interact = interactFunction;
  areaFace2.interact = interactFunction;

  area.add(areaFace1);
  area.add(areaFace2);

  area.rotation.x -= Math.PI / 2;

  return area;
}

function assignUVs(geometry) {
  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max;
  var min = geometry.boundingBox.min;

  var offset = new _three2.default.Vector2(0 - min.x, 0 - min.y);
  var range = new _three2.default.Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = [];
  var faces = geometry.faces;

  for (var i = 0; i < geometry.faces.length; i++) {

    var v1 = geometry.vertices[faces[i].a];
    var v2 = geometry.vertices[faces[i].b];
    var v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push([new _three2.default.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new _three2.default.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new _three2.default.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)]);
  }
  geometry.uvsNeedUpdate = true;
}