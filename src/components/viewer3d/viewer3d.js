'use strict';

import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Three from 'three';
import { parseData, updateScene } from './scene-creator';
import { disposeScene } from './three-memory-cleaner';
import OrbitControls from './libs/orbit-controls';
import diff from 'immutablediff';
import * as SharedStyle from '../../styles/shared-style';
import ReactPlannerContext from '../../utils/react-planner-context';

const Scene3DViewer = ({ state, width, height }) => {
  let canvasWrapper = useRef(null);
  const [renderer] = useState(window.__threeRenderer || new Three.WebGLRenderer({ preserveDrawingBuffer: true }));
  window.__threeRenderer = renderer;
  const [lastMousePosition, setLastMousePosition] = useState({});
  const [renderingID, setRenderingID] = useState(0);
  const actions = useContext(ReactPlannerContext);
  const { projectActions, catalog } = actions;

  let scene3D = new Three.Scene();
  let planData = parseData(state.scene, actions, catalog);
  let aspectRatio = width / height;
  let camera = new Three.PerspectiveCamera(45, aspectRatio, 1, 300000);
  let orbitController = new OrbitControls(camera, renderer.domElement);
  let toIntersect = [planData.plan];
  let mouse = new Three.Vector2();
  let raycaster = new Three.Raycaster();

  const mouseDownEvent = (event) => {
    let x = event.offsetX / width * 2 - 1;
    let y = -event.offsetY / height * 2 + 1;
    setLastMousePosition({ x: x, y: y });
  };

  const mouseUpEvent = (event) => {
    event.preventDefault();

    mouse.x = (event.offsetX / width) * 2 - 1;
    mouse.y = -(event.offsetY / height) * 2 + 1;

    if (Math.abs(mouse.x - lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - lastMousePosition.y) <= 0.02) {

      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(toIntersect, true);

      if (intersects.length > 0 && !(isNaN(intersects[0].distance))) {
        intersects[0].object.interact && intersects[0].object.interact();
      } else {
        projectActions.unselectAll();
      }
    }
  };

  useEffect(() => {
    let canvas = canvasWrapper.current;

    //RENDERER
    renderer.setClearColor(new Three.Color(SharedStyle.COLORS.white));
    renderer.setSize(width, height);

    // CANVAS
    scene3D.add(planData.plan);
    scene3D.add(planData.grid);

    scene3D.add(camera);

    // Set position for the camera
    let cameraPositionX = -(planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
    let cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 10;
    let cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;

    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    // let axisHelper = new Three.AxisHelper(100);
    // scene3D.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene3D.add(light);

    // Add another light

    let spotLight1 = new Three.SpotLight(SharedStyle.COLORS.white, 0.30);
    spotLight1.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    scene3D.add(spotLight1);

    // OBJECT PICKING

    renderer.domElement.addEventListener('mousedown', mouseDownEvent);
    renderer.domElement.addEventListener('mouseup', mouseUpEvent);
    renderer.domElement.style.display = 'block';

    // add the output of the renderer to the html element
    canvas.appendChild(renderer.domElement);

    // create orbit controls
    let spotLightTarget = new Three.Object3D();
    spotLightTarget.name = 'spotLightTarget';
    spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
    scene3D.add(spotLightTarget);
    spotLight1.target = spotLightTarget;

    let render = () => {
      orbitController.update();
      spotLight1.position.set(camera.position.x, camera.position.y, camera.position.z);
      spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
      camera.updateMatrix();
      camera.updateMatrixWorld();

      for (let elemID in planData.sceneGraph.LODs) {
        planData.sceneGraph.LODs[elemID].update(camera);
      }

      renderer.render(scene3D, camera);
      setRenderingID(requestAnimationFrame(render));
    };

    render();

    return () => {
      cancelAnimationFrame(renderingID);

      orbitController.dispose();

      renderer.domElement.removeEventListener('mousedown', mouseDownEvent);
      renderer.domElement.removeEventListener('mouseup', mouseUpEvent);

      disposeScene(scene3D);
      scene3D.remove(planData.plan);
      scene3D.remove(planData.grid);

      renderer.renderLists.dispose();
    };
  }, [width, height]);

  // TODO(pg): check with old code...
  // useEffect(() => {
  //   if (state.scene !== state.scene) {
  //     let changedValues = diff(state.scene, state.scene);
  //     updateScene(planData, state.scene, state.scene, changedValues.toJS(), actions, catalog);
  //   }

  //   renderer.setSize(width, height);
  // }, [state.scene, width, height]);

  return <div ref={canvasWrapper} />;
}

Scene3DViewer.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Scene3DViewer;