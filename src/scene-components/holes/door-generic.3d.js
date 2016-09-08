import Three from 'three';
import MTLLoader from '../../components/viewer3d/libs/MTLLoader';
import OBJLoader from '../../components/viewer3d/libs/OBJLoader';

export default function (hole, layer) {

  return createDoorGeneric(hole.properties.get('width') - 0.1,
    hole.properties.get('height') + 0.1,
    hole.thickness + 10,
    hole.selected);
}

function createDoorGeneric(width, height, thickness, isSelected) {


  let mtlLoader = new MTLLoader();
  mtlLoader.setPath('obj/door-generic/');
  let url = "door.mtl";
  return new Promise((resolve, reject) => {

    mtlLoader.load(url, materials => {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('obj/door-generic/');
      objLoader.load('door.obj', object => {

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
  });
}
