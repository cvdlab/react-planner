import * as Three from 'three';

import React from 'react';
import convert from 'convert-units';

let rectSVG = React.createFactory('rect');
let gSVG = React.createFactory('g');
let textSVG = React.createFactory('text');

export default {
  name: "simple-stair",
  prototype: "items",

  info: {
    tag: ['building', 'stair'],
    group: "Items",
    description: "Simple stair",
    image: require('./simple-stair.png')
  },

  properties: {
    width: {
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    depth: {
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    height: {
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    altitude: {
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let newWidth = convert(element.properties.get('width').get('length'))
      .from(element.properties.get('width').get('unit'))
      .to(scene.unit);

    let newDepth = convert(element.properties.get('depth').get('length'))
      .from(element.properties.get('depth').get('unit'))
      .to(scene.unit);


    return gSVG({transform: `translate(${-newWidth / 2},${-newDepth / 2})`}, [
      rectSVG({
        key: 1,
        x: 0,
        y: 0,
        width: newWidth,
        height: newDepth,
        style: {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}
      }),
      textSVG({
        key: 2,
        x: 0,
        y: 0,
        transform: `translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1)`,
        style: {textAnchor: "middle", fontSize: "11px"},
      }, element.type)
    ]);
  },

  render3D: function (element, layer, scene) {

    let newWidth = convert(element.properties.get('width').get('length'))
      .from(element.properties.get('width').get('unit'))
      .to(scene.unit);

    let newDepth = convert(element.properties.get('depth').get('length'))
      .from(element.properties.get('depth').get('unit'))
      .to(scene.unit);

    let newHeight = convert(element.properties.get('height').get('length'))
      .from(element.properties.get('height').get('unit'))
      .to(scene.unit);

    let newAltitude = convert(element.properties.get('altitude').get('length'))
      .from(element.properties.get('altitude').get('unit'))
      .to(scene.unit);

    let stair = new Three.Object3D();

    // compute step dimensions with Blondel formula
    let a = (63 * newHeight) / (newDepth + 2 * newHeight);
    let p = 63 - 2 * a;

    let numberOfSteps = Math.round(newHeight / a);
    let stepHeight = newHeight / numberOfSteps;
    let stepDepth = newDepth / numberOfSteps;
    let stepWidth = newWidth;

    // Build planes for every step
    let stepPlaneGeometry = new Three.PlaneGeometry(stepWidth, stepHeight);
    assignUVs(stepPlaneGeometry);
    let stepPlaneMaterial = new Three.MeshBasicMaterial({side: Three.FrontSide});

    let loader = new Three.TextureLoader();
    stepPlaneMaterial.map = loader.load(require('./textures/white-paint.jpg'));
    stepPlaneMaterial.needsUpdate = true;
    stepPlaneMaterial.map.wrapS = Three.RepeatWrapping;
    stepPlaneMaterial.map.wrapT = Three.RepeatWrapping;

    // Build stair profile shape
    let starProfileShapePoints = [];

    for (let i = 0; i < numberOfSteps; i++) {
      starProfileShapePoints.push([(numberOfSteps - i) * stepDepth, i * stepHeight],
        [(numberOfSteps - i) * stepDepth, (i + 1) * stepHeight]);

      let stepPlane = new Three.Mesh(stepPlaneGeometry, stepPlaneMaterial);
      stepPlane.position.x += stepWidth / 2;
      stepPlane.position.z = (numberOfSteps - i) * stepDepth;
      stepPlane.position.y = i * stepHeight + stepHeight / 2;
      stair.add(stepPlane);

      let stepCover = buildStepCover(stepWidth, stepHeight, stepDepth);
      stepCover.position.y += stepHeight * i + stepHeight / 2;
      stepCover.position.z += (numberOfSteps - i) * stepDepth;

      stair.add(stepCover);
    }

    starProfileShapePoints.push([0, numberOfSteps * stepHeight],
      [0, (numberOfSteps - 1) * stepHeight],
      [(numberOfSteps - 1) * stepDepth, 0]);

    let stairShapeProfile = new Three.Shape();
    stairShapeProfile.moveTo(starProfileShapePoints[0][0], starProfileShapePoints[0][1]);
    for (let i = 1; i < starProfileShapePoints.length; i++) {
      stairShapeProfile.lineTo(starProfileShapePoints[i][0], starProfileShapePoints[i][1]);
    }

    let stairShapeProfileGeometry = new Three.ShapeGeometry(stairShapeProfile);
    assignUVs(stairShapeProfileGeometry);
    let stairProfileMaterial = new Three.MeshPhongMaterial({side: Three.FrontSide});

    stairProfileMaterial.map = loader.load(require('./textures/white-paint.jpg'));
    stairProfileMaterial.needsUpdate = true;
    stairProfileMaterial.map.wrapS = Three.RepeatWrapping;
    stairProfileMaterial.map.wrapT = Three.RepeatWrapping;
    stairProfileMaterial.map.repeat.set(10,10);

    let stairProfile = new Three.Mesh(stairShapeProfileGeometry, stairProfileMaterial);

    stairProfile.rotation.y = -Math.PI / 2;

    stair.add(stairProfile);

    let stairProfileMaterial2 = new Three.MeshPhongMaterial({side: Three.BackSide});

    stairProfileMaterial2.map = loader.load(require('./textures/white-paint.jpg'));
    stairProfileMaterial2.needsUpdate = true;
    stairProfileMaterial2.map.wrapS = Three.RepeatWrapping;
    stairProfileMaterial2.map.wrapT = Three.RepeatWrapping;
    stairProfileMaterial2.map.repeat.set(10,10);

    let stairProfile2 = new Three.Mesh(stairShapeProfileGeometry, stairProfileMaterial2);

    stairProfile2.rotation.y = -Math.PI / 2;
    stairProfile2.position.x += newWidth;

    stair.add(stairProfile2);

    // Build closures for the stair
    let closure1Slope = -Math.atan(stepHeight / stepDepth);
    let stairClosure1Geometry = new Three.PlaneGeometry(newWidth, (numberOfSteps - 1) * stepDepth / Math.cos(closure1Slope));
    let stairClosure1 = new Three.Mesh(stairClosure1Geometry, stairProfileMaterial2);

    let pivotClosure1 = new Three.Object3D();
    pivotClosure1.add(new Three.Mesh(new Three.SphereGeometry(10), new Three.MeshBasicMaterial({color: 0xff0000})));
    stairClosure1.position.y += (numberOfSteps - 1) * stepDepth / Math.cos(closure1Slope) / 2;
    pivotClosure1.add(stairClosure1);

    pivotClosure1.position.x = newWidth / 2;
    pivotClosure1.position.z = (numberOfSteps - 1) * stepDepth;

    pivotClosure1.rotation.x = closure1Slope;

    stair.add(pivotClosure1);

    let closure2 = new Three.Mesh(stepPlaneGeometry, stepPlaneMaterial);
    closure2.rotation.y = Math.PI;
    closure2.position.x = stepWidth / 2;
    closure2.position.y = numberOfSteps * stepHeight - stepHeight / 2;
    stair.add(closure2);

    let closure3 = new Three.Mesh(stepPlaneGeometry, stepPlaneMaterial);
    closure3.rotation.x = Math.PI / 2;
    closure3.position.x = stepWidth/2;
    closure3.position.z = (numberOfSteps - 1) * stepDepth + stepDepth/2;

    // closure3.position.y = numberOfSteps * stepHeight - stepHeight/2;
    stair.add(closure3);

    if (element.selected) {
      let box = new Three.BoxHelper(stair, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      stair.add(box);
    }

    // Normalize the origin of the object
    let boundingBox = new Three.Box3().setFromObject(stair);

    let center = [
      (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
      (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
      (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    // stair.position.x -= center[0];
    // stair.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
    // stair.position.z -= center[2];

    stair.position.y += newAltitude;

    return Promise.resolve(stair);
  }

};

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

let buildStepCover = (width, height, depth) => {

  let loader = new Three.TextureLoader();

  let stepCoverHeight = 2;

  let stepCoverLength = 2;

  let planeGeometry = new Three.PlaneGeometry(width + stepCoverLength * 2, depth + stepCoverHeight);
  let planeMaterial = new Three.MeshBasicMaterial({side: Three.FrontSide});
  assignUVs(planeGeometry);

  let planeGeometry2 = new Three.PlaneGeometry(depth + stepCoverLength, stepCoverHeight);
  assignUVs(planeGeometry2);

  let planeGeometry3 = new Three.PlaneGeometry(width + stepCoverLength * 2, stepCoverHeight);
  assignUVs(planeGeometry3);

  planeMaterial.map = loader.load(require('./textures/marble.jpg'));
  planeMaterial.needsUpdate = true;
  planeMaterial.map.wrapS = Three.RepeatWrapping;
  planeMaterial.map.wrapT = Three.RepeatWrapping;

  let plane = new Three.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;

  plane.position.x = width / 2;
  plane.position.z = -depth / 2;
  plane.position.y += height / 2 + stepCoverHeight;

  let plane2 = new Three.Mesh(planeGeometry2, planeMaterial);
  plane2.rotation.y = -Math.PI / 2;

  plane2.position.x -= stepCoverLength;
  plane2.position.y += height / 2 + stepCoverHeight / 2;
  plane2.position.z -= depth / 2;

  let plane3 = new Three.Mesh(planeGeometry, planeMaterial);
  plane3.rotation.x = Math.PI / 2;

  plane3.position.x = width / 2;
  plane3.position.z = -depth / 2;
  plane3.position.y += height / 2;

  let plane4 = new Three.Mesh(planeGeometry2, planeMaterial);
  plane4.rotation.y = Math.PI / 2;

  plane4.position.x += width + stepCoverLength;
  plane4.position.y += height / 2 + stepCoverHeight / 2;
  plane4.position.z -= depth / 2;

  let plane5 = new Three.Mesh(planeGeometry3, planeMaterial);

  plane5.position.x += width / 2;
  plane5.position.y += height / 2 + stepCoverHeight / 2;
  plane5.position.z += stepCoverLength / 2;

  let plane6 = new Three.Mesh(planeGeometry3, planeMaterial);

  plane6.rotation.y = Math.PI;

  plane6.position.x += width / 2;
  plane6.position.y += height / 2 + stepCoverHeight / 2;
  plane6.position.z -= depth + stepCoverLength / 2;

  let stepCover = new Three.Object3D();

  stepCover.add(plane);
  stepCover.add(plane2);
  stepCover.add(plane3);
  stepCover.add(plane4);
  stepCover.add(plane5);
  stepCover.add(plane6);

  return stepCover;
};
