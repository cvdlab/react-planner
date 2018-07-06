"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Three from 'three';
import {parseData, updateScene} from './scene-creator';
import {disposeScene} from './three-memory-cleaner';
import diff from 'immutablediff';
import {initPointerLock} from "./pointer-lock-navigation";
import {firstPersonOnKeyDown, firstPersonOnKeyUp} from "./libs/first-person-controls";
import * as SharedStyle from '../../shared-style';

export default class Viewer3DFirstPerson extends React.Component {

  constructor(props) {
    super(props);

    this.width = props.width;
    this.height = props.height;
    this.stopRendering = false;
    this.renderer = window.__threeRenderer || new Three.WebGLRenderer({preserveDrawingBuffer: true});
    window.__threeRenderer = this.renderer;
  }

  componentDidMount() {

    /** Variables for movement control **/
    let prevTime = performance.now();
    let velocity = new Three.Vector3();
    let direction = new Three.Vector3();
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;

    let {catalog} = this.context;

    let actions = {
      areaActions: this.context.areaActions,
      holesActions: this.context.holesActions,
      itemsActions: this.context.itemsActions,
      linesActions: this.context.linesActions,
      projectActions: this.context.projectActions
    };

    let {state} = this.props;
    let data = state.scene;
    let canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);

    let scene3D = new Three.Scene();

    // As I need to show the pointer above all scene objects, I use this workaround http://stackoverflow.com/a/13309722
    let sceneOnTop = new Three.Scene();

    //RENDERER
    this.renderer.setClearColor(new Three.Color(SharedStyle.COLORS.white));
    this.renderer.setSize(this.width, this.height);

    // LOAD DATA
    this.planData = parseData(data, actions, catalog);

    scene3D.add(this.planData.plan);

    // CAMERA
    let aspectRatio = this.width / this.height;
    let camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

    sceneOnTop.add(camera); // The pointer is on the camera so I show it above all

    // Set position for the camera
    camera.position.set(0, 0, 0);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    // let axisHelper = new Three.AxisHelper(100);
    // scene3D.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene3D.add(light);

    // Add another light
    let pointLight = new Three.PointLight(SharedStyle.COLORS.white, 0.4, 1000);
    pointLight.position.set(0, 0, 0);
    scene3D.add(pointLight);

    // POINTER LOCK

    document.body.requestPointerLock = document.body.requestPointerLock ||
      document.body.mozRequestPointerLock ||
      document.body.webkitRequestPointerLock;

    document.body.requestPointerLock();

    let {controls, pointerlockChangeEvent, requestPointerLockEvent} = initPointerLock(camera, this.renderer.domElement);
    this.controls = controls;
    this.pointerlockChangeListener = pointerlockChangeEvent;
    this.requestPointerLockEvent = requestPointerLockEvent;

    /* Set user initial position */
    let humanHeight = 170; // 170 cm

    let yInitialPosition = this.planData.boundingBox.min.y +
      (this.planData.boundingBox.min.y - this.planData.boundingBox.max.y) / 2 + humanHeight;
    this.controls.getObject().position.set(-50, yInitialPosition, -100);
    sceneOnTop.add(this.controls.getObject()); // Add the pointer lock controls to the scene that will be rendered on top

    // Add move controls on the page
    this.keyDownEvent = (event) => {
      let moveResult = firstPersonOnKeyDown(event, moveForward, moveLeft, moveBackward, moveRight, canJump, velocity);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
      canJump = moveResult.canJump;
    };

    this.keyUpEvent = (event) => {
      let moveResult = firstPersonOnKeyUp(event, moveForward, moveLeft, moveBackward, moveRight, canJump);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
      canJump = moveResult.canJump;
    };

    document.addEventListener('keydown', this.keyDownEvent);
    document.addEventListener('keyup', this.keyUpEvent);

    // Add a pointer to the scene

    let pointer = new Three.Object3D();
    pointer.name = 'pointer';

    let pointerMaterial = new Three.MeshBasicMaterial({depthTest: false, depthWrite: false, color: SharedStyle.COLORS.black});
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
    let toIntersect = [this.planData.plan];

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

        let intersects = raycaster.intersectObjects(toIntersect, true);
        if (intersects.length > 0 && !(isNaN(intersects[0].distance))) {
          intersects[0].object.interact && intersects[0].object.interact();
        } else {
          this.context.projectActions.unselectAll();
        }
      }

    };

    document.addEventListener('mousedown', this.firstPersonMouseDown, false);

    this.renderer.domElement.style.display = 'block';

    // add the output of the renderer to the html element
    canvasWrapper.appendChild(this.renderer.domElement);
    this.renderer.autoClear = false;

    let render = () => {

      if (!this.stopRendering) {
        yInitialPosition = this.planData.boundingBox.min.y + humanHeight;

        let multiplier = 5;

        let time = performance.now();
        let delta = ( time - prevTime ) / 1000 * multiplier;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta / multiplier; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        this.controls.getObject().translateX(velocity.x * delta);
        this.controls.getObject().translateY(velocity.y * delta);
        this.controls.getObject().translateZ(velocity.z * delta);

        if ( this.controls.getObject().position.y < yInitialPosition ) {
          velocity.y = 0;
          this.controls.getObject().position.y = yInitialPosition;
          canJump = true;
        }

        prevTime = time;

        // Set light position
        let controlObjectPosition = this.controls.getObject().position;
        pointLight.position.set(controlObjectPosition.x, controlObjectPosition.y, controlObjectPosition.z);

        for (let elemID in this.planData.sceneGraph.LODs) {
          this.planData.sceneGraph.LODs[elemID].update(camera);
        }

        this.renderer.clear();                     // clear buffers
        this.renderer.render(scene3D, camera);     // render scene 1
        this.renderer.clearDepth();                // clear depth buffer
        this.renderer.render(sceneOnTop, camera);  // render scene 2

        requestAnimationFrame(render);
      }
    };

    render();

    this.camera = camera;
    this.scene3D = scene3D;
    this.sceneOnTop = sceneOnTop;
    // this.planData = planData;
  }

  componentWillUnmount() {
    this.stopRendering = true;
    this.renderer.autoClear = true;
    document.removeEventListener('mousedown', this.firstPersonMouseDown);
    document.removeEventListener('keydown', this.keyDownEvent);
    document.removeEventListener('keyup', this.keyUpEvent);
    document.removeEventListener('pointerlockchange', this.pointerlockChangeEvent);
    document.removeEventListener('mozpointerlockchange', this.pointerlockChangeEvent);
    document.removeEventListener('webkitpointerlockchange', this.pointerlockChangeEvent);
    this.renderer.domElement.removeEventListener('click', this.requestPointerLockEvent);

    disposeScene(this.scene3D);

    this.scene3D.remove(this.planData.plan);

    this.scene3D = null;
    this.planData = null;
    this.renderer.renderLists.dispose();
  }

  componentWillReceiveProps(nextProps) {
    let {width, height} = nextProps;
    let {camera, renderer, scene3D, sceneOnTop, planData} = this;

    let actions = {
      areaActions: this.context.areaActions,
      holesActions: this.context.holesActions,
      itemsActions: this.context.itemsActions,
      linesActions: this.context.linesActions,
      projectActions: this.context.projectActions
    };

    this.width = width;
    this.height = height;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    if (nextProps.scene !== this.props.state.scene) {
      let changedValues = diff(this.props.state.scene, nextProps.state.scene);
      updateScene(planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), actions, this.context.catalog);
    }

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
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

Viewer3DFirstPerson.contextTypes = {
  areaActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object
};
