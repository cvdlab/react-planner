import {
  Shape,
  MeshPhongMaterial,
  ShapeGeometry,
  TextureLoader,
  BackSide,
  FrontSide,
  DoubleSide,
  Object3D,
  Mesh,
  MeshLambertMaterial,
  RepeatWrapping,
  Vector2,
  BoxHelper,
  VertexColors,
  BoxGeometry,
  MeshBasicMaterial,
  Group
} from 'three';

import ThreeBSP from '../../utils/threeCSG.es6';
import {verticesDistance} from '../../utils/geometry';

const bboxColor = 0x99c3fb;
const halfPI = Math.PI / 2;

/**
 * This function build the closures around the holes and the walls
 * @param wall: Wall Object
 * @param color: Box Color
 * @returns {BoxHelper}: BoxHelper
 */
const createBoxHelper = (wall, color) => {
  let box = new BoxHelper(wall, color);
  box.material.depthTest = false;
  box.material.linewidth = 2;
  box.material.vertexColor = VertexColors;
  box.renderOrder = 1000;
  return box;
};

/**
 * This function build the closures around the holes and the walls
 * @param vertex0: Start vertex
 * @param vertex1: End vertex
 * @param height: Height of the shape
 * @param thickness: Thickness of the closure
 * @returns {{topShape: *[], leftShape: *[]}}: The left and top shape (the others can be computed from these two)
 */
const buildShapeClosures = (vertex0, vertex1, height, thickness) => {
  let xDiff = vertex0.x - vertex1.x;
  let yDiff = vertex0.y - vertex1.y;
  let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

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

  return { topShape, leftShape };
};

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

  let { min, max } = geometry.boundingBox;

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

export function buildWall(element, layer, scene, textures)
{
  // Get the two vertices of the wall
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

  // Get height and thickness of the wall converting them into the current scene units
  let height = element.properties.getIn(['height', 'length']);
  let thickness = element.properties.getIn(['thickness', 'length']);
  let halfThickness = thickness / 2;
  let faceThickness = 0.2;
  let faceDistance = 1;

  let distance = verticesDistance( vertex0, vertex1 );
  let halfDistance = distance / 2;

  let soulMaterial = new MeshBasicMaterial( {color: ( element.selected ? bboxColor : 0xD3D3D3 )} );
  let soul = new Mesh( new BoxGeometry(distance, height, thickness), soulMaterial );

  let alpha = Math.asin((vertex1.y - vertex0.y) / (distance));

  let sinAlpha = Math.sin(alpha);
  let cosAlpha = Math.cos(alpha);

  soul.position.y += height / 2;
  soul.position.x += halfDistance * cosAlpha;
  soul.position.z -= halfDistance * sinAlpha;

  soul.rotation.y = alpha;

  element.holes.forEach( holeID => {
    let holeData = layer.holes.get(holeID);

    let holeWidth = holeData.properties.getIn(['width', 'length']);
    let holeHeight = holeData.properties.getIn(['height', 'length']);
    let holeAltitude = holeData.properties.getIn(['altitude', 'length']);
    let offset = inverted ? 1 - holeData.offset : holeData.offset;
    let holeDistance = offset * distance;

    let holeGeometry = new BoxGeometry( holeWidth, holeHeight, thickness );
    let holeMesh = new Mesh( holeGeometry );

    holeMesh.position.y += holeHeight / 2 + holeAltitude;
    holeMesh.position.x += holeDistance * cosAlpha;
    holeMesh.position.z -= holeDistance * sinAlpha;

    holeMesh.rotation.y = alpha;

    let wallBSP = new ThreeBSP( soul );
    let holeBSP = new ThreeBSP( holeMesh );

    let wallWithHoleBSP = wallBSP.subtract( holeBSP );
    soul = wallWithHoleBSP.toMesh( soulMaterial );
  });

  soul.name = 'soul';

  let frontMaterial = new MeshBasicMaterial();
  let backMaterial = new MeshBasicMaterial();

  applyTexture(frontMaterial, textures[element.properties.get('textureA')], distance, height);
  applyTexture(backMaterial, textures[element.properties.get('textureB')], distance, height);

  let scaleFactor = faceThickness / thickness;
  let texturedFaceDistance = halfThickness + faceDistance;

  let frontFace = soul.clone();
  frontFace.material = frontMaterial;
  frontFace.scale.set( 1, 1, scaleFactor );
  frontFace.position.x += texturedFaceDistance * Math.cos(alpha - ( halfPI ) );
  frontFace.position.z -= texturedFaceDistance * Math.sin(alpha - ( halfPI ) );
  frontFace.name = 'frontFace';

  let backFace = soul.clone();
  backFace.material = backMaterial;
  backFace.scale.set( 1, 1, scaleFactor );
  backFace.position.x += texturedFaceDistance * Math.cos(alpha + ( halfPI ) );
  backFace.position.z -= texturedFaceDistance * Math.sin(alpha + ( halfPI ) );
  backFace.name = 'backFace';

  let merged = new Group();
  merged.add( soul, frontFace, backFace );

  return Promise.resolve( merged );
}

