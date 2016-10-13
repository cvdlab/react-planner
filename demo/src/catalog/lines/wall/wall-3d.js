import Three from 'three';
import convert from 'convert-units';

export default function (element, layer, scene) {

  // Get the two vertices of the wall
  let vertex0 = layer.vertices.get(element.vertices.get(0));
  let vertex1 = layer.vertices.get(element.vertices.get(1));

  // The first vertex is the smaller one
  if (vertex0.x > vertex1.x) {
    let app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  // Get height and thickness of the wall converting them into the current scene units
  let height = convert(element.properties.get('height').get('length'))
      .from(element.properties.get('height').get('unit'))
      .to(scene.unit) * scene.pixelPerUnit;

  let thickness = convert(element.properties.get('thickness').get('length'))
      .from(element.properties.get('thickness').get('unit'))
      .to(scene.unit) * scene.pixelPerUnit;

  let bevelRadius = thickness; // This is useful for linking two walls together

  // Get holes data for this wall
  let holes = [];
  element.holes.forEach(holeID => {
    let hole = layer.holes.get(holeID);
    holes.push(hole);
  });

  let interactFunction = () => {
    return element.editingActions.selectLine(layer.id, element.id)
  };

  /*
   * First of all I need to build the wall shape. We can build it drawing a rectangle
   * with the left bottom vertex in the origin and where the length is given by the distance between the
   * two vertices and the height is the height of the wall
   */

  // Compute the distance between the two vertices
  let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  // I use this workaround to link two adjacent walls together
  distance += bevelRadius; //TODO: REMOVE WORKAROUND BEVELING

  // Now I can build the coordinates of the wall shape:

  /**
   *
   *  (bevelRadius/2,height)     (distance,height)
   *      x------------------x
   *      |                  |            ^ y
   *      |                  |            |
   *      |                  |          --|-----> x
   *      |                  |
   *      |                  |
   *      x------------------x
   *    (bevelRadius/2,0)            (distance,0)
   *
   */

  let wallCoords = [
    [0, 0],
    [distance, 0],
    [distance, height],
    [0, height]
  ];

  // Now I compute the rotation angle of the wall (see the bevel radius trick)
  let alpha = Math.asin((vertex1.y - vertex0.y) / (distance - bevelRadius)); //TODO: REMOVE WORKAROUND BEVELING

  // We will rotate on the bottom-left vertex, so we need a pivot in the origin
  let pivot = new Three.Object3D();

  // Create a Three.Shape from the coordinates
  let rectShape = createShape(wallCoords);

  // Now we have to create the holes for the wall
  holes.forEach(holeData => {

    // Get the sizes of the holes converting them to the scene units
    let holeWidth = convert(holeData.properties.get('width').get('length'))
        .from(holeData.properties.get('width').get('unit'))
        .to(scene.unit) * scene.pixelPerUnit;

    let holeHeight = convert(holeData.properties.get('height').get('length'))
        .from(holeData.properties.get('height').get('unit'))
        .to(scene.unit) * scene.pixelPerUnit;

    let holeAltitude = convert(holeData.properties.get('altitude').get('length'))
        .from(holeData.properties.get('altitude').get('unit'))
        .to(scene.unit) * scene.pixelPerUnit;


    // Now I can build the coordinates of the hole shape:

    // The starting point is at (distance - bevelRadius) * offset + bevelRadius / 2 - width / 2 and is called startAt

    /**
     *
     *  (startAt,holeAltitude + holeHeight)     (holeWidth + startAt,holeAltitude + holeHeight)
     *                x-------------------------------------------x
     *                |                                           |
     *                |                                           |
     *                |                                           |
     *                |                                           |
     *                |                                           |
     *                x-------------------------------------------x
     *      (startAt,holeAltitude)                (holeWidth + startAt,holeAltitude)
     *
     */

    let startAt = (distance - bevelRadius) * holeData.offset - holeWidth / 2 + bevelRadius / 2;

    // I add 0.00001 to the holeAltitude to avoid a warning with the Three triangulation algorithm
    let holeCoords = [
      [startAt, holeAltitude + 0.00001],
      [holeWidth + startAt, holeAltitude + 0.00001],
      [holeWidth + startAt, holeHeight + holeAltitude],
      [startAt, holeHeight + holeAltitude]
    ];

    // Now I can create the Three.shape of the hole and, push it into the wall shape holes
    let holeShape = createShape(holeCoords);
    rectShape.holes.push(holeShape);

    // At this point I can create a set of rectangles which surrounds the hole

    let holeClosures = buildShapeClosures(
      {x: 0, y: 0},
      {x: holeWidth, y: 0},
      holeHeight,
      thickness
    );

    let topHoleClosureCoords = holeClosures.topShape;
    let topHoleShape = createShape(topHoleClosureCoords);

    let leftHoleClosureCoords = holeClosures.leftShape;
    let leftHoleShape = createShape(leftHoleClosureCoords);

    let topHoleClosureGeometry = new Three.ShapeGeometry(topHoleShape);
    let leftHoleClosureGeometry = new Three.ShapeGeometry(leftHoleShape);

    let topHoleClosure = new Three.Mesh(topHoleClosureGeometry, new Three.MeshLambertMaterial({
      side: Three.DoubleSide
    }));

    let leftHoleClosure = new Three.Mesh(leftHoleClosureGeometry, new Three.MeshLambertMaterial({
      side: Three.DoubleSide
    }));

    let rightHoleClosure = new Three.Mesh(leftHoleClosureGeometry, new Three.MeshLambertMaterial({
      side: Three.DoubleSide
    }));

    topHoleClosure.rotation.x += Math.PI / 2;
    topHoleClosure.position.z -= thickness / 2;
    topHoleClosure.position.y += holeHeight + holeAltitude;
    topHoleClosure.position.x = startAt - bevelRadius / 2;

    leftHoleClosure.rotation.y -= Math.PI / 2;
    leftHoleClosure.position.z -= thickness / 2;
    leftHoleClosure.position.y += holeAltitude;
    leftHoleClosure.position.x = startAt - bevelRadius / 2;

    rightHoleClosure.rotation.y -= Math.PI / 2;
    rightHoleClosure.position.z -= thickness / 2;
    rightHoleClosure.position.y += holeAltitude;
    rightHoleClosure.position.x = startAt + holeWidth - bevelRadius / 2;

    pivot.add(topHoleClosure);
    pivot.add(leftHoleClosure);
    pivot.add(rightHoleClosure);

    if (holeAltitude !== 0) {

      let bottomHoleClosure = new Three.Mesh(topHoleClosureGeometry, new Three.MeshLambertMaterial({
        side: Three.DoubleSide
      }));

      bottomHoleClosure.rotation.x += Math.PI / 2;
      bottomHoleClosure.position.z -= thickness / 2;
      bottomHoleClosure.position.y += holeAltitude;
      bottomHoleClosure.position.x = startAt - bevelRadius / 2;

      pivot.add(bottomHoleClosure);

    }

  });

  // Now I can create the geometry of a single face of the wall
  let wallGeometry = new Three.ShapeGeometry(rectShape);
  wallGeometry.computeVertexNormals();

  // I define two materials (one for every face of the wall)
  let wallMaterial1 = new Three.MeshPhongMaterial({
    side: Three.BackSide
  });

  let wallMaterial2 = new Three.MeshPhongMaterial({
    side: Three.FrontSide
  });

  // I can choose the correct texture observing the angle of the wall
  if (alpha < 0) {
    applyTexture(wallMaterial1, element.properties.get('textureB'), distance, height);
    applyTexture(wallMaterial2, element.properties.get('textureA'), distance, height);
  } else {
    applyTexture(wallMaterial1, element.properties.get('textureA'), distance, height);
    applyTexture(wallMaterial2, element.properties.get('textureB'), distance, height);
  }

  // Assign the correct UV coordinates
  assignUVs(wallGeometry);

  let wall1 = new Three.Mesh(wallGeometry, wallMaterial1);
  let wall2 = new Three.Mesh(wallGeometry, wallMaterial2);

  // Expand the wall at the center
  wall1.position.z -= thickness / 2;
  wall2.position.z += thickness / 2;

  // Change walls x position to link two adjacent walls
  wall1.position.x -= bevelRadius / 2; //TODO: REMOVE WORKAROUND BEVELING
  wall2.position.x -= bevelRadius / 2; //TODO: REMOVE WORKAROUND BEVELING

  // Rotate the wall around the bottom-left vertex
  pivot.rotation.y = alpha;

  // Add the two wall faces to the pivot
  pivot.add(wall1);
  pivot.add(wall2);

  // Build closures for wall

  let closures = buildShapeClosures({x: 0, y: 0}, {x: distance, y: 0}, height, thickness);

  let topClosureCoords = closures.topShape;
  let topShape = createShape(topClosureCoords);

  let leftClosureCoords = closures.leftShape;
  let leftShape = createShape(leftClosureCoords);

  let topClosureGeometry = new Three.ShapeGeometry(topShape);
  let leftClosureGeometry = new Three.ShapeGeometry(leftShape);

  let topClosure = new Three.Mesh(topClosureGeometry, new Three.MeshLambertMaterial({
    side: Three.BackSide
  }));

  let leftClosure = new Three.Mesh(leftClosureGeometry, new Three.MeshLambertMaterial({
    side: Three.FrontSide
  }));

  let rightClosure = new Three.Mesh(leftClosureGeometry, new Three.MeshLambertMaterial({
    side: Three.BackSide
  }));

  // Move the wall closures
  topClosure.rotation.x += Math.PI / 2;
  topClosure.position.z -= thickness / 2;
  topClosure.position.y += height;

  topClosure.position.x -= bevelRadius / 2; //TODO: REMOVE WORKAROUND BEVELING

  leftClosure.rotation.y -= Math.PI / 2;
  leftClosure.position.z -= bevelRadius / 2;

  leftClosure.position.x -= bevelRadius / 2 - 1; //TODO: REMOVE WORKAROUND BEVELING

  rightClosure.rotation.y -= Math.PI / 2;
  rightClosure.position.z -= thickness / 2;
  rightClosure.position.x += distance - 1;

  rightClosure.position.x -= bevelRadius / 2; //TODO: REMOVE WORKAROUND BEVELING

  pivot.add(topClosure);
  pivot.add(leftClosure);
  pivot.add(rightClosure);

  // Add interaction with walls
  wall1.interact = interactFunction;
  wall2.interact = interactFunction;
  topClosure.interact = interactFunction;
  leftClosure.interact = interactFunction;
  rightClosure.interact = interactFunction;

  // If the wall is selected show a bounding box around it
  if (element.selected) {
    let box1 = new Three.BoxHelper(wall1, 0x99c3fb);
    box1.material.depthTest = false;
    box1.material.linewidth = 2;
    box1.material.vertexColor = Three.VertexColors;
    pivot.add(box1);

    let box2 = new Three.BoxHelper(wall2, 0x99c3fb);
    box2.material.depthTest = false;
    box2.material.linewidth = 2;
    pivot.add(box2);

    let box3 = new Three.BoxHelper(topClosure, 0x99c3fb);
    box3.material.depthTest = false;
    box3.material.linewidth = 2;
    pivot.add(box3);

    let box4 = new Three.BoxHelper(leftClosure, 0x99c3fb);
    box4.material.depthTest = false;
    box4.material.linewidth = 2;
    pivot.add(box4);

    let box5 = new Three.BoxHelper(rightClosure, 0x99c3fb);
    box5.material.depthTest = false;
    box5.material.linewidth = 2;
    pivot.add(box5);
  }

  return pivot;
}

/**
 * This function build the closures around the holes and the walls
 * @param vertex0: Start vertex
 * @param vertex1: End vertex
 * @param height: Height of the shape
 * @param thickness: Thickness of the closure
 * @returns {{topShape: *[], leftShape: *[]}}: The left and top shape (the others can be computed fron these two)
 */
function buildShapeClosures(vertex0, vertex1, height, thickness) {

  let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  let topShape = [
    [vertex0.x, vertex0.y],
    [vertex0.x + distance, vertex0.y],
    [vertex0.x + distance, vertex0.y + thickness],
    [vertex0.x, vertex0.y + thickness]];

  let leftShape = [
    [vertex0.x, vertex0.y],
    [vertex0.x + thickness, vertex0.y],
    [vertex0.x + thickness, vertex0.y + height],
    [vertex0.x, vertex0.y + height],
  ];

  return {topShape: topShape, leftShape: leftShape};
}

/**
 * This function will create a shape given a list of coordinates
 * @param shapeCoords
 * @returns {THREE.Shape}
 */
function createShape(shapeCoords) {
  let shape = new Three.Shape();
  shape.moveTo(shapeCoords[0][0], shapeCoords[0][1]);
  for (let i = 1; i < shapeCoords.length; i++) {
    shape.lineTo(shapeCoords[i][0], shapeCoords[i][1]);
  }
  return shape;
}

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param textureName: The name of the texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 */
function applyTexture(material, textureName, length, height) {

  let loader = new Three.TextureLoader();

  switch (textureName) {
    case 'bricks':
      material.map = loader.load(require('./textures/bricks.jpg'));
      material.needsUpdate = true;
      material.map.wrapS = Three.RepeatWrapping;
      material.map.wrapT = Three.RepeatWrapping;
      material.map.repeat.set(length / 100, height / 100);

      material.normalMap = loader.load(require("./textures/bricks-normal.jpg"));
      material.normalScale = new Three.Vector2(0.8, 0.8);
      material.normalMap.wrapS = Three.RepeatWrapping;
      material.normalMap.wrapT = Three.RepeatWrapping;
      material.normalMap.repeat.set(length / 100, height / 100);
      break;
    case 'painted':
      material.map = loader.load(require('./textures/painted.jpg'));
      material.needsUpdate = true;
      material.map.wrapS = Three.RepeatWrapping;
      material.map.wrapT = Three.RepeatWrapping;
      material.map.repeat.set(length / 100, height / 100);

      material.normalMap = loader.load(require("./textures/painted-normal.png"));
      material.normalScale = new Three.Vector2(0.4, 0.4);
      material.normalMap.wrapS = Three.RepeatWrapping;
      material.normalMap.wrapT = Three.RepeatWrapping;
      material.normalMap.repeat.set(length / 100, height / 100);
      break;
  }
}

/**
 * Function that assign UV coordinates to a geometry
 * @param geometry
 */
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

