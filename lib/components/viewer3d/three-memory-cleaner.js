'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disposeScene = disposeScene;
exports.disposeObject = disposeObject;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function disposeGeometry(geometry) {
  geometry.dispose();
}

function disposeTexture(texture) {
  if (!texture) {
    return;
  }
  texture.dispose();
}

function disposeMultimaterial(material) {
  if (!(material instanceof _three2.default.MultiMaterial)) {
    return;
  }
  material.materials.forEach(function (material) {
    disposeMaterial(material);
  });
}

function disposeMaterial(material) {
  if (!(material instanceof _three2.default.Material)) {
    return;
  }

  disposeTexture(material.map);
  material.dispose();
}

function disposeMesh(mesh) {
  if (!(mesh instanceof _three2.default.Mesh || mesh instanceof _three2.default.BoxHelper || mesh instanceof _three2.default.LineSegments)) {
    return;
  }
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);
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