export function updatedWall( element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild ) {
  let noPerf = () => { selfDestroy(); return selfBuild(); };

  let soul = mesh.getObjectByName('soul');
  let frontFace = mesh.getObjectByName('frontFace');
  let backFace = mesh.getObjectByName('backFace');

  if( differences[0] == 'selected' ) {
    soul.material = new MeshBasicMaterial( {color: ( element.selected ? bboxColor : 0xD3D3D3 )} );
  }
  else if( differences[0] == 'properties' ){

    if( differences[1] == 'thickness' ){
      let newThickness = element.getIn(['properties', 'thickness', 'length']);
      let oldThickness = oldElement.getIn(['properties', 'thickness', 'length']);
      let halfNewThickness = newThickness / 2;
      let texturedFaceDistance = halfNewThickness + 1;
      let originalThickness = oldThickness / soul.scale.z;
      let alpha = soul.rotation.y;

      let xTemp = texturedFaceDistance * Math.cos(alpha - ( halfPI ) );
      let zTemp = texturedFaceDistance * Math.sin(alpha - ( halfPI ) );

      soul.scale.set( 1, 1, ( newThickness / originalThickness ) );

      frontFace.position.x = soul.position.x + ( xTemp );
      frontFace.position.z = soul.position.z + ( zTemp );

      backFace.position.x = soul.position.x - ( xTemp );
      backFace.position.z = soul.position.z - ( zTemp );
    }
    else return noPerf();
  }
  else return noPerf();

  return Promise.resolve(mesh);
}

