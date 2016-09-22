import Three from 'three';
import MTLLoader from '../../components/viewer3d/libs/mtl-loader';
import OBJLoader from '../../components/viewer3d/libs/obj-loader';

export default function (hole, layer) {
  return createWindowGeneric(hole.properties.get('width') - 0.1,
    hole.properties.get('height'),
    hole.thickness,
    hole.selected);

}

function createWindowGeneric(width, height, thickness, isSelected) {
  let mtlLoader = new MTLLoader();
  mtlLoader.setPath('obj/window-generic/');
  let url = "window-generic.mtl";
  return new Promise((resolve, reject) => {

    mtlLoader.load(url, materials => {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('obj/window-generic/');
      objLoader.load('window-generic.obj', object => {

        let boundingBox = new Three.Box3().setFromObject(object);

        let initialWidth = boundingBox.max.x - boundingBox.min.x;
        let initialHeight = boundingBox.max.y - boundingBox.min.y;
        let initialThickness = boundingBox.max.z - boundingBox.min.z;

        if (isSelected) {
          let box = new Three.BoxHelper(object, 0xffc107);
          box.material.depthTest = false;
          object.add(box);
        }

        object.scale.set(width / initialWidth, height / initialHeight, thickness / initialThickness);

        resolve(object);
      });
    });
  })
}
