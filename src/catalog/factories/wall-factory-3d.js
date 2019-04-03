import {
  TextureLoader,
  Mesh,
  RepeatWrapping,
  Vector2,
  BoxGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Group
} from 'three';

import ThreeBSP from '../../utils/threeCSG.es6';
import { verticesDistance } from '../../utils/geometry';
import * as SharedStyle from '../../shared-style';

const halfPI = Math.PI / 2;

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param texture: The texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 */
const applyTexture = (material, texture, length, height) => {
  let loader = new TextureLoader();

  if (texture) {
    material.map = loader.load(texture.uri);
    material.needsUpdate = true;
    material.map.wrapS = RepeatWrapping;
    material.map.wrapT = RepeatWrapping;
    material.map.repeat.set(
      length * texture.lengthRepeatScale,
      height * texture.heightRepeatScale
    );

    if (texture.normal) {
      material.normalMap = loader.load(texture.normal.uri);
      material.normalScale = new Vector2(
        texture.normal.normalScaleX,
        texture.normal.normalScaleY
      );
      material.normalMap.wrapS = RepeatWrapping;
      material.normalMap.wrapT = RepeatWrapping;
      material.normalMap.repeat.set(
        length * texture.normal.lengthRepeatScale,
        height * texture.normal.heightRepeatScale
      );
    }
  }
};

/**
 * Get the two vertices of the wall
 * @param {*} element
 * @param {*} layer
 */
export const getVerticesOfWall = (element, layer) => {
  let vertex0 = layer.vertices.get(element.vertices.get(0));
  let vertex1 = layer.vertices.get(element.vertices.get(1));
  let inverted = false;

  // The first vertex is the smaller one
  if (vertex0.x > vertex1.x) {
    let app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
    inverted = true;
  }

  return [vertex0, vertex1, inverted];
};
export const createSoulMaterials = (element, layer, textures) => {
  const height = element.properties.getIn(['height', 'length']);
  const [vertex0, vertex1] = getVerticesOfWall(element, layer);
  const distance = verticesDistance(vertex0, vertex1);

  const soulMaterials = [0x454545, 0xd3d3d3, 0xd3d3d3].map(
    color =>
      new MeshPhongMaterial({
        color: element.selected ? SharedStyle.MESH_SELECTED : color
      })
  );

  applyTexture(
    soulMaterials[1],
    textures[element.properties.get('textureB')],
    distance,
    height
  );
  applyTexture(
    soulMaterials[2],
    textures[element.properties.get('textureA')],
    distance,
    height
  );

  return soulMaterials;
};

export function buildWall(element, layer, scene, textures) {
  const [vertex0, vertex1, inverted] = getVerticesOfWall(element, layer);

  // Get height and thickness of the wall converting them into the current scene units
  const thickness = element.properties.getIn(['thickness', 'length']);
  const height = element.properties.getIn(['height', 'length']);

  const distance = verticesDistance(vertex0, vertex1);
  const halfDistance = distance / 2;

  const soulMaterials = createSoulMaterials(element, layer, textures);
  let soul = new Mesh(
    new BoxGeometry(distance, height, thickness),
    soulMaterials
  );

  const alpha = Math.asin((vertex1.y - vertex0.y) / distance);

  const sinAlpha = Math.sin(alpha);
  const cosAlpha = Math.cos(alpha);

  soul.position.y += height / 2;
  soul.position.x += halfDistance * cosAlpha;
  soul.position.z -= halfDistance * sinAlpha;

  soul.rotation.y = alpha;

  element.holes.forEach(holeID => {
    const holeData = layer.holes.get(holeID);

    const holeWidth = holeData.properties.getIn(['width', 'length']);
    const holeHeight = holeData.properties.getIn(['height', 'length']);
    const holeAltitude = holeData.properties.getIn(['altitude', 'length']);
    const offset = inverted ? 1 - holeData.offset : holeData.offset;
    const holeDistance = offset * distance;

    const holeGeometry = new BoxGeometry(holeWidth, holeHeight, thickness);
    const holeMesh = new Mesh(holeGeometry);

    holeMesh.position.y += holeHeight / 2 + holeAltitude;
    holeMesh.position.x += holeDistance * cosAlpha;
    holeMesh.position.z -= holeDistance * sinAlpha;

    holeMesh.rotation.y = alpha;

    const wallBSP = new ThreeBSP(soul);
    const holeBSP = new ThreeBSP(holeMesh);

    const wallWithHoleBSP = wallBSP.subtract(holeBSP);
    soul = wallWithHoleBSP.toMesh(soulMaterials);
  });
  // The facenormals need to be re-calculated have correct UV mapping
  soul.geometry.computeFaceNormals();

  soul.name = 'soul';

  // Split MaterialId's
  soul.geometry.faces = soul.geometry.faces.map(face => {
    const {
      normal: { z }
    } = face;

    if (z > 0) {
      face.materialIndex = 2;
    } else if (z < 0) {
      face.materialIndex = 1;
    } else {
      face.materialIndex = 0;
    }
    return face;
  });

  return Promise.resolve(soul);
}

export function updatedWall(
  element,
  layer,
  scene,
  textures,
  mesh,
  oldElement,
  differences,
  selfDestroy,
  selfBuild
) {
  let noPerf = () => {
    selfDestroy();
    return selfBuild();
  };

  let soul = mesh.getObjectByName('soul');

  if (differences[0] == 'selected') {
    const soulMaterials = createSoulMaterials(element, layer, textures);
    setTimeout(() => {
      soul.material = soulMaterials;
      soul.material.needsUpdate = true;
    }, 20);
  } else if (differences[0] == 'properties') {
    if (differences[1] == 'thickness') {
      let newThickness = element.getIn(['properties', 'thickness', 'length']);
      let oldThickness = oldElement.getIn([
        'properties',
        'thickness',
        'length'
      ]);

      let originalThickness = oldThickness / soul.scale.z;
      soul.scale.set(1, 1, newThickness / originalThickness);
    } else return noPerf();
  } else return noPerf();

  return Promise.resolve(mesh);
}
