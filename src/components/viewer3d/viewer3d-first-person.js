"use strict";

import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Three from 'three';
import {parseData, updateScene} from './scene-creator';
import {disposeScene} from './three-memory-cleaner';
import diff from 'immutablediff';
import {initPointerLock} from "./pointer-lock-navigation";
import {firstPersonOnKeyDown, firstPersonOnKeyUp} from "./libs/first-person-controls";
import * as SharedStyle from '../../styles/shared-style';
import ReactPlannerContext from '../../utils/react-planner-context';


const Viewer3DFirstPerson = ({ state, width, height }) => {
  const [renderer, setRenderer] = useState(window.__threeRenderer || new Three.WebGLRenderer({preserveDrawingBuffer: true}));
  window.__threeRenderer = renderer;
  const [stopRendering, setStopRendering] = useState(false);
  const canvasWrapper = useRef(null);
  const actions = useContext(ReactPlannerContext);
  const { areaActions, holesActions, itemsActions, linesActions, projectActions, catalog } = actions;

  let scene3D = new Three.Scene();
  let sceneOnTop = new Three.Scene();
  let aspectRatio = width / height;
  let camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);
  let {controls, pointerlockChangeEvent, requestPointerLockEvent} = initPointerLock(camera, renderer.domElement);
  let planData = parseData(state.scene, actions, catalog);
  
  useEffect(() => {
    /** Variables for movement control **/
    let prevTime = performance.now();
    let velocity = new Three.Vector3();
    let direction = new Three.Vector3();
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;

    let actions = {
      areaActions: areaActions,
      holesActions: holesActions,
      itemsActions: itemsActions,
      linesActions: linesActions,
      projectActions: projectActions
    };

    let canvas = canvasWrapper.current;

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

    // let {controls, pointerlockChangeEvent, requestPointerLockEvent} = initPointerLock(camera, renderer.domElement);
    // this.controls = controls;
    // this.pointerlockChangeListener = pointerlockChangeEvent;
    // this.requestPointerLockEvent = requestPointerLockEvent;

    /* Set user initial position */
    let humanHeight = 170; // 170 cm

    let yInitialPosition = planData.boundingBox.min.y +
      (planData.boundingBox.min.y - planData.boundingBox.max.y) / 2 + humanHeight;
    controls.getObject().position.set(-50, yInitialPosition, -100);
    sceneOnTop.add(controls.getObject()); // Add the pointer lock controls to the scene that will be rendered on top

    // Add move controls on the page
    const keyDownEvent = (event) => {
      let moveResult = firstPersonOnKeyDown(event, moveForward, moveLeft, moveBackward, moveRight, canJump, velocity);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
      canJump = moveResult.canJump;
    };

    const keyUpEvent = (event) => {
      let moveResult = firstPersonOnKeyUp(event, moveForward, moveLeft, moveBackward, moveRight, canJump);
      moveForward = moveResult.moveForward;
      moveLeft = moveResult.moveLeft;
      moveBackward = moveResult.moveBackward;
      moveRight = moveResult.moveRight;
      canJump = moveResult.canJump;
    };

    document.addEventListener('keydown', keyDownEvent);
    document.addEventListener('keyup', keyUpEvent);

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
    let toIntersect = [planData.plan];

    let mouseVector = new Three.Vector2(0, 0);
    let raycaster = new Three.Raycaster();

    const firstPersonMouseDown = (event) => {

      // First of all I check if controls are enabled

      if (controls.enabled) {
        event.preventDefault();

        /* Per avere la direzione da assegnare al raycaster, chiamo il metodo getDirection di PointerLockControls,
         * che restituisce una funzione che a sua volta prende un vettore, vi scrive i valori degli oggetti
         * pitch e yaw e lo restituisce */

        raycaster.setFromCamera(mouseVector, camera);

        let intersects = raycaster.intersectObjects(toIntersect, true);
        if (intersects.length > 0 && !(isNaN(intersects[0].distance))) {
          intersects[0].object.interact && intersects[0].object.interact();
        } else {
          projectActions.unselectAll();
        }
      }

    };

    document.addEventListener('mousedown', firstPersonMouseDown, false);

    renderer.domElement.style.display = 'block';

    // add the output of the renderer to the html element
    canvas.appendChild(renderer.domElement);
    renderer.autoClear = false;

    let render = () => {

      if (!stopRendering) {
        yInitialPosition = planData.boundingBox.min.y + humanHeight;

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

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);

        if ( controls.getObject().position.y < yInitialPosition ) {
          velocity.y = 0;
          controls.getObject().position.y = yInitialPosition;
          canJump = true;
        }

        prevTime = time;

        // Set light position
        let controlObjectPosition = controls.getObject().position;
        pointLight.position.set(controlObjectPosition.x, controlObjectPosition.y, controlObjectPosition.z);

        for (let elemID in planData.sceneGraph.LODs) {
          planData.sceneGraph.LODs[elemID].update(camera);
        }

        renderer.clear();                     // clear buffers
        renderer.render(scene3D, camera);     // render scene 1
        renderer.clearDepth();                // clear depth buffer
        renderer.render(sceneOnTop, camera);  // render scene 2

        requestAnimationFrame(render);
      }
    };

    render();

    camera = camera;
    scene3D = scene3D;
    sceneOnTop = sceneOnTop;
    // this.planData = planData;

    return () => {
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

  // TODO(pg): check with old code...
  // useEffect(() => {
  //   camera.aspect = width / height;

  //   camera.updateProjectionMatrix();

  //   if (nextProps.scene !== state.scene) {
  //     let changedValues = diff(state.scene, nextProps.state.scene);
  //     updateScene(planData, nextProps.state.scene, state.scene, changedValues.toJS(), actions, catalog);
  //   }

  //   renderer.setSize(width, height);
  //   renderer.clear();                     // clear buffers
  //   renderer.render(scene3D, camera);     // render scene 1
  //   renderer.clearDepth();                // clear depth buffer
  //   renderer.render(sceneOnTop, camera);  // render scene 2
  // }, [state, width, height]); // Run when state, width, or height changes

  return <div ref={canvasWrapper} />;
}

Viewer3DFirstPerson.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Viewer3DFirstPerson;