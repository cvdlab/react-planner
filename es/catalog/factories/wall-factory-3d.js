import { Shape, MeshPhongMaterial, ShapeGeometry, TextureLoader, BackSide, FrontSide, DoubleSide, Object3D, Mesh, MeshLambertMaterial, RepeatWrapping, Vector2, BoxHelper, VertexColors, BoxGeometry, MeshBasicMaterial, Group } from 'three';

import ThreeBSP from '../../utils/threeCSG.es6';
import { verticesDistance } from '../../utils/geometry';
import * as SharedStyle from '../../shared-style';

var halfPI = Math.PI / 2;

/**
 * This function build the closures around the holes and the walls
 * @param wall: Wall Object
 * @param color: Box Color
 * @returns {BoxHelper}: BoxHelper
 */
var createBoxHelper = function createBoxHelper(wall, color) {
  var box = new BoxHelper(wall, color);
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
var buildShapeClosures = function buildShapeClosures(vertex0, vertex1, height, thickness) {
  var xDiff = vertex0.x - vertex1.x;
  var yDiff = vertex0.y - vertex1.y;
  var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

  var topShape = [[vertex0.x, vertex0.y], [vertex0.x + distance, vertex0.y], [vertex0.x + distance, vertex0.y + thickness], [vertex0.x, vertex0.y + thickness]];

  var leftShape = [[vertex0.x, vertex0.y], [vertex0.x + thickness, vertex0.y], [vertex0.x + thickness, vertex0.y + height], [vertex0.x, vertex0.y + height]];

  return { topShape: topShape, leftShape: leftShape };
};

/**
 * This function will create a shape given a list of coordinates
 * @param shapeCoords
 * @returns {Shape}
 */
var createShape = function createShape(shapeCoords) {
  var shape = new Shape();
  shape.moveTo(shapeCoords[0][0], shapeCoords[0][1]);
  for (var i = 1; i < shapeCoords.length; i++) {
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
var applyTexture = function applyTexture(material, texture, length, height) {
  var loader = new TextureLoader();

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
var assignUVs = function assignUVs(geometry) {
  geometry.computeBoundingBox();

  var _geometry$boundingBox = geometry.boundingBox,
      min = _geometry$boundingBox.min,
      max = _geometry$boundingBox.max;


  var offset = new Vector2(0 - min.x, 0 - min.y);
  var range = new Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = geometry.faces.map(function (face) {

    var v1 = geometry.vertices[face.a];
    var v2 = geometry.vertices[face.b];
    var v3 = geometry.vertices[face.c];

    return [new Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)];
  });

  geometry.uvsNeedUpdate = true;
};

export function buildWall(element, layer, scene, textures) {
  // Get the two vertices of the wall
  var vertex0 = layer.vertices.get(element.vertices.get(0));
  var vertex1 = layer.vertices.get(element.vertices.get(1));
  var inverted = false;

  // The first vertex is the smaller one
  if (vertex0.x > vertex1.x) {
    var app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
    inverted = true;
  }

  // Get height and thickness of the wall converting them into the current scene units
  var height = element.properties.getIn(['height', 'length']);
  var thickness = element.properties.getIn(['thickness', 'length']);
  var halfThickness = thickness / 2;
  var faceThickness = 0.2;
  var faceDistance = 1;

  var distance = verticesDistance(vertex0, vertex1);
  var halfDistance = distance / 2;

  var soulMaterial = new MeshBasicMaterial({ color: element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 });
  var soul = new Mesh(new BoxGeometry(distance, height, thickness), soulMaterial);

  var alpha = Math.asin((vertex1.y - vertex0.y) / distance);

  var sinAlpha = Math.sin(alpha);
  var cosAlpha = Math.cos(alpha);

  soul.position.y += height / 2;
  soul.position.x += halfDistance * cosAlpha;
  soul.position.z -= halfDistance * sinAlpha;

  soul.rotation.y = alpha;

  element.holes.forEach(function (holeID) {
    var holeData = layer.holes.get(holeID);

    var holeWidth = holeData.properties.getIn(['width', 'length']);
    var holeHeight = holeData.properties.getIn(['height', 'length']);
    var holeAltitude = holeData.properties.getIn(['altitude', 'length']);
    var offset = inverted ? 1 - holeData.offset : holeData.offset;
    var holeDistance = offset * distance;

    var holeGeometry = new BoxGeometry(holeWidth, holeHeight, thickness);
    var holeMesh = new Mesh(holeGeometry);

    holeMesh.position.y += holeHeight / 2 + holeAltitude;
    holeMesh.position.x += holeDistance * cosAlpha;
    holeMesh.position.z -= holeDistance * sinAlpha;

    holeMesh.rotation.y = alpha;

    var wallBSP = new ThreeBSP(soul);
    var holeBSP = new ThreeBSP(holeMesh);

    var wallWithHoleBSP = wallBSP.subtract(holeBSP);
    soul = wallWithHoleBSP.toMesh(soulMaterial);
  });

  soul.name = 'soul';

  var frontMaterial = new MeshBasicMaterial();
  var backMaterial = new MeshBasicMaterial();

  applyTexture(frontMaterial, textures[element.properties.get('textureA')], distance, height);
  applyTexture(backMaterial, textures[element.properties.get('textureB')], distance, height);

  var scaleFactor = faceThickness / thickness;
  var texturedFaceDistance = halfThickness + faceDistance;

  var frontFace = soul.clone();
  frontFace.material = frontMaterial;
  frontFace.scale.set(1, 1, scaleFactor);
  frontFace.position.x += texturedFaceDistance * Math.cos(alpha - halfPI);
  frontFace.position.z -= texturedFaceDistance * Math.sin(alpha - halfPI);
  frontFace.name = 'frontFace';

  var backFace = soul.clone();
  backFace.material = backMaterial;
  backFace.scale.set(1, 1, scaleFactor);
  backFace.position.x += texturedFaceDistance * Math.cos(alpha + halfPI);
  backFace.position.z -= texturedFaceDistance * Math.sin(alpha + halfPI);
  backFace.name = 'backFace';

  var merged = new Group();
  merged.add(soul, frontFace, backFace);

  return Promise.resolve(merged);
}

export function updatedWall(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild) {
  var noPerf = function noPerf() {
    selfDestroy();return selfBuild();
  };

  var soul = mesh.getObjectByName('soul');
  var frontFace = mesh.getObjectByName('frontFace');
  var backFace = mesh.getObjectByName('backFace');

  if (differences[0] == 'selected') {
    soul.material = new MeshBasicMaterial({ color: element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 });
  } else if (differences[0] == 'properties') {

    if (differences[1] == 'thickness') {
      var newThickness = element.getIn(['properties', 'thickness', 'length']);
      var oldThickness = oldElement.getIn(['properties', 'thickness', 'length']);
      var halfNewThickness = newThickness / 2;
      var texturedFaceDistance = halfNewThickness + 1;
      var originalThickness = oldThickness / soul.scale.z;
      var alpha = soul.rotation.y;

      var xTemp = texturedFaceDistance * Math.cos(alpha - halfPI);
      var zTemp = texturedFaceDistance * Math.sin(alpha - halfPI);

      soul.scale.set(1, 1, newThickness / originalThickness);

      frontFace.position.x = soul.position.x + xTemp;
      frontFace.position.z = soul.position.z + zTemp;

      backFace.position.x = soul.position.x - xTemp;
      backFace.position.z = soul.position.z - zTemp;
    } else return noPerf();
  } else return noPerf();

  return Promise.resolve(mesh);
}

export function buildWall_OLD(element, layer, scene, textures) {

  // Get the two vertices of the wall
  var vertex0 = layer.vertices.get(element.vertices.get(0));
  var vertex1 = layer.vertices.get(element.vertices.get(1));
  var inverted = false;

  // The first vertex is the smaller one
  if (vertex0.x > vertex1.x) {
    var app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
    inverted = true;
  }

  // Get height and thickness of the wall converting them into the current scene units
  var height = element.properties.getIn(['height', 'length']);
  var thickness = element.properties.getIn(['thickness', 'length']);
  var halfThickness = thickness / 2;

  var bevelRadius = thickness; // This is useful for linking two walls together
  var halfBevelRadius = bevelRadius / 2;

  /*
   * First of all I need to build the wall shape. We can build it drawing a rectangle
   * with the left bottom vertex in the origin and where the length is given by the distance between the
   * two vertices and the height is the height of the wall
   */

  // Compute the distance between the two vertices
  var xDiff = vertex0.x - vertex1.x;
  var yDiff = vertex0.y - vertex1.y;
  var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

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

  var wallCoords = [[0, 0], [distance, 0], [distance, height], [0, height]];

  // Now I compute the rotation angle of the wall (see the bevel radius trick)
  var alpha = Math.asin((vertex1.y - vertex0.y) / (distance - bevelRadius)); //TODO: REMOVE WORKAROUND BEVELING

  // We will rotate on the bottom-left vertex, so we need a pivot in the origin
  var pivot = new Object3D();

  // Create a Shape from the coordinates
  var rectShape = createShape(wallCoords);

  // Now we have to create the holes for the wall
  element.holes.forEach(function (holeID) {

    var holeData = layer.holes.get(holeID);

    // Get the sizes of the holes converting them to the scene units
    var holeWidth = holeData.properties.getIn(['width', 'length']);
    var holeHeight = holeData.properties.getIn(['height', 'length']);
    var holeAltitude = holeData.properties.getIn(['altitude', 'length']);
    var offset = inverted ? 1 - holeData.offset : holeData.offset;

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

    var startAt = (distance - bevelRadius) * offset - holeWidth / 2 + halfBevelRadius;

    // I add 0.00001 to the holeAltitude to avoid a warning with the Three triangulation algorithm
    var holeCoords = [[startAt, holeAltitude + 0.00001], [holeWidth + startAt, holeAltitude + 0.00001], [holeWidth + startAt, holeHeight + holeAltitude], [startAt, holeHeight + holeAltitude]];

    // Now I can create the Threeshape of the hole and, push it into the wall shape holes
    var holeShape = createShape(holeCoords);
    rectShape.holes.push(holeShape);

    // At this point I can create a set of rectangles which surrounds the hole
    var holeClosures = buildShapeClosures({ x: 0, y: 0 }, { x: holeWidth, y: 0 }, holeHeight, thickness);

    var topHoleShape = createShape(holeClosures.topShape);
    var leftHoleShape = createShape(holeClosures.leftShape);

    var topHoleClosureGeometry = new ShapeGeometry(topHoleShape);
    var leftHoleClosureGeometry = new ShapeGeometry(leftHoleShape);

    var meshMeterial = new MeshLambertMaterial({ side: DoubleSide });

    var topHoleClosure = new Mesh(topHoleClosureGeometry, meshMeterial);
    var leftHoleClosure = new Mesh(leftHoleClosureGeometry, meshMeterial);
    var rightHoleClosure = new Mesh(leftHoleClosureGeometry, meshMeterial);

    topHoleClosure.rotation.x += halfPI;
    topHoleClosure.position.set(startAt - halfBevelRadius, holeHeight + holeAltitude, -halfThickness);

    leftHoleClosure.rotation.y -= halfPI;
    leftHoleClosure.position.set(startAt - halfBevelRadius, holeAltitude, -halfThickness);

    rightHoleClosure.rotation.y -= halfPI;
    rightHoleClosure.position.set(startAt + holeWidth - halfBevelRadius, holeAltitude, -halfThickness);

    pivot.add(topHoleClosure, leftHoleClosure, rightHoleClosure);

    if (holeAltitude !== 0) {
      var bottomHoleClosure = new Mesh(topHoleClosureGeometry, meshMeterial);

      bottomHoleClosure.rotation.x += halfPI;
      bottomHoleClosure.position.set(startAt - halfBevelRadius, holeAltitude, -halfThickness);

      pivot.add(bottomHoleClosure);
    }
  });

  // Now I can create the geometry of a single face of the wall
  var wallGeometry = new ShapeGeometry(rectShape);
  wallGeometry.computeVertexNormals();

  // I define two materials (one for every face of the wall)
  var wallMaterial1 = new MeshPhongMaterial({ side: BackSide });
  var wallMaterial2 = new MeshPhongMaterial({ side: FrontSide });

  var alphaMaj = alpha > 0;
  applyTexture(wallMaterial1, textures[element.properties.get('texture' + (alphaMaj ? 'A' : 'B'))], distance, height);
  applyTexture(wallMaterial2, textures[element.properties.get('texture' + (alphaMaj ? 'B' : 'A'))], distance, height);

  // Assign the correct UV coordinates
  assignUVs(wallGeometry);

  var wall1 = new Mesh(wallGeometry, wallMaterial1);
  var wall2 = new Mesh(wallGeometry, wallMaterial2);

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
  var closures = buildShapeClosures({ x: 0, y: 0 }, { x: distance, y: 0 }, height, thickness);

  var topClosureGeometry = new ShapeGeometry(createShape(closures.topShape));
  var leftClosureGeometry = new ShapeGeometry(createShape(closures.leftShape));

  var topClosure = new Mesh(topClosureGeometry, new MeshLambertMaterial({
    side: BackSide
  }));

  var leftClosure = new Mesh(leftClosureGeometry, new MeshLambertMaterial({
    side: FrontSide
  }));

  var rightClosure = new Mesh(leftClosureGeometry, new MeshLambertMaterial({
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
    pivot.add(createBoxHelper(wall1, SharedStyle.MESH_SELECTED), createBoxHelper(wall2, SharedStyle.MESH_SELECTED), createBoxHelper(topClosure, SharedStyle.MESH_SELECTED), createBoxHelper(leftClosure, SharedStyle.MESH_SELECTED), createBoxHelper(rightClosure, SharedStyle.MESH_SELECTED));
  }

  return Promise.resolve(pivot);
}