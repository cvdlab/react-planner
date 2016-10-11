"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Three from 'three';
import {parseData, updateScene} from './scene-creator';
import OrbitControls from './libs/orbit-controls';
import diff from 'immutablediff';
import {initPointerLock} from "./pointer-lock-navigation";
import {firstPersonOnKeyDown, firstPersonOnKeyUp} from "./libs/first-person-controls";

export default class Viewer3DFirstPerson extends React.Component {

  componentDidMount() {

    /********************************/
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new Three.Vector3();


    var controlsEnabled = true;

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    // let canJump = false;


    /********************************/


    let {editingActions, catalog} = this.context;

    let {width, height, state} = this.props;
    let data = state.scene;
    let canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);

    let scene3D = new Three.Scene();

    // As I need to show the pointer above all scene objects, I use this workaround http://stackoverflow.com/a/13309722
    let sceneOnTop = new Three.Scene();

    //RENDERER
    let renderer = new Three.WebGLRenderer();
    renderer.setClearColor(new Three.Color(0xffffff));
    renderer.setSize(width, height);

    // LOAD DATA
    let planData = parseData(data, editingActions, catalog);

    scene3D.add(planData.plan);

    // CAMERA
    let viewSize = 900;
    let aspectRatio = width / height;
    let camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

    sceneOnTop.add(camera); // The pointer is on the camera so I show it above all

    // Set position for the camera
    let cameraPositionX = (planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
    let cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 3;
    let cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;
    camera.position.set(0, 0, 0);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    let axisHelper = new Three.AxisHelper(100);
    scene3D.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene3D.add(light);

    // Add another light

    let spotLight1 = new Three.SpotLight(0xffffff, 0.30);
    spotLight1.position.set(1000, 0, -1000);
    camera.add(spotLight1);

    // POINTER LOCK

    document.body.requestPointerLock = document.body.requestPointerLock ||
      document.body.mozRequestPointerLock ||
      document.body.webkitRequestPointerLock;

    document.body.requestPointerLock();

    this.controls = initPointerLock(camera, renderer.domElement);
    this.controls.getObject().position.set(-50, 0, -100);
    sceneOnTop.add(this.controls.getObject()); // Add the pointer lock controls to the scene that will be rendered on top

    // Add move controls on the page
    document.addEventListener('keydown', (event) => {
      let moveResult = firstPersonOnKeyDown(event, moveForward, moveLeft, moveBackward, moveRight);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
    }, false);

    document.addEventListener('keyup', (event) => {
      let moveResult = firstPersonOnKeyUp(event, moveForward, moveLeft, moveBackward, moveRight);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
    }, false);

    // Add a pointer to the scene

    let pointer = new Three.Object3D();

    let pointerMaterial = new Three.MeshBasicMaterial({depthTest: false, depthWrite: false, color: 0x000000});
    let pointerGeometry1 = new Three.Geometry();
    pointerGeometry1.vertices.push(new Three.Vector3(-10, 0, 0));
    pointerGeometry1.vertices.push(new Three.Vector3(10, 0, 0));

    let linePointer1 = new Three.Line(pointerGeometry1, pointerMaterial);
    linePointer1.position.z -= 100;

    let pointerGeometry2 = new Three.Geometry();
    pointerGeometry2.vertices.push(new Three.Vector3(0, 10, 0));
    pointerGeometry2.vertices.push(new Three.Vector3(0, -10, 0));

    let linePointer2 = new Three.Line(pointerGeometry2, pointerMaterial);
    linePointer2.renderDepth = 1e20;
    linePointer2.position.z -= 100;

    let pointerGeometry3 = new Three.Geometry();
    pointerGeometry3.vertices.push(new Three.Vector3(-1, 1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(1, 1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(1, -1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(-1, -1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(-1, 1, 0));

    let linePointer3 = new Three.Line(pointerGeometry3, pointerMaterial);
    linePointer3.position.z -= 100;


    pointer.add(linePointer1);
    pointer.add(linePointer2);
    pointer.add(linePointer3);

    camera.add(pointer); // Add the pointer to the camera


    // OBJECT PICKING
    let toIntersect = [planData.plan];

    let mouseVector = new Three.Vector2(0,0)
    let raycaster = new Three.Raycaster();

    document.addEventListener('mousedown', (event) => {

      event.preventDefault();

      /* Per avere la direzione da assegnare al raycaster, chiamo il metodo getDirection di PointerLockControls,
       * che restituisce una funzione che a sua volta prende un vettore, vi scrive i valori degli oggetti
       * pitch e yaw e lo restituisce */
      
      raycaster.setFromCamera(mouseVector, camera);

      var intersects = raycaster.intersectObjects(toIntersect, true);
      if (intersects.length > 0) {
        intersects[0].object.interact && intersects[0].object.interact();
      } else {
        editingActions.unselectAll();
      }

    }, false);

    console.log(window);


    // add the output of the renderer to the html element
    canvasWrapper.appendChild(renderer.domElement);

    // create orbit controls
    // let orbitController = new OrbitControls(camera, renderer.domElement);

    let controls = this.controls;

    renderer.autoClear = false;

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
      renderer.clear();                     // clear buffers
      renderer.render(scene3D, camera);     // render scene 1
      renderer.clearDepth();                // clear depth buffer
      renderer.render(sceneOnTop, camera);    // render scene 2

      // renderer.render(scene3D, camera);
      requestAnimationFrame(render);
    }

    this.renderer = renderer;
    this.camera = camera;
    this.scene3D = scene3D;
    this.sceneOnTop = sceneOnTop
    this.planData = planData;
    this.width = width;
    this.height = height;

  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    let {width, height} = nextProps;
    let {camera, renderer, scene3D, sceneOnTop} = this;

    let viewSize = 900;
    let aspectRatio = width / height;

    camera.left = -aspectRatio * viewSize / 2;
    camera.right = aspectRatio * viewSize / 2;

    camera.updateProjectionMatrix();

    if (nextProps.scene !== this.props.state.scene) {

      console.log("Something is changed but I will not control");

      let changedValues = diff(this.props.state.scene, nextProps.state.scene);

      updateScene(this.planData, nextProps.state.scene, changedValues.toJS(), this.context.editingActions, this.context.catalog);
    }

    renderer.setSize(width, height);
    // renderer.render(scene3D, camera);
    renderer.clear();                     // clear buffers
    renderer.render(scene3D, camera);     // render scene 1
    renderer.clearDepth();                // clear depth buffer
    renderer.render(sceneOnTop, camera);    // render scene 2
  }

  render() {
    return React.createElement("div", {
      ref: "canvasWrapper"
    });
  }
}

Viewer3DFirstPerson.propTypes = {
  state: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

Viewer3DFirstPerson.contextTypes = {
  editingActions: React.PropTypes.object.isRequired,
  catalog: React.PropTypes.object
};
