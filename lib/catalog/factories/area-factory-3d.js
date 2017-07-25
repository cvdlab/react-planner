'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createArea;

var _three = require('three');

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param textureName: The name of the texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 * @param textures: The list of textures available for this wall
 */
var applyTexture = function applyTexture(material, texture, length, height) {
  var loader = new _three.TextureLoader();

  if (texture) {
    material.map = loader.load(texture.uri);
    material.needsUpdate = true;
    material.map.wrapS = _three.RepeatWrapping;
    material.map.wrapT = _three.RepeatWrapping;
    material.map.repeat.set(length * texture.lengthRepeatScale, height * texture.heightRepeatScale);

    if (texture.normal) {
      material.normalMap = loader.load(texture.normal.uri);
      material.normalScale = new _three.Vector2(texture.normal.normalScaleX, texture.normal.normalScaleY);
      material.normalMap.wrapS = _three.RepeatWrapping;
      material.normalMap.wrapT = _three.RepeatWrapping;
      material.normalMap.repeat.set(length * texture.normal.lengthRepeatScale, height * texture.normal.heightRepeatScale);
    }
  }
};

/**
 * Function that assign UV coordinates to a geometry
 * @param geometry
 */
var assignUVs = function assignUVs(geometry) {
  geometry.computeBoundingBox();

  var _geometry$boundingBox = geometry.boundingBox,
      min = _geometry$boundingBox.min,
      max = _geometry$boundingBox.max;


  var offset = new _three.Vector2(0 - min.x, 0 - min.y);
  var range = new _three.Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = geometry.faces.map(function (face) {

    var v1 = geometry.vertices[face.a];
    var v2 = geometry.vertices[face.b];
    var v3 = geometry.vertices[face.c];

    return [new _three.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new _three.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new _three.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)];
  });

  geometry.uvsNeedUpdate = true;
};

function createArea(element, layer, scene, textures) {
  var vertices = [];

  element.vertices.forEach(function (vertexID) {
    vertices.push(layer.vertices.get(vertexID));
  });

  var textureName = element.properties.get('texture');
  var color = element.properties.get('patternColor');

  if (element.selected) {
    color = 0x99c3fb;
  } else if (textureName && textureName !== 'none') {
    color = 0xffffff;
  }

  var shape = new _three.Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (var i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  var areaMaterial1 = new _three.MeshPhongMaterial({ side: _three.FrontSide, color: color });
  var areaMaterial2 = new _three.MeshPhongMaterial({ side: _three.BackSide, color: color });

  var shapeGeometry = new _three.ShapeGeometry(shape);
  assignUVs(shapeGeometry);

  var boundingBox = new _three.Box3().setFromObject(new _three.Mesh(shapeGeometry, new _three.MeshBasicMaterial()));

  var width = boundingBox.max.x - boundingBox.min.x;
  var height = boundingBox.max.y - boundingBox.min.y;

  var loader = new _three.TextureLoader();
  var texture = textures[textureName];

  applyTexture(areaMaterial1, texture, width, height);
  applyTexture(areaMaterial2, texture, width, height);

  var area = new _three.Object3D();

  var areaFace1 = new _three.Mesh(shapeGeometry, areaMaterial1);
  var areaFace2 = new _three.Mesh(shapeGeometry, areaMaterial2);

  area.add(areaFace1, areaFace2);

  area.rotation.x -= Math.PI / 2;

  return Promise.resolve(area);
}