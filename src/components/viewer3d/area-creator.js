import Three from 'three';

export default function createArea(vertices, color, textureName, isSelected) {

  let shape = new Three.Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  if (isSelected) {
    color = new Three.Color(1, 0.76, 0);
  } else if (textureName && textureName !== 'none') {
    color = 0xffffff;
  }

  let areaMaterial1 = new Three.MeshPhongMaterial({
    side: Three.FrontSide,
    color: color
  });

  let areaMaterial2 = new Three.MeshPhongMaterial({
    side: Three.BackSide,
    color: color
  });


  let loader = new Three.TextureLoader();

  switch (textureName) {
    case 'parquet':
      areaMaterial1.map = loader.load(require('./textures/parquet.jpg'));
      areaMaterial1.needsUpdate = true;
      areaMaterial1.map.wrapS = Three.RepeatWrapping;
      areaMaterial1.map.wrapT = Three.RepeatWrapping;
      areaMaterial1.map.repeat.set(2, 2);

      areaMaterial2.map = loader.load(require('./textures/parquet.jpg'));
      areaMaterial2.needsUpdate = true;
      areaMaterial2.map.wrapS = Three.RepeatWrapping;
      areaMaterial2.map.wrapT = Three.RepeatWrapping;
      areaMaterial2.map.repeat.set(2, 2);

      break;
    case 'none':
    default:
  }

  let shapeGeometry = new Three.ShapeGeometry(shape);
  assignUVs(shapeGeometry);

  let area = new Three.Object3D();

  let areaFace1 = new Three.Mesh(shapeGeometry, areaMaterial1);
  let areaFace2 = new Three.Mesh(shapeGeometry, areaMaterial2);

  area.add(areaFace1);
  area.add(areaFace2);

  area.rotation.x -= Math.PI / 2;
  return area;
}

function assignUVs(geometry) {
  geometry.computeBoundingBox();

  let max = geometry.boundingBox.max;
  let min = geometry.boundingBox.min;

  let offset = new Three.Vector2(0 - min.x, 0 - min.y);
  let range = new Three.Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = [];
  let faces = geometry.faces;

  for (let i = 0; i < geometry.faces.length; i++) {

    let v1 = geometry.vertices[faces[i].a];
    let v2 = geometry.vertices[faces[i].b];
    let v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push([
      new Three.Vector2(( v1.x + offset.x ) / range.x, ( v1.y + offset.y ) / range.y),
      new Three.Vector2(( v2.x + offset.x ) / range.x, ( v2.y + offset.y ) / range.y),
      new Three.Vector2(( v3.x + offset.x ) / range.x, ( v3.y + offset.y ) / range.y)
    ]);

  }
  geometry.uvsNeedUpdate = true;
}