export function buildWall_OLD(element, layer, scene, textures) {

  // Get the two vertices of the wall
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

  // Get height and thickness of the wall converting them into the current scene units
  let height = element.properties.getIn(['height', 'length']);
  let thickness = element.properties.getIn(['thickness', 'length']);
  let halfThickness = thickness / 2;

  let bevelRadius = thickness; // This is useful for linking two walls together
  let halfBevelRadius = bevelRadius / 2;

  /*
   * First of all I need to build the wall shape. We can build it drawing a rectangle
   * with the left bottom vertex in the origin and where the length is given by the distance between the
   * two vertices and the height is the height of the wall
   */

  // Compute the distance between the two vertices
  let xDiff = vertex0.x - vertex1.x;
  let yDiff = vertex0.y - vertex1.y;
  let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

  // I use this workaround to link two adjacent walls together
  distance += bevelRadius; //TODO: REMOVE WORKAROUND BEVELING

  // Now I can build the coordinates of the wall shape:

  /**
   *
   *  (bevelRadius/2,height)     (distance,height)
   *      x------------------x
   *      |                  |            ^ y
   *      |                  |            |
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
  let pivot = new Object3D();

  // Create a Shape from the coordinates
  let rectShape = createShape(wallCoords);

  // Now we have to create the holes for the wall
  element.holes.forEach(holeID => {

    let holeData = layer.holes.get(holeID);

    // Get the sizes of the holes converting them to the scene units
    let holeWidth = holeData.properties.getIn(['width', 'length']);
    let holeHeight = holeData.properties.getIn(['height', 'length']);
    let holeAltitude = holeData.properties.getIn(['altitude', 'length']);
    let offset = inverted ? 1 - holeData.offset : holeData.offset;

    // Now I can build the coordinates of the hole shape:

    // The starting point is at (distance - bevelRadius) * offset + halfBevelRadius - width / 2 and is called startAt

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

    let startAt = (distance - bevelRadius) * offset - holeWidth / 2 + halfBevelRadius;

    // I add 0.00001 to the holeAltitude to avoid a warning with the Three triangulation algorithm
    let holeCoords = [
      [startAt, holeAltitude + 0.00001],
      [holeWidth + startAt, holeAltitude + 0.00001],
      [holeWidth + startAt, holeHeight + holeAltitude],
      [startAt, holeHeight + holeAltitude]
    ];

    // Now I can create the Threeshape of the hole and, push it into the wall shape holes
    let holeShape = createShape(holeCoords);
    rectShape.holes.push(holeShape);

    // At this point I can create a set of rectangles which surrounds the hole
    let holeClosures = buildShapeClosures(
      { x: 0, y: 0 },
      { x: holeWidth, y: 0 },
      holeHeight,
      thickness
    );

    let topHoleShape = createShape(holeClosures.topShape);
    let leftHoleShape = createShape(holeClosures.leftShape);

    let topHoleClosureGeometry = new ShapeGeometry(topHoleShape);
    let leftHoleClosureGeometry = new ShapeGeometry(leftHoleShape);

    let meshMeterial = new MeshLambertMaterial({ side: DoubleSide });

    let topHoleClosure = new Mesh(topHoleClosureGeometry, meshMeterial);
    let leftHoleClosure = new Mesh(leftHoleClosureGeometry, meshMeterial);
    let rightHoleClosure = new Mesh(leftHoleClosureGeometry, meshMeterial);

    topHoleClosure.rotation.x += halfPI;
    topHoleClosure.position.set(startAt - halfBevelRadius, holeHeight + holeAltitude, -halfThickness);

    leftHoleClosure.rotation.y -= halfPI;
    leftHoleClosure.position.set(startAt - halfBevelRadius, holeAltitude, -halfThickness);

    rightHoleClosure.rotation.y -= halfPI;
    rightHoleClosure.position.set(startAt + holeWidth - halfBevelRadius, holeAltitude, -halfThickness);

    pivot.add(topHoleClosure, leftHoleClosure, rightHoleClosure);

    if (holeAltitude !== 0) {
      let bottomHoleClosure = new Mesh(topHoleClosureGeometry, meshMeterial);

      bottomHoleClosure.rotation.x += halfPI;
      bottomHoleClosure.position.set(startAt - halfBevelRadius, holeAltitude, -halfThickness);

      pivot.add(bottomHoleClosure);
    }

  });

  // Now I can create the geometry of a single face of the wall
  let wallGeometry = new ShapeGeometry(rectShape);
  wallGeometry.computeVertexNormals();

  // I define two materials (one for every face of the wall)
  let wallMaterial1 = new MeshPhongMaterial({ side: BackSide });
  let wallMaterial2 = new MeshPhongMaterial({ side: FrontSide });

  let alphaMaj = alpha > 0;
  applyTexture(wallMaterial1, textures[element.properties.get('texture' + (alphaMaj ? 'A' : 'B'))], distance, height);
  applyTexture(wallMaterial2, textures[element.properties.get('texture' + (alphaMaj ? 'B' : 'A'))], distance, height);

  // Assign the correct UV coordinates
  assignUVs(wallGeometry);

  let wall1 = new Mesh(wallGeometry, wallMaterial1);
  let wall2 = new Mesh(wallGeometry, wallMaterial2);

  // Expand the wall at the center
  wall1.position.z -= halfThickness;
  wall2.position.z += halfThickness;

  // Change walls x position to link two adjacent walls
  wall1.position.x -= halfBevelRadius; //TODO: REMOVE WORKAROUND BEVELING
  wall2.position.x -= halfBevelRadius; //TODO: REMOVE WORKAROUND BEVELING

  // Rotate the wall around the bottom-left vertex
  pivot.rotation.y = alpha;

  // Add the two wall faces to the pivot
  pivot.add(wall1, wall2);

  // Build closures for wall
  let closures = buildShapeClosures({ x: 0, y: 0 }, { x: distance, y: 0 }, height, thickness);

  let topClosureGeometry = new ShapeGeometry(createShape(closures.topShape));
  let leftClosureGeometry = new ShapeGeometry(createShape(closures.leftShape));

  let topClosure = new Mesh(topClosureGeometry, new MeshLambertMaterial({
    side: BackSide
  }));

  let leftClosure = new Mesh(leftClosureGeometry, new MeshLambertMaterial({
    side: FrontSide
  }));

  let rightClosure = new Mesh(leftClosureGeometry, new MeshLambertMaterial({
    side: BackSide
  }));

  // Move the wall closures
  topClosure.rotation.x += halfPI;
  topClosure.position.z = -halfThickness;
  topClosure.position.y += height;

  topClosure.position.x = -halfBevelRadius; //TODO: REMOVE WORKAROUND BEVELING

  leftClosure.rotation.y -= halfPI;
  leftClosure.position.z = -halfBevelRadius;

  leftClosure.position.x = -halfBevelRadius - 1; //TODO: REMOVE WORKAROUND BEVELING

  rightClosure.rotation.y -= halfPI;
  rightClosure.position.z = -halfThickness;
  rightClosure.position.x += distance - 1;

  rightClosure.position.x = -halfBevelRadius; //TODO: REMOVE WORKAROUND BEVELING

  pivot.add(topClosure, leftClosure, rightClosure);

  // If the wall is selected show a bounding box around it
  if (element.selected) {
    pivot.add(
      createBoxHelper(wall1, bboxColor),
      createBoxHelper(wall2, bboxColor),
      createBoxHelper(topClosure, bboxColor),
      createBoxHelper(leftClosure, bboxColor),
      createBoxHelper(rightClosure, bboxColor)
    );
  }

  return Promise.resolve(pivot);
}
