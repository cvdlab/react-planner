import {
  Shape,
  MeshPhongMaterial,
  ShapeGeometry,
  Box3,
  TextureLoader,
  BackSide,
  FrontSide,
  Object3D,
  Mesh,
  MeshBasicMaterial,
  RepeatWrapping,
  Vector2
} from 'three';
import * as SharedStyle from '../../shared-style';

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
    material.map.repeat.set(length * texture.lengthRepeatScale, height * texture.heightRepeatScale);

    if (texture.normal) {
      material.normalMap = loader.load(texture.normal.uri);
      material.normalScale = new Vector2(texture.normal.normalScaleX, texture.normal.normalScaleY);
      material.normalMap.wrapS = RepeatWrapping;
      material.normalMap.wrapT = RepeatWrapping;
      material.normalMap.repeat.set(length * texture.normal.lengthRepeatScale, height * texture.normal.heightRepeatScale);
    }
  }
};

/**
 * Function that assign UV coordinates to a geometry
 * @param geometry
 */
const assignUVs = (geometry) => {
  geometry.computeBoundingBox();

  let {min, max} = geometry.boundingBox;

  let offset = new Vector2(0 - min.x, 0 - min.y);
  let range = new Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = geometry.faces.map((face) => {

    let v1 = geometry.vertices[face.a];
    let v2 = geometry.vertices[face.b];
    let v3 = geometry.vertices[face.c];

    return [
      new Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
      new Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
      new Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
    ];

  });

  geometry.uvsNeedUpdate = true;
};

export default function createArea(element, layer, scene, textures) {
  let vertices = [];

  element.vertices.forEach(vertexID => {
    vertices.push(layer.vertices.get(vertexID));
  });

  let textureName = element.properties.get('texture');
  let color = element.properties.get('patternColor');

  if (element.selected) {
    color = 0x99c3fb
  } else if (textureName && textureName !== 'none') {
    color = SharedStyle.COLORS.white;
  }

  let shape = new Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  let areaMaterial1 = new MeshPhongMaterial({side: FrontSide, color});
  let areaMaterial2 = new MeshPhongMaterial({side: BackSide, color});

  /* Create holes for the area */
  element.holes.forEach(holeID => {
    let holeCoords = [];
    layer.getIn(['areas', holeID, 'vertices']).forEach(vertexID => {
      let {x, y} = layer.getIn(['vertices', vertexID]);
      holeCoords.push([x, y]);
    });
    holeCoords = holeCoords.reverse();
    let holeShape = createShape(holeCoords);
    shape.holes.push(holeShape);
  });

  let shapeGeometry = new ShapeGeometry(shape);
  assignUVs(shapeGeometry);

  let boundingBox = new Box3().setFromObject(new Mesh(shapeGeometry, new MeshBasicMaterial()));

  let width = boundingBox.max.x - boundingBox.min.x;
  let height = boundingBox.max.y - boundingBox.min.y;

  let texture = textures[textureName];

  applyTexture(areaMaterial1, texture, width, height);
  applyTexture(areaMaterial2, texture, width, height);

  let area = new Object3D();

  let areaFace1 = new Mesh(shapeGeometry, areaMaterial1);
  let areaFace2 = new Mesh(shapeGeometry, areaMaterial2);

  area.add(areaFace1, areaFace2);

  area.rotation.x -= Math.PI / 2;

  return Promise.resolve(area);
}

/**
 * This function will create a shape given a list of coordinates
 * @param shapeCoords
 * @returns {Shape}
 */
const createShape = (shapeCoords) => {
  let shape = new Shape();
  shape.moveTo(shapeCoords[0][0], shapeCoords[0][1]);
  for (let i = 1; i < shapeCoords.length; i++) {
    shape.lineTo(shapeCoords[i][0], shapeCoords[i][1]);
  }
  return shape;
};
