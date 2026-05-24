import {
  Shape,
  MeshPhongMaterial,
  ShapeGeometry,
  Box3,
  BufferAttribute,
  TextureLoader,
  BackSide,
  FrontSide,
  Object3D,
  Mesh,
  MeshBasicMaterial,
  RepeatWrapping,
  Vector2,
  DoubleSide
} from 'three';
import * as SharedStyle from '../../shared-style';

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param texture: The texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 */
const applyTexture = (material: any, texture: any, length: number, height: number) => {
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
 * Function that assigns UV coordinates to a BufferGeometry.
 * The shape lives in the XY plane (Z=0), so UVs are derived directly from x/y.
 */
const assignUVs = (geometry: any) => {
  geometry.computeBoundingBox();

  let { min, max } = geometry.boundingBox;

  let offsetX = -min.x;
  let offsetY = -min.y;
  let rangeX = max.x - min.x || 1;
  let rangeY = max.y - min.y || 1;

  let position = geometry.attributes.position;
  let vertexCount = position.count;
  let uvs = new Float32Array(vertexCount * 2);

  for (let i = 0; i < vertexCount; i++) {
    let x = position.getX(i);
    let y = position.getY(i);
    uvs[i * 2]     = (x + offsetX) / rangeX;
    uvs[i * 2 + 1] = (y + offsetY) / rangeY;
  }

  geometry.setAttribute('uv', new BufferAttribute(uvs, 2));
};

export function createArea(element: any, layer: any, scene: any, textures: any) {
  let vertices: any[] = [];

  element.vertices.forEach((vertexID: any) => {
    vertices.push(layer.vertices.get(vertexID));
  });

  let textureName = element.properties.get('texture');
  let color = element.properties.get('patternColor');

  if (element.selected) {
    color = SharedStyle.AREA_MESH_COLOR.selected;
  } else if (textureName && textureName !== 'none') {
    color = SharedStyle.AREA_MESH_COLOR.unselected;
  }

  let shape = new Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  let areaMaterial = new MeshPhongMaterial({ side: DoubleSide, color });

  /* Create holes for the area */
  element.holes.forEach((holeID: any) => {
    let holeCoords: any[] = [];
    layer.getIn(['areas', holeID, 'vertices']).forEach((vertexID: any) => {
      let { x, y } = layer.getIn(['vertices', vertexID]);
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

  applyTexture(areaMaterial, texture, width, height);

  let area = new Mesh(shapeGeometry, areaMaterial);

  area.rotation.x -= Math.PI / 2;
  area.name = 'floor';

  return Promise.resolve(area);
}

export function updatedArea(element: any, layer: any, scene: any, textures: any, mesh: any, oldElement: any, differences: any, selfDestroy: any, selfBuild: any) {
  let noPerf = () => { selfDestroy(); return selfBuild(); };
  let floor = mesh.getObjectByName('floor');

  if (differences[0] == 'selected') {
    let color = element.selected ? SharedStyle.AREA_MESH_COLOR.selected : (element.properties.get('patternColor') || SharedStyle.AREA_MESH_COLOR.unselected);
    floor.material.color.set(color);
  }
  else if (differences[0] == 'properties') {
    if (differences[1] === 'texture') {
      return noPerf();
    }
  }
  else return noPerf();

  return Promise.resolve(mesh);
}

/**
 * This function will create a shape given a list of coordinates
 * @param shapeCoords
 * @returns {Shape}
 */
const createShape = (shapeCoords: any[]) => {
  let shape = new Shape();
  shape.moveTo(shapeCoords[0][0], shapeCoords[0][1]);
  for (let i = 1; i < shapeCoords.length; i++) {
    shape.lineTo(shapeCoords[i][0], shapeCoords[i][1]);
  }
  return shape;
};
