import Three from 'three';
import MTLLoader from '../../components/viewer3d/libs/mtl-loader';
import OBJLoader from '../../components/viewer3d/libs/obj-loader';

export default function (item, layer) {

  return createItemGeneric(item.width,
    item.height,
    item.x,
    item.y,
    item.rotation,
    item.selected);

}

function createItemGeneric(width, height, x, y, rotation, isSelected) {
  let mtlLoader = new MTLLoader();
  mtlLoader.setPath('obj/generic-item/');
  let url = "generic-item.mtl";
  return new Promise((resolve, reject) => {

    mtlLoader.load(url, materials => {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('obj/generic-item/');
      objLoader.load('generic-item.obj', object => {

        if (isSelected) {
          let box = new Three.BoxHelper(object, 0x99c3fb);
          box.material.linewidth = 2;
          box.material.depthTest = false;
          object.add(box);
        }

        resolve(object);
      });

    });
  });
}
