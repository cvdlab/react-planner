import Three from 'three';

export default function createShapeWall(vertex0, vertex1, height, thickness, holes, wallID, isSelected) {

  if (vertex0.x > vertex1.x) {
    let app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  let wallCoord = buildShapeCoordinates({x: 0, y: 0}, {x: distance, y: 0}, height); // TODO: Clean Code!!

  let alpha = Math.asin((vertex1.y - vertex0.y) / distance);

  let pivot = new Three.Object3D();

  let rectShape = createShape(wallCoord);

  holes.forEach(hole => {
    let holeCoords = createHoleShape(vertex0,
      vertex1,
      hole.properties.get('width'),
      hole.properties.get('height'),
      hole.offset,
      hole.properties.get('altitude') + 0.001);
    let holeShape = createShape(holeCoords);
    rectShape.holes.push(holeShape);
  });


  let extrudedGeometry = new Three.ExtrudeGeometry(rectShape, {
    amount: thickness,
    bevelEnabled: true,
    bevelSize: thickness / 2
  });

  let wallColor = new Three.Color(1, 1, 1);
  if (isSelected) {
    wallColor = new Three.Color(1, 0.76, 0);
  }

  let wall = new Three.Mesh(extrudedGeometry, new Three.MeshLambertMaterial({
    side: Three.DoubleSide,
    color: wallColor
  }));

  wall.position.z -= thickness / 2; // I extrude on the middle line

  pivot.rotation.y = alpha;
  pivot.position.x += vertex0.x;
  pivot.position.z -= vertex0.y;

  pivot.add(wall);
  return pivot;
}

function buildShapeCoordinates(vertex0, vertex1, height) {

  let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  return [
    [vertex0.x, vertex0.y],
    [vertex0.x + distance, vertex0.y],
    [vertex0.x + distance, vertex0.y + height],
    [vertex0.x, vertex0.y + height]
  ];
}


function createShape(wallCoord) {

  let rectShape = new Three.Shape();
  rectShape.moveTo(wallCoord[0][0], wallCoord[0][1]);
  for (let i = 1; i < wallCoord.length; i++) {
    rectShape.lineTo(wallCoord[i][0], wallCoord[i][1]);
  }
  return rectShape;
}

function createHoleShape(lineVertex0, lineVertex1, width, height, offset, altitude) {

  let length = Math.sqrt(Math.pow((lineVertex1.x - lineVertex0.x), 2)
    + Math.pow((lineVertex1.y - lineVertex0.y), 2));

  let startAt = length * offset - width / 2;
  let wallCoordinates = [
    [startAt, altitude],
    [width + startAt, altitude],
    [width + startAt, height + altitude],
    [startAt, height + altitude]
  ];

  return wallCoordinates;
}
