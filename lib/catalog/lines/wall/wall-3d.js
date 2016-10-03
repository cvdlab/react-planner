'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, layer, scene) {

  var holes = [];

  var lineInteractFunction = function lineInteractFunction() {
    return element.editingActions.selectLine(layer.id, element.id);
  };

  element.holes.forEach(function (holeID) {

    var hole = layer.holes.get(holeID);

    var holeInteractFunction = function holeInteractFunction() {
      return element.editingActions.selectHole(layer.id, hole.id);
    };

    holes.push({ holeData: hole, holeInteractFunction: holeInteractFunction });
  });

  var vertex0 = layer.vertices.get(element.vertices.get(0));
  var vertex1 = layer.vertices.get(element.vertices.get(1));

  if (vertex0.x > vertex1.x) {
    var app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  var bevelRadius = element.properties.get('thickness');

  return createShapeWall(vertex0, vertex1, element.properties.get('height'), element.properties.get('thickness'), holes, bevelRadius, element.selected, element.properties.get('textureA'), element.properties.get('textureB'), lineInteractFunction);
};

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createShapeWall(vertex0, vertex1, height, thickness, holes, bevelRadius, isSelected, textureA, textureB, interactFunction) {

  if (vertex0.x > vertex1.x) {
    var app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  var distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  //TODO: REMOVE WORKAROUND BEVELING
  distance += bevelRadius;

  var wallCoord = buildShapeCoordinates({ x: 0, y: 0 }, { x: distance, y: 0 }, height); // TODO: Clean Code!!

  // let alpha = Math.asin((vertex1.y - vertex0.y) / distance);
  var alpha = Math.asin((vertex1.y - vertex0.y) / (distance - bevelRadius)); //TODO: REMOVE WORKAROUND BEVELING

  var pivot = new _three2.default.Object3D();

  var rectShape = createShape(wallCoord);

  holes.forEach(function (_ref) {
    var holeData = _ref.holeData;
    var holeInteractFunction = _ref.holeInteractFunction;

    var holeCoords = createHoleShape(vertex0, vertex1, holeData.properties.get('width'), holeData.properties.get('height'), holeData.offset, holeData.properties.get('altitude') + 0.00001, bevelRadius);
    var holeShape = createShape(holeCoords);
    rectShape.holes.push(holeShape);

    // Apply interact function to children of an Object3D
    var applyInteract = function applyInteract(object, interactFunction) {
      object.traverse(function (child) {
        if (child instanceof _three2.default.Mesh) {
          child.interact = interactFunction;
        }
      });
    };
  });

  var lineGeometry = new _three2.default.ShapeGeometry(rectShape);
  lineGeometry.computeVertexNormals();

  var wallColor = 0xffffff;

  var wallMaterial1 = new _three2.default.MeshPhongMaterial({
    side: _three2.default.BackSide,
    color: wallColor
  });

  var wallMaterial2 = new _three2.default.MeshPhongMaterial({
    side: _three2.default.FrontSide,
    color: wallColor
  });

  if (alpha < 0) {
    applyTexture(wallMaterial1, textureB, distance, height);
    applyTexture(wallMaterial2, textureA, distance, height);
  } else {
    applyTexture(wallMaterial1, textureA, distance, height);
    applyTexture(wallMaterial2, textureB, distance, height);
  }

  assignUVs(lineGeometry);

  var wall1 = new _three2.default.Mesh(lineGeometry, wallMaterial1);
  var wall2 = new _three2.default.Mesh(lineGeometry, wallMaterial2);

  wall1.position.z -= thickness / 2;
  wall2.position.z += thickness / 2;

  wall1.position.x -= bevelRadius / 2; //TODO: REMOVE WORKAROUND BEVELING
  wall2.position.x -= bevelRadius / 2; //TODO: REMOVE WORKAROUND BEVELING

  pivot.rotation.y = alpha;
  // pivot.position.x += vertex0.x;
  // pivot.position.z -= vertex0.y;

  // pivot.position.x -= thickness;

  pivot.add(wall1);
  pivot.add(wall2);

  // Build closures for wall

  // buildShapeCoordinates({x: 0, y: 0}, {x: distance, y: 0}, height);
  var closures = buildShapeClosures({ x: 0, y: 0 }, { x: distance, y: 0 }, height, thickness);

  var topClosureCoords = closures.topShape;
  var topShape = createShape(topClosureCoords);

  var leftClosureCoords = closures.leftShape;
  var leftShape = createShape(leftClosureCoords);

  var topClosureGeometry = new _three2.default.ShapeGeometry(topShape);
  var leftClosureGeometry = new _three2.default.ShapeGeometry(leftShape);

  var topClosure = new _three2.default.Mesh(topClosureGeometry, new _three2.default.MeshLambertMaterial({
    side: _three2.default.BackSide,
    color: wallColor
  }));

  // let bottomClosure = new THREE.Mesh(topClosureGeometry, new THREE.MeshLambertMaterial({
  //   side: THREE.DoubleSide,
  //   color: wallColor
  // }));

  var leftClosure = new _three2.default.Mesh(leftClosureGeometry, new _three2.default.MeshLambertMaterial({
    side: _three2.default.FrontSide,
    color: wallColor
  }));

  var rightClosure = new _three2.default.Mesh(leftClosureGeometry, new _three2.default.MeshLambertMaterial({
    side: _three2.default.BackSide,
    color: wallColor
  }));

  // bottomClosure.rotation.x += Math.PI / 2;
  // bottomClosure.position.z -= thickness / 2;

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

  // pivot.add(bottomClosure);
  pivot.add(topClosure);
  pivot.add(leftClosure);
  pivot.add(rightClosure);

  // Build closures for holes
  holes.forEach(function (_ref2) {
    var holeData = _ref2.holeData;


    var holeClosures = buildShapeClosures({ x: 0, y: 0 }, { x: holeData.properties.get('width'), y: 0 }, holeData.properties.get('height'), thickness);

    var topHoleClosureCoords = holeClosures.topShape;
    var topHoleShape = createShape(topHoleClosureCoords);

    var leftHoleClosureCoords = holeClosures.leftShape;
    var leftHoleShape = createShape(leftHoleClosureCoords);

    var topHoleClosureGeometry = new _three2.default.ShapeGeometry(topHoleShape);
    var leftHoleClosureGeometry = new _three2.default.ShapeGeometry(leftHoleShape);

    var topHoleClosure = new _three2.default.Mesh(topHoleClosureGeometry, new _three2.default.MeshLambertMaterial({
      side: _three2.default.DoubleSide,
      color: wallColor
    }));

    var leftHoleClosure = new _three2.default.Mesh(leftHoleClosureGeometry, new _three2.default.MeshLambertMaterial({
      side: _three2.default.DoubleSide,
      color: wallColor
    }));

    var rightHoleClosure = new _three2.default.Mesh(leftHoleClosureGeometry, new _three2.default.MeshLambertMaterial({
      side: _three2.default.DoubleSide,
      color: wallColor
    }));

    var length = Math.sqrt(Math.pow(vertex1.x - vertex0.x, 2) + Math.pow(vertex1.y - vertex0.y, 2));

    var startAt = (length - bevelRadius) * holeData.offset - holeData.properties.get('width') / 2;

    topHoleClosure.rotation.x += Math.PI / 2;
    topHoleClosure.position.z -= thickness / 2;
    topHoleClosure.position.y += holeData.properties.get('height') + holeData.properties.get('altitude');
    topHoleClosure.position.x += startAt;

    leftHoleClosure.rotation.y -= Math.PI / 2;
    leftHoleClosure.position.z -= thickness / 2;
    leftHoleClosure.position.y += holeData.properties.get('altitude');
    leftHoleClosure.position.x += startAt;

    rightHoleClosure.rotation.y -= Math.PI / 2;
    rightHoleClosure.position.z -= thickness / 2;
    rightHoleClosure.position.y += holeData.properties.get('altitude');
    rightHoleClosure.position.x += startAt + holeData.properties.get('width');

    pivot.add(topHoleClosure);
    pivot.add(leftHoleClosure);
    pivot.add(rightHoleClosure);

    if (holeData.properties.get('altitude') !== 0) {

      var bottomHoleClosure = new _three2.default.Mesh(topHoleClosureGeometry, new _three2.default.MeshLambertMaterial({
        side: _three2.default.DoubleSide,
        color: wallColor
      }));

      bottomHoleClosure.rotation.x += Math.PI / 2;
      bottomHoleClosure.position.z -= thickness / 2;
      bottomHoleClosure.position.y += holeData.properties.get('altitude');
      bottomHoleClosure.position.x += startAt;

      pivot.add(bottomHoleClosure);
    }
  });

  // Add interaction with walls
  wall1.interact = interactFunction;
  wall2.interact = interactFunction;
  topClosure.interact = interactFunction;
  leftClosure.interact = interactFunction;
  rightClosure.interact = interactFunction;

  if (isSelected) {
    var box1 = new _three2.default.BoxHelper(wall1, 0x99c3fb);
    box1.material.depthTest = false;
    box1.material.linewidth = 2;
    box1.material.vertexColor = _three2.default.VertexColors;
    pivot.add(box1);

    var box2 = new _three2.default.BoxHelper(wall2, 0x99c3fb);
    box2.material.depthTest = false;
    box2.material.linewidth = 2;
    pivot.add(box2);

    var box3 = new _three2.default.BoxHelper(topClosure, 0x99c3fb);
    box3.material.depthTest = false;
    box3.material.linewidth = 2;
    pivot.add(box3);

    var box4 = new _three2.default.BoxHelper(leftClosure, 0x99c3fb);
    box4.material.depthTest = false;
    box4.material.linewidth = 2;
    pivot.add(box4);

    var box5 = new _three2.default.BoxHelper(rightClosure, 0x99c3fb);
    box5.material.depthTest = false;
    box5.material.linewidth = 2;
    pivot.add(box5);
  }

  return pivot;
}

function buildShapeCoordinates(vertex0, vertex1, height) {

  var distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  return [[vertex0.x, vertex0.y], [vertex0.x + distance, vertex0.y], [vertex0.x + distance, vertex0.y + height], [vertex0.x, vertex0.y + height]];
}

function buildShapeClosures(vertex0, vertex1, height, thickness) {

  var distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  var topShape = [[vertex0.x, vertex0.y], [vertex0.x + distance, vertex0.y], [vertex0.x + distance, vertex0.y + thickness], [vertex0.x, vertex0.y + thickness]];

  var leftShape = [[vertex0.x, vertex0.y], [vertex0.x + thickness, vertex0.y], [vertex0.x + thickness, vertex0.y + height], [vertex0.x, vertex0.y + height]];

  return { topShape: topShape, leftShape: leftShape };
};

function createShape(wallCoord) {

  var rectShape = new _three2.default.Shape();
  rectShape.moveTo(wallCoord[0][0], wallCoord[0][1]);
  for (var i = 1; i < wallCoord.length; i++) {
    rectShape.lineTo(wallCoord[i][0], wallCoord[i][1]);
  }
  return rectShape;
}

function createHoleShape(lineVertex0, lineVertex1, width, height, offset, altitude, bevelRadius) {

  var length = Math.sqrt(Math.pow(lineVertex1.x - lineVertex0.x, 2) + Math.pow(lineVertex1.y - lineVertex0.y, 2));

  var startAt = (length - bevelRadius) * offset - width / 2 + bevelRadius / 2;
  var wallCoordinates = [[startAt, altitude], [width + startAt, altitude], [width + startAt, height + altitude], [startAt, height + altitude]];

  return wallCoordinates;
}

function applyTexture(material, textureName, distance, height) {

  var loader = new _three2.default.TextureLoader();

  switch (textureName) {
    case 'bricks':
      material.map = loader.load(require('./textures/bricks.jpg'));
      material.needsUpdate = true;
      material.map.wrapS = _three2.default.RepeatWrapping;
      material.map.wrapT = _three2.default.RepeatWrapping;
      material.map.repeat.set(distance / 100, height / 100);

      material.normalMap = loader.load(require("./textures/bricks-normal.jpg"));
      material.normalScale = new _three2.default.Vector2(0.4, 0.4);
      material.normalMap.wrapS = _three2.default.RepeatWrapping;
      material.normalMap.wrapT = _three2.default.RepeatWrapping;
      material.normalMap.repeat.set(distance / 100, height / 100);
      break;
    case 'painted':
      material.map = loader.load(require('./textures/painted.jpg'));
      material.needsUpdate = true;
      material.map.wrapS = _three2.default.RepeatWrapping;
      material.map.wrapT = _three2.default.RepeatWrapping;
      material.map.repeat.set(distance / 100, height / 100);

      material.normalMap = loader.load(require("./textures/painted-normal.png"));
      material.normalScale = new _three2.default.Vector2(0.4, 0.4);
      material.normalMap.wrapS = _three2.default.RepeatWrapping;
      material.normalMap.wrapT = _three2.default.RepeatWrapping;
      material.normalMap.repeat.set(distance / 100, height / 100);

      break;
  }
}

function assignUVs(geometry) {
  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max;
  var min = geometry.boundingBox.min;

  var offset = new _three2.default.Vector2(0 - min.x, 0 - min.y);
  var range = new _three2.default.Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = [];
  var faces = geometry.faces;

  for (var i = 0; i < geometry.faces.length; i++) {

    var v1 = geometry.vertices[faces[i].a];
    var v2 = geometry.vertices[faces[i].b];
    var v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push([new _three2.default.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new _three2.default.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new _three2.default.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)]);
  }
  geometry.uvsNeedUpdate = true;
}