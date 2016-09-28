import Three from 'three';
import MTLLoader from '../components/viewer3d/libs/mtl-loader';
import OBJLoader from '../components/viewer3d/libs/obj-loader';

export function loadObj(objPath, objFile, isSelected) {
  let objLoader = new OBJLoader();
  objLoader.setPath(objPath);
  return new Promise((resolve, reject) => {
    objLoader.load(objFile, object => {

      if (isSelected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        object.add(box);
      }
      resolve(object);
    });
  });
}

export function loadObjWithMaterial(mtlPath, mtlFile, objPath, objFile, onLoadItem) {
  let mtlLoader = new MTLLoader();
  mtlLoader.setPath(mtlPath);
  let url = mtlFile;
  return new Promise((resolve, reject) => {

    mtlLoader.load(url, materials => {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath(objPath);
      objLoader.load(objFile, object => resolve(object));

    });
  });
}

