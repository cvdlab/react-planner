'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createArea = createArea;
exports.updatedArea = updatedArea;

var _three = require('three');

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param texture: The texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
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
    color = SharedStyle.AREA_MESH_COLOR.selected;
  } else if (textureName && textureName !== 'none') {
    color = SharedStyle.AREA_MESH_COLOR.unselected;
  }

  var shape = new _three.Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (var i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  var areaMaterial = new _three.MeshPhongMaterial({ side: _three.DoubleSide, color: color });

  /* Create holes for the area */
  element.holes.forEach(function (holeID) {
    var holeCoords = [];
    layer.getIn(['areas', holeID, 'vertices']).forEach(function (vertexID) {
      var _layer$getIn = layer.getIn(['vertices', vertexID]),
          x = _layer$getIn.x,
          y = _layer$getIn.y;

      holeCoords.push([x, y]);
    });
    holeCoords = holeCoords.reverse();
    var holeShape = createShape(holeCoords);
    shape.holes.push(holeShape);
  });

  var shapeGeometry = new _three.ShapeGeometry(shape);
  assignUVs(shapeGeometry);

  var boundingBox = new _three.Box3().setFromObject(new _three.Mesh(shapeGeometry, new _three.MeshBasicMaterial()));

  var width = boundingBox.max.x - boundingBox.min.x;
  var height = boundingBox.max.y - boundingBox.min.y;

  var texture = textures[textureName];

  applyTexture(areaMaterial, texture, width, height);

  var area = new _three.Mesh(shapeGeometry, areaMaterial);

  area.rotation.x -= Math.PI / 2;
  area.name = 'floor';

  return Promise.resolve(area);
}

function updatedArea(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild) {
  var noPerf = function noPerf() {
    selfDestroy();return selfBuild();
  };
  var floor = mesh.getObjectByName('floor');

  if (differences[0] == 'selected') {
    var color = element.selected ? SharedStyle.AREA_MESH_COLOR.selected : element.properties.get('patternColor') || SharedStyle.AREA_MESH_COLOR.unselected;
    floor.material.color.set(color);
  } else if (differences[0] == 'properties') {
    if (differences[1] === 'texture') {
      return noPerf();
    }
  } else return noPerf();

  return Promise.resolve(mesh);
}

/**
 * This function will create a shape given a list of coordinates
 * @param shapeCoords
 * @returns {Shape}
 */
var createShape = function createShape(shapeCoords) {
  var shape = new _three.Shape();
  shape.moveTo(shapeCoords[0][0], shapeCoords[0][1]);
  for (var i = 1; i < shapeCoords.length; i++) {
    shape.lineTo(shapeCoords[i][0], shapeCoords[i][1]);
  }
  return shape;
};