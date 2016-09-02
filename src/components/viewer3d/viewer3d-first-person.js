"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Three from 'three';
import {parseData, updateScene} from './scene-creator';
import OrbitControls from './libs/orbit-controls';
import diff from 'immutablediff';
import {initPointerLock} from "./pointer-lock-navigation";

export default class Viewer3DFirstPerson extends React.Component {

  componentDidMount() {

    /********************************/
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new Three.Vector3();


    var controlsEnabled = true;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;


    /********************************/


    let editingActions = this.context.editingActions;

    let {width, height} = this.props;
    let data = this.props.scene;
    let canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);

    let scene = new Three.Scene();

    //RENDERER
    let renderer = new Three.WebGLRenderer();
    renderer.setClearColor(new Three.Color(0xffffff));
    renderer.setSize(width, height);

    // LOAD DATA
    let planData = parseData(data, editingActions);

    scene.add(planData.plan);

    // CAMERA
    let viewSize = 900;
    let aspectRatio = width / height;
    let camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

    scene.add(camera);

    // Set position for the camera
    let cameraPositionX = (planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
    let cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 3;
    let cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;
    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    let axisHelper = new Three.AxisHelper(100);
    scene.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene.add(light);

    // Add another light

    let spotLight1 = new Three.SpotLight(0xffffff, 0.30);
    spotLight1.position.set(1000, 0, -1000);

    camera.add(spotLight1);

    var spotLightHelper = new Three.SpotLightHelper(spotLight1);
    camera.add(spotLightHelper);


    // POINTER LOCK

    document.body.requestPointerLock = document.body.requestPointerLock ||
      document.body.mozRequestPointerLock ||
      document.body.webkitRequestPointerLock;

    document.body.requestPointerLock();

    camera.position.set(0, 0, 0);

    this.controls = initPointerLock(camera, renderer.domElement);
    this.controls.getObject().position.set(-50, 0, -100);
    scene.add(this.controls.getObject());


    /**********************************************/

    var onKeyDown = function (event) {

      switch (event.keyCode) {

        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

        /*case 32: // space
         if (canJump === true) velocity.y += 350;
         canJump = false;
         break;*/

      }

    };

    var onKeyUp = function (event) {

      switch (event.keyCode) {

        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;

      }

    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    let raycaster = new Three.Raycaster(new Three.Vector3(), new Three.Vector3(0, -1, 0), 0, 10);


    /**********************************************/


    // Pointer

    let pointer = new Three.Object3D();

    let pointerGeometry = new Three.Geometry();
    pointerGeometry.vertices.push(new Three.Vector3(-10, 0, 0));
    pointerGeometry.vertices.push(new Three.Vector3(0, 10, 0));
    pointerGeometry.vertices.push(new Three.Vector3(10, 0, 0));
    pointerGeometry.vertices.push(new Three.Vector3(10, 0, 0));

    let yRotation = this.controls.getObject().rotation.y;
    let xRotation = this.controls.getObject().children[0].rotation.x;


    pointer.add(new Three.Line());

    // // OBJECT PICKING
    // let toIntersect = [planData.plan];
    // let mouse = new Three.Vector2();
    // let raycaster = new Three.Raycaster();
    //
    // renderer.domElement.addEventListener('mousedown', (event) => {
    //   this.lastMousePosition.x = event.offsetX / width * 2 - 1;
    //   this.lastMousePosition.y = -event.offsetY / height * 2 + 1;
    // }, false);
    //
    // renderer.domElement.addEventListener('mouseup', (event) => {
    //   event.preventDefault();
    //
    //   mouse.x = (event.offsetX / width) * 2 - 1;
    //   mouse.y = -(event.offsetY / height) * 2 + 1;
    //
    //
    //   if (Math.abs(mouse.x - this.lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - this.lastMousePosition.y) <= 0.02) {
    //     raycaster.setFromCamera(mouse, camera);
    //     let intersects = raycaster.intersectObjects(toIntersect, true);
    //     if (intersects.length > 0) {
    //       intersects[0].object.interact && intersects[0].object.interact();
    //     }
    //   }
    // }, false);

    // add the output of the renderer to the html element
    canvasWrapper.appendChild(renderer.domElement);

    // create orbit controls
    // let orbitController = new OrbitControls(camera, renderer.domElement);

    let controls = this.controls;

    render();
    function render() {
      // orbitController.update();

      /*********************/
      //raycaster.ray.origin.copy( controls.getObject().position );
      //raycaster.ray.origin.y -= 10;

      //var intersections = raycaster.intersectObjects( objects );

      //var isOnObject = intersections.length > 0;
      var isOnObject = true;

      var time = performance.now();
      var delta = ( time - prevTime ) / 200;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      if (moveForward) velocity.z -= 400.0 * delta;
      if (moveBackward) velocity.z += 400.0 * delta;

      if (moveLeft) velocity.x -= 400.0 * delta;
      if (moveRight) velocity.x += 400.0 * delta;

      if (isOnObject === true) {
        velocity.y = Math.max(0, velocity.y);

        canJump = true;
      }

      controls.getObject().translateX(velocity.x * delta);
      controls.getObject().translateY(velocity.y * delta);
      controls.getObject().translateZ(velocity.z * delta);

      if (controls.getObject().position.y < 10) {

        velocity.y = 0;
        controls.getObject().position.y = 10;

        canJump = true;

      }

      prevTime = time;

      /*********************************************/


      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    this.lastMousePosition = {};
    // this.orbitControls = orbitController;
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.planData = planData;
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    let {width, height} = nextProps;
    let {camera, renderer, scene} = this;

    let viewSize = 900;
    let aspectRatio = width / height;

    camera.left = -aspectRatio * viewSize / 2;
    camera.right = aspectRatio * viewSize / 2;

    camera.updateProjectionMatrix();

    if (nextProps.scene !== this.props.scene) {

      let changedValues = diff(this.props.scene, nextProps.scene);

      this.scene.remove(this.planData.plan);
      this.planData = parseData(nextProps.scene, this.context.editingActions);
      this.scene.add(this.planData.plan);

      //updateScene(this.planData.sceneGraph, nextProps.scene, scene, changedValues.toJS());


      // OBJECT PICKING
      let toIntersect = [this.planData.plan];
      let mouse = new Three.Vector2();
      let raycaster = new Three.Raycaster();
    }

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }

  render() {
    return React.createElement("div", {
      ref: "canvasWrapper"
    });
  }
}

Viewer3DFirstPerson.propTypes = {
  mode: React.PropTypes.string.isRequired,
  scene: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

Viewer3DFirstPerson.contextTypes = {
  editingActions: React.PropTypes.object.isRequired
};
