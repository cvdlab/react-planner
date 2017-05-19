import { Shape as ThreeShape, MeshPhongMaterial as ThreeMeshPhongMaterial, ShapeGeometry as ThreeShapeGeometry, Box3 as ThreeBox3, TextureLoader as ThreeTextureLoader, BackSide as ThreeBackSide, FrontSide as ThreeFrontSide, Object3D as ThreeObject3D, Mesh as ThreeMesh, MeshBasicMaterial as ThreeMeshBasicMaterial, RepeatWrapping as ThreeRepeatWrapping, Vector2 as ThreeVector2 } from 'three';

export default function createArea(element, layer, scene, textures) {
  var vertices = [];

  element.vertices.forEach(function (vertexID) {
    vertices.push(layer.vertices.get(vertexID));
  });

  var color = element.properties.get('patternColor');
  var textureName = element.properties.get('texture');

  var shape = new ThreeShape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (var i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  if (element.selected) {
    color = 0x99c3fb;
  } else if (textureName && textureName !== 'none') {
    color = 0xffffff;
  }

  var areaMaterial1 = new ThreeMeshPhongMaterial({
    side: ThreeFrontSide,
    color: color
  });

  var areaMaterial2 = new ThreeMeshPhongMaterial({
    side: ThreeBackSide,
    color: color
  });

  var shapeGeometry = new ThreeShapeGeometry(shape);
  assignUVs(shapeGeometry);

  var boundingBox = new ThreeBox3().setFromObject(new ThreeMesh(shapeGeometry, new ThreeMeshBasicMaterial()));

  var width = boundingBox.max.x - boundingBox.min.x;
  var height = boundingBox.max.y - boundingBox.min.y;

  var loader = new ThreeTextureLoader();

  applyTexture(areaMaterial1, textureName, width, height, textures);
  applyTexture(areaMaterial2, textureName, width, height, textures);

  var area = new ThreeObject3D();

  var areaFace1 = new ThreeMesh(shapeGeometry, areaMaterial1);
  var areaFace2 = new ThreeMesh(shapeGeometry, areaMaterial2);

  area.add(areaFace1);
  area.add(areaFace2);

  area.rotation.x -= Math.PI / 2;

  return Promise.resolve(area);
}

/**
 * Apply a texture to an area face
 * @param material: The material of the face
 * @param textureName: The name of the texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 * @param textures: The list of textures available for this wall
 */
function applyTexture(material, textureName, length, height, textures) {

  var loader = new ThreeTextureLoader();

  var textureParams = textures[textureName];

  if (textureParams) {
    material.map = loader.load(textureParams.uri);
    material.needsUpdate = true;
    material.map.wrapS = ThreeRepeatWrapping;
    material.map.wrapT = ThreeRepeatWrapping;
    material.map.repeat.set(length * textureParams.lengthRepeatScale, height * textureParams.heightRepeatScale);

    if (textureParams.normal) {
      material.normalMap = loader.load(textureParams.normal.uri);
      material.normalScale = new ThreeVector2(textureParams.normal.normalScaleX, textureParams.normal.normalScaleY);
      material.normalMap.wrapS = ThreeRepeatWrapping;
      material.normalMap.wrapT = ThreeRepeatWrapping;
      material.normalMap.repeat.set(length * textureParams.normal.lengthRepeatScale, height * textureParams.normal.heightRepeatScale);
    }
  }
}

function assignUVs(geometry) {
  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max;
  var min = geometry.boundingBox.min;

  var offset = new ThreeVector2(0 - min.x, 0 - min.y);
  var range = new ThreeVector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = [];
  var faces = geometry.faces;

  for (var i = 0; i < geometry.faces.length; i++) {

    var v1 = geometry.vertices[faces[i].a];
    var v2 = geometry.vertices[faces[i].b];
    var v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push([new ThreeVector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new ThreeVector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new ThreeVector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)]);
  }
  geometry.uvsNeedUpdate = true;
}