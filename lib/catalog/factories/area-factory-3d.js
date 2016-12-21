'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createArea;

var _three = require('three');

function createArea(element, layer, scene, textures) {
  var vertices = [];

  element.vertices.forEach(function (vertexID) {
    vertices.push(layer.vertices.get(vertexID));
  });

  var color = parseInt(element.properties.get('patternColor').substring(1), 16);
  var textureName = element.properties.get('texture');

  var shape = new _three.Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (var i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  if (element.selected) {
    color = 0x99c3fb;
  } else if (textureName && textureName !== 'none') {
    color = 0xffffff;
  }

  var areaMaterial1 = new _three.MeshPhongMaterial({
    side: _three.FrontSide,
    color: color
  });

  var areaMaterial2 = new _three.MeshPhongMaterial({
    side: _three.BackSide,
    color: color
  });

  var shapeGeometry = new _three.ShapeGeometry(shape);
  assignUVs(shapeGeometry);

  var boundingBox = new _three.Box3().setFromObject(new _three.Mesh(shapeGeometry, new _three.MeshBasicMaterial()));

  var width = boundingBox.max.x - boundingBox.min.x;
  var height = boundingBox.max.y - boundingBox.min.y;

  var loader = new _three.TextureLoader();

  applyTexture(areaMaterial1, textureName, width, height, textures);
  applyTexture(areaMaterial2, textureName, width, height, textures);

  var area = new _three.Object3D();

  var areaFace1 = new _three.Mesh(shapeGeometry, areaMaterial1);
  var areaFace2 = new _three.Mesh(shapeGeometry, areaMaterial2);

  area.add(areaFace1);
  area.add(areaFace2);

  area.rotation.x -= Math.PI / 2;

  return Promise.resolve(area);
}

/**
 * Apply a texture to an area face
 * @param material: The material of the face
 * @param textureName: The name of the texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 * @param textures: The list of textures available for this wall
 */
function applyTexture(material, textureName, length, height, textures) {

  var loader = new _three.TextureLoader();

  var textureParams = textures[textureName];

  if (textureParams) {
    material.map = loader.load(textureParams.uri);
    material.needsUpdate = true;
    material.map.wrapS = _three.RepeatWrapping;
    material.map.wrapT = _three.RepeatWrapping;
    material.map.repeat.set(length * textureParams.lengthRepeatScale, height * textureParams.heightRepeatScale);

    if (textureParams.normal) {
      material.normalMap = loader.load(textureParams.normal.uri);
      material.normalScale = new _three.Vector2(textureParams.normal.normalScaleX, textureParams.normal.normalScaleY);
      material.normalMap.wrapS = _three.RepeatWrapping;
      material.normalMap.wrapT = _three.RepeatWrapping;
      material.normalMap.repeat.set(length * textureParams.normal.lengthRepeatScale, height * textureParams.normal.heightRepeatScale);
    }
  }
}

function assignUVs(geometry) {
  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max;
  var min = geometry.boundingBox.min;

  var offset = new _three.Vector2(0 - min.x, 0 - min.y);
  var range = new _three.Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = [];
  var faces = geometry.faces;

  for (var i = 0; i < geometry.faces.length; i++) {

    var v1 = geometry.vertices[faces[i].a];
    var v2 = geometry.vertices[faces[i].b];
    var v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push([new _three.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new _three.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new _three.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)]);
  }
  geometry.uvsNeedUpdate = true;
}