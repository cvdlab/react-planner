import Three from 'three';
import {createSingleWindow} from './window-creator';
import {createDoor, createDoorFromObj} from './door-creator';

export default function createShapeWall(vertex0, vertex1, height, thickness, holes,
                                        bevelRadius, isSelected, textureA, textureB, interactFunction) {

  if (vertex0.x > vertex1.x) {
    let app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  //TODO: REMOVE WORKAROUND BEVELING
  distance += bevelRadius;

  let wallCoord = buildShapeCoordinates({x: 0, y: 0}, {x: distance, y: 0}, height); // TODO: Clean Code!!

  // let alpha = Math.asin((vertex1.y - vertex0.y) / distance);
  let alpha = Math.asin((vertex1.y - vertex0.y) / (distance - bevelRadius)); //TODO: REMOVE WORKAROUND BEVELING

  let pivot = new Three.Object3D();

  let rectShape = createShape(wallCoord);

  holes.forEach(({holeData, holeInteractFunction}) => {
    let holeCoords = createHoleShape(vertex0,
      vertex1,
      holeData.properties.get('width'),
      holeData.properties.get('height'),
      holeData.offset,
      holeData.properties.get('altitude') + 0.00001,
      bevelRadius);
    let holeShape = createShape(holeCoords);
    rectShape.holes.push(holeShape);

    // Apply interact function to children of an Object3D
    let applyInteract = (object, interactFunction) => {
      object.traverse(function (child) {
        if (child instanceof Three.Mesh) {
          child.interact = interactFunction;
        }
      });
    };


    // Create Windows
    if (holeData.type === 'windowGeneric') {
      let window3D = createSingleWindow(
        holeData.properties.get('width'),
        holeData.properties.get('height'),
        thickness,
        (distance - bevelRadius) * holeData.offset,
        holeData.properties.get('altitude') + holeData.properties.get('height') / 2,
        0,
        100,
        holeData.selected);

      applyInteract(window3D, holeInteractFunction);

      pivot.add(window3D);
    } else {

      let doorPromise = createDoorFromObj(holeData.properties.get('width') - 0.1,
        holeData.properties.get('height') + 0.1,
        thickness + 10,
        holeData.selected);

      doorPromise.then(object => {
        let boundingBox = new Three.Box3().setFromObject(object);
        object.position.x = (distance - bevelRadius) * holeData.offset;
        object.position.y = holeData.properties.get('altitude') - 0.1;
        object.position.z = 0;
        pivot.add(object);
        applyInteract(object, holeInteractFunction);

      });
    }
  });

  let lineGeometry = new Three.ShapeGeometry(rectShape);
  lineGeometry.computeVertexNormals();

  let wallColor = new Three.Color(1, 1, 1);
  if (isSelected) {
    wallColor = new Three.Color(1, 0.76, 0);
  }

  let wallMaterial1 = new Three.MeshPhongMaterial({
    side: Three.BackSide,
    color: wallColor
  });

  let wallMaterial2 = new Three.MeshPhongMaterial({
    side: Three.FrontSide,
    color: wallColor
  });


  if (alpha < 0) {
    applyTexture(wallMaterial1, textureA);
    applyTexture(wallMaterial2, textureB);
  } else {
    applyTexture(wallMaterial1, textureB);
    applyTexture(wallMaterial2, textureA);
  }

  assignUVs(lineGeometry);

  let wall1 = new Three.Mesh(lineGeometry, wallMaterial1);
  let wall2 = new Three.Mesh(lineGeometry, wallMaterial2);

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
  let closures = buildShapeClosures({x: 0, y: 0}, {x: distance, y: 0}, height, thickness);

  let topClosureCoords = closures.topShape;
  let topShape = createShape(topClosureCoords);

  let leftClosureCoords = closures.leftShape;
  let leftShape = createShape(leftClosureCoords);

  let topClosureGeometry = new Three.ShapeGeometry(topShape);
  let leftClosureGeometry = new Three.ShapeGeometry(leftShape);

  let topClosure = new Three.Mesh(topClosureGeometry, new Three.MeshLambertMaterial({
    side: Three.BackSide,
    color: wallColor
  }));

  // let bottomClosure = new THREE.Mesh(topClosureGeometry, new THREE.MeshLambertMaterial({
  //   side: THREE.DoubleSide,
  //   color: wallColor
  // }));

  let leftClosure = new Three.Mesh(leftClosureGeometry, new Three.MeshLambertMaterial({
    side: Three.FrontSide,
    color: wallColor
  }));

  let rightClosure = new Three.Mesh(leftClosureGeometry, new Three.MeshLambertMaterial({
    side: Three.BackSide,
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
  holes.forEach(({holeData}) => {

    let holeClosures = buildShapeClosures(
      {x: 0, y: 0},
      {x: holeData.properties.get('width'), y: 0},
      holeData.properties.get('height'),
      thickness
    );

    let topHoleClosureCoords = holeClosures.topShape;
    let topHoleShape = createShape(topHoleClosureCoords);

    let leftHoleClosureCoords = holeClosures.leftShape;
    let leftHoleShape = createShape(leftHoleClosureCoords);

    let topHoleClosureGeometry = new Three.ShapeGeometry(topHoleShape);
    let leftHoleClosureGeometry = new Three.ShapeGeometry(leftHoleShape);

    let topHoleClosure = new Three.Mesh(topHoleClosureGeometry, new Three.MeshLambertMaterial({
      side: Three.DoubleSide,
      color: wallColor
    }));

    let leftHoleClosure = new Three.Mesh(leftHoleClosureGeometry, new Three.MeshLambertMaterial({
      side: Three.DoubleSide,
      color: wallColor
    }));

    let rightHoleClosure = new Three.Mesh(leftHoleClosureGeometry, new Three.MeshLambertMaterial({
      side: Three.DoubleSide,
      color: wallColor
    }));


    let length = Math.sqrt(Math.pow((vertex1.x - vertex0.x), 2)
      + Math.pow((vertex1.y - vertex0.y), 2));

    let startAt = length * holeData.offset - holeData.properties.get('width') / 2;

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

      let bottomHoleClosure = new Three.Mesh(topHoleClosureGeometry, new Three.MeshLambertMaterial({
        side: Three.DoubleSide,
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
};


function createShape(wallCoord) {

  let rectShape = new Three.Shape();
  rectShape.moveTo(wallCoord[0][0], wallCoord[0][1]);
  for (let i = 1; i < wallCoord.length; i++) {
    rectShape.lineTo(wallCoord[i][0], wallCoord[i][1]);
  }
  return rectShape;
}

function createHoleShape(lineVertex0, lineVertex1, width, height, offset, altitude, bevelRadius) {

  let length = Math.sqrt(Math.pow((lineVertex1.x - lineVertex0.x), 2)
    + Math.pow((lineVertex1.y - lineVertex0.y), 2));

  let startAt = length * offset - width / 2 + bevelRadius / 2;
  let wallCoordinates = [
    [startAt, altitude],
    [width + startAt, altitude],
    [width + startAt, height + altitude],
    [startAt, height + altitude]
  ];

  return wallCoordinates;
}

function applyTexture(material, textureName) {

  let loader = new Three.TextureLoader();

  switch (textureName) {
    case 'bricks':
      material.map = loader.load(require('./textures/bricks.jpg'));
      material.needsUpdate = true;
      material.map.wrapS = Three.RepeatWrapping;
      material.map.wrapT = Three.RepeatWrapping;
      material.map.repeat.set(3, 3);

      material.normalMap = loader.load(require("./textures/bricks-normal.jpg"));
      material.normalScale = new Three.Vector2(0.4, 0.4);
      material.normalMap.wrapS = Three.RepeatWrapping;
      material.normalMap.wrapT = Three.RepeatWrapping;
      material.normalMap.repeat.set(3, 3);
      break;
    case 'painted':
      material.map = loader.load(require('./textures/painted.jpg'));
      material.needsUpdate = true;
      material.map.wrapS = Three.RepeatWrapping;
      material.map.wrapT = Three.RepeatWrapping;
      material.map.repeat.set(3, 3);

      material.normalMap = loader.load(require("./textures/painted-normal.png"));
      material.normalScale = new Three.Vector2(0.4, 0.4);
      material.normalMap.wrapS = Three.RepeatWrapping;
      material.normalMap.wrapT = Three.RepeatWrapping;
      material.normalMap.repeat.set(3, 3);

      break;
  }
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


