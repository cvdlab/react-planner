import MTLLoader from './mtl-loader';
import OBJLoader from './obj-loader';

// TODO(pg): re-integrate img somehow which can be used by some elements like door(s)
// export function loadObjWithMaterial(mtlFile, objFile, imgPath) {
export function loadObjWithMaterial(mtlFile, objFile) {
  let mtlLoader = new MTLLoader();
  // mtlLoader.setTexturePath(imgPath);
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

