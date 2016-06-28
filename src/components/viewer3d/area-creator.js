import Three from 'three';

export default function createArea(vertices, color) {

  let shape = new Three.Shape();
  shape.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }
  
  let area = new Three.Mesh(new Three.ShapeGeometry(shape), new Three.MeshLambertMaterial({
    side: Three.DoubleSide,
    color: color
  }));

  area.rotation.x -= Math.PI/2;

  return area;
}
