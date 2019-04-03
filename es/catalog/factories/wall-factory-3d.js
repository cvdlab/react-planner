var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { TextureLoader, Mesh, RepeatWrapping, Vector2, BoxGeometry, MeshBasicMaterial, MeshPhongMaterial, Group } from 'three';

import ThreeBSP from '../../utils/threeCSG.es6';
import { verticesDistance } from '../../utils/geometry';
import * as SharedStyle from '../../shared-style';

var halfPI = Math.PI / 2;

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param texture: The texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 */
var applyTexture = function applyTexture(material, texture, length, height) {
  var loader = new TextureLoader();

  if (texture) {
    material.map = loader.load(texture.uri);
    material.needsUpdate = true;
    material.map.wrapS = RepeatWrapping;
    material.map.wrapT = RepeatWrapping;
    material.map.repeat.set(length * texture.lengthRepeatScale, height * texture.heightRepeatScale);

    if (texture.normal) {
      material.normalMap = loader.load(texture.normal.uri);
      material.normalScale = new Vector2(texture.normal.normalScaleX, texture.normal.normalScaleY);
      material.normalMap.wrapS = RepeatWrapping;
      material.normalMap.wrapT = RepeatWrapping;
      material.normalMap.repeat.set(length * texture.normal.lengthRepeatScale, height * texture.normal.heightRepeatScale);
    }
  }
};

/**
 * Get the two vertices of the wall
 * @param {*} element
 * @param {*} layer
 */
export var getVerticesOfWall = function getVerticesOfWall(element, layer) {
  var vertex0 = layer.vertices.get(element.vertices.get(0));
  var vertex1 = layer.vertices.get(element.vertices.get(1));
  var inverted = false;

  // The first vertex is the smaller one
  if (vertex0.x > vertex1.x) {
    var app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
    inverted = true;
  }

  return [vertex0, vertex1, inverted];
};
export var createSoulMaterials = function createSoulMaterials(element, layer, textures) {
  var height = element.properties.getIn(['height', 'length']);

  var _getVerticesOfWall = getVerticesOfWall(element, layer),
      _getVerticesOfWall2 = _slicedToArray(_getVerticesOfWall, 2),
      vertex0 = _getVerticesOfWall2[0],
      vertex1 = _getVerticesOfWall2[1];

  var distance = verticesDistance(vertex0, vertex1);

  var soulMaterials = [0x454545, 0xd3d3d3, 0xd3d3d3].map(function (color) {
    return new MeshPhongMaterial({
      color: element.selected ? SharedStyle.MESH_SELECTED : color
    });
  });

  applyTexture(soulMaterials[1], textures[element.properties.get('textureB')], distance, height);
  applyTexture(soulMaterials[2], textures[element.properties.get('textureA')], distance, height);

  return soulMaterials;
};

export function buildWall(element, layer, scene, textures) {
  var _getVerticesOfWall3 = getVerticesOfWall(element, layer),
      _getVerticesOfWall4 = _slicedToArray(_getVerticesOfWall3, 3),
      vertex0 = _getVerticesOfWall4[0],
      vertex1 = _getVerticesOfWall4[1],
      inverted = _getVerticesOfWall4[2];

  // Get height and thickness of the wall converting them into the current scene units


  var thickness = element.properties.getIn(['thickness', 'length']);
  var height = element.properties.getIn(['height', 'length']);

  var distance = verticesDistance(vertex0, vertex1);
  var halfDistance = distance / 2;

  var soulMaterials = createSoulMaterials(element, layer, textures);
  var soul = new Mesh(new BoxGeometry(distance, height, thickness), soulMaterials);

  var alpha = Math.asin((vertex1.y - vertex0.y) / distance);

  var sinAlpha = Math.sin(alpha);
  var cosAlpha = Math.cos(alpha);

  soul.position.y += height / 2;
  soul.position.x += halfDistance * cosAlpha;
  soul.position.z -= halfDistance * sinAlpha;

  soul.rotation.y = alpha;

  element.holes.forEach(function (holeID) {
    var holeData = layer.holes.get(holeID);

    var holeWidth = holeData.properties.getIn(['width', 'length']);
    var holeHeight = holeData.properties.getIn(['height', 'length']);
    var holeAltitude = holeData.properties.getIn(['altitude', 'length']);
    var offset = inverted ? 1 - holeData.offset : holeData.offset;
    var holeDistance = offset * distance;

    var holeGeometry = new BoxGeometry(holeWidth, holeHeight, thickness);
    var holeMesh = new Mesh(holeGeometry);

    holeMesh.position.y += holeHeight / 2 + holeAltitude;
    holeMesh.position.x += holeDistance * cosAlpha;
    holeMesh.position.z -= holeDistance * sinAlpha;

    holeMesh.rotation.y = alpha;

    var wallBSP = new ThreeBSP(soul);
    var holeBSP = new ThreeBSP(holeMesh);

    var wallWithHoleBSP = wallBSP.subtract(holeBSP);
    soul = wallWithHoleBSP.toMesh(soulMaterials);
  });
  // The facenormals need to be re-calculated have correct UV mapping
  soul.geometry.computeFaceNormals();

  soul.name = 'soul';

  // Split MaterialId's
  soul.geometry.faces = soul.geometry.faces.map(function (face) {
    var z = face.normal.z;


    if (z > 0) {
      face.materialIndex = 2;
    } else if (z < 0) {
      face.materialIndex = 1;
    } else {
      face.materialIndex = 0;
    }
    return face;
  });

  return Promise.resolve(soul);
}

export function updatedWall(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild) {
  var noPerf = function noPerf() {
    selfDestroy();
    return selfBuild();
  };

  var soul = mesh.getObjectByName('soul');

  if (differences[0] == 'selected') {
    var soulMaterials = createSoulMaterials(element, layer, textures);
    setTimeout(function () {
      soul.material = soulMaterials;
      soul.material.needsUpdate = true;
    }, 20);
  } else if (differences[0] == 'properties') {
    if (differences[1] == 'thickness') {
      var newThickness = element.getIn(['properties', 'thickness', 'length']);
      var oldThickness = oldElement.getIn(['properties', 'thickness', 'length']);

      var originalThickness = oldThickness / soul.scale.z;
      soul.scale.set(1, 1, newThickness / originalThickness);
    } else return noPerf();
  } else return noPerf();

  return Promise.resolve(mesh);
}