'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadObjWithMaterial = loadObjWithMaterial;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _mtlLoader = require('../components/viewer3d/libs/mtl-loader');

var _mtlLoader2 = _interopRequireDefault(_mtlLoader);

var _objLoader = require('../components/viewer3d/libs/obj-loader');

var _objLoader2 = _interopRequireDefault(_objLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export function loadObj(objPath, objFile, isSelected) {
//   let objLoader = new OBJLoader();
//   objLoader.setPath(objPath);
//   return new Promise((resolve, reject) => {
//     objLoader.load(objFile, object => {
//
//       if (isSelected) {
//         let box = new Three.BoxHelper(object, 0x99c3fb);
//         box.material.linewidth = 2;
//         box.material.depthTest = false;
//         object.add(box);
//       }
//       resolve(object);
//     });
//   });
// }

function loadObjWithMaterial(mtlFile, objFile, imgPath) {
  var mtlLoader = new _mtlLoader2.default();
  mtlLoader.setTexturePath(imgPath);
  var url = mtlFile;
  return new Promise(function (resolve, reject) {

    mtlLoader.load(url, function (materials) {
      materials.preload();
      var objLoader = new _objLoader2.default();
      objLoader.setMaterials(materials);
      objLoader.load(objFile, function (object) {
        return resolve(object);
      });
    });
  });
}