'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disposeScene = disposeScene;
exports.disposeObject = disposeObject;

var _three = require('three');

var Three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function disposeGeometry(geometry) {
  geometry.dispose();
  geometry = null;
}

function disposeTexture(texture) {
  if (!texture) {
    return;
  }
  texture.dispose();
  texture = null;
}

function disposeMultimaterial(material) {
  if (!(material instanceof Three.MultiMaterial)) {
    return;
  }
  material.materials.forEach(function (material) {
    disposeMaterial(material);
  });
}

function disposeMaterial(material) {
  if (!(material instanceof Three.Material)) {
    return;
  }

  disposeTexture(material.map);
  material.dispose();
  material = null;
}

function disposeMesh(mesh) {
  if (!(mesh instanceof Three.Mesh || mesh instanceof Three.BoxHelper || mesh instanceof Three.LineSegments)) {
    return;
  }
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);
  mesh = null;
}

function disposeScene(scene3D) {
  scene3D.traverse(function (child) {
    disposeMesh(child);
  });
}

function disposeObject(object) {
  object.traverse(function (child) {
    disposeMesh(child);
  });
}