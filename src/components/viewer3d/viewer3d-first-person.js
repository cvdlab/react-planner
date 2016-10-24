"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Three from 'three';
import {parseData, updateScene} from './scene-creator';
import {disposeScene} from './three-memory-cleaner';
import diff from 'immutablediff';
import {initPointerLock} from "./pointer-lock-navigation";
import {firstPersonOnKeyDown, firstPersonOnKeyUp} from "./libs/first-person-controls";
import convert from 'convert-units';

export default class Viewer3DFirstPerson extends React.Component {

  constructor(props) {
    super(props);

    this.width = props.width;
    this.height = props.height;
    this.stopRendering = false;
    this.renderer = window.__threeRenderer || new Three.WebGLRenderer();
    window.__threeRenderer = this.renderer;
  }

  componentDidMount() {

    /** Variables for movement control **/
    var prevTime = performance.now();
    var velocity = new Three.Vector3();
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    let {editingActions, catalog} = this.context;

    let {state} = this.props;
    let data = state.scene;
    let canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);

    let scene3D = new Three.Scene();

    // As I need to show the pointer above all scene objects, I use this workaround http://stackoverflow.com/a/13309722
    let sceneOnTop = new Three.Scene();

    //RENDERER
    this.renderer.setClearColor(new Three.Color(0xffffff));
    this.renderer.setSize(this.width, this.height);

    // LOAD DATA
    let planData = parseData(data, editingActions, catalog);

    scene3D.add(planData.plan);

    // CAMERA
    let aspectRatio = this.width / this.height;
    let camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

    sceneOnTop.add(camera); // The pointer is on the camera so I show it above all

    // Set position for the camera
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

    this.controls = initPointerLock(camera, this.renderer.domElement);

    /* Set user initial position */
    let humanHeight = {length: 1.70, unit: 'm'};
    let humanHeightPixels = convert(humanHeight.length)
        .from(humanHeight.unit)
        .to(state.scene.unit) * state.scene.pixelPerUnit;

    let yInitialPosition = planData.boundingBox.min.y + (planData.boundingBox.min.y - planData.boundingBox.max.y) / 2 + humanHeightPixels;
    this.controls.getObject().position.set(-50, yInitialPosition, -100);
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

    let mouseVector = new Three.Vector2(0, 0);
    let raycaster = new Three.Raycaster();

    this.firstPersonMouseDown = (event) => {

      // First of all I check if controls are enabled

      if (this.controls.enabled) {
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
      }

    };

    document.addEventListener('mousedown', this.firstPersonMouseDown, false);

    // add the output of the renderer to the html element
    canvasWrapper.appendChild(this.renderer.domElement);
    this.renderer.autoClear = false;

    let controls = this.controls;

    let render = () => {

      let time = performance.now();
      let delta = ( time - prevTime ) / 200;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      if (moveForward) velocity.z -= 400.0 * delta;
      if (moveBackward) velocity.z += 400.0 * delta;

      if (moveLeft) velocity.x -= 400.0 * delta;
      if (moveRight) velocity.x += 400.0 * delta;

      controls.getObject().translateX(velocity.x * delta);
      controls.getObject().translateZ(velocity.z * delta);

      prevTime = time;

      this.renderer.clear();                     // clear buffers
      this.renderer.render(scene3D, camera);     // render scene 1
      this.renderer.clearDepth();                // clear depth buffer
      this.renderer.render(sceneOnTop, camera);  // render scene 2

      if (!this.stopRendering) {
        requestAnimationFrame(render);
      }
    };

    render();

    this.camera = camera;
    this.scene3D = scene3D;
    this.sceneOnTop = sceneOnTop;
    this.planData = planData;
  }

  componentWillUnmount() {
    this.stopRendering = true;
    document.removeEventListener('mousedown', this.firstPersonMouseDown);

    disposeScene(this.scene3D);

    this.scene3D.remove(this.planData.plan);

    this.scene3D = null;
    this.planData = null;
  }

  componentWillReceiveProps(nextProps) {
    let {width, height, state} = nextProps;
    let {camera, renderer, scene3D, sceneOnTop, planData} = this;

    this.width = width;
    this.height = height;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    if (nextProps.scene !== this.props.state.scene) {
      let changedValues = diff(this.props.state.scene, nextProps.state.scene);
      updateScene(this.planData, nextProps.state.scene, changedValues.toJS(), this.context.editingActions, this.context.catalog);
    }

    /** Update controls position **/
    let humanHeight = {length: 1.70, unit: 'm'};
    let humanHeightPixels = convert(humanHeight.length)
        .from(humanHeight.unit)
        .to(state.scene.unit) * state.scene.pixelPerUnit;

    let yInitialPosition = planData.boundingBox.min.y + (planData.boundingBox.min.y - planData.boundingBox.max.y) / 2 + humanHeightPixels;
    this.controls.getObject().position.y = yInitialPosition;

    renderer.setSize(width, height);
    renderer.clear();                     // clear buffers
    renderer.render(scene3D, camera);     // render scene 1
    renderer.clearDepth();                // clear depth buffer
    renderer.render(sceneOnTop, camera);  // render scene 2

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
