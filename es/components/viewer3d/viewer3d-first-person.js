"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Three from 'three';
import { parseData, updateScene } from './scene-creator';
import { disposeScene } from './three-memory-cleaner';
import diff from 'immutablediff';
import { initPointerLock } from "./pointer-lock-navigation";
import { firstPersonOnKeyDown, firstPersonOnKeyUp } from "./libs/first-person-controls";
import * as SharedStyle from '../../shared-style';
var Viewer3DFirstPerson = function Viewer3DFirstPerson(_ref) {
  var state = _ref.state,
    width = _ref.width,
    height = _ref.height;
  var _useState = useState(window.__threeRenderer || new Three.WebGLRenderer({
      preserveDrawingBuffer: true
    })),
    _useState2 = _slicedToArray(_useState, 2),
    renderer = _useState2[0],
    setRenderer = _useState2[1];
  window.__threeRenderer = renderer;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    stopRendering = _useState4[0],
    setStopRendering = _useState4[1];
  var canvasWrapperRef = useRef(null);
  var actions = useContext(ReactPlannerContext);
  var areaActions = actions.areaActions,
    holesActions = actions.holesActions,
    itemsActions = actions.itemsActions,
    linesActions = actions.linesActions,
    projectActions = actions.projectActions,
    catalog = actions.catalog;
  var scene3D = new Three.Scene();
  var sceneOnTop = new Three.Scene();
  var aspectRatio = width / height;
  var camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);
  var _initPointerLock = initPointerLock(camera, renderer.domElement),
    controls = _initPointerLock.controls,
    pointerlockChangeEvent = _initPointerLock.pointerlockChangeEvent,
    requestPointerLockEvent = _initPointerLock.requestPointerLockEvent;
  var planData = parseData(state.scene, actions, catalog);
  useEffect(function () {
    /** Variables for movement control **/
    var prevTime = performance.now();
    var velocity = new Three.Vector3();
    var direction = new Three.Vector3();
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;
    var actions = {
      areaActions: areaActions,
      holesActions: holesActions,
      itemsActions: itemsActions,
      linesActions: linesActions,
      projectActions: projectActions
    };
    var canvasWrapper = ReactDOM.findDOMNode(canvasWrapperRef);

    // let scene3D = new Three.Scene();

    // As I need to show the pointer above all scene objects, I use this workaround http://stackoverflow.com/a/13309722
    // let sceneOnTop = new Three.Scene();

    //RENDERER
    renderer.setClearColor(new Three.Color(SharedStyle.COLORS.white));
    renderer.setSize(width, height);

    // LOAD DATA
    // this.planData = parseData(state.scene, actions, catalog);

    scene3D.add(planData.plan);

    // CAMERA
    // let aspectRatio = width / height;
    // let camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

    sceneOnTop.add(camera); // The pointer is on the camera so I show it above all

    // Set position for the camera
    camera.position.set(0, 0, 0);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    // let axisHelper = new Three.AxisHelper(100);
    // scene3D.add(axisHelper);

    // LIGHT
    var light = new Three.AmbientLight(0xafafaf); // soft white light
    scene3D.add(light);

    // Add another light
    var pointLight = new Three.PointLight(SharedStyle.COLORS.white, 0.4, 1000);
    pointLight.position.set(0, 0, 0);
    scene3D.add(pointLight);

    // POINTER LOCK

    document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
    document.body.requestPointerLock();

    // let {controls, pointerlockChangeEvent, requestPointerLockEvent} = initPointerLock(camera, renderer.domElement);
    // this.controls = controls;
    // this.pointerlockChangeListener = pointerlockChangeEvent;
    // this.requestPointerLockEvent = requestPointerLockEvent;

    /* Set user initial position */
    var humanHeight = 170; // 170 cm

    var yInitialPosition = planData.boundingBox.min.y + (planData.boundingBox.min.y - planData.boundingBox.max.y) / 2 + humanHeight;
    controls.getObject().position.set(-50, yInitialPosition, -100);
    sceneOnTop.add(controls.getObject()); // Add the pointer lock controls to the scene that will be rendered on top

    // Add move controls on the page
    var keyDownEvent = function keyDownEvent(event) {
      var moveResult = firstPersonOnKeyDown(event, moveForward, moveLeft, moveBackward, moveRight, canJump, velocity);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
      canJump = moveResult.canJump;
    };
    var keyUpEvent = function keyUpEvent(event) {
      var moveResult = firstPersonOnKeyUp(event, moveForward, moveLeft, moveBackward, moveRight, canJump);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
      canJump = moveResult.canJump;
    };
    document.addEventListener('keydown', keyDownEvent);
    document.addEventListener('keyup', keyUpEvent);

    // Add a pointer to the scene

    var pointer = new Three.Object3D();
    pointer.name = 'pointer';
    var pointerMaterial = new Three.MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      color: SharedStyle.COLORS.black
    });
    var pointerGeometry1 = new Three.Geometry();
    pointerGeometry1.vertices.push(new Three.Vector3(-10, 0, 0));
    pointerGeometry1.vertices.push(new Three.Vector3(10, 0, 0));
    var linePointer1 = new Three.Line(pointerGeometry1, pointerMaterial);
    linePointer1.position.z -= 100;
    var pointerGeometry2 = new Three.Geometry();
    pointerGeometry2.vertices.push(new Three.Vector3(0, 10, 0));
    pointerGeometry2.vertices.push(new Three.Vector3(0, -10, 0));
    var linePointer2 = new Three.Line(pointerGeometry2, pointerMaterial);
    linePointer2.renderDepth = 1e20;
    linePointer2.position.z -= 100;
    var pointerGeometry3 = new Three.Geometry();
    pointerGeometry3.vertices.push(new Three.Vector3(-1, 1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(1, 1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(1, -1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(-1, -1, 0));
    pointerGeometry3.vertices.push(new Three.Vector3(-1, 1, 0));
    var linePointer3 = new Three.Line(pointerGeometry3, pointerMaterial);
    linePointer3.position.z -= 100;
    pointer.add(linePointer1);
    pointer.add(linePointer2);
    pointer.add(linePointer3);
    camera.add(pointer); // Add the pointer to the camera

    // OBJECT PICKING
    var toIntersect = [planData.plan];
    var mouseVector = new Three.Vector2(0, 0);
    var raycaster = new Three.Raycaster();
    var firstPersonMouseDown = function firstPersonMouseDown(event) {
      // First of all I check if controls are enabled

      if (controls.enabled) {
        event.preventDefault();

        /* Per avere la direzione da assegnare al raycaster, chiamo il metodo getDirection di PointerLockControls,
         * che restituisce una funzione che a sua volta prende un vettore, vi scrive i valori degli oggetti
         * pitch e yaw e lo restituisce */

        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(toIntersect, true);
        if (intersects.length > 0 && !isNaN(intersects[0].distance)) {
          intersects[0].object.interact && intersects[0].object.interact();
        } else {
          projectActions.unselectAll();
        }
      }
    };
    document.addEventListener('mousedown', firstPersonMouseDown, false);
    renderer.domElement.style.display = 'block';

    // add the output of the renderer to the html element
    canvasWrapper.appendChild(renderer.domElement);
    renderer.autoClear = false;
    var render = function render() {
      if (!stopRendering) {
        yInitialPosition = planData.boundingBox.min.y + humanHeight;
        var multiplier = 5;
        var time = performance.now();
        var delta = (time - prevTime) / 1000 * multiplier;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta / multiplier; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveLeft) - Number(moveRight);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);
        if (controls.getObject().position.y < yInitialPosition) {
          velocity.y = 0;
          controls.getObject().position.y = yInitialPosition;
          canJump = true;
        }
        prevTime = time;

        // Set light position
        var controlObjectPosition = controls.getObject().position;
        pointLight.position.set(controlObjectPosition.x, controlObjectPosition.y, controlObjectPosition.z);
        for (var elemID in planData.sceneGraph.LODs) {
          planData.sceneGraph.LODs[elemID].update(camera);
        }
        renderer.clear(); // clear buffers
        renderer.render(scene3D, camera); // render scene 1
        renderer.clearDepth(); // clear depth buffer
        renderer.render(sceneOnTop, camera); // render scene 2

        requestAnimationFrame(render);
      }
    };
    render();
    camera = camera;
    scene3D = scene3D;
    sceneOnTop = sceneOnTop;
    // this.planData = planData;

    return function () {
      setStopRendering(true);
      renderer.autoClear = true;
      document.removeEventListener('mousedown', firstPersonMouseDown);
      document.removeEventListener('keydown', keyDownEvent);
      document.removeEventListener('keyup', keyUpEvent);
      document.removeEventListener('pointerlockchange', pointerlockChangeEvent);
      document.removeEventListener('mozpointerlockchange', pointerlockChangeEvent);
      document.removeEventListener('webkitpointerlockchange', pointerlockChangeEvent);
      renderer.domElement.removeEventListener('click', requestPointerLockEvent);
      disposeScene(scene3D);
      scene3D.remove(planData.plan);
      scene3D = null;
      planData = null;
      renderer.renderLists.dispose();
    };
  }, []); // Run once on mount and cleanup on unmount

  useEffect(function () {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (nextProps.scene !== state.scene) {
      var changedValues = diff(state.scene, nextProps.state.scene);
      updateScene(planData, nextProps.state.scene, state.scene, changedValues.toJS(), actions, catalog);
    }
    renderer.setSize(width, height);
    renderer.clear(); // clear buffers
    renderer.render(scene3D, camera); // render scene 1
    renderer.clearDepth(); // clear depth buffer
    renderer.render(sceneOnTop, camera); // render scene 2
  }, [state, width, height]); // Run when state, width, or height changes

  return /*#__PURE__*/React.createElement("div", {
    ref: "canvasWrapper"
  });
};
Viewer3DFirstPerson.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
export default Viewer3DFirstPerson;