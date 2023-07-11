"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disposeObject = disposeObject;
exports.disposeScene = disposeScene;
var Three = _interopRequireWildcard(require("three"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
  material.map = null;
  material.dispose();
}
function disposeMesh(mesh) {
  if (!(mesh instanceof Three.Mesh || mesh instanceof Three.BoxHelper || mesh instanceof Three.LineSegments)) {
    return;
  }
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);
  mesh.geometry = null;
  mesh.material = null;
}
function disposeScene(scene3D) {
  scene3D.traverse(function (child) {
    disposeMesh(child);
    child = null;
  });
}
function disposeObject(object) {
  object.traverse(function (child) {
    disposeMesh(child);
    child = null;
  });
}