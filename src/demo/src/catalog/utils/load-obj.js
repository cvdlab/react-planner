import Three from 'three';
import MTLLoader from './mtl-loader';
import OBJLoader from './obj-loader';

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

export function loadObjWithMaterial(mtlFile, objFile, imgPath) {
  let mtlLoader = new MTLLoader();
  mtlLoader.setTexturePath(imgPath);
  let url = mtlFile;
  return new Promise((resolve, reject) => {

    mtlLoader.load(url, materials => {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(objFile, object => resolve(object));

    });
  });
}

